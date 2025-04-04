<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Domain\Genres\Models\Genre;

class GenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genres = [
            'Poetry', 'Theater', 'Essay', 'Short Story', 'Classics',
            'Historical Novel', 'Crime Novel', 'Science Fiction Novel', 'Romantic Novel',
            'Mathematics', 'Physics', 'Biology', 'Computer Science',
            'Philosophy', 'Psychology', 'Sociology', 'History', 'Politics',
            'Painting', 'Photography', 'Architecture', 'Music', 'Cinema',
            'Health and Wellness', 'Nutrition', 'Sport', 'Travel',
            'Children\'s Stories', 'Illustrated Books', 'Educational Books',
            'Young Adult Novel', 'Young Adult Fantasy', 'Young Adult Thriller'
        ];


        foreach ($genres as $genre) {
            Genre::create(['genre_name' => $genre]);
        }
    }
}
