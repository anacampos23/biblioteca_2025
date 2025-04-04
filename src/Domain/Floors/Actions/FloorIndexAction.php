<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;



class FloorIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $floor_number = $search[0];
        $capacity_zones = $search[1];

        $floors = Floor::query()
            ->when($floor_number != "null", function ($query) use ($floor_number){
                $query->where('floor_number', 'ILIKE', "%".$floor_number."%");
            })
            ->when($capacity_zones != "null", function ($query) use ($capacity_zones){
                $query->where('capacity_zones', 'ILIKE', "%".$capacity_zones."%");
            })
            ->latest()
            ->paginate($perPage);

        return $floors->through(fn ($floor) => FloorResource::fromModel($floor));
    }
}
