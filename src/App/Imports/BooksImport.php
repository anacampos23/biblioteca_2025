<?php

namespace App\Imports;

use Domain\Books\Models\Book;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\WithUpserts;

class BooksImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
{
    // Ignorar filas sin título, porque es obligatorio
    if (empty($row['titulo'])) {
        // Opcional: loguear o simplemente ignorar
        Log::warning("Fila ignorada por no tener título");
        return null;
    }

    $id = !empty($row['id']) && !Book::where('id', $row['id'])->exists() ? $row['id'] : Str::uuid()->toString();

    return new Book([
        'id'=> $id,
        'title' => $row['titulo'],
        'author' => $row['autor'],
        'genre' => $row['genero'],
        'ISBN' => $row['isbn'],
        'editorial' => $row['editorial'],
        'available' => $row['disponible'],
        'reserved' => $row['reservado'],
        'bookcase_id' => $row['id_estanteria'],
        'zone_id' => $row['id_zona'],
        'floor_id' => $row['id_piso'],
        'deleted_at' => $row['eliminado_el'] ?? null,
    ]);
}

}
