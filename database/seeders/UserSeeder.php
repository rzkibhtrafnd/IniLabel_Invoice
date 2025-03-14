<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $users = [
            [
                'id' => Str::uuid(),
                'username' => 'Ryan',
                'email' => 'ryan@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'notelepon' => '081234567890',
                'alamat' => 'Jl. Merdeka No. 1, Jakarta',
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Fajar',
                'email' => 'fajar@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'notelepon' => '081298765432',
                'alamat' => 'Jl. Sudirman No. 5, Bandung',
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Rizki',
                'email' => 'rizki@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'notelepon' => '081356789012',
                'alamat' => 'Jl. Diponegoro No. 7, Surabaya',
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Imersa',
                'email' => 'imersa@example.com',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
                'notelepon' => '081678901234',
                'alamat' => 'Jl. Gatot Subroto No. 3, Yogyakarta',
            ],
        ];

        for ($i = 0; $i < 10; $i++) {
            $users[] = [
                'id' => Str::uuid(),
                'username' => $faker->userName,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'),
                'role' => 'user',
                'notelepon' => $faker->phoneNumber,
                'alamat' => $faker->address,
            ];
        }

        User::insert($users);
    }

}
