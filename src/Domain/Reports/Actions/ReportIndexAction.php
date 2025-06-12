<?php

namespace Domain\Reports\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class ReportIndexAction
{
    public function filteredQuery(array $filters)
{
    $query = Loan::query();

    if (!empty($filters['start_loan_from'])) {
        $query->where('start_loan', '>=', $filters['start_loan_from']);
    }
    if (!empty($filters['start_loan_to'])) {
        $query->where('start_loan', '<=', $filters['start_loan_to']);
    }
    if (!empty($filters['end_loan'])) {
        $query->whereDate('end_loan', $filters['end_loan']);
    }

    return $query;
}

}
