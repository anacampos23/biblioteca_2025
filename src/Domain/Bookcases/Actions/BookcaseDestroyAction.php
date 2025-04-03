<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Models\Bookcase;

class BookcaseDestroyAction
{
    public function __invoke(Bookcase $bookcase): void
    {
        $bookcase->delete();
    }
}
