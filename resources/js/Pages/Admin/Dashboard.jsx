import LineChart from '@/Components/Admin/LineChart';
import StatCard from '@/Components/Admin/StatCard';
import AdminLayout from '@/Layouts/AdminLayout';
import {
    ClipboardDocumentListIcon,
    UserPlusIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats, lineChartData, latestUsers }) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <p className="text-gray-900 dark:text-gray-100">
                            Selamat datang di Panel Admin!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <StatCard
                            title="Total Pengguna"
                            value={stats.totalUsers}
                            icon={<UsersIcon className="h-6 w-6" />}
                        />
                        <StatCard
                            title="Pengguna Baru Bulan Ini"
                            value={stats.newUsersThisMonth}
                            icon={<UserPlusIcon className="h-6 w-6" />}
                        />
                        <StatCard
                            title="Total Transaksi Dibuat"
                            value={stats.totalTransactions}
                            icon={
                                <ClipboardDocumentListIcon className="h-6 w-6" />
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
                        {/* Kolom Kiri (60%): Line Chart */}
                        <div className="rounded-lg bg-white p-6 shadow-lg lg:col-span-4 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                Aktivitas Transaksi (30 Hari Terakhir)
                            </h3>
                            <div className="mt-4">
                                <LineChart chartData={lineChartData} />
                            </div>
                        </div>

                        {/* Kolom Kanan (40%): Pengguna Terbaru */}
                        <div className="rounded-lg bg-white p-6 shadow-lg lg:col-span-2 dark:bg-gray-800">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                10 Pengguna Terbaru
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {latestUsers.map((user) => (
                                    <li
                                        key={user.username}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                            - {user.username}
                                        </span>
                                        
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
