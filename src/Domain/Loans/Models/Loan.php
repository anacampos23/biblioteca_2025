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
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Loan extends Model
{
    use HasFactory, Notifiable, HasUuids, SoftDeletes;

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
        'due_date',
        'active',
        'user_id',
        'book_id',

    ];




    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->withTrashed();
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    /**
     * Get the number of days the loan is overdue.
     */
    public function getDaysOverdueAttribute(): int
{
    if (!$this->end_loan) {
        // El libro no ha sido devuelto, entonces comparamos con la fecha de hoy
        $dueDate = Carbon::parse($this->due_date);
        $today = Carbon::now();

        // Si la fecha de vencimiento ya pasó y el libro aún no se ha devuelto, calculamos el retraso
        return $dueDate->lt($today)
            ? $dueDate->diffInDays($today) // Diferencia entre due_date y hoy
            : 0; // Si no ha pasado el plazo, no hay retraso
    }

    // Si el libro ya ha sido devuelto, calculamos el retraso entre end_loan y due_date
    $endLoanDate = Carbon::parse($this->end_loan);
    $dueDate = Carbon::parse($this->due_date);

    return $dueDate->lt($endLoanDate)
        ? $dueDate->diffInDays($endLoanDate) // Si la devolución es después de la fecha de vencimiento
        : 0; // Si no hay retraso, devolvemos 0
}
}
