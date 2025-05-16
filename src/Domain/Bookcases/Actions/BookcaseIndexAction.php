<?php

namespace Domain\Bookcases\Actions;

use Domain\Bookcases\Data\Resources\BookcaseResource;
use Domain\Bookcases\Models\Bookcase;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;

class BookcaseIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $bookcase_name = $search[0];
        $name = $search[1];
        $floor_number = $search[2];

        //Une el nombre del floor
        $bookcaseFloor = Floor::query() -> when($floor_number != "null", function ($query) use ($floor_number){
            $query -> where('floor_number', 'like', $floor_number);
        })-> first();

        $floor_id = $bookcaseFloor->id;


        $bookcase = Bookcase::query()
            ->when($bookcase_name !== "null", function ($query) use ($bookcase_name) {
                $query->where('bookcase_name', 'ILIKE', "%" . $bookcase_name . "%");
            })
            ->when($name !== "null", function ($query) use ($name) {
                $query->where('zone_id', 'like', $name);
            })
            ->when($floor_number !== "null", function ($query) use ($floor_id) {
                $query->where('floor_id', 'ILIKE', $floor_id);
            })

            ->latest()
            ->paginate($perPage);

        return $bookcase->through(fn ($bookcase) => BookcaseResource::fromModel($bookcase));
    }
}
