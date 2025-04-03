<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;

class BookcaseIndexAction
{
    public function __invoke(?string $search = null, int $perPage = 10)
    {
        $bookcases = Bookcase::query()
        ->when($search, function ($query, $search) {
            $query->where('bookcase_name', 'like', "%{$search}%")
                ->orWhere('zone_id', 'like', "%{$search}%")
                ->orWhere('floor_id', 'like', "%{$search}%");
        })
        ->latest()
        ->paginate($perPage);

        return $bookcases->through(fn ($bookcase) => BookcaseResource::fromModel($bookcase));
    }
}
