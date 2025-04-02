<?php

namespace Domain\Zones\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Database\Factories\ZoneFactory;

class Zone extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return ZoneFactory::new();
    }
    //use HasApiTokens
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'floor_id',
    ];


      /**
     * Get the floors associated with the zones.
     */
    // Definir la relación muchos a muchos con Floors
    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }
}
