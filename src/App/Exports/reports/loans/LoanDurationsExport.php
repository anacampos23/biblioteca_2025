<?php

namespace App\Exports\reports\loans;

use App\Exports\reports\loans\sheets\LoanDurationsDataSheetExport;
use App\Exports\reports\loans\sheets\LoanDurationsStatisticSheetExport;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class LoanDurationsExport implements WithMultipleSheets
{
    use Exportable;

    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
    }


    public function sheets(): array
    {
        return [
            new LoanDurationsDataSheetExport($this->filters),
            new LoanDurationsStatisticSheetExport($this->filters),
        ];
    }
}
