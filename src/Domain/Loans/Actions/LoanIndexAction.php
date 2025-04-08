<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;

class LoanIndexAction
{
    public function __invoke(?string $search = null, ?string $name = null, ?string $email = null, int $perPage = 10)
    {
        $loans = Loan::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })

            ->when($name, function ($query, $name) {
                $query->where('name', 'like', "%{$name}%");
            })

            ->when($email, function ($query, $email) {
                $query->where('email', 'like', "%{$email}%");
            })
            ->latest()
            ->paginate($perPage);

            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'start_loan' => $data['start_loan'],
            'end_loan' => $data['end_loan'],
            'days_overdue' => $data['days_overdue'],
            'borrowed' => $data['borrowed'],

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
