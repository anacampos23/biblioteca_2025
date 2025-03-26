<?php

namespace Database\Seeders;

use Domain\Roles\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        Role::create([
            'name' => 'admin',
            'display_name' => 'Administrador',
            'description' => 'Administrador de la aplicación',
            'guard_name' => 'web',
            'system' => true,
        ])->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'reports.view',
            'reports.export',
            'reports.print',
            'config.access',
            'config.modify',
        ]);

        Role::create([
            'name' => 'usuario',
            'display_name' => 'Usuario Básico',
            'description' => 'Usuario de uso general',
            'guard_name' => 'web',
            'system' => true,
        ])->givePermissionTo([
            'users.view',
            'products.view',
            'config.access',
            'config.modify',
        ]);

        Role::create([
            'name' => 'advanced',
            'display_name' => 'Usuario Avanzado',
            'description' => 'Usuario con permisos adicionales',
            'guard_name' => 'web',
            'system' => true,
        ])->givePermissionTo([
            'users.view',
            'users.create',
            'users.edit',
            'products.view',
            'products.create',
            'products.edit',
            'config.access',
            'config.modify',
        ]);

    }
}
