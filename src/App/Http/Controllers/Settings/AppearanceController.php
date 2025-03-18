<?php

namespace App\Http\Controllers\Settings;

use Domain\Users\Models\UserSetting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppearanceController extends Controller
{
    /**
     * Display the appearance settings page.
     */
    public function edit()
    {
        // Get the user's current appearance setting
        $user = auth()->user();
        $settings = $user->settings;
        $currentAppearance = $settings && isset($settings->preferences['appearance']) 
            ? $settings->preferences['appearance'] 
            : 'system';

        return Inertia::render('settings/appearance', [
            'currentAppearance' => $currentAppearance,
        ]);
    }

    /**
     * Update the user's appearance preference.
     */
    public function update(Request $request)
    {
        $request->validate([
            'appearance' => 'required|string|in:light,dark,system',
        ]);

        $user = $request->user();
        $settings = $user->settings;

        // Create settings if they don't exist
        if (!$settings) {
            $settings = new UserSetting([
                'preferences' => [
                    'locale' => config('app.locale'),
                    'appearance' => $request->appearance
                ],
            ]);
            $user->settings()->save($settings);
        } else {
            // Update the appearance in the preferences array
            $preferences = $settings->preferences;
            $preferences['appearance'] = $request->appearance;
            $settings->preferences = $preferences;
            $settings->save();
        }

        return redirect()->back()->with('success', __('settings.appearance.updated'));
    }
}
