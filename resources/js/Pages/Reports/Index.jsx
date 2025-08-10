import BarChart from '@/Components/BarChart';
import PieChart from '@/Components/PieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

// Helper function untuk format mata uang
const formatCurrency = (number) => {
    // Pastikan nilai default adalah 0 jika input tidak valid
    const num = parseFloat(number);
    if (isNaN(num)) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(0);
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(num);
};

export default function Index({
    auth,
    stats,
    pieChartData,
    barChartData,
    topCategories,
    topExpenses,
}) {
    // Fungsi untuk mengubah filter dan memuat ulang data
    const handleFilterChange = (newFilter) => {
        router.get(
            route('reports.index'),
            { filter: newFilter },
            {
                preserveState: true, // Jaga state komponen (misal: scroll position)
                preserveScroll: true, // Jaga posisi scroll
            },
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Laporan & Statistik
                </h2>
            }
        >
            <Head title="Laporan & Statistik" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Filter Waktu */}
                    <div className="flex flex-wrap space-x-2 rounded-lg bg-white p-2 dark:bg-gray-800">
                        <button
                            onClick={() => handleFilterChange('this_month')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${stats.filter === 'this_month' ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                        >
                            Bulan Ini
                        </button>
                        <button
                            onClick={() => handleFilterChange('last_month')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${stats.filter === 'last_month' ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                        >
                            Bulan Lalu
                        </button>
                        <button
                            onClick={() => handleFilterChange('this_year')}
                            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${stats.filter === 'this_year' ? 'bg-primary text-white shadow' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                        >
                            Tahun Ini
                        </button>
                        {/* Tombol custom bisa ditambahkan di sini nanti */}
                    </div>
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Menampilkan data untuk periode {stats.period}{' '}
                    </p>

                    {/* Kartu Statistik Utama */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">
                                Total Pemasukan
                            </h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {formatCurrency(stats.totalIncome)}
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-sm font-medium text-red-600 dark:text-red-400">
                                Total Pengeluaran
                            </h3>
                            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                                {formatCurrency(stats.totalExpense)}
                            </p>
                        </div>
                        <div
                            className={`rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800`}
                        >
                            <h3
                                className={`text-sm font-medium ${stats.netCashFlow >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-500'}`}
                            >
                                Arus Kas Bersih
                            </h3>
                            <p
                                className={`mt-2 text-2xl font-bold ${stats.netCashFlow >= 0 ? 'text-gray-900 dark:text-gray-100' : 'text-orange-500'}`}
                            >
                                {formatCurrency(stats.netCashFlow)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                        {/* Kolom Kiri (40%): Pie Chart */}
                        <div className="rounded-lg bg-white p-4 shadow-sm lg:col-span-2 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Rincian Pengeluaran
                            </h3>
                            <div className="mx-auto mt-4 max-w-xs">
                                {pieChartData.length > 0 ? (
                                    <PieChart chartData={pieChartData} />
                                ) : (
                                    <p className="py-10 text-center text-gray-500">
                                        Tidak ada data pengeluaran untuk periode
                                        ini.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Kolom Kanan (60%): Bar Chart */}
                        <div className="rounded-lg bg-white p-4 shadow-sm lg:col-span-3 dark:bg-gray-800">
                            {/* Bar Chart akan merender di sini */}
                            <BarChart chartData={barChartData} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Kolom Kiri: Daftar Kategori Teratas */}
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Kategori Pengeluaran Teratas
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {topCategories.length > 0 ? (
                                    topCategories.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">
                                                {item.category}
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {formatCurrency(item.total)}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Tidak ada data.
                                    </p>
                                )}
                            </ul>
                        </div>

                        {/* Kolom Kanan: Daftar Pengeluaran Teratas */}
                        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                5 Pengeluaran Terbesar
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {topExpenses.length > 0 ? (
                                    topExpenses.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="truncate pr-4 text-gray-700 dark:text-gray-300">
                                                {item.description}
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {formatCurrency(item.amount)}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Tidak ada data.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
