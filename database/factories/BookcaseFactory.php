<?php

namespace Database\Factories;

use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Bookcase>
 */
class BookcaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Bookcase::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->uuid(),
            'bookcase_name' => $this->faker->randomNumber(1, false),
            'zone_id' => Zone::inRandomOrder()->value('id') ?? Zone::factory()->create()->id,
            'floor_id' => Floor::inRandomOrder()->value('id') ?? Floor::factory()->create()->id,
        ];
    }
}
