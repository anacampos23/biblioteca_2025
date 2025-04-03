<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Book::class;

    public function definition(): array
    {
        $genresByZone = [
            'Literatura' => [
                'Poesía', 'Teatro', 'Ensayo', 'Cuento', 'Clásicos', 'Ficción contemporánea'
            ],
            'Novela' => [
                'Novela histórica', 'Novela negra', 'Novela de aventuras', 'Novela romántica',
                'Novela de ciencia ficción', 'Novela fantástica', 'Novela policíaca', 'Novela gótica'
            ],
            'Ciencias y tecnología' => [
                'Divulgación científica', 'Matemáticas', 'Física', 'Química', 'Biología',
                'Astronomía', 'Ingeniería', 'Informática', 'Medicina'
            ],
            'Humanidades' => [
                'Filosofía', 'Psicología', 'Sociología', 'Historia', 'Antropología', 'Política',
                'Religión', 'Derecho', 'Economía'
            ],
            'Arte' => [
                'Pintura', 'Escultura', 'Fotografía', 'Arquitectura', 'Música', 'Cine', 'Diseño gráfico',
                'Moda'
            ],
            'Estilo de vida' => [
                'Autoayuda', 'Salud y bienestar', 'Nutrición', 'Deporte', 'Viajes',
                'Gastronomía', 'Hogar y jardinería', 'Manualidades'
            ],
            'Infantil' => [
                'Cuentos infantiles', 'Fábulas', 'Libros ilustrados', 'Libros educativos',
                'Primeros lectores'
            ],
            'Juvenil' => [
                'Novela juvenil', 'Fantasía juvenil', 'Ciencia ficción juvenil',
                'Thriller juvenil', 'Romance juvenil', 'Misterio juvenil'
            ]
        ];

        // Selecciona una zona al azar
        $zone = Zone::inRandomOrder()->first() ?? Zone::factory()->create();

        // Asegura que la zona tiene un género asociado
        $zoneName = $zone->name;
        $genres = $genresByZone[$zoneName] ?? ['Desconocido'];
        $genre = $this->faker->randomElement($genres);

        return [
            'title' => $this->faker->sentence(6),
            'author' => fake()->name(),
            'genre' => $genre,
            'ISBN' => $this->faker->randomNumber(13, false),
            'editorial' => $this->faker->sentence(2),
            'quantity' => $this->faker->randomNumber(1, false),
            'status' => $this->faker->randomElement(['disponible', 'no disponible']),
            'bookcase_id' => Bookcase::inRandomOrder()->value('id') ?? Bookcase::factory()->create()->id,
            'zone_id' => Zone::inRandomOrder()->value('id') ?? Zone::factory()->create()->id,
            'floor_id' => Floor::inRandomOrder()->value('id') ?? Floor::factory()->create()->id,
        ];
    }
}
