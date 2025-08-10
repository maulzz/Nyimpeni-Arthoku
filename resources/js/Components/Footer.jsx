// resources/js/Components/Footer.jsx

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="border-t shadow-lg border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 ">
            <div className="container mx-auto px-6 py-12 lg:px-8">
                {/* Bagian Atas: Logo & Link Navigasi */}
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Kolom Logo & Tagline */}
                    <div className="space-y-4">
                        <Link href="/">
                            <ApplicationLogo className="h-10" />
                        </Link>
                        <p className="text-sm leading-6 text-gray-500">
                            Membantumu mengelola keuangan dengan lebih cerdas
                            dan tenang.
                        </p>
                    </div>
                    {/* Kolom Link Navigasi */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Produk
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#fitur"
                                            className="text-sm leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                        >
                                            Fitur
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#testimoni"
                                            className="text-sm leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                        >
                                            Testimoni
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Perusahaan
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#about"
                                            className="text-sm leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                        >
                                            Tentang Kami
                                        </a>
                                    </li>
                                    {/* Tambahkan link lain jika ada */}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                    Legal
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                        >
                                            Kebijakan Privasi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-sm leading-6 text-gray-900 hover:text-gray-600/70 dark:text-gray-100 dark:hover:text-gray-300/70"
                                        >
                                            Syarat & Ketentuan
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Bawah: Copyright & Ikon Sosial Media */}
                <div className="mt-16 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <p className="flex items-center mt-3 gap-x-1 text-xs leading-5 text-gray-500">
                            <span>
                                &copy; {new Date().getFullYear()} Nyimpeni
                                Artoku. Dibuat oleh
                            </span>
                            <a
                                href="https://www.instagram.com/maulzz_studev"
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center font-bold gap-x-1 rounded-md p-1 text-gray-900 hover:bg-gray-200 dark:text-white  dark:hover:bg-white/10 "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                @maulzz_studev
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
