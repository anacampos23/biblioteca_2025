<?php

namespace App\Settings\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetUserLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated
        if ($request->user()) {
            // Load or create user settings
            $settings = $request->user()->settings;
            
            // If settings exist and have a locale preference, set the application locale
            if ($settings && isset($settings->preferences['locale'])) {
                App::setLocale($settings->preferences['locale']);
            }
        }

        return $next($request);
    }
}
