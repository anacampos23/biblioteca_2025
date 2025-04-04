<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [
            'title' => $data['title'],
            'author' => $data['author'],
            'genre' => $data['genre'],
            'ISBN' => $data['ISBN'],
            'editorial' => $data['editorial'],
            'quantity' => $data['quantity'],
            'status' => $data['status'],
            'bookcase_id' => $data['bookcase_id'],
            'zone_id' => $data['zone_id'],
            'floor_id' => $data['floor_id'],
        ];

        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
