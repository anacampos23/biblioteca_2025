<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;

class BookIndexAction
{
    public function __invoke(
        ?string $search = null,
        ?string $title = null,
        ?string $author = null,
        ?string $genre = null,
        ?int $ISBN = null,
        ?string $editorial = null,
        ?int $quantity = null,
        ?string $status = null,
        ?string $bookcase_id = null,
        ?string $zone_id = null,
        ?string $floor_id = null,
        int $perPage = 10)
    {
        $books = Book::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            })

            ->when($genre, function ($query, $name) {
                $query->where('name', 'like', "%{$name}%");
            })

            ->when($editorial, function ($query, $email) {
                $query->where('email', 'like', "%{$email}%");
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
