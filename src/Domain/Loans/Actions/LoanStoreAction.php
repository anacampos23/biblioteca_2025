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
    public function __invoke(array $data, Book $book): LoanResource
    {
        $userId = User::where('email', $data['email'])->first()->id;

        $data['book_id'] = $book->id;

        $loan = Loan::create([
            'book_id' => $data['book_id'],
            'user_id' => $userId,
            'start_loan' => Carbon::now(),
            'due_date' => Carbon::now()->addMonth(),
            'active' => true,
        ]);

        return LoanResource::fromModel($loan);
    }
}
