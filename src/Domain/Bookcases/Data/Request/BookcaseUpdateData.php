<?php

namespace Domain\Bookcases\Data\Request;

use Illuminate\Validation\Rule;
use Spatie\LaravelData\Data;

class BookcaseUpdateData extends Data
{
    public function __construct(
        public readonly int $bookcase_name,
    ) {
    }

    public static function rules(string $bookcaseId): array
    {
        return [
            'bookcase_name' => ['required', 'number', 'max:255'],
        ];
    }
}
