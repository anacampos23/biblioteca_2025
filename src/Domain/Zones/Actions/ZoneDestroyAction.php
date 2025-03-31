<?php

namespace Domain\Zones\Actions;

use Domain\Zones\Models\Zone;

class ZoneDestroyAction
{
    public function __invoke(Zone $zone): void
    {
        $zone->delete();
    }
}
