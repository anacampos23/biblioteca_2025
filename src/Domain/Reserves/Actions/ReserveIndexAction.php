<?php

namespace Domain\Reserves\Actions;

use Domain\Books\Models\Book;
use Domain\Reserves\Data\Resources\ReserveResource;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Models\User;

class ReserveIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $title = $search[0];
        $author = $search[1];
        $ISBN = $search[2];
        $name = $search[3];
        $email = $search[4];
        $status = $search[5];

        //Título del libro
        $bookTitle = Book::query() -> when($title != "null", function ($query) use ($title){
            $query -> where('title', 'ILIKE', "%".$title."%")->withTrashed();
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

        $reserves = Reserve::query()
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
            $query->whereIn('user_id', $userEmail);
        })
        ->when($status !== "null", function ($query) use ($status) {
            $query->where('status', 'like', $status);
        })

            ->latest()
            ->paginate($perPage);

        return $reserves->through(fn ($reserve) => ReserveResource::fromModel($reserve));
    }
}
