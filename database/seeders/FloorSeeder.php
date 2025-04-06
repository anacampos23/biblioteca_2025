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
            'floor_number' => '1',
            'capacity_zones' => 5,
        ]);
        Floor::create([
            'floor_number' => '2',
            'capacity_zones' => 5,
        ]);
        Floor::create([
            'floor_number' => '3',
            'capacity_zones' => 4,
        ]); Floor::create([
            'floor_number' => '4',
            'capacity_zones' => 6,
        ]);Floor::create([
            'floor_number' => '5',
            'capacity_zones' => 7
        ]);Floor::create([
            'floor_number' => '6',
            'capacity_zones' => 4,
        ]);


    }
}
