<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Account;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    public function setup()
    {
        return Inertia::render('Profile/SetupBalance');
    }

    // Menyimpan saldo awal
    public function storeInitialBalance(Request $request)
    {

        $request->validate([
            'money' => 'required|numeric|min:0',
        ]);

        $user = Auth::user();

        // Update saldo di akun pertama milik user
        DB::transaction(function () use ($user, $request) {
            $account = $user->accounts()->first();
            $initialAmount = $request->money;

            // 3. BUAT CATATAN TRANSAKSI "PEMASUKAN" BARU
            // Hanya catat jika saldonya lebih dari 0
            if ($initialAmount > 0) {
                $user->transactions()->create([
                    'account_id' => $account->id,
                    'type' => 'income',
                    'amount' => $initialAmount,
                    'description' => 'Saldo Awal', // Deskripsi otomatis
                    'transaction_date' => now(), // Tanggal saat ini
                ]);
            }

            // 4. Update saldo di tabel accounts
            $account->increment('money', $initialAmount);

            // 5. Update status flag di user
            $user->has_set_initial_balance = true;
            $user->save();
        });


        // Arahkan ke dashboard
        return redirect()->route('dashboard');
    }

    public function addBalance(Request $request): RedirectResponse
    {
        // Validasi input
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'account_id' => 'required|exists:accounts,id',
        ]);

        $account = Account::find($validated['account_id']);

        // Otorisasi: Pastikan user hanya bisa menambah saldo ke akun miliknya
        if ($account->user_id !== $request->user()->id) {
            abort(403);
        }

        // Gunakan 'increment' untuk menambah saldo secara aman
        $account->increment('money', $validated['amount']);

        return back()->with('success', [
            'message' => 'Saldo berhasil ditambahkan.',
            'key' => uniqid() // Membuat ID unik setiap saat
        ]);
    }
}
