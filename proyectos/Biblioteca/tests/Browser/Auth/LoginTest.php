<?php

namespace Tests\Browser\Auth;

use Domain\Users\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    use DatabaseMigrations;

    /**
     * Test if the login page renders correctly.
     */
    public function test_login_page_renders_correctly()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->assertSee('Log in to your account')
                ->assertSee('Enter your email and password below to log in')
                ->assertPresent('#email')
                ->assertPresent('#password')
                ->assertPresent('#remember')
                ->assertSeeIn('button[type="submit"]', 'Log in')
                ->assertSeeLink('Forgot password?')
                ->assertSeeLink('Sign up');
        });
    }

    /**
     * Test validation errors for empty form submission.
     */
    public function test_empty_form_submission_shows_validation_errors()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->click('button[type="submit"]')
                ->waitForText('The email field is required')
                ->assertSee('The email field is required')
                ->assertSee('The password field is required');
        });
    }

    /**
     * Test validation error for invalid email format.
     */
    public function test_invalid_email_format_shows_validation_error()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->type('#email', 'invalid-email')
                ->type('#password', 'password123')
                ->click('button[type="submit"]')
                ->waitForText('The email field must be a valid email address')
                ->assertSee('The email field must be a valid email address');
        });
    }

    /**
     * Test successful login with valid credentials.
     */
    public function test_successful_login_with_valid_credentials()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', $user->email)
                ->type('#password', 'password')  // Default password from factory
                ->click('button[type="submit"]')
                ->waitForLocation('/dashboard')
                ->assertPathIs('/dashboard');
        });
    }

    /**
     * Test failed login with invalid password.
     */
    public function test_failed_login_with_invalid_password()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', $user->email)
                ->type('#password', 'wrong-password')
                ->click('button[type="submit"]')
                ->waitForText('These credentials do not match our records')
                ->assertSee('These credentials do not match our records');
        });
    }

    /**
     * Test failed login with non-existent email.
     */
    public function test_failed_login_with_nonexistent_email()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->type('#email', 'nonexistent@example.com')
                ->type('#password', 'password123')
                ->click('button[type="submit"]')
                ->waitForText('These credentials do not match our records')
                ->assertSee('These credentials do not match our records');
        });
    }

    /**
     * Test the remember me functionality.
     */
    public function test_remember_me_functionality()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', $user->email)
                ->type('#password', 'password')
                ->click('#remember')  // Click the remember me checkbox
                ->click('button[type="submit"]')
                ->waitForLocation('/dashboard');

            // Check if the remember_web cookie is present
            $cookies = $browser->driver->manage()->getCookies();
            $hasRememberCookie = false;

            foreach ($cookies as $cookie) {
                if (str_contains($cookie->getName(), 'remember_web')) {
                    $hasRememberCookie = true;
                    break;
                }
            }

            $this->assertTrue($hasRememberCookie, 'Remember cookie was not found');
        });
    }

    /**
     * Test the forgot password link navigation.
     */
    public function test_forgot_password_link_navigation()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->clickLink('Forgot password?')
                ->waitForLocation('/forgot-password')
                ->assertPathIs('/forgot-password');
        });
    }

    /**
     * Test the sign up link navigation.
     */
    public function test_sign_up_link_navigation()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/login')
                ->clickLink('Sign up')
                ->waitForLocation('/register')
                ->assertPathIs('/register');
        });
    }

    /**
     * Test the loading state of the login button during form submission.
     */
    public function test_login_button_shows_loading_state()
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', $user->email)
                ->type('#password', 'password')
                ->click('button[type="submit"]')
                // Check if the loading indicator is present before redirect
                ->assertPresent('.animate-spin');
        });
    }
}
