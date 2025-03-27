<?php

use App\Floors\Controllers\Api\FloorApiController;
use App\Users\Controllers\Api\UserApiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/users', [UserApiController::class, 'index']);
    Route::get('/users/{user}', [UserApiController::class, 'show']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
});

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/floors', [FloorApiController::class, 'index']);
    Route::get('/floors/{floor}', [FloorApiController::class, 'show']);
    Route::post('/floors', [FloorApiController::class, 'store']);
    Route::put('/floors/{floor}', [FloorApiController::class, 'update']);
    Route::delete('/floors/{floor}', [FloorApiController::class, 'destroy']);
});
