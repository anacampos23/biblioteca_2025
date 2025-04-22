<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
use App\Notifications\notification_email;
use Carbon\Carbon;
use Domain\Loans\Actions\LoanDestroyAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Actions\LoanStoreAction;
use Domain\Loans\Actions\LoanUpdateAction;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Domain\Reserves\Models\Reserve;

use function Laravel\Prompts\alert;

class LoanController extends Controller
{
    public function index()
    {
        return Inertia::render('loans/Index');
    }


    public function create()
    {
        $books = Book::select(['id', 'title', 'author', 'ISBN'])->get()->toArray();
        $users = User::select(['id', 'name', 'email'])->orderBy('name', 'asc')->get()->toArray();
        $ISBN_available = Book::select(['id', 'ISBN'])
            ->where('available', true)
            ->get()
            ->toArray();

        return Inertia::render('loans/Create', [
            'users' => $users,
            'books' => $books,
            'ISBN_available' => $ISBN_available,
        ]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {
        // Validación de los datos del formulario
        $validator = Validator::make($request->all(), [
            'email' => ['required'],
            'book_id' => [],
            'ISBN' => ['required'],
        ]);

        // Si la validación falla, devolvemos los errores
        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        // Buscar el libro con el ISBN y que esté disponible
        $book = Book::where('ISBN', $request->ISBN)
            ->first();

        // Si no se encuentra el libro disponible con ese ISBN, lanzamos un error
        if (!$book) {
            return back()->withErrors(['ISBN' => 'El libro con ese ISBN no está disponible.']);
        }

        // Crear el préstamo
        $loan = $action($validator->validated());

        // Marcar el libro como no disponible
        $book->available = false;
        $book->save();

        // Redirigir después de crear el préstamo
        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }


    public function edit(Request $request, Loan $loan)
    {

        $books = Book::select(['id', 'title', 'author', 'ISBN'])->get()->toArray();
        $users = User::select(['id', 'name', 'email'])->orderBy('name', 'asc')->get()->toArray();

        return Inertia::render('loans/Edit', [
            'users' => $users,
            'books' => $books,
        ]);
    }

    public function update(Request $request, Loan $loan, LoanUpdateAction $action)
    {
        $validator = Validator::make($request->all(), [
            // 'book_id' => ['required', 'exists:books, id'],
            // 'user_id' => ['required', 'exists:users, id'],
            // 'start_loan' => ['required', 'date'],
            // 'end_loan' => ['required', 'date'],
            // 'days_overdue' => ['required', 'numeric', 'max:255'],
            // 'active' => ['required', 'boolean'],
            'newDueDate' => [],
            'newStatus' => [],
            'newReturned' => [],
        ]);


        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

        // Obtén el book_id y el user_id del préstamo
        $bookId = $loan->book_id;
        $userId = $loan->user_id;

        $reserves = Reserve::select(['user_id', 'book_id'])
            ->where('book_id', $bookId)
            ->get()
            ->first(); // Obtiene la primera reserva que cumpla con el criterio

        if (isset($reserves)) {

            $user = User::select(['id', 'name', 'email'])
            ->where('id', $userId)
            ->get()
            ->first(); // Obtiene la primera reserva que cumpla con el criterio
            $user->notify(new notification_email);
        }

        $redirectUrl = route('loans.index');

        // Añadir parámetros de página a la redirección si existen
        if ($request->has('page')) {
            $redirectUrl .= "?page=" . $request->query('page');
            if ($request->has('perPage')) {
                $redirectUrl .= "&per_page=" . $request->query('perPage');
            }
        }

        return redirect($redirectUrl)
            ->with('success', __('messages.loans.updated'));
    }

    public function destroy(Loan $loan, LoanDestroyAction $action)
    {
        $action($loan);

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.deleted'));
    }
}
