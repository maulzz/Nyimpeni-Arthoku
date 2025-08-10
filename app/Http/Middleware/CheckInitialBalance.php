<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckInitialBalance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();

            // Jika user BELUM mengatur saldo awal
            if (!$user->has_set_initial_balance) {
                // Izinkan jika user memang sedang mengakses halaman setup
                if ($request->routeIs(['profile.setup-balance', 'profile.balance.store'])) {
                    return $next($request);
                }
                // Jika mencoba akses halaman lain, paksa redirect ke halaman setup
                return redirect()->route('profile.setup-balance');
            }
            
            // Jika user SUDAH mengatur saldo awal
            else {
                // Jika user mencoba mengakses halaman setup lagi, tendang dia ke dashboard
                if ($request->routeIs(['profile.setup-balance', 'profile.balance.store'])) {
                    return redirect()->route('dashboard');
                }
            }
        }
        return $next($request);
    }
}
