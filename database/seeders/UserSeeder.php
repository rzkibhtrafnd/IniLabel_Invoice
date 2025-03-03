<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
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

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
