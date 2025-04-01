<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Floors\Models\Floor;

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
            //
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Floor $floor) {
            // Asociar 3 zonas aleatorias
            $zones = \Domain\Zone\Models\Zone::inRandomOrder()->take(3)->pluck('id');
            $floor->zones()->attach($zones); // Usando el método attach
        });
    }
}
