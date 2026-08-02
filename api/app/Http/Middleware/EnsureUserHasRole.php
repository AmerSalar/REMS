<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // 1. Ensure user is logged in
        if (! $request->user()) {
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }

        // 2. Check if user's role is in the list of allowed roles for this route
        if (! in_array($request->user()->role, $roles)) {
            return response()->json([
                'message' => 'Unauthorized action. You do not have permission to access this resource.'
            ], 403); // 403 Forbidden
        }

        return $next($request);
    }
}
