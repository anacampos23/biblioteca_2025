<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Domain\Loans\Models\Loan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Book>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Loan::class;

    public function definition(): array
    {
        $startLoan = $this->faker->dateTimeBetween('2024-09-01', 'now');
        $due_date = (clone $startLoan)->modify('+1 month');

        // $active = $this->faker->boolean();

        $random = $this->faker->randomFloat(2, 0, 1);

        if ($random < 0.70) {
            // Caso 1: Devuelto
            $wasLate = $this->faker->boolean(30); // 30% de retraso
            if ($wasLate) {
                $minEnd = (clone $due_date)->modify('+1 day');
                $maxEnd = (clone $due_date)->modify('+10 days');
                $today = new \DateTime();

                // El máximo permitido es hoy si hoy es antes del rango superior
                if ($maxEnd > $today) {
                    $maxEnd = $today;
                }

                // Solo generamos una fecha si el rango es válido
                if ($minEnd <= $maxEnd) {
                    $endLoan = $this->faker->dateTimeBetween($minEnd, $maxEnd);
                } else {
                    // No se puede devolver aún con retraso, así que devolverlo sin retraso
                    $endLoan = $this->faker->dateTimeBetween($startLoan, $due_date);
                }
            } else {
                $endLoan = $this->faker->dateTimeBetween($startLoan, $due_date);
            }
            $active = false;
        } elseif ($random < 0.85) {
            // ⏳ Caso 2: En curso y dentro del plazo
            $endLoan = null;
            $active = true;
        } else {
            // Caso 3: En curso y vencido
            $endLoan = null;
            $active = true;

            // Aseguramos que la fecha de vencimiento ya haya pasado
            $startLoan = $this->faker->dateTimeBetween('2024-01-01', '-1 month');
            $due_date = (clone $startLoan)->modify('+1 month');
        }


        return [
            'start_loan' => $startLoan->format('Y-m-d'),
            'due_date' => $due_date->format('Y-m-d'),
            'end_loan' => $endLoan ? $endLoan->format('Y-m-d') : null,
            // 'days_overdue' => $this->calculateDaysOverdue($endLoan, $active),
            'active' => $active,
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory()->create()->id,
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory()->create()->id,
        ];
    }

    // /**
    //  * Calculate the number of overdue days based on end_loan and whether the loan is active.
    //  *
    //  * @param \DateTime $endLoan
    //  * @param bool $active
    //  * @return int
    //  */
    // private function calculateDaysOverdue(\DateTime $endLoan, bool $active): int
    // {
    //     $currentDate = new \DateTime();

    //     if ($endLoan < $currentDate) {
    //         if ($active) {
    //             // Préstamo vencido y aún activo → calcular retraso real
    //             return $endLoan->diff($currentDate)->days;
    //         } else {
    //             // Préstamo vencido pero ya no activo → simular retraso
    //             return random_int(0, 10);
    //         }
    //     }

    //     return 0; // Aún no ha vencido
    // }
}
