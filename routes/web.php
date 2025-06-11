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

        //Rutas agrupadas por permiso 'products.view'
    Route::group(['middleware' => ['permission:products.view']], function () {
        Route::get('books/search', [\App\Books\Controllers\BookController::class, 'searchBook']);
    });

    // Rutas agrupadas por permiso 'users.view'
    Route::group(['middleware' => ['permission:users.view']], function () {
        Route::get('users/export', [\App\Users\Controllers\UserController::class, 'exportUsers'])->name('users.export');
        Route::get('floors/export', [\App\Floors\Controllers\FloorController::class, 'exportFloors'])->name('floors.export');
        Route::get('zones/export', [\App\Zones\Controllers\ZoneController::class, 'exportZones'])->name('zones.export');
        Route::get('bookcases/export', [\App\Bookcases\Controllers\BookcaseController::class, 'exportBookcases'])->name('bookcases.export');
        Route::get('books/export', [\App\Books\Controllers\BookController::class, 'exportBooks'])->name('books.export');
        Route::get('loans/export', [\App\Loans\Controllers\LoanController::class, 'exportLoans'])->name('loans.export');
        Route::get('reserves/export', [\App\Reserves\Controllers\ReserveController::class, 'exportReserves'])->name('reserves.export');
        Route::get('reports/loanDuration/export', [\App\Loans\Controllers\LoanController::class, 'DurationExport'])->name('loans.duration.export');
        Route::post('books/import', [\App\Books\Controllers\BookController::class, 'importBooks'])->name('books.import');
        Route::resource('users', \App\Users\Controllers\UserController::class);
        Route::resource('floors', \App\Floors\Controllers\FloorController::class);
        Route::resource('zones', \App\Zones\Controllers\ZoneController::class);
        Route::resource('bookcases', \App\Bookcases\Controllers\BookcaseController::class);
        Route::resource('loans', \App\Loans\Controllers\LoanController::class);
        Route::resource('reserves', \App\Reserves\Controllers\ReserveController::class);
        Route::resource('books', \App\Books\Controllers\BookController::class);
        Route::get('statistics', [\App\Statistics\Controllers\StatisticController::class, 'index']);
        Route::get('reports', [\App\Reports\Controllers\ReportController::class, 'index']);

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
