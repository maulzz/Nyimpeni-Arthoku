<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\CarbonPeriod;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;


class DashboardAdminController extends Controller
{
    public function index(): Response
    {
        
        $totalUsers = User::where('role', 'user')->count();
        $newUsersThisMonth = User::where('role', 'user')->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();
        $totalTransactions = Transaction::count();

        $startDate = Carbon::now()->subDays(29)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $transactionsByDay = Transaction::whereBetween('created_at', [$startDate, $endDate])
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('d M');
            })
            ->map(function ($group) {
                return $group->count();
            });

        // Buat rentang tanggal selama 30 hari untuk label chart
        $period = CarbonPeriod::create($startDate, '1 day', $endDate);
        $labels = [];
        $data = [];

        foreach ($period as $date) {
            $formattedDate = $date->format('d M');
            $labels[] = $formattedDate;
            // Jika ada transaksi di tanggal tsb, masukkan jumlahnya. Jika tidak, masukkan 0.
            $data[] = $transactionsByDay->get($formattedDate, 0);
        }

         $latestUsers = User::where('role', 'user')
                         ->latest() 
                         ->take(10) 
                         ->get(['username', 'created_at']);

        // Kirim data ke komponen React
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'newUsersThisMonth' => $newUsersThisMonth,
                'totalTransactions' => $totalTransactions,
                
            ],

            'lineChartData' => [
                'labels' => $labels,
                'data' => $data,
            ],
            'latestUsers' => $latestUsers,
        ]);
    }


}
