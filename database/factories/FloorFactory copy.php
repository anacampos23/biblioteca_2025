<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Floor\Models\Floor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Floor\Models\Floor>
 */
class FloorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Floor::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(), // Usando $this->faker
        ];
    }
}
