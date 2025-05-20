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


        foreach($files as $file){
            $book->addMedia($file)->toMediaCollection('images', 'images');
        };

        return BookResource::fromModel($book);
    }
}
