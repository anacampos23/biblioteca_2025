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
        $endLoan = (clone $startLoan)->modify('+1 month');

        $active = $this->faker->boolean();

        return [
            'start_loan' => $startLoan->format('Y-m-d'),
            'end_loan' => (clone $startLoan)->modify('+1 month')->format('Y-m-d'),
            'days_overdue' => $this->calculateDaysOverdue($endLoan, $active),
            'active' => $active,
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory()->create()->id,
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory()->create()->id,
        ];
    }

    /**
     * Calculate the number of overdue days based on end_loan and whether the loan is active.
     *
     * @param \DateTime $endLoan
     * @param bool $active
     * @return int
     */
    private function calculateDaysOverdue(\DateTime $endLoan, bool $active): int
    {
        $currentDate = new \DateTime();

        if ($endLoan < $currentDate) {
            if ($active) {
                // Préstamo vencido y aún activo → calcular retraso real
                return $endLoan->diff($currentDate)->days;
            } else {
                // Préstamo vencido pero ya no activo → simular retraso
                return random_int(0, 10);
            }
        }

        return 0; // Aún no ha vencido
    }
}
