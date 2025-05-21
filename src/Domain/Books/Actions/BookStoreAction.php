<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\FileBag;

class BookStoreAction
{
    public function __invoke(array $data, FileBag $files): BookResource
    {
        // Convierte el array de géneros a JSON antes de guardarlo
        $genre = json_encode($data['genre']);


        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'ISBN' => $data['ISBN'],
            'genre' => $genre,
            'editorial' => $data['editorial'],
            'available' => true,
            'reserved' =>false,
            'bookcase_id' => $data['bookcase_id'],
            'zone_id' => $data['zone_id'],
            'floor_id' => $data['floor_id'],
        ]);


        if ($files->count() > 0) {
            foreach ($files as $file) {
                $book->addMedia($file)->toMediaCollection('images', 'images');
            }
        } else {
            // No hay imágenes nuevas, buscar otro libro con la misma ISBN que tenga imagen
            $otherBookWithImage = Book::where('ISBN', $data['ISBN'])
                ->where('id', '!=', $book->id)
                ->whereHas('media', function ($query) {
                    $query->where('collection_name', 'images');
                })
                ->first();

            if ($otherBookWithImage) {
                $mediaItem = $otherBookWithImage->getFirstMedia('images');
                if ($mediaItem) {
                    // Copiar la imagen al libro nuevo
                    $mediaItem->copy($book, 'images', 'images');
                }
            }
        }
        return BookResource::fromModel($book);
    }
}
