<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Reserves\Models\Reserve;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Book>
 */
class ReserveFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Reserve::class;

    public function definition(): array
    {
        return [
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory()->create()->id,
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory()->create()->id,
        ];
    }

    /**
     * Calculate the number of overdue days based on end_reserve and whether the reserve is active.
     *
     * @param \DateTime $endReserve
     * @param bool $active
     * @return int
     */
    private function calculateDaysOverdue(\DateTime $endReserve, bool $active): int
    {
        $currentDate = new \DateTime();

        if ($endReserve < $currentDate) {
            if ($active) {
                // Préstamo vencido y aún activo → calcular retraso real
                return $endReserve->diff($currentDate)->days;
            } else {
                // Préstamo vencido pero ya no activo → simular retraso
                return random_int(0, 10);
            }
        }

        return 0; // Aún no ha vencido
    }
}
