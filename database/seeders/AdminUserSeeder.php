<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; 
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\DB;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {
            // Buat atau cari user admin
            $admin = User::firstOrCreate(
                ['username' => 'adminganteng'],
                [
                    'name' => 'Administrator',
                    'password' => Hash::make('2wsx1qaz'),
                    'role' => 'admin',
                    'has_set_initial_balance' => true,
                ]
            );

            // Buat data akun untuk admin jika belum ada
            if ($admin->accounts()->count() === 0) {
                $admin->accounts()->create([
                    'money' => 0, 
                ]);
            }
        });

    }
}