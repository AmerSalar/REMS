<?php

use App\Http\Controllers\CalcController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(CalcController::class)->group(function() {
    Route::get('/sum/{n}/{m}', 'sum')->whereNumber(['n','m']);
    Route::get('/subtract/{n}/{m}', 'subtract')->whereNumber(['n','m']);
});
