<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UserAdminController extends Controller
{
    public function index(Request $request): Response
    {

        $users = User::query()
            ->where('role', 'user')
            ->when($request->input('search'), function ($query, $search) {
                $query->where('username', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10) 
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'status' => session('success'),
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Mengupdate nama pengguna.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        if ($user->role === 'admin') {
            abort(403);
        }

        $request->validate(['name' => 'required|string|max:255']);
        $user->update(['name' => $request->name]);

        return back()->with('success', ['message' => 'Nama pengguna berhasil diperbarui.', 'key' => uniqid()]);
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->role === 'admin') {
            abort(403);
        }

        $user->delete();

        return back()->with('success', ['message' => 'Pengguna berhasil dihapus.', 'key' => uniqid()]);
    }
}
