<?php

namespace App\Providers;

use Domain\Users\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->commands([
            \App\Console\Commands\MigratePulseCommand::class,
        ]);

//        if (app()->environment('local')) {
//            // Verificar si no hay usuario autenticado
//            if (!Auth::check()) {
//                // Buscar o crear el usuario por defecto
//                $user = User::firstOrCreate(
//                    ['email' => 'admin@example.com'],
//                    [
//                        'name' => 'Usuario Default',
//                        'email' => 'admin@example.com',
//                        'password' => bcrypt('password'),
//                        // Agrega aquí cualquier otro campo requerido en tu tabla users
//                    ]
//                );
//
//                // Realizar el login
//                Auth::login($user);
//            }
//        }
    }
}
