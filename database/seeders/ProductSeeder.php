<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Laptop ASUS ROG',
                'description' => 'Laptop gaming dengan performa tinggi',
                'price' => 15000000,
                'stock' => 10,
            ],
            [
                'name' => 'Smartphone Samsung S21',
                'description' => 'Smartphone flagship dengan kamera canggih',
                'price' => 12000000,
                'stock' => 15,
            ],
            [
                'name' => 'TV LED 55 Inch',
                'description' => 'TV LED dengan resolusi 4K',
                'price' => 8000000,
                'stock' => 8,
            ],
            [
                'name' => 'Kulkas 2 Pintu',
                'description' => 'Kulkas hemat energi dengan kapasitas besar',
                'price' => 7000000,
                'stock' => 12,
            ],
            [
                'name' => 'Mesin Cuci Front Load',
                'description' => 'Mesin cuci dengan teknologi inverter',
                'price' => 6000000,
                'stock' => 7,
            ],
            [
                'name' => 'AC 1 PK',
                'description' => 'AC hemat listrik dengan fitur inverter',
                'price' => 4500000,
                'stock' => 9,
            ],
            [
                'name' => 'Blender Philips',
                'description' => 'Blender dengan kecepatan tinggi',
                'price' => 500000,
                'stock' => 20,
            ],
            [
                'name' => 'Rice Cooker Miyako',
                'description' => 'Rice cooker dengan kapasitas 1.8L',
                'price' => 300000,
                'stock' => 25,
            ],
            [
                'name' => 'Kamera DSLR Canon',
                'description' => 'Kamera DSLR dengan lensa kit 18-55mm',
                'price' => 9000000,
                'stock' => 5,
            ],
            [
                'name' => 'Headphone Sony',
                'description' => 'Headphone nirkabel dengan noise cancellation',
                'price' => 2500000,
                'stock' => 18,
            ],
            [
                'name' => 'Mouse Gaming Logitech',
                'description' => 'Mouse gaming dengan DPI tinggi',
                'price' => 800000,
                'stock' => 30,
            ],
            [
                'name' => 'Keyboard Mechanical',
                'description' => 'Keyboard mechanical dengan RGB lighting',
                'price' => 1200000,
                'stock' => 22,
            ],
            [
                'name' => 'Printer Epson L3150',
                'description' => 'Printer all-in-one dengan sistem tangki tinta',
                'price' => 3000000,
                'stock' => 10,
            ],
            [
                'name' => 'Monitor 24 Inch',
                'description' => 'Monitor Full HD dengan refresh rate 75Hz',
                'price' => 2000000,
                'stock' => 14,
            ],
            [
                'name' => 'Powerbank 20000mAh',
                'description' => 'Powerbank dengan fast charging',
                'price' => 300000,
                'stock' => 40,
            ],
            [
                'name' => 'Speaker JBL',
                'description' => 'Speaker portable dengan bass kuat',
                'price' => 1500000,
                'stock' => 12,
            ],
            [
                'name' => 'Drone DJI Mavic',
                'description' => 'Drone dengan kamera 4K',
                'price' => 12000000,
                'stock' => 3,
            ],
            [
                'name' => 'Smartwatch Garmin',
                'description' => 'Smartwatch dengan GPS dan heart rate monitor',
                'price' => 3500000,
                'stock' => 8,
            ],
            [
                'name' => 'Projector Epson',
                'description' => 'Projector dengan resolusi HD',
                'price' => 5000000,
                'stock' => 6,
            ],
            [
                'name' => 'Vacuum Cleaner Xiaomi',
                'description' => 'Vacuum cleaner nirkabel dengan daya hisap kuat',
                'price' => 2000000,
                'stock' => 10,
            ],
        ];

        // Gunakan DB::table untuk insert data
        DB::table('products')->insert($products);
    }
}
