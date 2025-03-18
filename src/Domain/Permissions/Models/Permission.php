<?php

namespace Domain\Permissions\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Models\Permission as SpatiePermission;

/**
 * @property string $display_name
 * @property string $description
 */
class Permission extends SpatiePermission
{
    use HasUuids;

    /**
     * @return HasMany<Permission, $this>
     */
    public function children(): HasMany
    {
        return $this->hasMany(Permission::class, 'parent_id');
    }
}
