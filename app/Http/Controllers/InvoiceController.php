<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\DetailInvoice;
use App\Models\Customer;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['customer', 'user'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create', [
            'customers' => Customer::all(['id', 'name']),
            'products' => Product::all(['id', 'name', 'price']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'jatuh_tempo' => 'required|date',
            'status' => 'required|in:Belum dibayar,Dibayar sebagian,Lunas',
            'items' => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:products,id',
            'items.*.kuantitas' => 'required|integer|min:1',
            'diskon' => 'required|numeric|min:0',
            'ongkir' => 'required|numeric|min:0',
        ]);

        // Hitung total
        $subtotal = collect($request->items)->sum(function ($item) {
            return $item['kuantitas'] * Product::find($item['produk_id'])->price;
        });

        $total_bayar = $subtotal - $request->diskon + $request->ongkir;

        // Buat invoice
        $invoice = Invoice::create([
            'customer_id' => $request->customer_id,
            'user_id' => Auth::id(),
            'jatuh_tempo' => $request->jatuh_tempo,
            'total_harga' => $subtotal,
            'diskon' => $request->diskon,
            'ongkir' => $request->ongkir,
            'total_bayar' => $total_bayar,
            'status' => $request->status,
        ]);

        // Simpan detail invoice
        foreach ($request->items as $item) {
            $product = Product::find($item['produk_id']);

            $invoice->details()->create([
                'produk_id' => $item['produk_id'],
                'kuantitas' => $item['kuantitas'],
                'harga' => $product->price,
                'total_harga' => $item['kuantitas'] * $product->price,
            ]);
        }

        return redirect()->route('invoices.index')->with('success', 'Invoice berhasil dibuat!');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Invoices/Edit', [
            'invoice' => $invoice->load(['details', 'customer', 'details.product']),
            'customers' => Customer::all(['id', 'name']),
            'products' => Product::all(['id', 'name', 'price']),
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'jatuh_tempo' => 'required|date',
            'status' => 'required|in:Belum dibayar,Dibayar sebagian,Lunas',
            'items' => 'required|array|min:1',
            'items.*.produk_id' => 'required|exists:products,id',
            'items.*.kuantitas' => 'required|integer|min:1',
            'diskon' => 'required|numeric|min:0',
            'ongkir' => 'required|numeric|min:0',
        ]);

        // Hapus detail lama
        $invoice->details()->delete();

        // Hitung ulang total
        $subtotal = collect($request->items)->sum(function ($item) {
            return $item['kuantitas'] * Product::find($item['produk_id'])->price;
        });

        $total_bayar = $subtotal - $request->diskon + $request->ongkir;

        // Update invoice
        $invoice->update([
            'customer_id' => $request->customer_id,
            'jatuh_tempo' => $request->jatuh_tempo,
            'total_harga' => $subtotal,
            'diskon' => $request->diskon,
            'ongkir' => $request->ongkir,
            'total_bayar' => $total_bayar,
            'status' => $request->status,
        ]);

        // Simpan detail baru
        foreach ($request->items as $item) {
            $product = Product::find($item['produk_id']);

            $invoice->details()->create([
                'produk_id' => $item['produk_id'],
                'kuantitas' => $item['kuantitas'],
                'harga' => $product->price,
                'total_harga' => $item['kuantitas'] * $product->price,
            ]);
        }

        return redirect()->route('invoices.index')->with('success', 'Invoice berhasil diperbarui!');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->details()->delete();
        $invoice->delete();
        return redirect()->route('invoices.index')->with('success', 'Invoice berhasil dihapus!');
    }
}
