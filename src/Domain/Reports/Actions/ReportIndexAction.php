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
        $query->whereDate('start_loan', '>=', $filters['start_loan_from']);
    }
    if (!empty($filters['start_loan_to'])) {
        $query->whereDate('start_loan', '<=', $filters['start_loan_to']);
    }
    if (!empty($filters['end_loan_from'])) {
        $query->whereDate('end_loan', '>=', $filters['end_loan_from']);
    }
    if (!empty($filters['end_loan_to'])) {
        $endTo = Carbon::parse($filters['end_loan_to'])->endOfDay();
        $query->where('end_loan', '<=', $endTo);
    }

    return $query;
}

}
