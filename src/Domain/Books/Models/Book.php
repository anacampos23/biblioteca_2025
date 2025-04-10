<?php

namespace Domain\Books\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Genres\Models\Genre;
use Domain\Loans\Models\Loan;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Book extends Model implements HasMedia
{
    use HasFactory, HasUuids, InteractsWithMedia;
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
        'available',
        'editorial',
        'bookcase_id',
        'zone_id',
        'floor_id',
    ];

    /**
     * Register media conversions for the model.
     *
     * @param \Spatie\MediaLibrary\MediaCollections\Models\Media|null $media
     * @return void
     */
    public function registerMediaConversions(?Media $media = null): void
    {
        // Register a conversion to generate a preview thumbnail
        $this
            ->addMediaConversion('preview')
            ->fit(Fit::Contain, 300, 300)  // Adjust the size as necessary
            ->nonQueued();  // Optionally avoid queuing the conversion (you can remove this if you prefer queuing)
    }

      /**
     * Get the floors associated with the zones.
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'book_genre');
    }


    /**
         * Get the active loans.
         */
        public function loans(): HasMany
        {
            return $this->hasMany(Loan::class);
        }

    /**
         * Get the active loans.
         */
    public function activeLoan(): HasOne
    {
        return $this->hasOne(Loan::class)->where('active', true);
    }
}
