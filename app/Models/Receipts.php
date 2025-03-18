<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipts extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'user_id',
        'metode_pembayaran',
        'status',
        'jumlah_bayar',
        'tanggal_bayar',
        'bukti_pembayaran',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
