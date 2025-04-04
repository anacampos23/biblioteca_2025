<?php

namespace Domain\Books\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Genres\Models\Genre;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\BookFactory;

class Book extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BookFactory::new();
    }
    //use HasApiTokens
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'author',
        'genre',
        'ISBN',
        'editorial',
        'quantity',
        'status',
        'bookcase_id',
        'zone_id',
        'floor_id',
    ];


      /**
     * Get the floors associated with the zones.
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'book_genre');
    }
}
