<?php

namespace App\Books\Controllers;

use App\Core\Controllers\Controller;
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

class BookController extends Controller
{
    public function index()
    {
        return Inertia::render('books/Index');
    }

    public function show(Request $request, Book $book)
    {
        $zones = Zone::select(['id', 'name', 'floor_id']) ->orderBy('name', 'asc') ->get() -> toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name']) ->get() -> toArray();
        $media=$book->getFirstMediaUrl('image');
        return Inertia::render('books/Show', [
            'book' => $book,
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
        ]);
    }

    public function create()
    {
        $zones = Zone::select(['id', 'name', 'floor_id']) ->orderBy('name', 'asc') ->get() -> toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $bookcases = Bookcase::select(['id', 'bookcase_name']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();

        return Inertia::render('books/Create', [
            'zones' => $zones,
            'floors' => $floors,
            'bookcases' => $bookcases,
            'floor_zone_id' => $floor_zone_id,
        ]);
    }

    public function store(Request $request, BookStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'bookcase_id' => ['required', 'exists:bookcases, id'],
            'zone_id' => ['required', 'exists:zones, id'],
            'floor_id' => ['required', 'exists:floors, id'],
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'number', 'max:255'],
            'editorial' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'number', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('book.index')
            ->with('success', __('messages.books.created'));
    }

    public function edit(Request $request, Book $book)
    {

        $zones = Zone::select(['id', 'name', 'floor_id']) ->orderBy('name', 'asc') ->get() -> toArray();
        $floors = Floor::select(['id', 'floor_number', 'capacity_zones']) ->orderBy('floor_number', 'asc') ->get() -> toArray();
        $floor_zone_id = Bookcase::select(['bookcase_name', 'zone_id', 'floor_id']) ->get() -> toArray();

        return Inertia::render('books/Edit', [
            'zones' => $zones,
            'floors' => $floors,
            'floor_zone_id' => $floor_zone_id,
        ]);
    }

    public function update(Request $request, Book $book, BookUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            'bookcase_id' => ['required', 'exists:bookcases, id'],
            'zone_id' => ['required', 'exists:zones, id'],
            'floor_id' => ['required', 'exists:floors, id'],
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'max:255'],
            'ISBN' => ['required', 'number', 'max:255'],
            'editorial' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'number', 'max:255'],
            'status' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($book, $validator->validated());

        $redirectUrl = route('books.index');

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
}
