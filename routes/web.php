<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\UserAdminController;
use App\Http\Controllers\Admin\SettingsAdminController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware(['auth', 'verified', 'user'])->group(function () {
    Route::get('/dashbard', [DashboardController::class, 'show'])->middleware(['auth', 'verified'])->name('dashboard');
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/profile/setup-balance', [AccountController::class, 'setup'])->name('profile.setup-balance');
    Route::post('/profile/setup-balance', [AccountController::class, 'storeInitialBalance'])->name('profile.balance.store');
    Route::post('/expense', [TransactionController::class, 'store'])->name('expense.store');
    Route::put('/expense/{transaction}', [TransactionController::class, 'update'])->name('expense.update'); // Update transaksi pengeluaran
    Route::delete('/expense/{transaction}', [TransactionController::class, 'destroy'])->name('expense.destroy'); // Hapus transaksi pengeluaran
    Route::post('/account/add-balance', [AccountController::class, 'addBalance'])->name('account.addBalance'); //menambahkan saldo akun

    Route::get('/history', [HistoryController::class, 'index'])->name('history.index');

    //route manajemen kategori
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    //route untuk report
    Route::get('/reports', [ReportController::class, 'index'])
        ->middleware(['auth', 'verified'])
        ->name('reports.index');

});


Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');
        Route::get('/users', [UserAdminController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [UserAdminController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserAdminController::class, 'destroy'])->name('users.destroy');
        Route::get('/settings', [SettingsAdminController::class, 'index'])->name('settings.index');
        Route::post('/settings/maintenance', [SettingsAdminController::class, 'toggleMaintenance'])->name('settings.maintenance');

    });


require __DIR__ . '/auth.php';
