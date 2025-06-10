<?php

namespace App\Exports;

use Domain\Users\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::all();
    }


    /** Naming the columns */
      public function headings(): array
    {
        return ['ID', 'Nombre', 'Email', 'Email verificado el', 'Creado el', 'Actualizado el', 'Eliminado el'];
    }
}
