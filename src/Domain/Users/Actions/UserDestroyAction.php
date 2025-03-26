<?php

namespace Domain\Users\Actions;

use Domain\Users\Models\User;

class UserDestroyAction
{
    public function __invoke(User $user): void
    {
        $user->delete();
    }
}
