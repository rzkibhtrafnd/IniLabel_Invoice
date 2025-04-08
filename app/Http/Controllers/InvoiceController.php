<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\DetailInvoice;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Mail\InvoiceEmail;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvoiceNotificationEmail;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['customer', 'user'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(15);
        
        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
            'appUrl' => env('APP_URL'),
        ]);
    }

    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'details.product', 'receipts']);
        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice,
        ]);
    }

    public function create()
    {
        $setting = Setting::first();
        return Inertia::render('Invoices/Create', [
            'customers'     => Customer::all(),
            'products'      => Product::all(),
            'taxPercentage' => $setting->tax ?? 0,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id'       => 'required|exists:customers,id',
            'jatuh_tempo'       => 'required|date',
            'items'             => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:products,id',
            'items.*.kuantitas' => 'required|integer|min:1',
            'diskon'            => 'nullable|numeric|min:0',
            'ongkir'            => 'nullable|numeric|min:0',
        ]);

        $setting = Setting::first();
        $taxPercentage = $setting ? $setting->tax : 0;
        $diskon = $request->diskon ?? 0;
        $ongkir = $request->ongkir ?? 0;

        $subtotal = collect($request->items)->sum(function ($item) {
            $product = Product::find($item['produk_id']);
            return $item['kuantitas'] * $product->price;
        });

        $baseForTax = $subtotal - $diskon + $ongkir;
        $taxValue   = round($baseForTax * ($taxPercentage / 100), 2);
        $total_bayar = $baseForTax + $taxValue;

        $invoice = Invoice::create([
            'customer_id' => $request->customer_id,
            'user_id'     => Auth::id(),
            'jatuh_tempo' => $request->jatuh_tempo,
            'total_harga' => $subtotal,
            'diskon'      => $diskon,
            'ongkir'      => $ongkir,
            'tax'         => $taxValue,
            'total_bayar' => $total_bayar,
            'total_dibayar' => 0,
            'status'      => 'Draft',
        ]);

        foreach ($request->items as $item) {
            $product = Product::find($item['produk_id']);
            $invoice->details()->create([
                'produk_id'   => $item['produk_id'],
                'kuantitas'   => $item['kuantitas'],
                'harga'       => $product->price,
                'total_harga' => $item['kuantitas'] * $product->price,
            ]);
        }

        return redirect()->route('invoices.index')->with('message', 'Success.Invoice berhasil dibuat!');
    }

    public function edit(Invoice $invoice)
    {
        $setting = Setting::first();
        return Inertia::render('Invoices/Edit', [
            'invoice'       => $invoice->load(['details.product']),
            'customers'     => Customer::all(),
            'products'      => Product::all(),
            'taxPercentage' => $setting->tax ?? 0,
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'customer_id'       => 'required|exists:customers,id',
            'jatuh_tempo'       => 'required|date',
            'items'             => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:products,id',
            'items.*.kuantitas' => 'required|integer|min:1',
            'diskon'            => 'nullable|numeric|min:0',
            'ongkir'            => 'nullable|numeric|min:0',
        ]);

        $invoice->details()->delete();

        $setting = Setting::first();
        $taxPercentage = $setting ? $setting->tax : 0;
        $diskon = $request->diskon ?? 0;
        $ongkir = $request->ongkir ?? 0;

        $subtotal = collect($request->items)->sum(function ($item) {
            $product = Product::find($item['produk_id']);
            return $item['kuantitas'] * $product->price;
        });

        $baseForTax = $subtotal - $diskon + $ongkir;
        $taxValue   = round($baseForTax * ($taxPercentage / 100), 2);
        $total_bayar = $baseForTax + $taxValue;

        $invoice->update([
            'customer_id' => $request->customer_id,
            'jatuh_tempo' => $request->jatuh_tempo,
            'total_harga' => $subtotal,
            'diskon'      => $diskon,
            'ongkir'      => $ongkir,
            'tax'         => $taxValue,
            'total_bayar' => $total_bayar,
        ]);

        foreach ($request->items as $item) {
            $product = Product::find($item['produk_id']);
            $invoice->details()->create([
                'produk_id'   => $item['produk_id'],
                'kuantitas'   => $item['kuantitas'],
                'harga'       => $product->price,
                'total_harga' => $item['kuantitas'] * $product->price,
            ]);
        }

        return redirect()->route('invoices.index')->with('message', 'Success.Invoice berhasil diperbarui!');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->details()->delete();
        $invoice->delete();
        return redirect()->route('invoices.index')->with('message', 'Invoice berhasil dihapus!');
    }

    public function downloadInvoice(Invoice $invoice)
    {
        // Muat relasi customer, user, details.product dan pengaturan
        $invoice->load(['customer', 'user', 'details.product']);
        $setting = Setting::first();
        
        // Gambar logo
        $imagePath = public_path('assets/logo.png');
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageSrc  = 'data:image/png;base64,' . $imageData;

        $pdf = Pdf::loadView('invoices.pdf', compact('invoice', 'imageSrc', 'setting'))
            ->setPaper('A4', 'portrait')
            ->setOptions([
                'margin-left'   => 0,
                'margin-right'  => 0,
                'margin-top'    => 0,
                'margin-bottom' => 0,
            ]);

        return $pdf->download("Invoice_{$invoice->id}.pdf");
    }

    public function sendEmail(Invoice $invoice)
    {
        // Muat relasi dan setting
        $invoice->load(['customer', 'details.product', 'user']);
        $setting = Setting::first();
    
        // Gambar logo
        $imagePath = public_path('assets/logo.png');
        $imageData = base64_encode(file_get_contents($imagePath));
        $imageSrc  = 'data:image/png;base64,' . $imageData;
    
        // Generate PDF
        $pdf = Pdf::loadView('invoices.pdf', compact('invoice', 'imageSrc', 'setting'))
                  ->setPaper('A4', 'portrait')
                  ->setOptions([
                      'margin-left'   => 0,
                      'margin-right'  => 0,
                      'margin-top'    => 0,
                      'margin-bottom' => 0,
                  ]);
    
        $pdfContent = $pdf->output();
    
        // Kirim email ke customer dengan lampiran PDF
        Mail::to($invoice->customer->email)->send(
            new InvoiceEmail($invoice, $pdfContent, $setting)
        );
    
        // Kirim notifikasi email ke user yang membuat invoice
        Mail::to($invoice->user->email)->send(
            new InvoiceNotificationEmail($invoice, $pdfContent, $setting)
        );
    
        return redirect()->back()->with('message', 'Success.Email invoice telah dikirim ke customer dan notifikasi telah dikirim ke user.');
    }
    
}
