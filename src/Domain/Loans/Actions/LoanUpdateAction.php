<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [
            'book_id' => $data['book_id'],
            'user_id' => $data['user_id'],
            'start_loan' => $data['start_loan'],
            'end_loan' => $data['end_loan'],
            'days_overdue' => $data['days_overdue'],
            'active' => $data['active'],
        ];

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
