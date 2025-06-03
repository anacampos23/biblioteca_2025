<?php

namespace App\Exports;

use Domain\Loans\Models\Loan;
use Domain\Zones\Models\Zone;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class LoansExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Loan::all()->map(function ($loan) {
            return [
                $loan->id,
                $loan->start_loan,
                $loan->end_loan,
                $loan->due_date,
                $loan->active ? 'Verdadero' : 'Falso',
                $loan->user_id,
                $loan->book_id,
                $loan->updated_date,
                $loan->deleted_at,
            ];
        });;
    }

    /** Naming the columns */
      public function headings(): array
    {
        return ['id', 'Inicio préstamo', 'Final préstamo', 'Día vencimiento', 'Activo', 'Id del usuario', 'Id del libro', 'Editado el', 'Eliminado el'];
    }
}
