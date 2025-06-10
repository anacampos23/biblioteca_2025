<?php

namespace App\Exports;

use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Models\Book;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMapping;

class BooksExport implements FromQuery, WithHeadings, WithMapping
{
    use Exportable;
    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $action = new BookIndexAction();

        return $action->filteredQuery($this->filters);
    }

    public function headings(): array
    {

        return [
            'ID',
            'Título',
            'Autor',
            'Género',
            'ISBN',
            'Editorial',
            'Disponible',
            'Reservado',
            'ID Estantería',
            'ID Zona',
            'ID Piso',
            'Creado en',
            'Actualizado en',
            'Eliminado en',
        ];
    }

     /**
     * @param Book $book
     */
    public function map($book): array
    {
        return [
            $book->id,
            $book->title,
            $book->author,
            $book->genre,
            $book->isbn,
            $book->publisher,
            $book->available ? 'true' : 'false',
            $book->reserved ? 'true' : 'false',
            $book->bookcase_id,
            $book->zone_id,
            $book->floor_id,
            $book->created_at,
            $book->updated_at,
            $book->deleted_at,
        ];
    }
}
