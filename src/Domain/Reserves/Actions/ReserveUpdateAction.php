<?php

namespace Domain\Reserves\Actions;

use Domain\Reserves\Data\Resources\ReserveResource;
use Domain\Reserves\Models\Reserve;
use Illuminate\Support\Facades\Hash;

class ReserveUpdateAction
{
    public function __invoke(Reserve $reserve, array $data): ReserveResource
    {
        $updateData = [
        ];

        $reserve->update($updateData);

        return ReserveResource::fromModel($reserve->fresh());
    }
}
