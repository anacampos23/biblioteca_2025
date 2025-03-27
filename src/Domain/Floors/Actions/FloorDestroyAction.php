<?php

namespace Domain\Floors\Actions;

use Domain\Floors\Models\Floor;

class FloorDestroyAction
{
    public function __invoke(Floor $floor): void
    {
        $floor->delete();
    }
}
