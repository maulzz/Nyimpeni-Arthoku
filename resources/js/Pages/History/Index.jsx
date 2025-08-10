import CategoryIcon from '@/Components/CategoryIcon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';

export default function Index({ auth, incomes, expenses }) {
    // Helper function untuk format mata uang
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(parseFloat(number) || 0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Riwayat Transaksi
                </h2>
            }
        >
            <Head title="Riwayat Transaksi" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-8 sm:px-6 lg:px-8">
                    {/* Bagian Pemasukan */}
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Riwayat Pemasukan
                        </h3>
                        <div className="mt-4 space-y-3">
                            {incomes.length > 0 ? (
                                incomes.map((income) => (
                                    <div
                                        key={income.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        {/* BAGIAN KIRI: Deskripsi & Kategori */}
                                        <div className="flex items-center gap-4">
                                            {/* Placeholder Ikon */}
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:flex dark:bg-gray-700">
                                                <BanknotesIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {income.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* BAGIAN KANAN: Nominal & Tanggal */}
                                        <div className="text-right">
                                            <p className="font-bold text-green-600 dark:text-green-500">
                                                {formatCurrency(income.amount)}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {income.transaction_date}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    Belum ada riwayat pemasukan.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Bagian Pengeluaran */}
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        {/* Kita panggil komponen TransactionList yang sudah ada */}
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Riwayat Pengeluaran
                        </h3>

                        <div className="mt-4 space-y-3">
                            {expenses.length > 0 ? (
                                expenses.map((expense) => (
                                    <div
                                        key={expense.id}
                                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        {/* BAGIAN KIRI: Deskripsi & Kategori */}
                                        <div className="flex items-center gap-4">
                                            {/* Placeholder Ikon */}
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:flex dark:bg-gray-700">
                                                <CategoryIcon
                                                    categoryName={
                                                        expense.category
                                                            ? expense.category
                                                                  .name
                                                            : ''
                                                    }
                                                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {expense.description}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {expense.category
                                                        ? expense.category.name
                                                        : 'Tanpa Kategori'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* BAGIAN KANAN: Nominal & Tanggal */}
                                        <div className="text-right">
                                            <p className="font-bold text-red-600 dark:text-red-500">
                                                {formatCurrency(expense.amount)}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {expense.transaction_date}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">
                                    Belum ada riwayat pengeluaran.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
