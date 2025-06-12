<?php

namespace App\Reports\Controllers;

use App\Core\Controllers\Controller;
use App\Exports\LoanDurationsExport;
use Carbon\Carbon;
use Domain\Loans\Models\Loan;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class ReportController extends Controller
{
    public function index()
    {
        $lang = Auth::user()->settings ? Auth::user()->settings->preferences['locale'] : 'en';

        return Inertia::render('reports/Index', [
            'lang' => $lang,
        ]);
    }

    public function DurationExport(Request $request)
    {
        $filters = [
            'start_loan_from'=> $request->input('start_loan_from', null),
            'start_loan_to'=> $request->input('start_loan_to', null),
            'end_loan_from'=> $request->input('end_loan_from', null),
            'end_loan_to'=> $request->input('end_loan_to', null),
        ];

        // dd($filters);

        return Excel::download(new LoanDurationsExport($filters), 'loansDuration.xlsx');
    }
}
