<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Zones\Models\Zone;

class ZoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Zone::create([
            'name' => 'Top Ventas',
            'description' => 'Los libros más vendidos',
        ]);
        Zone::create([
            'name' => 'Literatura',
            'description' => 'Poesía, Teatro, Cuentos, Clásica, ... ',
        ]);
        Zone::create([
            'name' => 'Novela',
            'description' => 'Terror, Romántica, Ciencia Ficción, Negra, ... ',
        ]);
        Zone::create([
            'name' => 'Ciencias y tecnología',
            'description' => 'Biología, Matemáticas, Informática, Medicina, ...',
        ]); 
        Zone::create([
            'name' => 'Humanidades',
            'description' => 'Psicología, Derecho, Economía, Filosofía, ...',
        ]);
        Zone::create([
            'name' => 'Arte',
            'description' => 'Cine, Diseño, Moda, Fotografía, ...',
        ]);
        Zone::create([
            'name' => 'Estilo de vida',
            'description' => 'Cocina, Viajes, Deportes, Manualidades, ...',
        ]);
        Zone::create([
            'name' => 'Infantil',
            'description' => 'De 0 a 2 años, De 3 a 5 años, De 6 a 8 años, De 9 a 12 años, ...',
        ]);
        Zone::create([
            'name' => 'Juvenil',
            'description' => 'Romántica, Fantasía, LGTBI, Terror, ...',
        ]);
    }
}
