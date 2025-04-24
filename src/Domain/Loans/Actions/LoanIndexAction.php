<?php

namespace Domain\Loans\Actions;

use Carbon\Carbon;
use Domain\Loans\Data\Resources\LoanResource;
use Domain\Loans\Models\Loan;
use Domain\Books\Models\Book;
use Domain\Users\Models\User;

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
        // $active = $search[9];


        //Título del libro
        $bookTitle = Book::query() -> when($title != "null", function ($query) use ($title){
            $query -> where('title', 'ILIKE', "%".$title."%") ->withTrashed();
        })-> pluck('id');

        //Autor del libro
        $bookAuthor = Book::query() -> when($author != "null", function ($query) use ($author){
            $query -> where('author', 'ILIKE', "%".$author."%")->withTrashed();
        })-> pluck('id');

         //ISBN del libro
         $bookISBN = Book::query() -> when($ISBN != "null", function ($query) use ($ISBN){
            $query -> where('ISBN', 'ILIKE', "%".$ISBN."%")->withTrashed();
        })-> pluck('id');

        //Nombre del usuario
         $userName = User::query() -> when($name != "null", function ($query) use ($name){
            $query -> where('name', 'ILIKE', "%".$name."%")->withTrashed();
        })-> pluck('id');

        //email del usuario
        $userEmail = User::query() -> when($email != "null", function ($query) use ($email){
            $query -> where('email', 'ILIKE', "%".$email."%")->withTrashed();
        })-> pluck('id');


        $loans = Loan::query()
        ->when($title !== "null", function ($query) use ($bookTitle) {
            $query->whereIn('book_id', $bookTitle);
        })
        ->when($author !== "null", function ($query) use ($bookAuthor) {
            $query->whereIn('book_id', $bookAuthor);
        })
        ->when($ISBN !== "null", function ($query) use ($bookISBN) {
            $query->whereIn('book_id', $bookISBN);
        })
        ->when($name !== "null", function ($query) use ($userName) {
            $query->whereIn('user_id', $userName);
        })
        ->when($email !== "null", function ($query) use ($userEmail) {
            $query->whereIn('user_id', 'ILIKE', $userEmail);
        })

        ->when($start_loan !== "null", function ($query) use ($start_loan) {
            $query->whereDate('start_loan', '=', $start_loan);
        })
        ->when($end_loan !== "null", function ($query) use ($end_loan) {
            $query->whereDate('end_loan', '=', $end_loan);
        })
        ->when($due_date !== "null", function ($query) use ($due_date) {
            $query->whereDate('due_date', '=', $due_date);
        })
        ->when($days_overdue !== "null", function ($query) use ($days_overdue) {
            $query->where('days_overdue', '=', $days_overdue);
        })
        // ->when($active !== "null", function ($query) use ($active) {
        //     $query->where('active', 'like', $active);
        // })

            ->latest()
            ->paginate($perPage);

        return $loans->through(fn ($loan) => LoanResource::fromModel($loan));
    }
}
