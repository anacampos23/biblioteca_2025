<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseStoreAction
{
    public function __invoke(array $data): BookcaseResource
    {
        $bookcase = Bookcase::create([
            'bookcase_name' => $data['bookcase_name'],
            'zone_id' => $data['zone_id'],
            'floor_id' => $data['floor_id'],
        ]);

        return BookcaseResource::fromModel($bookcase);
    }
}
