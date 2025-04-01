<?php

namespace Domain\Floors\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zone\Models\Zone;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\FloorFactory;
use Illuminate\Notifications\Notifiable;

class Floor extends Model
{
    use HasFactory, HasUuids, Notifiable;

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
        'floor_number',
        'capacity_zones'
    ];
    

    /**
     * Get the zones associated with the floor.
     */

    public function zones(): BelongsToMany
    {
        return $this->belongsToMany(Zone::class, 'floor_zone', 'floors_id', 'zones_id');
    }

}
