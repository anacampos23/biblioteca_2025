<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookStoreAction
{
    public function __invoke(array $data): BookResource
    {
        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'genre' => $data['genre'],
            'ISBN' => $data['ISBN'],
            'editorial' => $data['editorial'],
            'quantity' => $data['quantity'],
            'available' => $data['available'],
            'reserved' => $data['reserved'],
            'bookcase_id' => $data['bookcase_id'],
            'zone_id' => $data['zone_id'],
            'floor_id' => $data['floor_id'],
        ]);

        return BookResource::fromModel($book);
    }
}
