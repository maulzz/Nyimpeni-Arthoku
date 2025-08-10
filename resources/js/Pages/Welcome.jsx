import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Footer';
import { useTheme } from '@/Context/ThemeContext'; 
import { Dialog, Transition } from '@headlessui/react';
import {
    AcademicCapIcon,
    BriefcaseIcon,
    ChartPieIcon,
    DevicePhoneMobileIcon,
    MoonIcon,
    PencilSquareIcon,
    SunIcon,
    TagIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'; 
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import { Fragment, useState } from 'react';

export default function Welcome({ auth }) {
    const { theme, setTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Selamat Datang di Nyimpeni Artoku" />
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* --- BAGIAN HEADER/NAVBAR BARU --- */}
                <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    <nav className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                        {/* Logo */}
                        <Link href="/">
                            <ApplicationLogo className="h-10 w-10" />
                        </Link>

                        {/* Navlink Desktop */}
                        <div className="hidden items-center space-x-6 lg:flex">
                            <Link
                                href="#home"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                            >
                                Home
                            </Link>
                            <Link
                                href="#fitur"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                            >
                                Fitur
                            </Link>
                            <Link
                                href="#about"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                            >
                                About
                            </Link>
                            <Link
                                href="#testimoni"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                            >
                                Testimoni
                            </Link>
                        </div>

                        {/* Tombol Login/Register Desktop */}
                        <div className="hidden items-center space-x-4 lg:flex">
                            <button
                                onClick={() =>
                                    setTheme(
                                        theme === 'dark' ? 'light' : 'dark',
                                    )
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                {theme === 'dark' ? (
                                    <SunIcon className="h-6 w-6" />
                                ) : (
                                    <MoonIcon className="h-6 w-6" />
                                )}
                            </button>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-gray-900 ring-1 ring-transparent transition hover:text-gray-600/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-gray-100 dark:hover:text-gray-300/70"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md px-4 py-2 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-sec"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Tombol Hamburger (Mobile) */}
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </header>

                {/* --- SIDEBAR MOBILE (Tidak berubah) --- */}
                <Transition show={mobileMenuOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="lg:hidden"
                        onClose={setMobileMenuOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 z-50 bg-gray-900/80" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-x-full"
                            enterTo="opacity-100 translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-x-0"
                            leaveTo="opacity-0 translate-x-full"
                        >
                            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <Link href="#" className="-m-1.5 p-1.5">
                                        <ApplicationLogo className="h-8 w-auto" />
                                    </Link>
                                    <button
                                        type="button"
                                        className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <svg
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/25">
                                        <div className="space-y-2 py-6">
                                            <a
                                                href="#home"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Home
                                            </a>
                                            <a
                                                href="#fitur"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Fitur
                                            </a>
                                            <a
                                                href="#about"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                            >
                                                About
                                            </a>
                                            <a
                                                href="#testimoni"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                            >
                                                Testimoni
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            {auth.user ? (
                                                <Link
                                                    href={route('dashboard')}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    Dashboard
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={route('login')}
                                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-primary-sec dark:text-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    Login
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </Dialog>
                </Transition>

                {/* --- KONTEN UTAMA HALAMAN --- */}
                <div className="container mx-auto max-w-7xl px-6 py-4">
                    {/* Hero Content */}
                    <main id="home" className="mt-16 lg:mt-24">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Kolom Kiri: Teks & CTA */}
                            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                                    Mengatur Uang Jadi{' '}
                                    <span className="text-primary">
                                        Gampang & Asik.
                                    </span>
                                </h1>
                                <p className="mt-6 max-w-2xl text-lg text-gray-500">
                                    Nyimpeni Artoku adalah aplikasi pencatat
                                    keuangan simpel dan modern untuk membantumu
                                    melacak setiap rupiah dan mencapai tujuan
                                    finansialmu.
                                </p>
                                <div className="mt-10">
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-sec focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    >
                                        Coba Gratis Sekarang
                                    </Link>
                                </div>
                            </div>

                            {/* Kolom Kanan: Visual Mockup Aplikasi */}
                            <div className="flex items-center justify-center">
                                <div className="h-auto w-full max-w-md rounded-xl bg-gray-800 p-4 shadow-2xl ring-1 ring-white/10">
                                    {/* Ini adalah placeholder untuk gambar screenshot aplikasi Anda */}
                                    <div className="aspect-[16/9] rounded-lg bg-gray-700 p-4">
                                        <div className="h-full w-full rounded-md bg-gray-600/50 opacity-50"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Section Fitur & Cara Kerja */}
                    <section id="fitur" className="mt-32 py-20 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {/* Judul Section */}
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-primary">
                                    Kelola Keuanganmu
                                </h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Semua yang Kamu Butuhkan, Tanpa Ribet
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-500">
                                    Nyimpeni Artoku dirancang dengan fitur-fitur
                                    esensial untuk membantumu fokus pada hal
                                    yang paling penting: kesehatan finansialmu.
                                </p>
                            </div>

                            {/* Container untuk Kartu Fitur (Grid) */}
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                                    {/* --- KARTU FITUR 1: CATAT TRANSAKSI --- */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <PencilSquareIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Catat Transaksi Mudah
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                            <p className="flex-auto">
                                                Catat semua pemasukan dan
                                                pengeluaran harianmu dengan
                                                cepat dan tanpa ribet, lengkap
                                                dengan deskripsi dan tanggal.
                                            </p>
                                        </dd>
                                    </div>

                                    {/* --- KARTU FITUR 2: KATEGORI FLEKSIBEL --- */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <TagIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Kategori Sesuai Kebutuhan
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                            <p className="flex-auto">
                                                Kelompokkan pengeluaran dengan
                                                kategori bawaan atau buat
                                                kategorimu sendiri agar lebih
                                                personal dan mudah dilacak.
                                            </p>
                                        </dd>
                                    </div>

                                    {/* --- KARTU FITUR 3: LAPORAN VISUAL --- */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <ChartPieIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Laporan Visual Intuitif
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                            <p className="flex-auto">
                                                Pahami ke mana uangmu pergi
                                                dengan grafik dan statistik yang
                                                mudah dibaca. Tak ada lagi
                                                misteri di akhir bulan.
                                            </p>
                                        </dd>
                                    </div>

                                    {/* --- KARTU FITUR 4: AKSES DI MANA SAJA --- */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <DevicePhoneMobileIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Akses Di Mana Saja
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                            <p className="flex-auto">
                                                Sebagai web app, datamu aman
                                                tersinkronisasi dan bisa diakses
                                                kapan saja dari HP, tablet,
                                                maupun laptop.
                                            </p>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section id="about" className="py-20 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {/* Bagian Pertama: Filosofi */}
                            <div className="mx-auto max-w-2xl lg:text-center">
                                <h2 className="text-base font-semibold leading-7 text-primary">
                                    Filosofi Kami
                                </h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Lebih dari Sekadar Angka
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-500">
                                    "Nyimpeni Artoku" lahir dari kearifan lokal
                                    untuk menjadi `cermat` dan `gemati` (teliti
                                    dan peduli) terhadap keuangan. Kami percaya,
                                    mengelola uang bukan hanya soal mencatat,
                                    tapi tentang membangun kebiasaan sehat demi
                                    masa depan yang lebih tenang.
                                </p>
                            </div>

                            {/* Bagian Kedua: Use Case / Untuk Siapa */}
                            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
                                    {/* Kartu 1: Mahasiswa */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <AcademicCapIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Untuk yang Baru Memulai
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-900 dark:text-white">
                                            <p className="flex-auto">
                                                Kelola uang jajan dan
                                                pengeluaran kecil dengan mudah.
                                                Mulai bangun kebiasaan menabung
                                                sejak dini dan lihat ke mana
                                                perginya setiap rupiah.
                                            </p>
                                        </dd>
                                    </div>

                                    {/* Kartu 2: Freelancer */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <BriefcaseIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Untuk yang Punya Penghasilan Dinamis
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-900 dark:text-white">
                                            <p className="flex-auto">
                                                Saat pemasukan tidak menentu,
                                                pencatatan menjadi kunci. Catat
                                                setiap pendapatan proyek dan
                                                lihat arus kas bulananmu dengan
                                                jelas.
                                            </p>
                                        </dd>
                                    </div>

                                    {/* Kartu 3: Keluarga Muda */}
                                    <div className="flex flex-col rounded-lg bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                            <UsersIcon
                                                className="h-5 w-5 flex-none text-primary"
                                                aria-hidden="true"
                                            />
                                            Untuk yang Merencanakan Masa Depan
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-900 dark:text-white">
                                            <p className="flex-auto">
                                                Atur berbagai pos pengeluaran
                                                rumah tangga, mulai dari
                                                tagihan, belanja bulanan, hingga
                                                kebutuhan anak, semuanya dalam
                                                satu tempat.
                                            </p>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>

                    <section id="testimoni" className="py-20 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {/* Judul Section */}
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
                                    Ulasan Pengguna
                                </h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Apa Kata Mereka Tentang Nyimpeni Artoku
                                </p>
                            </div>

                            {/* Container untuk Kartu Ulasan (Grid 2x2) */}
                            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                                {/* --- KARTU ULASAN 1 --- */}
                                <figure className="rounded-2xl bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                    <blockquote className="text-gray-900 dark:text-white">
                                        <p>
                                            “Akhirnya ada aplikasi yang simpel
                                            buat ngatur uang jajan. Fitur
                                            kategorinya ngebantu banget buat
                                            tahu borosnya di mana. Tampilannya
                                            juga adem, jadi betah pakenya.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Sava Alfarisy
                                            </div>
                                            <div className="text-gray-500">
                                                Mahasiswa
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>

                                {/* --- KARTU ULASAN 2 --- */}
                                <figure className="rounded-2xl bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                    <blockquote className="text-gray-900 dark:text-white">
                                        <p>
                                            “Sebagai freelancer, pemasukan
                                            kadang nggak nentu. Aplikasi ini
                                            bener-bener ngebantu buat catet
                                            setiap project yang masuk dan liat
                                            arus kas bulanan. Simpel tapi
                                            powerful.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Zalfa Kumala
                                            </div>
                                            <div className="text-gray-500">
                                                Desainer Grafis Lepas
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>

                                {/* --- KARTU ULASAN 3 --- */}
                                <figure className="rounded-2xl bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                    <blockquote className="text-gray-900 dark:text-white">
                                        <p>
                                            “Suka banget sama laporannya. Pie
                                            chart-nya langsung nunjukkin pos
                                            pengeluaran terbesar. Jadi lebih
                                            gampang buat evaluasi bareng
                                            pasangan tiap akhir bulan.”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Dean & Melody
                                            </div>
                                            <div className="text-gray-500">
                                                Keluarga Muda
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>

                                {/* --- KARTU ULASAN 4 --- */}
                                <figure className="rounded-2xl bg-gray-200 p-8 shadow-lg ring-1 ring-primary-dark dark:bg-white/5 dark:ring-primary">
                                    <blockquote className="text-gray-900 dark:text-white">
                                        <p>
                                            “Awalnya iseng nyoba-nyoba, eh malah
                                            keterusan sampe sekarang. Notifikasi
                                            dan UI yang bersih bikin nagih buat
                                            input data tiap hari. Highly
                                            recommended!”
                                        </p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <UserCircleIcon className="h-10 w-10 text-gray-500" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                Nabil Firdaus
                                            </div>
                                            <div className="text-gray-500">
                                                Anak Muda
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </section>

                    <section id="cta" className="py-20 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="relative isolate overflow-hidden bg-gray-200 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 dark:bg-gray-800">
                                {/* Judul Utama CTA */}
                                <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                    Mulai Perjalanan Finansialmu Hari Ini.
                                </h2>

                                {/* Deskripsi Singkat */}
                                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-500">
                                    Daftar gratis dan rasakan ketenangan saat
                                    semua pemasukan dan pengeluaranmu tertata
                                    rapi. Kendali penuh ada di tanganmu.
                                </p>

                                {/* Tombol Utama */}
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:bg-primary-sec focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    >
                                        Daftar Gratis Sekarang
                                    </Link>
                                </div>

                                {/* Efek Gradasi Warna di Latar Belakang (Dekoratif) */}
                                <svg
                                    viewBox="0 0 1024 1024"
                                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                                    aria-hidden="true"
                                >
                                    <circle
                                        cx={512}
                                        cy={512}
                                        r={512}
                                        fill="url(#gradient)"
                                        fillOpacity="0.7"
                                    />
                                    <defs>
                                        <radialGradient id="gradient">
                                            <stop stopColor="#0D9488" />
                                            <stop
                                                offset={1}
                                                stopColor="#14B8A6"
                                            />
                                        </radialGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    );
}
