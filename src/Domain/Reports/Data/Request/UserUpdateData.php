<?php

namespace Domain\Users\Data\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class UserUpdateData extends Data
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $password = null,
    ) {
    }

    public static function rules(string $userId): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => ['nullable', 'string', 'min:8'],
        ];
    }
}
