<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receipts;
use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the receipts.
     */
    public function index()
    {
        $receipts = Receipts::with(['invoice', 'user'])
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
        $invoices = Invoice::all(['id', 'total_bayar']);

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
            'metode_pembayaran' => 'required|in:Tunai,Transfer,Virtual Account',
            'status'            => 'required|in:Dibayar Sebagian,Lunas',
            'jumlah_bayar'      => 'required|numeric|min:0',
            'tanggal_bayar'     => 'required|date',
            'bukti_pembayaran'  => 'required|image',
        ]);

        $data = $request->only([
            'invoice_id',
            'metode_pembayaran',
            'status',
            'jumlah_bayar',
            'tanggal_bayar'
        ]);

        $data['user_id'] = Auth::id();

        if ($request->hasFile('bukti_pembayaran')) {
            $data['bukti_pembayaran'] = $request->file('bukti_pembayaran')->store('bukti_pembayaran');
        }

        $receipt = Receipts::create($data);

        return redirect()
            ->route('receipts.show', $receipt->id)
            ->with('success', 'Receipt berhasil dibuat!');
    }

    /**S
     * Display the specified receipt.
     */
    public function show(Receipts $receipt)
    {
        $receipt->load(['invoice', 'user']);
    
        if ($receipt->bukti_pembayaran) {
            $receipt->bukti_pembayaran = Storage::url('bukti_pembayaran/' . $receipt->bukti_pembayaran);
        }
    
        return Inertia::render('Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }

    /**
     * Show the form for editing the specified receipt.
     */
    public function edit(Receipts $receipt)
    {
        $invoices = Invoice::all(['id', 'total_bayar']);

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
            'metode_pembayaran' => 'required|in:Tunai,Transfer,Virtual Account',
            'status'            => 'required|in:Dibayar Sebagian,Lunas',
            'jumlah_bayar'      => 'required|numeric|min:0',
            'tanggal_bayar'     => 'required|date',
            'bukti_pembayaran'  => 'nullable|image',
        ]);

        $data = $request->only([
            'invoice_id',
            'metode_pembayaran',
            'status',
            'jumlah_bayar',
            'tanggal_bayar'
        ]);

        if ($request->hasFile('bukti_pembayaran')) {
            if ($receipt->bukti_pembayaran) {
                Storage::delete($receipt->bukti_pembayaran);
            }
            $data['bukti_pembayaran'] = $request->file('bukti_pembayaran')->store('bukti_pembayaran');
        }

        $receipt->update($data);

        return redirect()
            ->route('receipts.show', $receipt->id)
            ->with('success', 'Receipt berhasil diperbarui!');
    }

    /**
     * Remove the specified receipt from storage.
     */
    public function destroy(Receipts $receipt)
    {
        if ($receipt->bukti_pembayaran) {
            Storage::delete($receipt->bukti_pembayaran);
        }

        $receipt->delete();

        return redirect()
            ->route('receipts.index')
            ->with('success', 'Receipt berhasil dihapus!');
    }

    /**
     * Download the receipt as a PDF.
     */
    public function downloadReceipt(Receipts $receipt)
    {
        $receipt->load(['invoice', 'user']);
        $imagePath = public_path('assets/logo.png');
        if (file_exists($imagePath)) {
            $imageData = base64_encode(file_get_contents($imagePath));
            $imageSrc = 'data:image/png;base64,' . $imageData;
        } else {
            $imageSrc = null;
        }

        $pdf = Pdf::loadView('receipts.pdf', compact('receipt', 'imageSrc'))
            ->setPaper('A4', 'portrait')
            ->setOptions([
                'margin-left'   => 0,
                'margin-right'  => 0,
                'margin-top'    => 0,
                'margin-bottom' => 0,
            ]);

        return $pdf->download("Receipt_{$receipt->id}.pdf");
    }
}
