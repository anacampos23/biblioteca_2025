<?php

namespace Domain\Zones\Data\Resources;

use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;
use Spatie\LaravelData\Data;

class ZoneResource extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $floor_id,
        public readonly string $floor_number,
        public readonly int $capacity_zones,
        public readonly int $zones_count,
        public readonly string $created_at,
        public readonly string $updated_at,
    ) {
    }

    public static function fromModel(Zone $zone): self
    {
        $floor = Floor::where('id', $zone->floor_id)-> first();
        $zones_count = $floor->zones()->count();


        return new self(
            id: $zone->id,
            name: $zone->name,
            floor_id: $zone -> floor_id,
            floor_number: $floor -> floor_number,
            capacity_zones: $floor -> capacity_zones,
            zones_count: $zones_count,
            created_at: $zone->created_at->format('Y-m-d H:i:s'),
            updated_at: $zone->updated_at->format('Y-m-d H:i:s'),
        );
    }
}
