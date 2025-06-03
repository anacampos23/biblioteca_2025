<?php

namespace App\Exports;

use Domain\Reserves\Models\Reserve;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ReservesExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Reserve::all();
    }

    /** Naming the columns */
      public function headings(): array
    {
        return ['id', 'Id del libro', 'Id del usuario', 'Estado', 'Creado el', 'Editado el', 'Eliminado el'];
    }
}
