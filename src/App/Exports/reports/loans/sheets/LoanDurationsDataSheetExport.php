<?php

namespace App\Exports\reports\loans\sheets;

use Carbon\Carbon;
use Domain\Books\Actions\BookIndexAction;
use Domain\Loans\Actions\LoanIndexAction;
use Domain\Loans\Models\Loan;
use Domain\Reports\Actions\ReportIndexAction;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class LoanDurationsDataSheetExport implements FromQuery, WithMapping, WithHeadings, WithStyles, WithTitle, ShouldAutoSize, WithStrictNullComparison
{

    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
    }

    public function title(): string
    {
        return 'Datos';
    }

    //Todos los préstamos terminados
    public function query()
    {
        $action = new ReportIndexAction();

        return $action->filteredQuery($this->filters)
            ->where('active', false);
    }

    public function map($loan): array
    {
        $start = Carbon::parse($loan->start_loan)->startOfDay();
        $end = Carbon::parse($loan->end_loan)->startOfDay();

        $duration = round($start->diffInDays($end));

        return [
            $loan->id,
            $start->format('d-m-Y'),
            $end->format('d-m-Y'),
            $duration,
        ];
    }

    public function headings(): array
    {

        return [
            'ID Préstamo',
            'Inicio Préstamo',
            'Finalización Préstamo',
            'Duración Préstamo (días)',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:D1')->getFill()
            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
            ->getStartColor()->setARGB('FFD3D3D3');

        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],
        ];
    }

}
