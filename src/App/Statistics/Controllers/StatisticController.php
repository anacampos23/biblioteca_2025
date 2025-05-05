<?php

namespace App\Statistics\Controllers;

use App\Core\Controllers\Controller;
use App\Notifications\Disponible;
use App\Notifications\Préstamo;
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
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\alert;

class StatisticController extends Controller
{
    public function index()
{
        $books = Book::select(['id', 'title', 'author', 'ISBN'])->withTrashed()->get()->toArray();
        $users = User::select(['id', 'name', 'email'])->withTrashed()->orderBy('name', 'asc')->get()->toArray();
        $loans = Loan::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'start_loan', 'end_loan', 'due_date', 'active', 'user_id', 'book_id'])
            ->orderBy('start_loan', 'desc')
            ->get()
            ->toArray();

    // Pasamos los datos a la vista Inertia
    return Inertia::render('statistics/Index', [
        'loans' => $loans,
        'users' => $users,
        'books' => $books,
    ]);
}
}
