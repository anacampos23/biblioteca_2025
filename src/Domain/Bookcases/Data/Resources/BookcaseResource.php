<?php

namespace Domain\Bookcases\Data\Resources;

use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Spatie\LaravelData\Data;

class BookcaseResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly int $bookcase_name,
        public readonly string $zone_id,
        public readonly string $floor_id,
        public readonly string $name,
        public readonly int $floor_number,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Bookcase $bookcase): self
    {
        $zone = Zone::where('id', $bookcase->zone_id)-> first();
        $floor = Floor::where('id', $bookcase->floor_id)-> first();

        return new self(
            id: $bookcase->id,
            bookcase_name: $bookcase->bookcase_name,
            zone_id: $bookcase->zone_id,
            floor_id: $bookcase->floor_id,
            floor_number: $floor -> floor_number,
            name: $zone -> name,
            created_at: $bookcase->created_at->format('Y-m-d H:i:s'),
            updated_at: $bookcase->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
