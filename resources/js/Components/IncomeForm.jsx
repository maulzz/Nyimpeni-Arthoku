// resources/js/Components/IncomeForm.jsx

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function IncomeForm({ accountId, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        description: 'Pemasukan',
        amount: '',
        account_id: accountId,
        transaction_date: new Date().toISOString().slice(0, 10),
        type: 'income',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('expense.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <form onSubmit={submit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Tambah Pemasukan
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Masukkan jumlah uang yang akan ditambahkan ke saldo Anda.
            </p>

            <div className="mt-6">
                <InputLabel htmlFor="amount" value="Jumlah (Rp)" />
                <TextInput
                    id="amount"
                    name="amount"
                    type="number"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    className="mt-1 block w-full"
                    isFocused={true}
                    required
                />
                <InputError message={errors.amount} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-end">
                <PrimaryButton disabled={processing}>
                    Tambah Saldo
                </PrimaryButton>
            </div>
        </form>
    );
}
