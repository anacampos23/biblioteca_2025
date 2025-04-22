<?php

namespace Domain\Reserves\Data\Resources;

use Domain\Books\Models\Book;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Models\User;
use Spatie\LaravelData\Data;

class ReserveResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $user_id,
        public readonly string $book_id,
        public readonly string $name,
        public readonly string $email,
        public readonly string $title,
        public readonly string $author,
        public readonly int $ISBN,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Reserve $reserve): self
    {

        $book = Book::select(['id', 'title', 'author', 'ISBN'])->where('id', $reserve->book_id)->withTrashed()->first();
        $user = User::select(['id', 'name', 'email'])->where('id', $reserve->user_id)->withTrashed()->first();

        return new self(
            id: $reserve->id,
            user_id: $reserve->user_id,
            book_id: $reserve->book_id,
            name: $user->name,
            email: $user->email,
            title: $book->title,
            author: $book->author,
            ISBN: $book->ISBN,
            created_at: $reserve->created_at->format('Y-m-d H:i:s'),
            updated_at: $reserve->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
