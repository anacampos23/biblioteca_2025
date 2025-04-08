<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $loan = Loan::create([
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'start_loan' => $data['start_loan'],
            'end_loan' => $data['end_loan'],
            'days_overdue' => $data['days_overdue'],
            'active' => $data['active'],
        ]);

        return LoanResource::fromModel($loan);
    }
}
