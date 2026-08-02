<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DepartmentController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProductController;

Route::apiResource('departments', DepartmentController::class);

Route::get('/{n}/{m}', function (float $n, float $m) {
    return $n+$m;
})->whereNumber(['n', 'm']);


Route::post('/register', [RegisterController::class, 'register']);

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully',
            'user' => Auth::user(),
        ], 200);
    }

    return response()->json([
        'message' => 'Invalid credentials',
    ], 401);
});

Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Logged out successfully',
    ], 200);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::controller(ProductController:: class)->group(function () {
  Route::get('/product', 'index');
//   url + action inside of the controller 
});
