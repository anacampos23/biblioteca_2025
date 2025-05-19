<?php

namespace Domain\Zones\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floors\Models\Floor;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Database\Factories\ZoneFactory;
use Domain\Bookcases\Models\Bookcase;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zone extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
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

     public function bookcases(): HasMany
    {
        return $this->hasMany(Bookcase::class);
    }

      /**
     * Get the floors associated with the zones.
     */
    public function floor(): BelongsTo
    {
        return $this->belongsTo(Floor::class);
    }
}
