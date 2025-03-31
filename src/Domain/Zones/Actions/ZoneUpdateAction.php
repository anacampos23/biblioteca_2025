<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Data\Resources\ZoneResource;
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Hash;

class ZoneUpdateAction
{
    public function __invoke(Zone $zone, array $data): ZoneResource
    {
        $updateData = [
            'name' => $data['name'],
            'description' => $data['description'],
        ];

        $zone->update($updateData);

        return ZoneResource::fromModel($zone->fresh());
    }
}
