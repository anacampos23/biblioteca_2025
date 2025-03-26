<?php

namespace Domain\Zone\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Floor\Models\Floor;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Zone extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        //ALGO MÁS???
    ];


      /**
     * Get the floors associated with the zones.
     */
    public function floor(): HasMany
    {
        return $this->hasMany(Floor::class);
    }
}
