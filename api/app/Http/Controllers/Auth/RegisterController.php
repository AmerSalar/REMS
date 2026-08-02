<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validate request data
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
            'role' => ['nullable', 'string', 'in:employee,manager,admin'], // Adjust allowed roles as needed
        ]);

        // 2. Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'employee', // Default to employee if not passed
        ]);

        // 3. Log the user in to create a stateful session (Sanctum)
        Auth::login($user);

        // 4. Return success response with user data
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }
}
