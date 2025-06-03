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
        return ['id', 'name', 'email', 'email_verified_at', 'created_at', 'updated_at', 'deleted_at'];
    }
}
