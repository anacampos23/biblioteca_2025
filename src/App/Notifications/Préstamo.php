<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Préstamo extends Notification
{
    use Queueable;

    protected $book;
    protected $user;


    /**
     * Create a new notification instance.
     */
    public function __construct($book, $user)
    {
        $this->book = $book;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('¡Hola ' . $this->user->name . '!')
            ->line('Este es un correo de confirmación del préstamo.')
            ->line('Actualmente has cogido prestado el libro: "'.  $this->book->title . '"'. ' de ' . $this->book->author)
            ->line('Recuerda que tienes hasta 30 días para poder disfrutarlo.')
            ->action('Biblioteca', url('/'))
            ->line('Cualquier duda estamos a tu disposición.')
            ->line('Gracias por utilizar nuestros servicios.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
