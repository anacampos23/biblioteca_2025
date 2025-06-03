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
        return ['id', 'book_id', 'user_id', 'status', 'created_at', 'updated_at', 'deleted_at'];
    }
}
