<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Floors\Models\Floor;

class FloorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Floor::create([
            'name' => 'Floor 1',
            'capacity_zones' => 5,
        ]);
        Floor::create([
            'name' => 'Floor 2',
            'capacity_zones' => 2,
        ]);
        Floor::create([
            'name' => 'Floor 3',
            'capacity_zones' => 4,
        ]); Floor::create([
            'name' => 'Floor 4',
            'capacity_zones' => 6,
        ]);

    }
}
