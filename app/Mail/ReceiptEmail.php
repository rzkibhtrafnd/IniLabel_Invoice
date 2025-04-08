<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Receipts;
use App\Models\Setting;

class ReceiptEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $receipt;
    public $pdfContent;
    public $setting;

    /**
     * Create a new message instance.
     *
     * @param Receipts $receipt
     * @param string $pdfContent
     * @param Setting $setting
     */
    public function __construct(Receipts $receipt, $pdfContent, Setting $setting)
    {
        $this->receipt = $receipt;
        $this->pdfContent = $pdfContent;
        $this->setting = $setting;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Receipt #' . $this->receipt->id)
                    ->view('emails.receipts')
                    ->attachData($this->pdfContent, "Receipt_{$this->receipt->id}.pdf", [
                        'mime' => 'application/pdf',
                    ])
                    ->with([
                        'receipt' => $this->receipt,
                        'setting' => $this->setting,
                    ]);
    }
}