<?php

namespace App\Exports;

use Domain\Books\Models\Book;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BooksExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Book::all()->map(function ($book) {
            return [
                $book->id,
                $book->title,
                $book->author,
                $book->genre,
                $book->ISBN,
                $book->editorial,
                $book->available ? 'True' : 'False',
                $book->reserved ? 'True' : 'False',
                $book->bookcase_id,
                $book->zone_id,
                $book->floor_id,
                $book->created_at,
                $book->updated_at,
                $book->deleted_at,
            ];
        });
    }

    public function headings(): array
    {
        return ['id', 'title', 'author', 'genre', 'ISBN', 'editorial', 'available', 'reserved', 'bookcase_id', 'zone_id', 'floor_id', 'created_at', 'updated_at', 'deleted_at'];
    }
}

