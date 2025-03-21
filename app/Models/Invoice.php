<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'user_id',
        'jatuh_tempo',
        'total_harga',
        'diskon',
        'ongkir',
        'tax',
        'total_bayar',
        'status',
    ];

    protected $appends = ['status_terhitung'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function details()
    {
        return $this->hasMany(DetailInvoice::class);
    }

    public function getStatusTerhitungAttribute()
    {
        if (in_array($this->status, ['Draft', 'Dibayar sebagian']) && Carbon::now()->greaterThan($this->jatuh_tempo)) {
            return 'Jatuh Tempo';
        }
        return $this->status;
    }

    public function receipts()
    {
        return $this->hasMany(Receipts::class);
    }
}
