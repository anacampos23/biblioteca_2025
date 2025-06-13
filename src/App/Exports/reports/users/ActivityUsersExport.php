<?php

namespace App\Exports\reports\users;

use App\Exports\reports\users\sheets\UsersDataSheetExport;
use App\Exports\reports\users\sheets\UsersSummarySheetExport;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ActivityUsersExport implements WithMultipleSheets
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
            new UsersDataSheetExport($this->filters),
            new UsersSummarySheetExport($this->filters),
        ];
    }
}
