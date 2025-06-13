<?php

namespace App\Exports\reports\users\sheets;

use Carbon\Carbon;
use Domain\Books\Actions\BookIndexAction;
use Domain\Books\Models\Book;
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

class UsersSummarySheetExport implements WithStyles, WithEvents, ShouldAutoSize, WithStrictNullComparison, WithTitle
{

    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
    }

    public function title(): string
    {
        return 'Resumen';
    }


    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:G1')->getFill()
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

                $sheet->setCellValue('K9', 'Total de usuarios activos:');

                $activeUsers = Loan::distinct('user_id')->count('user_id');


                $sheet->setCellValue('K10', $activeUsers);
                $sheet->getColumnDimension('K')->setWidth(32);

                $sheet->getStyle('K9')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'FFD3D3D3']
                    ]
                ]);
                $sheet->getStyle('K9:K10')->applyFromArray([
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER
                    ],
                ]);
            }

        ];
    }
}
