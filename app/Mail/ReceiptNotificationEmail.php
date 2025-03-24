<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Receipts;
use App\Models\Setting;

class ReceiptNotificationEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $receipt;
    public $pdfContent;
    public $setting;

    public function __construct(Receipts $receipt, $pdfContent, Setting $setting)
    {
        $this->receipt = $receipt;
        $this->pdfContent = $pdfContent;
        $this->setting = $setting;
    }

    public function build()
    {
        return $this->subject('Notifikasi Pembayaran #' . $this->receipt->id)
            ->view('emails.receipt_notification')
            ->attachData($this->pdfContent, "Receipt_{$this->receipt->id}.pdf", [
                'mime' => 'application/pdf',
            ])
            ->with([
                'setting' => $this->setting,
                'receipt' => $this->receipt,
            ]);
    }
}