import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

// Komponen ini menerima data transaksi yang akan diedit sebagai 'prop'
export default function EditTransactionForm({
    transaction,
    categories,
    onClose,
}) {

    if (!transaction) {
        return null;
    }

    // Inisialisasi form dengan data transaksi yang sudah ada
    const { data, setData, put, processing, errors } = useForm({
        description: transaction.description || '',
        amount: transaction.amount || '',
        category_id: transaction.category_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('expense.update', transaction.id), {
            preserveState: true, // <-- TAMBAHKAN BARIS INI
            onSuccess: () => onClose(),
        });
    };

    return (
        <form onSubmit={submit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Edit Pengeluaran
            </h2>

            {/* Input Deskripsi */}
            <div className="mt-6">
                <InputLabel htmlFor="description" value="Deskripsi" />
                <TextInput
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* Input Jumlah Uang */}
            <div className="mt-4">
                <InputLabel htmlFor="edit_amount" value="Jumlah (Rp)" />
                <TextInput
                    id="edit_amount"
                    type="number"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.amount} className="mt-2" />
            </div>

            {/* Dropdown Kategori */}
            <div className="mt-4">
                <InputLabel htmlFor="edit_category_id" value="Kategori" />
                <select
                    id="edit_category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    required
                >
                    <option value="">Pilih Kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <InputError message={errors.category_id} className="mt-2" />
            </div>

            {/* Menampilkan Tanggal (Tidak Bisa Diedit) */}

            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                <PrimaryButton className="ms-3" disabled={processing}>
                    Simpan Perubahan
                </PrimaryButton>
            </div>
        </form>
    );
}
