<?php

namespace Domain\Roles\Models;

use Database\Factories\RoleFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

/**
 * @property string $display_name
 * @property string $name
 * @property int $system
 */
class Role extends SpatieRole
{
    /** @use HasFactory<RoleFactory> */
    use HasFactory, HasUuids;

    protected static function newFactory(): RoleFactory
    {
        return RoleFactory::new();
    }
}
