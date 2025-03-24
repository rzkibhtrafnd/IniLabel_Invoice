<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Invoice;
use App\Models\Setting;

class InvoiceNotificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $invoice;
    public $pdfContent;
    public $setting;

    /**
     * Buat instance baru.
     *
     * @param Invoice $invoice
     * @param string  $pdfContent
     * @param Setting $setting
     */
    public function __construct(Invoice $invoice, $pdfContent, Setting $setting)
    {
        $this->invoice = $invoice;
        $this->pdfContent = $pdfContent;
        $this->setting = $setting;
    }

    /**
     * Bangun pesan email.
     *
     * @return $this
     */
    public function build()
    {
        // Subject dan view berbeda untuk notifikasi ke user
        return $this->subject('Notifikasi Invoice #' . $this->invoice->id)
                    ->view('emails.invoice_notification')
                    ->attachData($this->pdfContent, "Invoice_{$this->invoice->id}.pdf", [
                        'mime' => 'application/pdf',
                    ])
                    ->with([
                        'setting' => $this->setting,
                        'invoice' => $this->invoice,
                    ]);
    }
}
