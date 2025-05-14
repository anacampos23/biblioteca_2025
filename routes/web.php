<?php

use Illuminate\Routing\Middleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('users', \App\Users\Controllers\UserController::class)->middleware('permission:users.view');
    Route::resource('floors', \App\Floors\Controllers\FloorController::class)->middleware('permission:users.view');
    Route::resource('zones', \App\Zones\Controllers\ZoneController::class)->middleware('permission:users.view');
    Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class)->middleware('permission:users.view');
    Route::resource('books', \App\Books\Controllers\BookController::class)->middleware('permission:products.view');
    Route::get('books/{book}', [\App\Books\Controllers\BookController::class, 'show'])->name('books.show')->middleware('permission:products.view');
    Route::resource('loans', \App\Loans\Controllers\LoanController::class)->middleware('permission:users.view');
    Route::resource('reserves', \App\Reserves\Controllers\ReserveController::class)->middleware('permission:users.view');

    //Statistics routes
    Route::get('statistics', [\App\Statistics\Controllers\StatisticController::class, 'index'])->name('statistics.index')->middleware('permission:reports.view');
    Route::get('statistics/userIndex', [\App\Statistics\Controllers\StatisticController::class, 'userIndex'])->name('statistics.userIndex')->middleware('permission:reports.view');
    Route::get('statistics/bookIndex', [\App\Statistics\Controllers\StatisticController::class, 'bookIndex'])->name('statistics.bookIndex')->middleware('permission:reports.view');
    Route::get('statistics/zoneIndex', [\App\Statistics\Controllers\StatisticController::class, 'zoneIndex'])->name('statistics.zoneIndex')->middleware('permission:reports.view');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
