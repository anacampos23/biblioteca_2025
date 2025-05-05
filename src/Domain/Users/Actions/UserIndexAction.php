<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;

class UserIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)
    {
        $name = $search[0];
        $email = $search[1];


        $users = User::query()
        ->when($name !== "null", function ($query) use ($name) {
            $query->where('name', 'ILIKE', "%".$name."%");
        })
        ->when($email !== "null", function ($query) use ($email) {
            $query->where('email', 'ILIKE', "%".$email."%");
        })


            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
