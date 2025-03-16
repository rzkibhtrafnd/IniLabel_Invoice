<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Request::macro('canManageUser', function () {
            return auth()->user()?->can('manage-user');
        });
    
        Inertia::share([
            'canManageUser' => fn () => request()->canManageUser(),
        ]);
    }
}
