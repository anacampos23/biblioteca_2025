<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Carbon\Month;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class LoanStoreAction
{
    public function __invoke(array $data): LoanResource
    {
        $userId = User::where('email', $data['email'])->first()->id;
        $bookId = Book::where('ISBN', $data['ISBN'])->first()->id;

        $loan = Loan::create([
            'book_id' => $bookId,
            'user_id' => $userId,
            'start_loan' => Carbon::now(),
            'end_loan' => Carbon::now()->addMonth(),
            'days_overdue' => 0,
            'active' => true,
        ]);

        return LoanResource::fromModel($loan);
    }
}
