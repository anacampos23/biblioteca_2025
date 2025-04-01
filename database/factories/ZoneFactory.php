<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Zone>
 */
class ZoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Zone::class;

    public function definition(): array
    {
        $zoneNames = ['Literatura', 'Novela', 'Ciencias y tecnología', 'Humanidades', 'Arte', 'Estilo de vida', 'Infantil', 'Juvenil'];

        return [
            'id' => $this->faker->uuid(),
            'name' => $this->faker->randomElement($zoneNames),
            'floor_id' => Floor::inRandomOrder()->value('id') ?? Floor::factory()->create()->id,
        ];
    }
}
