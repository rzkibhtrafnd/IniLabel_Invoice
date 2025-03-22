<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Receipts;

class ReceiptEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $receipt;
    public $pdfContent;

    /**
     * Create a new message instance.
     */
    public function __construct(Receipts $receipt, $pdfContent)
    {
        $this->receipt = $receipt;
        $this->pdfContent = $pdfContent;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Receipt #' . $this->receipt->id)
                    ->view('emails.receipts')
                    ->attachData($this->pdfContent, "Receipt_{$this->receipt->id}.pdf", [
                        'mime' => 'application/pdf',
                    ])
                    ->with([
                        'receipt' => $this->receipt
                    ]);
    }
}
