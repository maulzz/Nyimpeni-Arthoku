import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function TransactionForm({ accountId, categories, onClose }) {
    // Semua logika form dipindahkan ke sini
    const { data, setData, post, processing, errors, reset } = useForm({
        description: '',
        amount: '',
        transaction_date: new Date().toISOString().slice(0, 10),
        category_id: '',
        account_id: accountId,
        type: 'expense',
    });

    const submitExpense = (e) => {
        e.preventDefault();
        post(route('expense.store'), {
            onSuccess: () => {
                reset(); // Reset form setelah sukses
                onClose(); // Panggil fungsi untuk menutup modal
            },
        });
    };

    return (
        <form onSubmit={submitExpense} className="p-6">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                Catat Pengeluaran
            </h2>

            {/* Input Deskripsi */}
            <div className="mt-6">
                <InputLabel htmlFor="description" value="Deskripsi" />
                <TextInput
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            {/* Input Jumlah Uang */}
            <div className="mt-4">
                <InputLabel htmlFor="amount" value="Jumlah (Rp)" />
                <TextInput
                    id="amount"
                    name="amount"
                    placeholder="0"
                    type="number"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.amount} className="mt-2" />
            </div>

            {/* Input Tanggal */}
            <div className="mt-4">
                <InputLabel htmlFor="transaction_date" value="Tanggal" />
                <TextInput
                    id="transaction_date"
                    name="transaction_date"
                    type="date"
                    value={data.transaction_date}
                    onChange={(e) =>
                        setData('transaction_date', e.target.value)
                    }
                    className="mt-1 block w-full"
                    required
                />
                <InputError
                    message={errors.transaction_date}
                    className="mt-2"
                />
            </div>

            {/* Dropdown Kategori */}
            <div className="mt-4">
                <InputLabel htmlFor="category_id" value="Kategori" />
                <select
                    id="category_id"
                    name="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
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

            {/* form untuk menyimpan type*/}
            <input type="hidden" name="type" value={data.type} />

            <div className="mt-6 flex justify-end">
                <SecondaryButton onClick={onClose}>Batal</SecondaryButton>
                <PrimaryButton
                    className="ms-3"
                    disabled={processing || !data.category_id}
                >
                    Simpan
                </PrimaryButton>
            </div>
        </form>
    );
}
