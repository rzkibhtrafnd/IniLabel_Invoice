<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'logo',
        'banks',
        'qris',
        'contact_service',
        'slogan',
        'tax',
    ];

    protected $casts = [
        'banks' => 'array',
    ];
}
