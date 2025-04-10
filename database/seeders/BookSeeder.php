<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Books\Models\Book;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $uniqueBooks = Book::factory(15)->create(); // 15 libros únicos

        // Para cada libro único, creamos de 1 a 3 copias más
        $uniqueBooks->each(function ($book) {
            $copies = rand(1, 3); // Número de copias adicionales
            for ($i = 0; $i < $copies; $i++) {
                Book::factory()->create([
                    'title' => $book->title,
                    'author' => $book->author,
                    'genre' => $book->genre,
                    'ISBN' => $book->ISBN,
                    'editorial' => $book->editorial,
                    'available' => $book->available,
                    'bookcase_id' => $book->bookcase_id,
                    'zone_id' => $book->zone_id,
                    'floor_id' => $book->floor_id,
                ]);

            }
        });
    }
}
