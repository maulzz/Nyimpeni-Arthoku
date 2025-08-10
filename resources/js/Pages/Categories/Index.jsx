import { useOnClickOutside } from '@/Hooks/useOnClickOutside';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

// Import semua komponen yang kita butuhkan
import CategoryForm from '@/Components/CategoryForm'; // Kita akan buat ini
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import Modal from '@/Components/Modal';
import Notification from '@/Components/Notification';

export default function Index({
    auth,
    defaultCategories,
    customCategories,
    status,
}) {
    // State untuk modal (tambah, edit, hapus)
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // State untuk menyimpan data yang sedang di-aksi
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);

    // State untuk menu dropdown
    const [openMenuId, setOpenMenuId] = useState(null);
    const menuRef = useRef(null);
    useOnClickOutside(menuRef, () => setOpenMenuId(null));

    // Hook useForm untuk delete
    const { delete: destroy, processing: deleting } = useForm();

    // Fungsi-fungsi handler
    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setEditModalOpen(true);
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
        setEditingCategory(null);
    };

    const handleDeleteClick = (category) => {
        setDeletingCategory(category);
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletingCategory(null);
    };

    const confirmDelete = () => {
        destroy(route('categories.destroy', deletingCategory.id), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manajemen Kategori
                </h2>
            }
        >
            <Head title="Manajemen Kategori" />
            <Notification notification={status} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="text-right">
                        <button
                            onClick={openAddModal}
                            className="inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-sec focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 "
                        >
                            Tambah Kategori Baru
                        </button>
                    </div>

                    {/* Daftar Kategori Bawaan */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Kategori Bawaan
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {defaultCategories.map((category) => (
                                <span
                                    key={category.id}
                                    className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                >
                                    {category.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Daftar Kategori Pribadi dengan Menu Aksi */}
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Kategori Pribadi Anda
                        </h3>
                        <ul className="mt-4 space-y-3">
                            {customCategories.map((category) => (
                                <li
                                    key={category.id}
                                    className="flex items-center justify-between rounded-lg border p-3 dark:border-gray-700"
                                >
                                    <span className="text-gray-800 dark:text-gray-200">
                                        {category.name}
                                    </span>

                                    {/* Menu Dropdown */}
                                    <div
                                        className="relative"
                                        ref={
                                            openMenuId === category.id
                                                ? menuRef
                                                : null
                                        }
                                    >
                                        <button
                                            onClick={() =>
                                                setOpenMenuId(
                                                    openMenuId === category.id
                                                        ? null
                                                        : category.id,
                                                )
                                            }
                                            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                                        >
                                            {/* Ikon Tiga Titik SVG */}
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
                                        {openMenuId === category.id && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => {
                                                            handleEditClick(
                                                                category,
                                                            );
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            handleDeleteClick(
                                                                category,
                                                            );
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {customCategories.length === 0 && (
                            <p className="mt-4 text-sm text-gray-500">
                                Anda belum membuat kategori pribadi.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Semua Modal */}
            <Modal show={isAddModalOpen} onClose={closeAddModal}>
                <CategoryForm onClose={closeAddModal} />
            </Modal>

            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                {editingCategory && (
                    <CategoryForm
                        category={editingCategory}
                        onClose={closeEditModal}
                    />
                )}
            </Modal>

            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus Kategori"
                message="Kategori ini akan dihapus permanen. Yakin?"
            />
        </AuthenticatedLayout>
    );
}
