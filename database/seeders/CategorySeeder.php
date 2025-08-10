<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultCategories = [
            ['name' => 'Makanan & Minuman'],
            ['name' => 'Transportasi'],
            ['name' => 'Tagihan'],
            ['name' => 'Belanja'],
            ['name' => 'Hiburan'],
            ['name' => 'Kesehatan'],
        ];

        // Masukkan ke database dengan user_id = null
        foreach ($defaultCategories as $category) {
            Category::create($category);
        }
    }
}
