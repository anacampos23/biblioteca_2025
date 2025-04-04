<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;



class ZoneIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $name = $search[0];
        $floor_number = $search[1];

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

        return $zone->through(fn ($zone) => ZoneResource::fromModel($zone));
    }
}
