<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Invoice;

class InvoiceEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $invoice;
    public $pdfContent;

    /**
     * Buat instance baru.
     *
     * @param Invoice $invoice
     * @param string  $pdfContent
     */
    public function __construct(Invoice $invoice, $pdfContent)
    {
        $this->invoice = $invoice;
        $this->pdfContent = $pdfContent;
    }

    /**
     * Bangun pesan email.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Invoice #' . $this->invoice->id)
                    ->view('emails.invoice')
                    ->attachData($this->pdfContent, "Invoice_{$this->invoice->id}.pdf", [
                        'mime' => 'application/pdf',
                    ]);
    }
}
