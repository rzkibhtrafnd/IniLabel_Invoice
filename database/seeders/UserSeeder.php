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
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Fajar',
                'email' => 'fajar@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Rizki',
                'email' => 'rizki@example.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'id' => Str::uuid(),
                'username' => 'Imersa',
                'email' => 'imersa@example.com',
                'password' => Hash::make('password'),
                'role' => 'superadmin',
            ],
        ];

        for ($i = 0; $i < 10; $i++) {
            $users[] = [
                'id' => Str::uuid(),
                'username' => $faker->userName,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'),
                'role' => 'user',
            ];
        }

        User::insert($users);
    }
}
