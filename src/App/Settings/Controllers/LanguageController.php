<?php

namespace App\Settings\Controllers;

use Domain\Users\Models\UserSetting;
use App\Core\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LanguageController extends Controller
{
    /**
     * Display the language settings page.
     */
    public function edit()
    {
        // Get available languages
        $languages = [
            'en' => [
                'name' => 'English',
                'flag' => '🇬🇧',
            ],
            'es' => [
                'name' => 'Español',
                'flag' => '🇪🇸',
            ],
        ];

        // Get the user's current language
        $user = auth()->user();
        $settings = $user->settings;
        $currentLocale = $settings && isset($settings->preferences['locale']) 
            ? $settings->preferences['locale'] 
            : config('app.locale');

        return Inertia::render('settings/languages', [
            'languages' => $languages,
            'currentLocale' => $currentLocale,
        ]);
    }

    /**
     * Update the user's language preference.
     */
    public function update(Request $request)
    {
        $request->validate([
            'locale' => 'required|string|in:en,es',
        ]);

        $user = $request->user();
        $settings = $user->settings;

        // Create settings if they don't exist
        if (!$settings) {
            $settings = new UserSetting([
                'preferences' => ['locale' => $request->locale],
            ]);
            $user->settings()->save($settings);
        } else {
            // Update the locale in the preferences array
            $preferences = $settings->preferences;
            $preferences['locale'] = $request->locale;
            $settings->preferences = $preferences;
            $settings->save();
        }

        return redirect()->back()->with('success', __('settings.languages.updated'));
    }
}
