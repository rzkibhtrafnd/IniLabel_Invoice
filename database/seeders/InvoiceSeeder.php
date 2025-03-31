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

        for ($i = 0; $i < 1200; $i++) {
            $user = $users->random();
            $customer = $customers->random();
            $product = $products->random();

            $randomMonth = rand(1, 12);
            $randomDay = rand(1, Carbon::create(now()->year, $randomMonth, 1)->daysInMonth);
            $randomCreatedAt = Carbon::create(now()->year, $randomMonth, $randomDay, rand(0, 23), rand(0, 59), rand(0, 59));
            
            $jatuhTempo = $randomCreatedAt->copy()->addDays(rand(5, 30));
            $isOverdue = $jatuhTempo->lt(Carbon::now());

            $diskon = rand(10000, 500000);
            $ongkir = rand(5000, 100000);
            $totalHarga = $product->price;
            $tax = ($totalHarga - $diskon) * ($taxPercentage / 100);
            $totalBayar = $totalHarga - $diskon + $ongkir + $tax;

            $statusOptions = ['Draft', 'Dibayar sebagian', 'Lunas'];
            $status = $statusOptions[rand(0, 2)];

            $totalDibayar = $status === 'Lunas' ? $totalBayar : rand(0, $totalBayar);

            $invoice = Invoice::create([
                'customer_id' => $customer->id,
                'user_id' => $user->id,
                'jatuh_tempo' => $jatuhTempo,
                'total_harga' => $totalHarga,
                'diskon' => $diskon,
                'ongkir' => $ongkir,
                'tax' => $tax,
                'total_bayar' => $totalBayar,
                'total_dibayar' => $totalDibayar,
                'status' => $status,
                'created_at' => $randomCreatedAt,
                'updated_at' => $randomCreatedAt,
            ]);

            DetailInvoice::create([
                'invoice_id' => $invoice->id,
                'produk_id' => $product->id,
                'kuantitas' => rand(1, 5),
                'harga' => $product->price,
                'total_harga' => $product->price * rand(1, 5),
                'created_at' => $randomCreatedAt,
                'updated_at' => $randomCreatedAt,
            ]);
        }
    }
}