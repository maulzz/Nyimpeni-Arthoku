// resources/js/Pages/Admin/Users/Index.jsx
import EditUserForm from '@/Components/Admin/EditUserForm';
import Pagination from '@/Components/Admin/Pagination';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import Modal from '@/Components/Modal';
import Notification from '@/Components/Notification';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

export default function Index({ auth, users, status, filters }) {
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [search, setSearch] = useState(filters.search || '');

    const isInitialMount = useRef(true);

    const { delete: destroy, processing: deleting } = useForm();

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditModalOpen(true);
    };
    const closeEditModal = () => setEditModalOpen(false);

    const handleDeleteClick = (user) => {
        setDeletingUser(user);
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const confirmDelete = () => {
        destroy(route('admin.users.destroy', deletingUser.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    useEffect(() => {

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                route('admin.users.index'),
                { search: search },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manajemen Pengguna
                </h2>
            }
        >
            <Head title="Manajemen Pengguna" />
            <Notification notification={status} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mb-4 flex justify-end">
                                <TextInput
                                    type="text"
                                    name="search"
                                    value={search}
                                    className="block w-full md:w-1/3 "
                                    placeholder="Cari berdasarkan username..."
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                                            Username
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                                            Nama Lengkap
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                                            Tanggal Bergabung
                                        </th>
                                        <th className="relative px-6 py-3">
                                            <span className="sr-only">
                                                Aksi
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td className="whitespace-nowrap px-6 py-4 text-lg font-extrabold text-gray-900 dark:text-white">
                                                {user.username}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {user.name}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        handleEditClick(user)
                                                    }
                                                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteClick(user)
                                                    }
                                                    className="ms-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-6 flex justify-center">
                                <Pagination links={users.links} />
                            </div>
                        </div>
                    </div>
                    {/* Di sini nanti bisa ditambahkan link Paginasi */}
                </div>
            </div>

            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                {editingUser && (
                    <EditUserForm user={editingUser} onClose={closeEditModal} />
                )}
            </Modal>

            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus Pengguna"
                message={`Apakah Anda yakin ingin menghapus pengguna "${deletingUser?.username}"? Semua data milik pengguna ini akan dihapus permanen.`}
            />
        </AdminLayout>
    );
}
