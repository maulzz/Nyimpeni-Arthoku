import Notification from '@/Components/Notification';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

// Import semua komponen yang dibutuhkan
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import EditTransactionForm from '@/Components/EditTransactionForm';
import IncomeForm from '@/Components/IncomeForm';
import Modal from '@/Components/Modal';
import TransactionForm from '@/Components/TransactionForm';
import TransactionList from '@/Components/TransactionList';

export default function Dashboard({
    balance,
    auth,
    accountId,
    categories,
    transactions,
    totalTransactions,
    status,
}) {
    // State untuk modal tambah (pilihan, pengeluaran, pemasukan)
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [modalView, setModalView] = useState('select');

    // State untuk modal edit
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    // State untuk modal hapus
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingTransaction, setDeletingTransaction] = useState(null);

    const { delete: destroy, processing: deleting } = useForm();

    const openAddModal = () => {
        setModalView('select');
        setAddModalOpen(true);
    };
    const closeAddModal = () => setAddModalOpen(false);

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setEditModalOpen(true);
    };
    const closeEditModal = () => setEditModalOpen(false);

    const handleDeleteClick = (transaction) => {
        setDeletingTransaction(transaction);
        setDeleteModalOpen(true);
    };
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const confirmDelete = () => {
        destroy(route('expense.destroy', deletingTransaction.id), {
            onSuccess: () => closeDeleteModal(),
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <Notification notification={status} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex items-start justify-between p-6">
                            <div className="text-gray-900 dark:text-gray-100">
                                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                    Uang Kamu Saat Ini
                                </p>
                                <p className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0,
                                    }).format(parseFloat(balance) || 0)}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setModalView('income');
                                    setAddModalOpen(true);
                                }}
                                className="inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-sec focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 "
                            >
                                Tambah Pemasukan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <TransactionList
                transactions={transactions}
                onEditClick={handleEditClick}
                totalTransactions={totalTransactions}
                onDeleteClick={handleDeleteClick}
            />

            <button
                onClick={() => {
                    setModalView('expense');
                    setAddModalOpen(true);
                }}
                className="fixed bottom-10 right-10 flex h-16 w-16 transform items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110 hover:bg-primary-sec focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                aria-label="Tambah Transaksi"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-8 w-8"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>

            {/* Modal untuk tambah transaksi */}
            <Modal show={isAddModalOpen} onClose={closeAddModal}>
                {modalView === 'expense' && (
                    <TransactionForm
                        accountId={accountId}
                        categories={categories}
                        onClose={closeAddModal}
                    />
                )}
                {modalView === 'income' && (
                    <IncomeForm accountId={accountId} onClose={closeAddModal} />
                )}
            </Modal>

            {/*  Modal untuk edit transaksi */}
            <Modal show={isEditModalOpen} onClose={closeEditModal}>
                {/* Kita akan buat form edit di sini nanti */}
                <EditTransactionForm
                    transaction={editingTransaction}
                    categories={categories}
                    onClose={closeEditModal}
                />
            </Modal>

            {/* Modal untuk delete transaksi */}
            <ConfirmDeleteModal
                show={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                processing={deleting}
                title="Hapus Transaksi"
                message="Transaksi ini akan dihapus permanen dan saldo Anda akan dikembalikan. Yakin?"
            />
        </AuthenticatedLayout>
    );
}
