<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $filter = $request->input('filter', 'this_month');
        [$startDate, $endDate] = $this->getDateRange($filter);

        $transactions = $user->transactions()->whereBetween('transaction_date', [$startDate, $endDate])->get();

        // --- Hitung Kartu Statistik Utama ---
        $totalIncome = $transactions->where('type', 'income')->sum('amount');
        $totalExpense = $transactions->where('type', 'expense')->sum('amount');
        $netCashFlow = $totalIncome - $totalExpense;

        // --- Siapkan Data untuk Pie Chart ---
        $pieChartData = $transactions->where('type', 'expense')
            ->groupBy('category_id')->map(fn($group) => $group->sum('amount'))
            ->map(function ($total, $categoryId) {
                $category = \App\Models\Category::find($categoryId);
                return ['category' => $category ? $category->name : 'Tanpa Kategori', 'total' => $total];
            })->sortByDesc('total')->values();

        // --- Siapkan Data untuk Bar Chart ---
        $barChartData = $this->getBarChartData($filter, $transactions);

        // --- Siapkan Data untuk Daftar Teratas ---
        $expenseTransactions = $transactions->where('type', 'expense');
        $topCategories = $pieChartData->take(5);

        $topExpenses = $expenseTransactions->sortByDesc('amount')->take(5)->values()->map(function ($tx) {
            return [
                'description' => $tx->description,
                'amount' => (float) $tx->amount,
            ];
        });

        return Inertia::render('Reports/Index', [
            'stats' => [
                'totalIncome' => (float) $totalIncome,
                'totalExpense' => (float) $totalExpense,
                'netCashFlow' => (float) $netCashFlow,
                'filter' => $filter,
                'period' => $startDate->isoFormat('D MMM YYYY') . ' - ' . $endDate->isoFormat('D MMM YYYY'),
            ],
            'pieChartData' => $pieChartData,
            'barChartData' => $barChartData, 
            'topCategories' => $topCategories, 
            'topExpenses' => $topExpenses,
        ]);
    }

    private function getDateRange(string $filter): array
    {
        return match ($filter) {
            'last_month' => [Carbon::now()->subMonth()->startOfMonth(), Carbon::now()->subMonth()->endOfMonth()],
            'this_year' => [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()],
            default => [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()],
        };
    }

    // Fungsi baru untuk data bar chart
    private function getBarChartData(string $filter, $transactions): array
    {
        if ($filter === 'this_year') {
            // Logika untuk TAHUNAN (per bulan)
            $labels = collect(range(1, 12))->map(fn($month) => Carbon::create()->month($month)->shortMonthName)->toArray();
            $incomeData = array_fill(0, 12, 0);
            $expenseData = array_fill(0, 12, 0);

            $grouped = $transactions->groupBy(fn($tx) => Carbon::parse($tx->transaction_date)->month - 1);

            foreach ($grouped as $monthIndex => $group) {
                $incomeData[$monthIndex] = $group->where('type', 'income')->sum('amount');
                $expenseData[$monthIndex] = $group->where('type', 'expense')->sum('amount');
            }
        } else {
            // Logika untuk BULANAN (per minggu)
            $labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
            $incomeData = array_fill(0, 4, 0);
            $expenseData = array_fill(0, 4, 0);

            foreach ($transactions as $tx) {
                $day = Carbon::parse($tx->transaction_date)->day;
                $weekIndex = ($day <= 7) ? 0 : (($day <= 14) ? 1 : (($day <= 21) ? 2 : 3));
                if ($tx->type === 'income') {
                    $incomeData[$weekIndex] += $tx->amount;
                } else {
                    $expenseData[$weekIndex] += $tx->amount;
                }
            }
        }
        return ['labels' => $labels, 'incomeData' => $incomeData, 'expenseData' => $expenseData];
    }
}