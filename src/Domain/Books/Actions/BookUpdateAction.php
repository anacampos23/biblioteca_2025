<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [];

        if (isset($data['title'])) {
            $updateData['title'] = $data['title'];
        }

        if (isset($data['author'])) {
            $updateData['author'] = $data['author'];
        }

        if (isset($data['genre'])) {
            $updateData['genre'] = $data['genre'];
        }

        if (isset($data['ISBN'])) {
            $updateData['ISBN'] = $data['ISBN'];
        }

        if (isset($data['editorial'])) {
            $updateData['editorial'] = $data['editorial'];
        }

        if (isset($data['quantity'])) {
            $updateData['quantity'] = $data['quantity'];
        }

        if (isset($data['available'])) {
            $updateData['available'] = $data['available'];
        }
        if (isset($data['reserved'])) {
            $updateData['reserved'] = $data['reserved'];
        }

        if (isset($data['bookcase_id'])) {
            $updateData['bookcase_id'] = $data['bookcase_id'];
        }

        if (isset($data['zone_id'])) {
            $updateData['zone_id'] = $data['zone_id'];
        }

        if (isset($data['floor_id'])) {
            $updateData['floor_id'] = $data['floor_id'];
        }

        if (isset($data['newReservationStatus'])) {
            $updateData['newReservationStatus'] = $data['newReservationStatus'];
        }


        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
