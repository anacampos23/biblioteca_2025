<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class notification_email extends Notification implements ShouldQueue
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
            ->line('Tu libro ya está disponible.')
            ->line('"'. $this->book->title . '"'. ' de ' . $this->book->author)
            ->line('Tienes 15 días para pasarte por la biblioteca para recogerlo.')
            ->action('Biblioteca', url('/'))
            ->line('Gracias por utilizar nuestros servicios');
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
