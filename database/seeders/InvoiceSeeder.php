<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Invoice;
use App\Models\DetailInvoice;
use App\Models\Customer;
use App\Models\User;
use App\Models\Product;
use App\Models\Setting;
use Carbon\Carbon;

class InvoiceSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $customers = Customer::all();
        $products = Product::all();
        $setting = Setting::first();
        $taxPercentage = $setting ? $setting->tax : 0;

        $userCount = $users->count();
        $customerCount = $customers->count();
        $productCount = $products->count();

        for ($i = 0; $i < 1200; $i++) {
            $user = $users[$i % $userCount];
            $customer = $customers[$i % $customerCount];
            $product = $products[$i % $productCount];

            $randomMonth = ($i % 12) + 1;
            $daysInMonth = Carbon::create(now()->year, $randomMonth, 1)->daysInMonth;
            $randomDay = ($i % $daysInMonth) + 1;
            $randomCreatedAt = Carbon::create(now()->year, $randomMonth, $randomDay, ($i % 24), ($i % 60), ($i % 60));
            
            $jatuhTempo = $randomCreatedAt->copy()->addDays(($i % 26) + 5);

            $diskon = ($i % 500000) + 10000;
            $ongkir = ($i % 100000) + 5000;
            $totalHarga = $product->price;
            $tax = ($totalHarga - $diskon) * ($taxPercentage / 100);
            $totalBayar = $totalHarga - $diskon + $ongkir + $tax;

            $statusOptions = ['Draft', 'Dibayar sebagian', 'Lunas'];
            $status = $statusOptions[$i % count($statusOptions)];

            $totalDibayar = $status === 'Lunas' ? $totalBayar : ($i % ((int)$totalBayar + 1));

            $invoice = Invoice::create([
                'customer_id'   => $customer->id,
                'user_id'       => $user->id,
                'jatuh_tempo'   => $jatuhTempo,
                'total_harga'   => $totalHarga,
                'diskon'        => $diskon,
                'ongkir'        => $ongkir,
                'tax'           => $tax,
                'total_bayar'   => $totalBayar,
                'total_dibayar' => $totalDibayar,
                'status'        => $status,
                'created_at'    => $randomCreatedAt,
                'updated_at'    => $randomCreatedAt,
            ]);

            $kuantitas = ($i % 5) + 1;
            DetailInvoice::create([
                'invoice_id'  => $invoice->id,
                'produk_id'   => $product->id,
                'kuantitas'   => $kuantitas,
                'harga'       => $product->price,
                'total_harga' => $product->price * $kuantitas,
                'created_at'  => $randomCreatedAt,
                'updated_at'  => $randomCreatedAt,
            ]);
        }
    }
}
