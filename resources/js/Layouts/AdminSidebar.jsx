// resources/js/Layouts/AdminSidebar.jsx

import NavLinkAdmin from '@/Components/Admin/NavLinkAdmin';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import { useTheme } from '@/Context/ThemeContext';
import {
    ArrowLeftOnRectangleIcon,
    HomeIcon,
    MoonIcon,
    SunIcon,
    UsersIcon,
    
} from '@heroicons/react/24/outline';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminSidebar() {
    const { theme, setTheme } = useTheme();
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const { post, processing } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };
    return (
        <>
            <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-white shadow-lg dark:bg-gray-800">
                <div className="flex h-16 flex-shrink-0 items-center border-b px-6 dark:border-gray-700">
                    <Link href={route('admin.dashboard')}>
                        <ApplicationLogo className="block h-9 w-auto" />
                    </Link>
                </div>

                <nav className="flex-grow space-y-3 overflow-y-auto p-4">
                    <NavLinkAdmin
                        className="gap-x-3"
                        href={route('admin.dashboard')}
                        active={route().current('admin.dashboard')}
                    >
                        <HomeIcon className="h-5 w-5" />
                        <span>Dashboard</span>
                    </NavLinkAdmin>
                    <NavLinkAdmin
                        className="gap-x-3"
                        href={route('admin.users.index')}
                        active={route().current('admin.users.index')}
                    >
                        <UsersIcon className="h-5 w-5" />
                        <span>Pengguna</span>
                    </NavLinkAdmin>
                    <NavLinkAdmin
                        className="gap-x-3"
                        href={route('admin.settings.index')}
                        active={route().current('admin.settings.index')}
                    >
                        <UsersIcon className="h-5 w-5" />
                        <span>Settings</span>
                    </NavLinkAdmin>
                </nav>

                <div className="flex items-center justify-between border-t p-4 dark:border-gray-700">
                    <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        <span>Logout</span>
                    </button>
                    <button
                        onClick={() =>
                            setTheme(theme === 'dark' ? 'light' : 'dark')
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        {theme === 'dark' ? (
                            <SunIcon className="h-6 w-6" />
                        ) : (
                            <MoonIcon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </aside>

            <ConfirmDeleteModal
                show={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                onConfirm={handleLogout}
                processing={processing}
                title="Konfirmasi Logout"
                message="Apakah Anda yakin ingin keluar dari sesi ini?"
                textbtn="Ya, Logout"
            />
        </>
    );
}
