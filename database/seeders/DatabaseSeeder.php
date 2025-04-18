<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            FloorSeeder::class,
            ZoneSeeder::class,
            BookcaseSeeder::class,
            BookSeeder::class,
            GenreSeeder::class,
            LoanSeeder::class,
            ReserveSeeder::class,
        ]);

        //migrar pulse database

    }
}
