<?php

namespace Domain\Genres\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Books\Models\Book;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\GenreFactory;

class Genre extends Model
{
    use HasFactory, HasUuids;
    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return GenreFactory::new();
    }
    //use HasApiTokens
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'genre_name',
    ];


      /**
     * Get the floors associated with the zones.
     */
    public function books(): BelongsToMany
    {
        return $this->belongsToMany(Book::class, 'book_genre');
    }
}
