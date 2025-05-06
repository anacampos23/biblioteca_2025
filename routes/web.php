<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class);
    Route::resource('floors', \App\Floors\Controllers\FloorController::class);
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
    Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
    Route::resource('books', \App\Books\Controllers\BookController::class);
    Route::get('books/{book}', [\App\Books\Controllers\BookController::class, 'show'])->name('books.show');
    Route::resource('loans', \App\Loans\Controllers\LoanController::class);
    Route::resource('reserves', \App\Reserves\Controllers\ReserveController::class);

    //Statistics routes
    Route::get('statistics', [\App\Statistics\Controllers\StatisticController::class, 'index'])->name('statistics.index');
    Route::get('statistics/userIndex', [\App\Statistics\Controllers\StatisticController::class, 'userIndex'])->name('statistics.userIndex');
    Route::get('statistics/bookIndex', [\App\Statistics\Controllers\StatisticController::class, 'bookIndex'])->name('statistics.bookIndex');
    Route::get('statistics/zoneIndex', [\App\Statistics\Controllers\StatisticController::class, 'zoneIndex'])->name('statistics.zoneIndex');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
