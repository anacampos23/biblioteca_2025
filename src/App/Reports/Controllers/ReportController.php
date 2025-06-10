<?php

namespace App\Reports\Controllers;

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
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Enums\ZoneEnum;

use function Laravel\Prompts\alert;

class ReportController extends Controller
{
    // Método para mostrar estadísticas de libros
    public function index()
    {
        $books = DB::table('books')
            ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
            ->select('books.ISBN', 'books.title', DB::raw('COUNT(loans.id) as loans_count'))
            ->groupBy('books.ISBN', 'books.title')
            ->orderByDesc('loans_count')
            ->take(10)
            ->get();

            $loans = Loan::withTrashed()
            ->with(['book:id,title,author,ISBN'])
            ->select(['id', 'start_loan', 'end_loan', 'due_date', 'active', 'user_id', 'book_id'])
            ->orderBy('start_loan', 'desc')
            ->get()
            ->toArray();


        return Inertia::render('statistics/bookIndex', [
            'books' => $books,
            'loans' => $loans,
        ]);
    }


}
