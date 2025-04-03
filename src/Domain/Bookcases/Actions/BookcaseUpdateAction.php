<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Support\Facades\Hash;

class BookcaseUpdateAction
{
    public function __invoke(Bookcase $bookcase, array $data): BookcaseResource
    {
        $updateData = [
            'bookcase_name' => $data['bookcase_name'],
            'zone_id' => $data['zone_id'],
            'floor_id' => $data['floor_id'],
        ];

        $bookcase->update($updateData);

        return BookcaseResource::fromModel($bookcase->fresh());
    }
}
