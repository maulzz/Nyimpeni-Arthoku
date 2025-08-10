import { useOnClickOutside } from '@/Hooks/useOnClickOutside';
import { useRef, useState } from 'react';
import CategoryIcon from './CategoryIcon';
import { Link } from '@inertiajs/react';

const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

export default function TransactionList({
    transactions,
    totalTransactions,
    onEditClick,
    onDeleteClick,
}) {
    // State untuk melacak menu mana yang sedang terbuka
    const [openMenuId, setOpenMenuId] = useState(null);

    const menuRef = useRef(null);
    useOnClickOutside(menuRef, () => setOpenMenuId(null));

    // Fungsi untuk membuka/menutup menu
    const handleMenuToggle = (transactionId) => {
        setOpenMenuId((prevOpenMenuId) =>
            prevOpenMenuId === transactionId ? null : transactionId,
        );
    };

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pb-24 ">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                Riwayat Pengeluaran Terakhir
            </h3>

            <div className="space-y-3">
                {transactions.map((transaction) => (
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        {/* Bagian Kiri: Ikon, Deskripsi, Kategori */}
                        <div className="flex items-center gap-4">
                            {/* Placeholder untuk ikon kategori */}
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                                <CategoryIcon
                                    categoryName={
                                        transaction.category
                                            ? transaction.category.name
                                            : ''
                                    }
                                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    {transaction.description}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {transaction.category
                                        ? transaction.category.name
                                        : 'Tanpa Kategori'}
                                </p>
                            </div>
                        </div>

                        {/* Bagian Kanan: Nominal dan Tanggal */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="font-bold text-red-600">
                                    {formatCurrency(transaction.amount)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {transaction.transaction_date}
                                </p>
                            </div>

                            <div
                                className="relative"
                                ref={
                                    openMenuId === transaction.id
                                        ? menuRef
                                        : null
                                }
                            >
                                {/* Tombol Tiga Titik SEKARANG MEMANGGIL handleMenuToggle */}
                                <button
                                    onClick={() =>
                                        handleMenuToggle(transaction.id)
                                    }
                                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200 dark:text-gray-200"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                                        />
                                    </svg>
                                </button>

                                {/* Menu Dropdown yang Muncul/Hilang */}
                                {openMenuId === transaction.id && (
                                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                                        <div
                                            className="py-1"
                                            role="menu"
                                            aria-orientation="vertical"
                                        >
                                            {/* Tombol Edit */}
                                            <button
                                                onClick={() => {
                                                    onEditClick(transaction);
                                                    setOpenMenuId(null); // Tutup menu
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                role="menuitem"
                                            >
                                                Edit
                                            </button>
                                            {/* Tombol Delete */}
                                            <button
                                                onClick={() => {
                                                    onDeleteClick(transaction);
                                                    setOpenMenuId(null);
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                                                role="menuitem"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {transactions.length === 0 && (
                    <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-red-600">
                            Belum ada transaksi yang dicatat.
                        </p>
                    </div>
                )}
            </div>

            {totalTransactions > 10 && (
                <div className="mt-6 text-center">
                    <Link
                        href="{route('history.index')" // Nanti akan diarahkan ke halaman riwayat transaksi
                        className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Lihat Selengkapnya
                    </Link>
                </div>
            )}
        </div>
    );
}
