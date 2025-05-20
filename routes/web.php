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

    // Rutas agrupadas por permiso 'users.view'
    Route::group(['middleware' => ['permission:users.view']], function () {
        Route::resource('users', \App\Users\Controllers\UserController::class);
        Route::resource('floors', \App\Floors\Controllers\FloorController::class);
        Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
        Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
        Route::resource('loans', \App\Loans\Controllers\LoanController::class);
        Route::resource('reserves', \App\Reserves\Controllers\ReserveController::class);
    });

    //Rutas agrupadas por permiso 'products.view'
     Route::group(['middleware' => ['permission:products.view']], function () {
        Route::resource('books', \App\Books\Controllers\BookController::class);
        Route::get('statistics', [\App\Statistics\Controllers\StatisticController::class, 'index']);
    });

     //Rutas agrupadas por permiso 'reports.view'
     Route::group(['middleware' => ['permission:reports.view']], function () {
        Route::get('statistics/userIndex', [\App\Statistics\Controllers\StatisticController::class, 'userIndex'])->name('statistics.userIndex');
        Route::get('statistics/bookIndex', [\App\Statistics\Controllers\StatisticController::class, 'bookIndex'])->name('statistics.bookIndex');
        Route::get('statistics/zoneIndex', [\App\Statistics\Controllers\StatisticController::class, 'zoneIndex'])->name('statistics.zoneIndex');
    });
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
