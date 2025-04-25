<?php

namespace Domain\Reserves\Actions;

use App\Notifications\Disponible;
use Domain\Reserves\Models\Reserve;

class ReserveDestroyAction
{
    public function __invoke(Reserve $reserve): void
    {
        // Si el estado es 'finished', se elimina directamente
        if ($reserve->status === 'finished') {
            $reserve->delete();
            return; // No hace falta seguir el código después de eliminar
        }

        // Comprobar si hay más reservas con el mismo ISBN y estado diferente de 'finished'
        $otherReserve = Reserve::whereHas('book', function ($query) use ($reserve) {
            $query->where('ISBN', $reserve->book->ISBN);
        })
        ->where('status', '!=', 'finished') // No contar la misma reserva
        ->exists();

        dd($otherReserve);

        // Si no hay más reservas, actualizar el libro
        if (!$otherReserve) {
            $book = $reserve->book;
            $book->reserved = false;
            $book->save();
        }

        // Si el estado es 'contacted', se debe cambiar el libro a disponible y enviar notificación si corresponde
        if ($reserve->status === 'contacted') {
            if (!$otherReserve) {
                $book = $reserve->book;
                $book->available = true;
                $book->save();
            } else {
                // Buscar la siguiente reserva terminada de este usuario
                $userNextReserve = Reserve::whereHas('book', function ($query) use ($reserve) {
                    $query->where('ISBN', $reserve->book->ISBN)
                        ->where('user_id', $reserve->user_id);
                })
                ->where('status', '=', 'waiting')
                ->orderBy('created_at')
                ->first();

                dd($userNextReserve);

                if ($userNextReserve) {
                    $userNextReserve->notify(new Disponible($reserve->book, $userNextReserve));
                }
            }
        }

        // Eliminar la reserva en cualquier caso
        $reserve->delete();
    }
}
