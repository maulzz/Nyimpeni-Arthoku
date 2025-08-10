<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HistoryController extends Controller
{
    /**
     * Menampilkan halaman riwayat transaksi.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Ambil SEMUA transaksi dengan tipe 'income', urutkan dari yang terbaru
        $incomes = $user->transactions()
                        ->where('type', 'income')
                        ->latest()
                        ->get();

        // Ambil SEMUA transaksi dengan tipe 'expense', urutkan dari yang terbaru
        $expenses = $user->transactions()
                         ->where('type', 'expense')
                         ->with('category') // Sertakan data kategori
                         ->latest()
                         ->get();

        return Inertia::render('History/Index', [
            'incomes' => $incomes,
            'expenses' => $expenses,
        ]);
    }
}