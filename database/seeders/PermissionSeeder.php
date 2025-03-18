<?php

namespace Database\Seeders;

use Domain\Permissions\Models\Permission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $user_permission = Permission::create(attributes: [
            'name' => 'users.view',
            'display_name' => 'Ver Usuarios',
            'description' => 'Ver lista de Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => null,
        ]);

        Permission::create(attributes: [
            'name' => 'users.create',
            'display_name' => 'Crear Usuarios',
            'description' => 'Crear Usuarios de la aplicación',
            'guard_name' => 'web',
            'parent_id' => $user_permission->id,
        ]);

        Cache::forever(key: 'permissions', value: Permission::whereNull('parent_id')->with('children')->get());
    }
}
