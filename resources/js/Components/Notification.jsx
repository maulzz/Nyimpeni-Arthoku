

import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

// Komponen ini menerima 'notification' object sebagai prop
export default function Notification({ notification }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Jika ada notifikasi baru, tampilkan
        if (notification?.message) {
            setShow(true);
            // Set timer untuk menyembunyikannya setelah 3 detik
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]); // Efek ini berjalan setiap kali 'notification' prop berubah

    return (
        <div className="fixed top-5 right-5 z-50">
            <Transition
                show={show}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full opacity-0"
                enterTo="translate-x-0 opacity-100"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0 opacity-100"
                leaveTo="translate-x-full opacity-0"
            >
                <div className="max-w-sm rounded-lg bg-green-100 p-4 shadow-lg ring-1 ring-black ring-opacity-5">
                    <p className="text-sm font-medium text-green-800">
                        {notification?.message}
                    </p>
                </div>
            </Transition>
        </div>
    );
}