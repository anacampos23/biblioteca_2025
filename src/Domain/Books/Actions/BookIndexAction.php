<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)

    {
        $title = $search[0];
        $author = $search[1];
        $genre = $search[2];
        $ISBN = $search[3];
        $editorial = $search[4];
        $quantity = $search[5];
        $status = $search[6];
        $bookcase_name = $search[7];
        $name = $search[8];
        $floor_number = $search[9];


        $floorZone = Floor::query() -> when($floor_number != "null", function ($query) use ($floor_number){
            $query -> where('floor_number', 'like', $floor_number);
        })-> first();

        $floor_id= $floorZone -> id;

        $zone = Zone::query()
            ->when($name !== "null", function ($query) use ($name) {
                $query->where('name', 'ILIKE', "%".$name."%");
            })
            ->when($floor_number !== "null", function ($query) use ($floor_id) {
                $query->where('floor_id', 'ILIKE', $floor_id);
            })
            ->latest()
            ->paginate($perPage);

        return $books->through(fn ($book) => BookResource::fromModel($book));
    }
}
