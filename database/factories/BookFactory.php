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

          // Seleccionamos un floor_id aleatorio
        $bookcase = Bookcase::inRandomOrder()->first();

          // Buscamos las zonas que pertenecen a esta estantería
        $zone = Zone::where('id', $bookcase->zone_id)->inRandomOrder()->first();

        // Buscamos las zonas que pertenecen a este floor_id
        $floor = Floor::where('id', $bookcase->floor_id)->inRandomOrder()->first();

        $genresByZone = [
            'Literature' => ['Poetry', 'Theater', 'Essay', 'Short Story', 'Classics'],
            'Novel' => ['Historical Novel', 'Crime Novel', 'Science Fiction Novel', 'Romantic Novel'],
            'Science and Technology' => ['Mathematics', 'Physics', 'Biology', 'Computer Science'],
            'Humanities' => ['Philosophy', 'Psychology', 'Sociology', 'History', 'Politics'],
            'Art' => ['Painting', 'Photography', 'Architecture', 'Music', 'Cinema'],
            'Lifestyle' => ['Health and Wellness', 'Nutrition', 'Sport', 'Travel'],
            'Children' => ['Children\'s Stories', 'Illustrated Books', 'Educational Books'],
            'Young Adult' => ['Young Adult Novel', 'Young Adult Fantasy', 'Young Adult Thriller']
        ];

        // Asegura que la zona tiene un género asociado
        $zoneName = $zone->name;
        $genres = $genresByZone[$zoneName] ?? ['Desconocido'];
        $selected_genres = $this->faker->randomElements($genres, min(count($genres), rand(1, 3)));


        return [
            'title' => $this->faker->sentence(6),
            'author' => fake()->name(),
            'genre' => json_encode($selected_genres),
            'ISBN' => $this->faker->numerify('#############'),
            'editorial' => $this->faker->sentence(2),
            'available' => true,
            'reserved' => false,
            'bookcase_id' =>$bookcase->id,
            'zone_id' => $zone->id,
            'floor_id' => $floor->id,
        ];
    }
}
