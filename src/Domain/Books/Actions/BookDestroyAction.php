<?php

namespace Domain\Books\Actions;

use Domain\Books\Models\Book;

class BookDestroyAction
{
    public function __invoke(Book $book): void
    {
        $book->delete();
    }
}
