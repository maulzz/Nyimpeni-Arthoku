// resources/js/Components/EditUserForm.jsx
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function EditUserForm({ user, onClose }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <form onSubmit={submit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Nama Pengguna</h2>
            <div className="mt-6">
                <InputLabel htmlFor="name" value="Nama Lengkap" isFocused />
                <TextInput
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full"
                    required
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div className="mt-6 flex justify-end">
                <SecondaryButton type="button" onClick={onClose}>Batal</SecondaryButton>
                <PrimaryButton className="ms-3" disabled={processing}>Simpan Perubahan</PrimaryButton>
            </div>
        </form>
    );
}