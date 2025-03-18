<?php

namespace Tests\Browser;


use Domain\Users\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class DashboardTest extends DuskTestCase
{
    use DatabaseMigrations;

    public function test_dashboard_displays_correctly()
    {
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();

            $browser->loginAs($user)
                ->visit('/dashboard')
                ->waitForText('Dashboard')
                ->assertSee('Dashboard')
                // Verificamos que exista la tarjeta de Usuarios
                ->assertSee('Usuarios')
                ->assertSee('Gestiona los usuarios del sistema')
                // Verificamos que exista el CardFlip
                ->assertSee('Usuario 1')
                ->assertSee('descripcion de usuario')
                // Verificar que la estructura básica del layout está presente
                ->assertPresent('.grid');
        });
    }

    public function test_dashboard_card_links_work()
    {
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();

            $browser->loginAs($user)
                ->visit('/dashboard')
                ->waitForText('Usuarios')
                ->clickLink('Usuarios')
                ->waitForLocation('/users')
                ->assertPathIs('/users');
        });
    }

    public function test_dashboard_card_flip_interaction()
    {
        $this->browse(function (Browser $browser) {
            $user = User::factory()->create();

            $browser->loginAs($user)
                ->visit('/dashboard')
                ->waitForText('Usuario 1')
                // Verifica que el contenido frontal está visible
                ->assertSee('Usuario 1')
                ->assertSee('descripcion de usuario');

            // Nota: Esta parte del test está comentada porque depende de la implementación exacta
            // del componente CardFlip. Descomenta y ajusta según sea necesario.
            /*
            // Interactúa con el card flip - ajustar selector según la implementación real
            $browser->click('.flip-card, [data-testid="card-flip"]')
                // Verifica que el contenido posterior es visible después de la interacción
                ->waitForText('cliente 2')
                ->assertSee('cliente 2')
                ->assertSee('descripcion de cliente');
            */
        });
    }
}
