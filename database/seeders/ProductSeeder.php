<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Kemeja Pria Slim Fit',
                'description' => 'Kemeja lengan panjang bahan katun, cocok untuk acara formal dan santai',
                'price' => 150000,
                'stock' => 50,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Celana Jeans',
                'description' => 'Celana jeans dengan potongan ramping, nyaman dipakai sehari-hari',
                'price' => 200000,
                'stock' => 40,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Sepatu Sneakers',
                'description' => 'Sepatu sneakers modern dengan desain stylish, cocok untuk jalan-jalan',
                'price' => 350000,
                'stock' => 30,
                'unit' => 'pasang',
            ],
            [
                'name' => 'Tas Ransel',
                'description' => 'Tas ransel dengan banyak kantong dan desain ergonomis, ideal untuk travelling',
                'price' => 250000,
                'stock' => 25,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Buku Novel',
                'description' => 'Novel fiksi dengan cerita yang menarik dan mendalam',
                'price' => 75000,
                'stock' => 100,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Meja Makan Kayu Jati',
                'description' => 'Meja makan dengan desain klasik dan bahan kayu jati asli',
                'price' => 3000000,
                'stock' => 5,
                'unit' => 'set',
            ],
            [
                'name' => 'Kursi Taman',
                'description' => 'Kursi taman terbuat dari bahan rotan sintetis yang tahan cuaca',
                'price' => 500000,
                'stock' => 10,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Lampu Meja',
                'description' => 'Lampu meja dengan desain minimalis dan hemat energi',
                'price' => 200000,
                'stock' => 15,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Payung Lipat',
                'description' => 'Payung lipat dengan desain trendi dan tahan angin',
                'price' => 100000,
                'stock' => 20,
                'unit' => 'pcs',
            ],
            [
                'name' => 'Jam Dinding',
                'description' => 'Jam dinding modern dengan tampilan digital',
                'price' => 150000,
                'stock' => 12,
                'unit' => 'pcs',
            ],
        ];

        DB::table('products')->insert($products);
    }
}
