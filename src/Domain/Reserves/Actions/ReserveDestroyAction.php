<?php

namespace Domain\Reserves\Actions;

use App\Notifications\Disponible;
use Domain\Reserves\Models\Reserve;
use Domain\Users\Models\User;

class ReserveDestroyAction
{
    public function __invoke(Reserve $reserve): void
    {

        // finished -- se elimina y listo
        //contacted -- mira si hay mas reservas con el mismo isbn - si no las hay que ponga el libro en disponible y reserved false
        //waiting -- mira si hay mas reservas con el mismo isbn - si no las hay que ponga reserved en false.

        switch ($reserve->status) {
            case 'finished':
                $reserve->delete();
                break;

            case 'waiting':
                // Primero borramos la reserva
                $reserve->delete();

                // dd($reserve->book_id);

                // Ahora buscamos si quedan otras reservas de ESE MISMO libro (por book_id)
                $otherReserve = Reserve::where('book_id', '=', $reserve->book_id)  // Aquí filtramos directamente por book_id
                    ->where('status', '!=', 'finished')
                    ->where('id', '!=', $reserve->id)
                    ->withoutTrashed()
                    ->exists();

                // dd($otherReserve);

                if (!$otherReserve) {
                    $book = $reserve->book;
                    $book->reserved = false;
                    $book->save();
                }
                break;

            case 'contacted':
                $reserve->delete();

                $otherReserve = Reserve::whereHas('book', function ($query) use ($reserve) {
                    $query->where('ISBN', $reserve->book->ISBN);
                })
                    ->where('status', '!=', 'finished')
                    ->exists();


                if (!$otherReserve) {
                    $book = $reserve->book;
                    $book->available = true;
                    $book->reserved = false;
                    $book->save();
                } else {
                    //Puede ser que la que haya sea waiting o contacted. si es waiting --
                    //ordenadas por created at mire la primera y le mande el email


                    // Buscar la siguiente reserva terminada de este usuario
                    $userNextReserve = Reserve::whereHas('book', function ($query) use ($reserve) {
                        $query->where('ISBN', $reserve->book->ISBN);
                    })
                        // ->where('user_id', $reserve->user_id)
                        ->where('status', '=', 'waiting')
                        ->orderBy('created_at')
                        ->first();

                    if ($userNextReserve) {
                        $user = User::find($userNextReserve->user_id);
                        $user->notify(new Disponible($reserve->book, $user));
                        $userNextReserve->status='contacted';
                        $userNextReserve->save();
                    }

                    break;
                }
        }

    }
}
