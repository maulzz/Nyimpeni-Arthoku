// resources/js/Components/CategoryForm.jsx
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

// Komponen ini menerima 'category' sebagai prop opsional
export default function CategoryForm({ category = null, onClose }) {
    const isEditing = !!category;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: category ? category.name : '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('categories.update', category.id), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {isEditing ? 'Edit Kategori' : 'Buat Kategori Baru'}
            </h2>
            <div className="mt-6">
                <InputLabel htmlFor="name" value="Nama Kategori" isFocused />
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
                <PrimaryButton className="ms-3" disabled={processing}>
                    {isEditing ? 'Simpan Perubahan' : 'Simpan'}
                </PrimaryButton>
            </div>
        </form>
    );
}