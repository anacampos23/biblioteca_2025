<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SetUserAppearance
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
            // Load user settings
            $settings = $request->user()->settings;
            
            // Default value
            $appearance = 'system';
            
            // If settings exist and have an appearance preference, use it
            if ($settings && isset($settings->preferences['appearance'])) {
                $appearance = $settings->preferences['appearance'];
            }
            
            // Share the appearance setting with all Inertia views
            Inertia::share('currentAppearance', $appearance);
            
            // Add a script that sets the appearance in localStorage to ensure it's applied
            // before the page is rendered (similar to how locale is applied)
            Inertia::share('scripts', function () use ($appearance) {
                return [
                    'setAppearance' => "localStorage.setItem('appearance', '$appearance');
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        const isDark = '$appearance' === 'dark' || ('$appearance' === 'system' && prefersDark);
                        document.documentElement.classList.toggle('dark', isDark);",
                ];
            });
        }

        return $next($request);
    }
}
