<?php

namespace Domain\Loans\Data\Resources;

use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class LoanResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $start_loan,
        public readonly ?string $end_loan,
        public readonly string $due_date,
        public readonly int $days_overdue,
        public readonly bool $active,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $name,
        public readonly string $email,
        public readonly string $title,
        public readonly string $author,
        public readonly int $ISBN,
    ) {
    }

    public static function fromModel(Loan $loan): self
    {
        $book = Book::select(['id', 'title', 'author', 'ISBN'])->where('id', $loan->book_id)->first();
        $user = User::select(['id', 'name', 'email'])->where('id', $loan->user_id)->first();

        return new self(
            id: $loan->id,
            start_loan: $loan->start_loan,
            end_loan: $loan->end_loan,
            due_date: $loan->due_date,
            days_overdue: $loan->days_overdue,
            active: $loan->active,
            user_id: $loan->user_id,
            book_id: $loan->book_id,
            name: $user->name,
            email: $user->email,
            title: $book->title,
            author: $book->author,
            ISBN: $book->ISBN,
        );
    }
}
