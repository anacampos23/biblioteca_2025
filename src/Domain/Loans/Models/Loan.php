<?php


namespace Domain\Loans\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Domain\Users\Models\User;
use Domain\Books\Models\Book;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Database\Factories\LoanFactory;
use Illuminate\Notifications\Notifiable;


class Loan extends Model
{
    use HasFactory, Notifiable, HasUuids;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return LoanFactory::new();
    }
    //use HasApiTokens


    const CREATED_AT = 'start_loan';
    const UPDATED_AT = 'updated_date';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'end_loan',
        'days_overdue',
        'active',
        'user_id',
        'book_id',

    ];




    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }
}
