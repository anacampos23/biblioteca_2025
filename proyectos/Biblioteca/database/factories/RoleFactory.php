<?php

namespace Database\Factories;

use Domain\Roles\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    protected $model = Role::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'display_name' => $this->faker->name,
            'description' => $this->faker->name,
            'guard_name' => 'web',
        ];
    }

    /**
     * Use function for create a system role.
     */
    public function system(): self
    {
        return $this->state(fn () => ['system' => true]);
    }
}
