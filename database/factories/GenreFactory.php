<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Genres\Models\Genre;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Floor\Models\Floor>
 */
class GenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Genre::class;

    public function definition(): array
    {
        return [
           //
        ];
    }
}
