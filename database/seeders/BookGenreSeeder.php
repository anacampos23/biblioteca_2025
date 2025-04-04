<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Books\Models\Book;
use Domain\Genres\Models\Genre;

class BookGenreSeeder extends Seeder
{
    public function run(): void
    {
        // Géneros por zona
        $genresByCategory = [
            'Literature' => ['Poetry', 'Theater', 'Essay', 'Short Story', 'Classics'],
            'Novel' => ['Historical Novel', 'Crime Novel', 'Science Fiction Novel', 'Romantic Novel'],
            'Science and Technology' => ['Mathematics', 'Physics', 'Biology', 'Computer Science'],
            'Humanities' => ['Philosophy', 'Psychology', 'Sociology', 'History', 'Politics'],
            'Art' => ['Painting', 'Photography', 'Architecture', 'Music', 'Cinema'],
            'Lifestyle' => ['Health and Wellness', 'Nutrition', 'Sport', 'Travel'],
            'Children' => ['Children\'s Stories', 'Illustrated Books', 'Educational Books'],
            'Young Adult' => ['Young Adult Novel', 'Young Adult Fantasy', 'Young Adult Thriller']
        ];

        // Obtener todos los libros de la base de datos
        $books = Book::all();

        // Asignar géneros a los libros
        foreach ($books as $book) {
            // Obtener una categoría aleatoria del array
            $categories = array_keys($genresByCategory);
            $randomCategory = $categories[array_rand($categories)];

            // Obtener los géneros correspondientes a la categoría seleccionada
            $genres = $genresByCategory[$randomCategory];

            // Seleccionar entre 1 y 3 géneros aleatorios de esta categoría
            $selectedGenres = array_rand(array_flip($genres), rand(1, 3)); // Selección aleatoria de géneros

            // Si la selección es un solo género, lo convertimos en un array
            if (!is_array($selectedGenres)) {
                $selectedGenres = [$selectedGenres];
            }

            // Asignar géneros aleatorios al libro
            foreach ($selectedGenres as $genreName) {
                // Si el género no existe, lo creamos
                $genre = Genre::firstOrCreate(['genre_name' => $genreName]);

                // Asociar género con el libro (relación muchos a muchos)
                $book->genres()->attach($genre->id);
            }
        }
    }
}
