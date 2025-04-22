<?php

namespace Domain\Loans\Actions;

use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Illuminate\Support\Facades\Hash;

class LoanUpdateAction
{
    public function __invoke(Loan $loan, array $data): LoanResource
    {
        $updateData = [];

        if (isset($data['book_id'])) {
            $updateData['book_id'] = $data['book_id'];
        }

        if (isset($data['user_id'])) {
            $updateData['user_id'] = $data['user_id'];
        }

        if (isset($data['start_loan'])) {
            $updateData['start_loan'] = $data['start_loan'];
        }

        if (isset($data['newReturned'])) {
            $updateData['end_loan'] = $data['newReturned'];
        }

        if (isset($data['newDueDate'])) {
            $updateData['due_date'] = $data['newDueDate'];
        }

        if (isset($data['days_overdue'])) {
            $updateData['days_overdue'] = $data['days_overdue'];
        }

        if (isset($data['newStatus'])) {
            $updateData['active'] = $data['newStatus'];
        }

        $loan->update($updateData);

        return LoanResource::fromModel($loan->fresh());
    }
}
