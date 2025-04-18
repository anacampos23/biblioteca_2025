<?php

namespace App\Reserves\Controllers;

use App\Core\Controllers\Controller;
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

class ReserveController extends Controller
{
    public function index()
    {
        return Inertia::render('reserves/Index');
    }


    public function create()
    {
        $books = Book::select(['id', 'title', 'author', 'ISBN']) ->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->orderBy('name', 'asc') ->get() -> toArray();

        return Inertia::render('reserves/Create', [
            'users' => $users,
            'books' => $books,
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

        return redirect()->route('reserves.index')
            ->with('success', __('messages.reserves.created'));
    }

    public function edit(Request $request, Reserve $reserve)
    {

        $books = Book::select(['id', 'title', 'author', 'ISBN']) ->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->orderBy('name', 'asc') ->get() -> toArray();

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
