<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Zones\Models\Zone;

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
        return [
            //
        ];
    }
}
