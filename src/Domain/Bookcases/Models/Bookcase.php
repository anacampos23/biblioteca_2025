<?php

namespace Domain\Bookcases\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Zones\Models\Zone;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Database\Factories\BookcaseFactory;


class Bookcase extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookcaseFactory::new();
    }
    //use HasApiTokens
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'bookcase_name',
        'zone_id',
        'floor_id',
    ];


      /**
     * Get the zones associated with the bookcases.
     */
    public function zone(): BelongsTo
    {
        return $this->belongsTo(Zone::class);
    }
}
