<?php

namespace App\Exports;

use Domain\Zones\Models\Zone;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ZonesExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Zone::all();
    }

    /** Naming the columns */
      public function headings(): array
    {
        return ['id', 'name', 'floor_id', 'created_at', 'updated_at', 'deleted_at'];
    }
}
