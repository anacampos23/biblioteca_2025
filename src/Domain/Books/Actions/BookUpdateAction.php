<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Http\UploadedFile;

class BookUpdateAction
{
    public function __invoke(Book $book, array $data): BookResource
    {
        $updateData = [];

        if (isset($data['title'])) {
            $updateData['title'] = $data['title'];
        }
        if (isset($data['author'])) {
            $updateData['author'] = $data['author'];
        }
        if (isset($data['genre'])) {
            $updateData['genre'] = $data['genre'];
        }
        if (isset($data['ISBN'])) {
            $updateData['ISBN'] = $data['ISBN'];
        }
        if (isset($data['editorial'])) {
            $updateData['editorial'] = $data['editorial'];
        }
        if (isset($data['bookcase_id'])) {
            $updateData['bookcase_id'] = $data['bookcase_id'];
        }
        if (isset($data['zone_id'])) {
            $updateData['zone_id'] = $data['zone_id'];
        }
        if (isset($data['floor_id'])) {
            $updateData['floor_id'] = $data['floor_id'];
        }

        // Manejo de imagen
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            // Borrar imagen anterior para no acumular archivos
            $book->clearMediaCollection('images');

            // Añadir la nueva imagen a la colección 'images'
            $book->addMedia($data['image'])->toMediaCollection('images', 'images');
        }


        $book->update($updateData);

        return BookResource::fromModel($book->fresh());
    }
}
