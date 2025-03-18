<?php

use App\Settings\Controllers\AppearanceController;
use App\Settings\Controllers\LanguageController;
use App\Settings\Controllers\PasswordController;
use App\Settings\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/password');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', [AppearanceController::class, 'edit'])->name('settings.appearance');
    Route::put('settings/appearance', [AppearanceController::class, 'update'])->name('settings.appearance.update');

    Route::get('settings/languages', [LanguageController::class, 'edit'])->name('languages.edit');
    Route::put('settings/languages', [LanguageController::class, 'update'])->name('languages.update');
});
