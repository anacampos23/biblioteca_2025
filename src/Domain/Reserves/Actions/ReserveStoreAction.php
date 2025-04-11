<?php

namespace Domain\Reserves\Actions;

use Domain\Books\Models\Book;
use Domain\Reserves\Data\Resources\ReserveResource;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Models\User;
use Illuminate\Support\Facades\Hash;

class ReserveStoreAction
{
    public function __invoke(array $data): ReserveResource
    {

        $userId = User::where('email', $data['email'])->first()->id;
        $bookId = Book::where('ISBN', $data['ISBN'])->first()->id;

        $reserve = Reserve::create([
            'book_id' => $bookId,
            'user_id' => $userId,
        ]);

        return ReserveResource::fromModel($reserve);
    }
}
