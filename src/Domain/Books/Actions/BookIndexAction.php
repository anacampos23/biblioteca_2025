<?php

namespace Domain\Books\Actions;

use Domain\Books\Data\Resources\BookResource;
use Domain\Books\Models\Book;
use Domain\Bookcases\Models\Bookcase;
use Domain\Zones\Models\Zone;
use Domain\Floors\Models\Floor;

class BookIndexAction
{
    public function __invoke(?array $search = null, int $perPage = 10)

    {
        $title = $search[0];
        $author = $search[1];
        $genre = $search[2];
        $ISBN = $search[3];
        $editorial = $search[4];
        $available = $search[5];
        $reserved = $search[6];
        $bookcase_name = $search[7];
        $name = $search[8];
        $floor_number = $search[9];


        //Une bookcase_name con el registro que tenemos del id
        $bookBookcase = Bookcase::query() -> when($bookcase_name != "null", function ($query) use ($bookcase_name){
            $query -> where('bookcase_name', 'like', $bookcase_name);
        })-> first();

        $bookcase_id= $bookBookcase-> id;


        //Une el nombre de la zona con el registro que tenemos del id
        $bookZone = Zone::query() -> when($name != "null", function ($query) use ($name){
            $query -> where('name', 'ILIKE', "%".$name."%");
        })->first();

        $zone_id= $bookZone -> id;

        //Une el nombre del floor
        $bookFloor = Floor::query() -> when($floor_number != "null", function ($query) use ($floor_number){
            $query -> where('floor_number', 'like', $floor_number);
        })-> first();

        $floor_id= $bookFloor -> id;


        $book = Book::query()
            ->when($title !== "null", function ($query) use ($title) {
                $query->where('title', 'ILIKE', "%".$title."%");
            })
            ->when($author !== "null", function ($query) use ($author) {
                $query->where('author', 'ILIKE', "%".$author."%");
            })
            ->when($genre !== "null", function ($query) use ($genre) {
                $query->where('genre', 'ILIKE', "%".$genre."%");
            })
            ->when($ISBN !== "null", function ($query) use ($ISBN) {
                $query->where('ISBN', 'ILIKE', $ISBN."%");
            })
            ->when($editorial !== "null", function ($query) use ($editorial) {
                $query->where('editorial', 'ILIKE', "%".$editorial."%");
            })
            ->when($available !== "null", function ($query) use ($available) {
                $query->where('available', 'like', $available);
            })
            ->when($reserved !== "null", function ($query) use ($reserved) {
                $query->where('reserved', 'like', $reserved);
            })
            ->when($bookcase_name !== "null", function ($query) use ($bookcase_id) {
                $query->where('bookcase_id', '=', $bookcase_id);
            })
            ->when($name !== "null", function ($query) use ($zone_id) {
                $query->where('zone_id', 'like', $zone_id);
            })
            ->when($floor_number !== "null", function ($query) use ($floor_id) {
                $query->where('floor_id', '=', $floor_id);
            })

            ->latest()
            ->paginate($perPage);

        return $book->through(fn ($book) => BookResource::fromModel($book));
    }
}
