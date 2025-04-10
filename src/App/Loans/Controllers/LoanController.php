<?php

namespace App\Loans\Controllers;

use App\Core\Controllers\Controller;
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

class LoanController extends Controller
{
    public function index()
    {
        return Inertia::render('loans/Index');
    }


    public function create()
    {
        $books = Book::select(['id', 'title', 'author', 'ISBN']) ->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->orderBy('name', 'asc') ->get() -> toArray();

        return Inertia::render('loans/Create', [
            'users' => $users,
            'books' => $books,
        ]);
    }

    public function store(Request $request, LoanStoreAction $action)
    {
        $validator = Validator::make($request->all(), [
            'book_id' => ['required'],
            'email' => ['required']
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($validator->validated());

        return redirect()->route('loans.index')
            ->with('success', __('messages.loans.created'));
    }

    public function edit(Request $request, Loan $loan)
    {

        $books = Book::select(['id', 'title', 'author', 'ISBN']) ->get() -> toArray();
        $users = User::select(['id', 'name', 'email']) ->orderBy('name', 'asc') ->get() -> toArray();

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
            'newStatus' => [],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator);
        }

        $action($loan, $validator->validated());

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
