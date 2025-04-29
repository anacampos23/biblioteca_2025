<?php

namespace App\Reserves\Controllers;

use App\Core\Controllers\Controller;
use App\Notifications\Disponible;
use Domain\Reserves\Actions\ReserveDestroyAction;
use Domain\Reserves\Actions\ReserveIndexAction;
use Domain\Reserves\Actions\ReserveStoreAction;
use Domain\Reserves\Actions\ReserveUpdateAction;
use Domain\Reserves\Models\Reserve;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Domain\Loans\Models\Loan;

class ReserveController extends Controller
{
    public function index()
    {
        return Inertia::render('reserves/Index');
    }


    public function create()
    {
        $books = Book::select(['id', 'title', 'author', 'ISBN']) ->withTrashed()->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->withTrashed() ->orderBy('name', 'asc') ->get() -> toArray();

        // Obtener los préstamos con los usuarios y los libros relacionados
        $ISBN_email = Loan::select('book_id', 'user_id')
            ->where('active', true)
            ->with(['book:id,ISBN', 'user:id,email'])
            ->get()
            ->map(function ($loan) {
                // Transformamos el resultado en un array con 'email' e 'ISBN'
                return [
                    'email' => $loan->user->email,
                    'ISBN' => $loan->book->ISBN,
                ];
            })
            ->toArray();

        // Obtener los préstamos con los usuarios y los libros relacionados
        $ISBN_email_reserve = Reserve::select('book_id', 'user_id')
            ->where('status', '!=', 'finished')
            ->with(['book:id,ISBN', 'user:id,email'])
            ->get()
            ->map(function ($loan) {
                // Transformamos el resultado en un array con 'email' e 'ISBN'
                return [
                    'email' => $loan->user->email,
                    'ISBN' => $loan->book->ISBN,
                ];
            })
            ->toArray();

        return Inertia::render('reserves/Create', [
            'users' => $users,
            'books' => $books,
            'ISBN_email' => $ISBN_email,
            'ISBN_email_reserve' => $ISBN_email_reserve,
        ]);
    }

    public function store(Request $request, ReserveStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required'],
            'ISBN' => ['required'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        // Buscar el libro con el ISBN
        $book = Book::where('id', $request->book_id)
            ->first();
        // Marcar el libro como no disponible
        $book->reserved = true;
        $book->save();

        return redirect()->route('reserves.index')
            ->with('success', __('messages.reserves.created'));
    }

    public function edit(Request $request, Reserve $reserve)
    {

        $books = Book::select(['id', 'title', 'author', 'ISBN'])->withTrashed() ->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->orderBy('name', 'asc') ->withTrashed() ->get() -> toArray();

        return Inertia::render('reserves/Edit', [
            'users' => $users,
            'books' => $books,
        ]);
    }

    public function update(Request $request, Reserve $reserve, ReserveUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            // 'book_id' => ['required', 'exists:books, id'],
            // 'user_id' => ['required', 'exists:users, id'],
            // 'start_reserve' => ['required', 'date'],
            // 'end_reserve' => ['required', 'date'],
            // 'days_overdue' => ['required', 'numeric', 'max:255'],
            // 'active' => ['required', 'boolean'],
            // 'newDueDate' => [],
            // 'newStatus' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($reserve, $validator->validated());

        $redirectUrl = route('reserves.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.reserves.updated'));
    }

    public function destroy(Reserve $reserve, ReserveDestroyAction $action)
    {
        $action($reserve);


        return redirect()->route('reserves.index')
            ->with('success', __('messages.reserves.deleted'));
    }
}
