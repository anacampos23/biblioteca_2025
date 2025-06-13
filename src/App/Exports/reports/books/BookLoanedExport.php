<?php

namespace App\Exports\reports\books;

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
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class BookLoanedExport implements FromQuery, WithMapping, WithHeadings, WithStyles, WithEvents, ShouldAutoSize, WithStrictNullComparison
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

        return $action->filteredQuery($this->filters)->with('book');
    }

    public function map($loan): array
    {
        $start = Carbon::parse($loan->start_loan)->startOfDay();
        $end = Carbon::parse($loan->end_loan)->startOfDay();

        $duration = round($start->diffInDays($end));

        $bookTitle = $loan->book ? (string) $loan->book->title : 'Título no encontrado';
        $bookAuthor = $loan->book ? (string) $loan->book->author : 'Autor no encontrado';
        $bookISBN =  $loan->book ? (string) $loan->book->ISBN : 'ISBN no encontrado';

        return [
            $loan->id,
            $start->format('d-m-Y'),
            $end->format('d-m-Y'),
            $duration,
            $loan->book_id,
            $bookTitle,
            $bookAuthor,
            $bookISBN,
        ];
    }

    public function headings(): array
    {

        return [
            'ID Préstamo',
            'Inicio Préstamo',
            'Finalización Préstamo',
            'Duración Préstamo (días)',
            'ID Libro',
            'Título',
            'Autor',
            'ISBN',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('A1:H1')->getFill()
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

                $sheet->setCellValue('K9', 'Total de libros prestados:');

                $loanedTotal = Loan::count();


                $sheet->setCellValue('K10', $loanedTotal);
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
