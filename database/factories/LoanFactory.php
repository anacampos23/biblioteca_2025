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
        $endLoan = (clone $startLoan)->modify('+1 month')->format('Y-m-d');

        return [
            'start_loan' => $startLoan->format('Y-m-d'),
            'end_loan' => (clone $startLoan)->modify('+1 month')->format('Y-m-d'),
            'days_overdue' => $this->calculateDaysOverdue($endLoan),
            'active' => $this->faker->boolean(),
            'book_id' => Book::inRandomOrder()->value('id') ?? Book::factory()->create()->id,
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory()->create()->id,
        ];
    }

     /**
     * Calculate the number of overdue days based on end_loan and current date.
     *
     * @param string $endLoan
     * @return int
     */
    private function calculateDaysOverdue($endLoan)
    {
        $endLoanDate = new \DateTime($endLoan);
        $currentDate = new \DateTime();

        $interval = $endLoanDate->diff($currentDate);

        // Si el préstamo ya terminó y la fecha actual es posterior, retornamos los días de retraso
        return $endLoanDate < $currentDate ? $interval->days : 0;
    }
}
