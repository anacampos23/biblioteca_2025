<?php

namespace App\Exports;

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
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class LoanDurationsExport implements FromQuery, WithMapping, WithHeadings, WithStyles, WithEvents, ShouldAutoSize, WithStrictNullComparison
{

    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
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

    // Evento AfterSheet para manipular la hoja después de generar la tabla
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                $sheet->setCellValue('G9', 'Duración media de los préstamos:');

                $average = $this->query()->get()->avg(function ($loan) {
                    $start = Carbon::parse($loan->start_loan);
                    $end = Carbon::parse($loan->end_loan);
                    return $start->diffInDays($end);
                });


                $sheet->setCellValue('G10', round($average, 2) . ' días');
                $sheet->getColumnDimension('G')->setWidth(32);

                $sheet->getStyle('G9')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'FFD3D3D3'] // amarillo claro
                    ]
                ]);
                $sheet->getStyle('G9:G10')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER
                    ],
                ]);
            }

        ];
    }
}
