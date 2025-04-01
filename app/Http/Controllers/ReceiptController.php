<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipts;
use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use App\Mail\ReceiptEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\Setting;
use App\Mail\ReceiptNotificationEmail;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the receipts.
     */
    public function index()
    {
        $receipts = Receipts::with(['invoice', 'user'])
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(15);
    
        return Inertia::render('Receipts/Index', [
            'receipts' => $receipts,
        ]);
    }

    /**
     * Show the form for creating a new receipt.
     */
    public function create()
    {
        $invoices = Invoice::where('status', '!=', 'Dibatalkan')
        ->where('user_id', Auth::id())
        ->get(['id', 'total_bayar']);    
        return Inertia::render('Receipts/Create', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Store a newly created receipt in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'invoice_id'        => 'required|exists:invoices,id',
            'metode_pembayaran' => 'required|in:Tunai,Transfer',
            'jumlah_bayar'      => 'required|numeric|min:0',
            'tanggal_bayar'     => 'required|date',
            'bukti_pembayaran'  => $request->metode_pembayaran === 'Tunai' ? 'nullable' : 'required|image',
            'status'            => 'required|in:Dibayar Sebagian,Lunas',
        ]);

        $invoice = Invoice::findOrFail($request->invoice_id);
        if ($invoice->status === 'Dibatalkan') {
            return redirect()->back()->withErrors(['invoice_id' => 'Invoice telah dibatalkan!']);
        }

        $data = $request->only([
            'invoice_id', 'metode_pembayaran', 'jumlah_bayar', 'tanggal_bayar', 'status'
        ]);
        $data['user_id'] = Auth::id();
        
        if ($request->metode_pembayaran !== 'Tunai' && $request->hasFile('bukti_pembayaran')) {
            $data['bukti_pembayaran'] = $request->file('bukti_pembayaran')->store('bukti_pembayaran', 'public');
        } else {
            $data['bukti_pembayaran'] = null;
        }

        $receipt = Receipts::create($data);

        $invoice->total_dibayar += $receipt->jumlah_bayar;
        $invoice->status = $this->hitungStatusInvoice($invoice);
        $invoice->save();

        return redirect()->route('receipts.show', $receipt->id);
    }

    /**
     * Display the specified receipt.
     */
    public function show(Receipts $receipt)
    {
        $receipt->load(['invoice', 'user']);
        return Inertia::render('Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }

    /**
     * Show the form for editing the specified receipt.
     */
    public function edit(Receipts $receipt)
    {
        $invoices = Invoice::where('status', '!=', 'Dibatalkan')
        ->where('user_id', Auth::id())
        ->get(['id', 'total_bayar']); 
        return Inertia::render('Receipts/Edit', [
            'receipt'  => $receipt,
            'invoices' => $invoices,
        ]);
    }

    /**
     * Update the specified receipt in storage.
     */
    public function update(Request $request, Receipts $receipt)
    {
        $request->validate([
            'invoice_id'        => 'required|exists:invoices,id',
            'metode_pembayaran' => 'required|in:Tunai,Transfer',
            'jumlah_bayar'      => 'required|numeric|min:0',
            'tanggal_bayar'     => 'required|date',
            'bukti_pembayaran'  => $request->metode_pembayaran === 'Tunai' ? 'nullable' : 'nullable|image',
            'status'            => 'required|in:Dibayar Sebagian,Lunas',
        ]);
    
        $invoice = $receipt->invoice;
    
        if ($invoice->status === 'Dibatalkan') {
            return redirect()->back()->withErrors(['message' => 'Invoice telah dibatalkan!']);
        }
    
        $jumlahSebelumnya = $receipt->jumlah_bayar;
    
        $data = $request->only([
            'invoice_id',
            'metode_pembayaran',
            'jumlah_bayar',
            'tanggal_bayar',
            'status',
        ]);
    
        if ($request->hasFile('bukti_pembayaran')) {
            if ($receipt->bukti_pembayaran) {
                Storage::delete($receipt->bukti_pembayaran);
            }
            $data['bukti_pembayaran'] = $request->file('bukti_pembayaran')->store('bukti_pembayaran');
        }
    
        $receipt->update($data);
    
        // Update invoice
        $invoice->total_dibayar += ($receipt->jumlah_bayar - $jumlahSebelumnya);
        $invoice->status = $this->hitungStatusInvoice($invoice);
        $invoice->save();
    
        return redirect()->route('receipts.show', $receipt->id);
    }

    /**
     * Remove the specified receipt from storage.
     */
    public function destroy(Receipts $receipt)
    {
        $invoice = $receipt->invoice;

        if ($invoice->status === 'Dibatalkan') {
            return redirect()->back()->withErrors(['message' => 'Invoice telah dibatalkan!']);
        }

        // Update invoice
        $invoice->total_dibayar -= $receipt->jumlah_bayar;
        $invoice->status = $this->hitungStatusInvoice($invoice);
        $invoice->save();

        // Hapus receipt
        if ($receipt->bukti_pembayaran) {
            Storage::delete($receipt->bukti_pembayaran);
        }
        $receipt->delete();

        return redirect()->route('receipts.index');
    }

    /**
     * Calculate the status of the invoice.
     */
    private function hitungStatusInvoice(Invoice $invoice)
    {
        if ($invoice->total_dibayar <= 0) {
            return 'Draft';
        } elseif ($invoice->total_dibayar < $invoice->total_bayar) {
            return 'Dibayar sebagian';
        } else {
            return 'Lunas';
        }
    }

    /**
     * Download the receipt as a PDF.
     */
    public function downloadReceipt(Receipts $receipt)
    {
        $receipt->load(['invoice.customer', 'user']);
        $setting = Setting::first();

        $imagePath = public_path('assets/logo.png');
        $imageSrc  = file_exists($imagePath) ? 'data:image/png;base64,' . base64_encode(file_get_contents($imagePath)) : null;

        $pdf = Pdf::loadView('receipts.pdf', compact('receipt', 'imageSrc', 'setting'))
            ->setPaper('A4', 'portrait')
            ->setOptions([
                'margin-left'   => 0,
                'margin-right'  => 0,
                'margin-top'    => 0,
                'margin-bottom' => 0,
            ]);

        return $pdf->download("Receipt_{$receipt->id}.pdf");
    }

    /**
     * Send the receipt via email.
     */
    public function sendEmail(Receipts $receipt)
    {
        $receipt->load(['invoice.customer', 'user']);
        $setting = Setting::first();

        $imagePath = public_path('assets/logo.png');
        $imageSrc  = file_exists($imagePath) ? 'data:image/png;base64,' . base64_encode(file_get_contents($imagePath)) : null;

        $pdf = Pdf::loadView('receipts.pdf', compact('receipt', 'imageSrc', 'setting'))
            ->setPaper('A4', 'portrait')
            ->setOptions([
                'margin-left'   => 0,
                'margin-right'  => 0,
                'margin-top'    => 0,
                'margin-bottom' => 0,
            ]);

        $pdfContent = $pdf->output();

        $customerEmail = $receipt->invoice->customer->email ?? 'default@example.com';
        Mail::to($customerEmail)->send(new ReceiptEmail($receipt, $pdfContent));

        $kasirEmail = $receipt->user->email;
        Mail::to($kasirEmail)->send(new ReceiptNotificationEmail($receipt, $pdfContent, $setting));

        return redirect()->back()->with('message', 'Succes.Receipt telah dikirim ke ' . $customerEmail);
    }
}