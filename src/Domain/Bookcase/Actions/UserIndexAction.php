<?php

namespace Domain\Users\Actions;

use Domain\Users\Data\Resources\UserResource;
use Domain\Users\Models\User;

class UserIndexAction
{
    public function __invoke(?string $search = null, ?string $name = null, ?string $email = null, int $perPage = 10)
    {
        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })

            ->when($name, function ($query, $name) {
                $query->where('name', 'like', "%{$name}%");
            })

            ->when($email, function ($query, $email) {
                $query->where('email', 'like', "%{$email}%");
            })
            ->latest()
            ->paginate($perPage);

        return $users->through(fn ($user) => UserResource::fromModel($user));
    }
}
