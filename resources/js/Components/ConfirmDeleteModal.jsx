// resources/js/Components/ConfirmDeleteModal.jsx
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ConfirmDeleteModal({ show = false, onClose, onConfirm, processing, 
    title = 'Apakah Anda Yakin?', 
    textbtn='Ya, Hapus',
    message = 'Tindakan ini tidak dapat diurungkan.'}) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {message}
                </p>
                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={onClose}>
                        Batal
                    </SecondaryButton>
                    <DangerButton className="ms-3" onClick={onConfirm} disabled={processing}>
                        {textbtn}
                    </DangerButton>
                </div>
            </div>
        </Modal>
    );
}