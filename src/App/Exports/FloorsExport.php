<?php

namespace App\Exports;

use Domain\Floors\Models\Floor;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class FloorsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Floor::all();
    }

    /** Naming the columns */
      public function headings(): array
    {
        return ['ID', 'Número del Piso', 'Capacidad de zonas', 'Creado el', 'Actualizado el'];
    }
}
