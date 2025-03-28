<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;
use Illuminate\Support\Facades\Hash;

class FloorStoreAction
{
    public function __invoke(array $data): FloorResource
    {
        
        $floor = Floor::create([
            'floor_number' => $data['floor_number'],
            'capacity_zones' => $data['capacity_zones'],
        ]);

        return FloorResource::fromModel($floor);
    }
}
