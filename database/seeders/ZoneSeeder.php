<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;


class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zoneNames = [
            'Literature', 'Novel', 'Science and Technology', 'Humanities', 'Art', 'Lifestyle', 'Children', 'Young Adult'
        ];

        $floors = Floor::all();
        $floorCount = $floors->count();
        $zoneCount = count($zoneNames);

        foreach ($zoneNames as $index => $name) {
            $floor = $floors[$index % $floorCount]; // Se asignan de forma cíclica
            Zone::create([
                'name' => $name,
                'floor_id' => $floor->id,
            ]);
        }
    }
}
