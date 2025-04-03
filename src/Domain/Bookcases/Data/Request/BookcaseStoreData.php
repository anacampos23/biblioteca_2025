<?php

namespace Domain\Bookcases\Data\Request;

use Spatie\LaravelData\Data;

class BookcaseStoreData extends Data
{
    public function __construct(
        public readonly int $bookcase_name,
    ) {
    }

    public static function rules(): array
    {
        return [
            'bookcase_name' => ['required', 'number', 'max:255'],
        ];
    }
}
