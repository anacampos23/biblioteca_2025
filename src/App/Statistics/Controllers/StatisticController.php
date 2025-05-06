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
use Domain\Zones\Models\Zone;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Enums\ZoneEnum;

use function Laravel\Prompts\alert;

class StatisticController extends Controller
{
    // public function index()
    // {
    //     $books = DB::table('books')
    //         ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
    //         ->select('books.ISBN', 'books.title', DB::raw('COUNT(loans.id) as loans_count'))
    //         ->groupBy('books.ISBN', 'books.title')
    //         ->orderByDesc('loans_count')
    //         ->get();




    //     $loans = Loan::withTrashed()
    //         ->with(['book:id,title,author,ISBN'])
    //         ->select(['id', 'start_loan', 'end_loan', 'due_date', 'active', 'user_id', 'book_id'])
    //         ->orderBy('start_loan', 'desc')
    //         ->get()
    //         ->toArray();



    //     return Inertia::render('statistics/Index', [
    //         'loans' => $loans,
    //         'users' => $users,
    //         'books' => $books,
    //         'zones_movement' => $zones_movement,
    //     ]);
    // }

    // Método para mostrar estadísticas de libros
    public function bookIndex()
    {
        $books = DB::table('books')
            ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
            ->select('books.ISBN', 'books.title', DB::raw('COUNT(loans.id) as loans_count'))
            ->groupBy('books.ISBN', 'books.title')
            ->orderByDesc('loans_count')
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

        // Método para mostrar estadísticas de usuarios
        public function userIndex()
        {
            $users = DB::table('users')
            ->leftJoin('loans', 'users.id', '=', 'loans.user_id')
            ->leftJoin('reserves', 'users.id', '=', 'reserves.user_id')
            ->select(
                'users.email',
                'users.name',
                DB::raw('COUNT(DISTINCT loans.id) as loans_count'),
                DB::raw('COUNT(DISTINCT reserves.id) as reserves_count')
            )
            ->groupBy('users.email', 'users.name')
            ->havingRaw('COUNT(DISTINCT loans.id) > 0 OR COUNT(DISTINCT reserves.id) > 0')
            ->orderByDesc('loans_count')
            ->get();

            return Inertia::render('statistics/userIndex', [
                'users' => $users,
            ]);
        }


    // Método para mostrar estadísticas de zonas
    public function zoneIndex()
    {
        $zones_movement = Zone::withTrashed()
        ->leftJoin('books', 'zones.id', '=', 'books.zone_id')
        ->leftJoin('loans', 'books.id', '=', 'loans.book_id')
        ->leftJoin('reserves', 'books.id', '=', 'reserves.book_id')
        ->select(
            'books.zone_id',
            'zones.name as zone_name',
            DB::raw('COUNT(loans.id) as loans_count'),
            DB::raw('COUNT(DISTINCT reserves.id) as reserves_count')
        )
        ->groupBy('books.zone_id', 'zones.name')
        ->orderByDesc('loans_count')
        ->get();

        return Inertia::render('statistics/zoneIndex', [
            'zones_movement' => $zones_movement,
        ]);
    }
}
