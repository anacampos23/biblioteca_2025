<?php

namespace Domain\Floors\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zone\Models\Zone;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\FloorFactory;


class Floor extends Model
{
    use HasFactory, HasUuids;

      /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return FloorFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'capacity_zone'
    ];
    

    /**
     * Get the zones associated with the floor.
     */

    public function zone(): BelongsToMany
    {
        return $this->belongsToMany(Zone::class);
    }

}
