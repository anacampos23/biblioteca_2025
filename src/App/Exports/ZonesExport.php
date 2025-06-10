<?php

namespace App\Exports;

use Domain\Zones\Actions\ZoneIndexAction;
use Domain\Zones\Models\Zone;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ZonesExport implements FromQuery, WithHeadings
{
    use Exportable;
    protected $filters;

    public function __construct(?array $filters)
    {
        $this->filters = $filters;
    }

    public function query()
    {
        $action = new ZoneIndexAction();

        return $action->filteredQuery($this->filters);
    }
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
        return ['ID', 'Nombre', 'Id Piso', 'Creado el', 'Actualizado el', 'Eliminado el'];
    }

       /**
     * @param Book $book
     */
    public function map($zone): array
    {
        return [
            $zone->id,
            $zone->name,
            $zone->floor_id,
        ];
    }
}
