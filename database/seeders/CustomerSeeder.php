<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CustomerSeeder extends Seeder
{
    public function run()
    {
        $customers = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'phone' => '081234567890',
                'address' => 'Jl. Contoh No. 123, Jakarta',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'phone' => '082345678901',
                'address' => 'Jl. Contoh No. 456, Bandung',
            ],
            [
                'name' => 'Alice Johnson',
                'email' => 'alice.johnson@example.com',
                'phone' => '083456789012',
                'address' => 'Jl. Contoh No. 789, Surabaya',
            ],
            [
                'name' => 'Bob Brown',
                'email' => 'bob.brown@example.com',
                'phone' => '084567890123',
                'address' => 'Jl. Contoh No. 321, Yogyakarta',
            ],
            [
                'name' => 'Charlie Davis',
                'email' => 'charlie.davis@example.com',
                'phone' => '085678901234',
                'address' => 'Jl. Contoh No. 654, Semarang',
            ],
        ];

        // Insert data ke tabel customers
        DB::table('customers')->insert($customers);
    }
}
