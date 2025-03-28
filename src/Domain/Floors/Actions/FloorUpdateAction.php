<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Data\Resources\FloorResource;
use Domain\Floors\Models\Floor;
use Illuminate\Support\Facades\Hash;

class FloorUpdateAction
{
    public function __invoke(Floor $floor, array $data): FloorResource
    {
        $updateData = [
            'floor_number' => $data['floor_number'],
            'capacity_zones' => $data['capacity_zones'],
        ];

        $floor->update($updateData);

        return FloorResource::fromModel($floor->fresh());
    }
}
