<?php

namespace Domain\Reserves\Actions;

use Domain\Reserves\Models\Reserve;

class ReserveDestroyAction
{
    public function __invoke(Reserve $reserve): void
    {
        $reserve->delete();
    }
}
