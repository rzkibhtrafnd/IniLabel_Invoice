<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!Gate::allows('manage-user')) {
            abort(403, 'Unauthorized.');
        }

        return $next($request);
    }
}
