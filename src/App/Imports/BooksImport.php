<?php

namespace App\Imports;

use Domain\Books\Models\Book;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class BooksImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Book([
            'title' => $row['title'],
            'author' => $row['author'],
            'genre' => $row['genre'],
            'ISBN' => $row['isbn'],
            'editorial' => $row['editorial'],
            'available' => $row['available'],
            'reserved' => $row['reserved'],
            'bookcase_id' => $row['bookcase_id'],
            'zone_id' => $row['zone_id'],
            'floor_id' => $row['floor_id'],
            'created_at' => $row['created_at'],
            'updated_at' => $row['updated_at'],
            'deleted_at' => $row['deleted_at'] ?? null,
        ]);
    }
}
