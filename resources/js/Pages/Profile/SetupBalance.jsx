import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import Card from '@/Components/Card';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function SetupBalance({ auth }) {
    
    // Gunakan hook useForm dari Inertia untuk mengelola state dan submit form
    const { data, setData, post, processing, errors } = useForm({
        money: '', // Nilai awal untuk input uang
    });

    // Fungsi yang akan dijalankan saat form di-submit
    const submit = (e) => {
        e.preventDefault();
        // Kirim data ke route yang sudah kita buat di backend
        post(route('profile.balance.store'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Head title="Setup Saldo Awal" />

            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <section className="p-6">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Hallo {auth.user.name}!, Selamat datang di NyimpeniArtoku
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Sebelum melanjutkan, silakan masukkan saldo awal yang Anda miliki.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="money" value="Saldo Awal Anda" />

                                    <TextInput
                                        id="money"
                                        name="money"
                                        type="number" // Gunakan tipe 'number' untuk input uang
                                        value={data.money}
                                        className="mt-1 block w-full"
                                        autoComplete="off"
                                        isFocused={true}
                                        onChange={(e) => setData('money', e.target.value)}
                                        placeholder="Contoh: 500000"
                                        required
                                    />

                                    <InputError message={errors.money} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* INI BAGIAN UTAMANYA: Tombol hanya muncul jika input 'money' tidak kosong */}
                                    {data.money.trim() !== '' && (
                                        <PrimaryButton disabled={processing}>Konfirmasi</PrimaryButton>
                                    )}
                                </div>
                            </form>
                        </section>
                    </Card>
                </div>
            </div>
        </div>
    );
}