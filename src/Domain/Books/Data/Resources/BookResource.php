<?php

namespace Domain\Books\Data\Resources;

use Domain\Books\Models\Book;
use Spatie\LaravelData\Data;

class BookResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly string $author,
        public readonly string $genre,
        public readonly int $ISBN,
        public readonly string $editorial,
        public readonly int $quantity,
        public readonly string $status,
        public readonly string $bookcase_id,
        public readonly string $zone_id,
        public readonly string $floor_id,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Book $book): self
    {
        return new self(
            id: $book->id,
            title: $book->title,
            author: $book->author,
            genre: $book->genre,
            ISBN: $book->ISBN,
            editorial: $book->editorial,
            quantity: $book->quantity,
            status: $book->status,
            bookcase_id: $book->bookcase_id,
            zone_id: $book->zone_id,
            floor_id: $book->floor_id,
            created_at: $book->created_at->format('Y-m-d H:i:s'),
            updated_at: $book->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
