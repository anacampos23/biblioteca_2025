<?php

namespace App\Exports;

use Domain\Bookcases\Models\Bookcase;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BookcasesExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Bookcase::all();
    }

    /** Naming the columns */
      public function headings(): array
    {
        return ['id', 'Nombre de la estantería', 'Id de la zona', 'Id del piso', 'Creado el', 'Editado el'];
    }
}
