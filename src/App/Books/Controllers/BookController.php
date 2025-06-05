<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
use App\Exports\BooksExport;
use App\Imports\BooksImport;
use Domain\Permissions\Models\Permission;
use Domain\Roles\Models\Role;
use Domain\Books\Actions\BookDestroyAction;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Actions\BookStoreAction;
use Domain\Books\Actions\BookUpdateAction;
use Domain\Books\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Floors\Models\Floor;
use Domain\Zones\Models\Zone;
use Domain\Bookcases\Models\Bookcase;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Domain\Reserves\Models\Reserve;
use Maatwebsite\Excel\Facades\Excel;

class BookController extends Controller
{
    public function index(Book $book)
    {
        $genresList = Genre::select(['id', 'genre_name'])->get()->toArray();
        $bookcasesArray = Bookcase::select(['id', 'bookcase_name'])->get()->toArray();
        $zonesArray = Zone::select(['id', 'name'])->get()->toArray();
        $floorsArray = Floor::select(['id', 'floor_number'])->get()->toArray();
        // Obtener todos los libros
        $books = Book::all();

        // Añadir la URL de la imagen a cada libro
        $booksWithImages = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'ISBN' => $book->ISBN,
                'genre' => $book->genre,
                'available' => $book->available,
                'editorial' => $book->editorial,
                'reserved' => $book->reserved,
                'bookcase_id' => $book->bookcase_id,
                'zone_id' => $book->zone_id,
                'floor_id' => $book->floor_id,
                'image_path' => $book->getFirstMediaUrl('images'),
            ];
        })->toArray();

        $loan = Loan::select(['id', 'book_id', 'user_id', 'active'])->get()->toArray();
        $reserve = Reserve::select(['id', 'book_id', 'user_id', 'status'])->get()->toArray();

        return Inertia::render('books/Index', [
            'genresList' => $genresList,
            'bookcasesArray' => $bookcasesArray,
            'zonesArray' => $zonesArray,
            'floorsArray' => $floorsArray,
            'booksWithImages' => $booksWithImages,
            'loan' => $loan,
            'reserve' => $reserve,
        ]);
    }

    public function show(Request $request, Book $book)
    {
        $zones = Zone::select(['id', 'name', 'floor_id'])->orderBy('name', 'asc')->get()->toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones'])->orderBy('floor_number', 'asc')->get()->toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name'])->get()->toArray();
        $media = $book->getFirstMediaUrl('image');
        $book->genre = json_decode($book->genre); // Decodificando el JSON a un array o un string
        return Inertia::render('books/Show', [
            'book' => $book,
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
        ]);
    }

    public function searchBook()
    {
        $genresList = Genre::select(['id', 'genre_name'])->get()->toArray();
        $zonesArray = Zone::select(['id', 'name'])->get()->toArray();
        $floorsArray = Floor::select(['id', 'floor_number'])->get()->toArray();
        $bookcasesArray = Bookcase::select(['id', 'bookcase_name'])->get()->toArray();
        // Obtener todos los libros
        $books = Book::all();

        // Añadir la URL de la imagen a cada libro
        $booksWithImages = $books->map(function ($book) {
            return [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'ISBN' => $book->ISBN,
                'genre' => $book->genre,
                'available' => $book->available,
                'editorial' => $book->editorial,
                'reserved' => $book->reserved,
                'bookcase_id' => $book->bookcase_id,
                'zone_id' => $book->zone_id,
                'floor_id' => $book->floor_id,
                'image_path' => $book->getFirstMediaUrl('images'),
            ];
        })->toArray();

        return Inertia::render('books/SearchBook', [
            'genresList' => $genresList,
            'zonesArray' => $zonesArray,
            'booksWithImages' => $booksWithImages,

        ]);
    }

    public function create(Book $book)
    {
        $zones = Zone::select(['id', 'name', 'floor_id'])
            ->orderBy('name', 'asc')
            ->get()
            ->toArray();

        $floors = Floor::select(['id', 'floor_number', 'capacity_zones'])
            ->orderBy('floor_number', 'asc')
            ->get()
            ->toArray();

        $bookcases = Bookcase::select(['id', 'bookcase_name', 'floor_id', 'zone_id'])
            ->orderBy('bookcase_name', 'asc')
            ->get()
            ->toArray();

        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id'])
            ->get()
            ->toArray();

        $books = Book::select([
            'id',
            'title',
            'author',
            'ISBN',
            'genre',
            'editorial',
            'bookcase_id',
            'zone_id',
            'floor_id'
        ])
            ->get()
            ->map(function ($book) {
                return [
                    'id' => $book->id,
                    'title' => $book->title,
                    'author' => $book->author,
                    'ISBN' => $book->ISBN,
                    'genre' => $book->genre,
                    'editorial' => $book->editorial,
                    'bookcase_id' => $book->bookcase_id,
                    'zone_id' => $book->zone_id,
                    'floor_id' => $book->floor_id,
                    'image_path' => $book->getFirstMediaUrl('images'),
                ];
            })->toArray();

        return Inertia::render('books/Create', [
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
            'floor_zone_id' => $floor_zone_id,
            'books' => $books,

        ]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required'],
            'author' => ['required'],
            'ISBN' => [],
            'genre' => [],
            'editorial' => ['required'],
            'bookcase_id' => [],
            'zone_id' => [],
            'floor_id' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }


        $action($validator->validated(), $request->files);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.created'));
    }

    public function edit(Request $request, Book $book)
    {

        $zones = Zone::select(['id', 'name', 'floor_id'])->orderBy('name', 'asc')->get()->toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones'])->orderBy('floor_number', 'asc')->get()->toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name', 'floor_id', 'zone_id'])->orderBy('bookcase_name', 'asc')->get()->toArray();
        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id'])->get()->toArray();

        $image_path = $book->getFirstMediaUrl('images');

        return Inertia::render('books/Edit', [
            'book' => $book,
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
            'floor_zone_id' => $floor_zone_id,
            'image_path' => $image_path,
        ]);
    }

    public function update(Request $request, Book $book, BookUpdateAction $action)
    {

        $validator = Validator::make($request->all(), [
            'title' => [],
            'author' => [],
            'ISBN' => [],
            'genre' => [],
            'editorial' => [],
            'bookcase_id' => [],
            'zone_id' => [],
            'floor_id' => [],

        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $data = $validator->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image');
        }

        $action($book, $data);
        $redirectUrl = route('books.index');

        //No dejar reservar si ya existe un libro con el mismo ISBN disponible
        $bookISBN = $book->ISBN;
        $book_availability = $book->available;


        //Seleccionar todos los ISBN iguales
        $bookAvailable = Book::select(['id', 'ISBN', 'available'])
            ->where('ISBN', $bookISBN)
            ->where('available', true)
            ->first();

        if ($request->input('newReservationStatus')) {
            if ($book_availability == true) {
                return redirect()->route('loans.create', [
                    'book_id' => $book->id,
                    'title' => $book->title,
                    'author' => $book->author,
                    'ISBN' => $book->ISBN,
                ]);
            } else {
                if (!empty($bookAvailable)) {
                    return redirect()->route('loans.create', [
                        'book_id' => $bookAvailable->id,
                        'title' => $book->title,
                        'author' => $book->author,
                        'ISBN' => $book->ISBN,
                    ])->with('success', __('messages.books.loan_reserve'));
                } else {
                    return redirect()->route('reserves.create', [
                        'book_id' => $book->id,
                        'title' => $book->title,
                        'author' => $book->author,
                        'ISBN' => $book->ISBN,
                    ]);
                }
            }
        }





        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.books.updated'));
    }

    public function destroy(Book $book, BookDestroyAction $action)
    {
        $action($book);

        return redirect()->route('books.index')
            ->with('success', __('messages.books.deleted'));
    }

    public function exportBooks()
    {

        return Excel::download(new BooksExport, 'books.xlsx');
    }

    public function importBooks(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv'
        ]);
        try {
            Excel::import(new BooksImport, $request->file('file'));
            return
            back()->with('success', 'Libros importados correctamente.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error al importar el archivo: ' . $e->getMessage());
        }
    }
}
