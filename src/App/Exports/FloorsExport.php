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
        return ['id', 'floor_number', 'capacity_zones', 'created_at', 'updated_at'];
    }
}
