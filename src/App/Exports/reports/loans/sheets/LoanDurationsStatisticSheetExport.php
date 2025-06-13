<?php

namespace App\Exports\reports\loans\sheets;

use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

class LoanDurationsStatisticSheetExport implements WithStyles, WithEvents, ShouldAutoSize, WithStrictNullComparison, WithTitle
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

                $sheet->setCellValueExplicit(
                    'G10',
                    "=AVERAGE('Préstamos'!D2:D1048576)",
                    DataType::TYPE_FORMULA
                );

                $sheet->getColumnDimension('G')->setWidth(32);

                $sheet->getStyle('G9')->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'FFD3D3D3']
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
