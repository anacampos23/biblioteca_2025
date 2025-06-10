<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class LoanIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $title = $search[0];
        $author = $search[1];
        $ISBN = $search[2];
        $name = $search[3];
        $email = $search[4];
        $start_loan = $search[5];
        $end_loan = $search[6];
        $due_date = $search[7];
        $days_overdue = $search[8];
        $active = $search[9];

        $bookTitle = Book::query()->when($title !== "null", fn($q) => $q->where('title', 'ILIKE', "%$title%")->withTrashed())->pluck('id');
        $bookAuthor = Book::query()->when($author !== "null", fn($q) => $q->where('author', 'ILIKE', "%$author%")->withTrashed())->pluck('id');
        $bookISBN = Book::query()->when($ISBN !== "null", fn($q) => $q->where('ISBN', 'ILIKE', "%$ISBN%")->withTrashed())->pluck('id');
        $userName = User::query()->when($name !== "null", fn($q) => $q->where('name', 'ILIKE', "%$name%")->withTrashed())->pluck('id');
        $userEmail = User::query()->when($email !== "null", fn($q) => $q->where('email', 'ILIKE', "%$email%")->withTrashed())->pluck('id');

        $loans = Loan::query()
            ->when($title !== "null", fn($q) => $q->whereIn('book_id', $bookTitle))
            ->when($author !== "null", fn($q) => $q->whereIn('book_id', $bookAuthor))
            ->when($ISBN !== "null", fn($q) => $q->whereIn('book_id', $bookISBN))
            ->when($name !== "null", fn($q) => $q->whereIn('user_id', $userName))
            ->when($email !== "null", fn($q) => $q->whereIn('user_id', $userEmail))
            ->when($start_loan !== "null", fn($q) => $q->whereDate('start_loan', $start_loan))
            ->when($end_loan !== "null", fn($q) => $q->whereDate('end_loan', $end_loan))
            ->when($due_date !== "null", fn($q) => $q->whereDate('due_date', $due_date))
            ->when($active !== "null", fn($q) => $q->where('active', 'like', $active))
            ->latest()
            ->get(); // usamos get() para poder hacer el filtro en PHP

        // 👉 Aplicamos el filtro de days_overdue después de la consulta
        if ($days_overdue !== "null") {
            $loans = $loans->filter(fn($loan) => $loan->days_overdue == (int)$days_overdue);
        }

        // 🔄 Paginar manualmente los resultados filtrados
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = $loans->slice(($currentPage - 1) * $perPage, $perPage)->values();
        $paginated = new LengthAwarePaginator(
            $currentItems,
            $loans->count(),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginated->through(fn($loan) => LoanResource::fromModel($loan));
    }
}
