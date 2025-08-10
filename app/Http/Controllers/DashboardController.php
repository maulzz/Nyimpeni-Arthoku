<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Models\Account;

class DashboardController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user();
        $account = $user->accounts()->first();
        $balance = $account ? (float) $account->money : 0;
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->orderBy('name')
            ->get();

        $transactions = $user->transactions()
            ->with('category') // Eager load relasi kategori
            ->where('type', 'expense')
            ->latest() // Urutkan dari yang terbaru
            ->take(10) // Ambil 10 data saja
            ->get();
            

        $totalTransactions = $user->transactions()->count();

        return Inertia::render('Dashboard', [
            'balance' => $balance,
            'accountId' => $account->id, 
            'categories' => $categories,
            'transactions' => $transactions,
            'totalTransactions' => $totalTransactions,
            'status' => session('success'), 
        ]);
    }
}
