<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SettingsAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings/Index', [
            'isMaintenance' => app()->isDownForMaintenance(),
            'maintenanceSecret' => session('maintenance_secret'),
        ]);
    }

    public function toggleMaintenance(Request $request)
    {
        $request->validate(['status' => 'required|boolean']);
        if ($request->status) {

            $secret = Str::random(16);
            Artisan::call('down', ['--secret' => $secret]);


            return redirect($secret);

        } else {

            Artisan::call('up');

            return redirect()->route('admin.settings.index')->with('success', [
                'message' => 'Mode perbaikan berhasil dinonaktifkan.',
                'key' => uniqid()
            ]);
        }

    }
}
