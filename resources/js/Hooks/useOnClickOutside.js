import { useEffect } from 'react';

/**
 * Hook yang akan menjalankan sebuah fungsi (handler) ketika terjadi klik di luar elemen yang direferensikan (ref).
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Jangan lakukan apa-apa jika klik terjadi di dalam elemen ref atau turunannya
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    // Tambahkan event listener saat komponen dimuat
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Hapus event listener saat komponen dibongkar (penting untuk performa)
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Jalankan ulang efek ini hanya jika ref atau handler berubah
}