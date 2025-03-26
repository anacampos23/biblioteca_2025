<?php

namespace Domain\Floor\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zone\Models\Zone;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Floor extends Model
{
    use HasFactory, HasUuids;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
    ];
    

    /**
     * Get the zones associated with the floor.
     */
    public function zone(): HasMany
    {
        return $this->hasMany(Zone::class);
    }

}
