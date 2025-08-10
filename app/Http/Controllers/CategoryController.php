<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
   public function index(Request $request): Response
    {
        $user = $request->user();

        // Ambil kategori default (yang tidak punya user_id)
        $defaultCategories = Category::whereNull('user_id')->orderBy('name')->get();

        // Ambil kategori kustom milik user yang sedang login
        $customCategories = $user->categories()->orderBy('name')->get();

        return Inertia::render('Categories/Index', [
            'defaultCategories' => $defaultCategories,
            'customCategories' => $customCategories,
            'status' => session('success'),
        ]);
    }

    /**
     * Menyimpan kategori baru.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $request->user()->categories()->create([
            'name' => $request->name,
        ]);

        return back()->with('success', [
            'message' => 'Kategori baru berhasil ditambahkan.',
            'key' => uniqid()
        ]);
    }

    /**
     * Mengupdate kategori yang sudah ada.
     */
    public function update(Request $request, Category $category): RedirectResponse
    {
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $request->validate(['name' => 'required|string|max:255']);
        $category->update(['name' => $request->name]);

        return back()->with('success', [
            'message' => 'Kategori berhasil diperbarui.',
            'key' => uniqid()
        ]);
    }

    /**
     * Menghapus kategori.
     */
    public function destroy(Request $request, Category $category): RedirectResponse
    {
        if ($category->user_id !== $request->user()->id) {
            abort(403);
        }

        $category->delete();

        return back()->with('success', [
            'message' => 'Kategori berhasil dihapus.',
            'key' => uniqid()
        ]);
    }
}
