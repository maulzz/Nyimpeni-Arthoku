// resources/js/Pages/Admin/Settings/Index.jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import Notification from '@/Components/Notification';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, isMaintenance, maintenanceSecret, status }) {
    const { post, processing } = useForm({
        status: !isMaintenance, // Kirim status kebalikan dari yang sekarang
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.maintenance'));
    };

    const bypassUrl = maintenanceSecret ? `${window.location.origin}/${maintenanceSecret}` : null;

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Pengaturan</h2>}
        >
            <Head title="Pengaturan" />
            <Notification notification={status} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Mode Perbaikan
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Aktifkan mode ini jika Anda ingin menonaktifkan situs sementara untuk umum.
                            Admin tetap bisa mengakses situs melalui link bypass.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6">
                            <PrimaryButton type="submit" disabled={processing}>
                                {isMaintenance ? 'Nonaktifkan Mode Perbaikan' : 'Aktifkan Mode Perbaikan'}
                            </PrimaryButton>
                        </form>
                        
                        {isMaintenance && bypassUrl && (
                            <div className="mt-4 rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/50">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                            Link Bypass Aktif
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                            <p>Gunakan link ini untuk mengakses situs. Jangan bagikan link ini.</p>
                                            <a href={bypassUrl} target="_blank" className="mt-2 inline-block font-bold underline hover:no-underline">{bypassUrl}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}