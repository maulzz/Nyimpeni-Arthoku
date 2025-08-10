<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Models\Transaction;
use Illuminate\Validation\Rule;

class TransactionController extends Controller
{
    /**
     * Menyimpan data pengeluaran baru dan mengurangi saldo.
     */
    public function store(Request $request): RedirectResponse
    {
        
        $validated = $request->validate([
            'account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'transaction_date' => 'required|date',
            'type' => ['required', Rule::in(['income', 'expense'])],
            'category_id' => 'required_if:type,expense|nullable|exists:categories,id',
        ]);

        $user = $request->user();
        $account = Account::find($validated['account_id']);
        $amount = $validated['amount'];
        $type = $validated['type'];

        // Cek saldo jika ini adalah pengeluaran
        if ($type === 'expense' && $account->money < $amount) {
            return back()->withErrors(['amount' => 'Saldo tidak mencukupi.']);
        }

        DB::transaction(function () use ($user, $account, $validated, $amount, $type) {
            // 1. Selalu catat transaksi di tabel transactions
            $user->transactions()->create($validated);

            // 2. Sesuaikan saldo di tabel accounts
            if ($type === 'income') {
                $account->increment('money', $amount);
                $message = 'Pemasukan berhasil dicatat.';
            } else {
                $account->decrement('money', $amount);
                $message = 'Pengeluaran berhasil dicatat.';
            }
        });

        $message = $type === 'income' ? 'Pemasukan berhasil dicatat.' : 'Pengeluaran berhasil dicatat.';

        return back()->with('success', [
            'message' => $message,
            'key' => uniqid()
        ]);
    }

    public function update(Request $request, Transaction $transaction): RedirectResponse
    {
        // 1. Otorisasi: Pastikan user hanya bisa mengedit transaksinya sendiri
        if ($transaction->user_id !== $request->user()->id) {
            abort(403, 'UNAUTHORIZED ACTION');
        }

        // 2. Validasi data yang masuk
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'description' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
        ]);

        $account = $transaction->account;
        $originalAmount = $transaction->amount;
        $newAmount = $validated['amount'];
        $difference = $newAmount - $originalAmount;

        // 3. Cek apakah saldo cukup untuk perubahan
        if ($account->money < $difference) {
            return back()->withErrors(['amount' => 'Saldo tidak mencukupi untuk perubahan transaksi ini.']);
        }

        // 4. Gunakan DB Transaction untuk keamanan data
        DB::transaction(function () use ($transaction, $account, $validated, $originalAmount, $newAmount) {
            // Update transaksi dengan data baru yang sudah divalidasi
            $transaction->update($validated);

            // Sesuaikan saldo: kembalikan dulu saldo lama, lalu kurangi dengan saldo baru
            $account->money = $account->money + $originalAmount - $newAmount;
            $account->save();
        });

        return back()->with('success', [
            'message' => 'Transaksi berhasil diperbarui.',
            'key' => uniqid()
        ]);
    }

    public function destroy(Request $request, Transaction $transaction): RedirectResponse
    {
        // 1. Otorisasi: Pastikan user hanya bisa menghapus transaksinya sendiri
        if ($transaction->user_id !== $request->user()->id) {
            abort(403, 'UNAUTHORIZED ACTION');
        }

        // 2. Gunakan DB Transaction untuk keamanan data
        DB::transaction(function () use ($transaction) {
            $account = $transaction->account;
            $amount = $transaction->amount;

            // Kembalikan saldo ke akun
            $account->increment('money', $amount);

            // Hapus catatan transaksi
            $transaction->delete();
        });

        // 3. Kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', [
            'message' => 'Transaksi berhasil dihapus.',
            'key' => uniqid() // Membuat ID unik setiap saat
        ]);
    }
}