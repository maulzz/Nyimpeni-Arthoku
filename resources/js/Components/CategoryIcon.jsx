// resources/js/Components/CategoryIcon.jsx

import React from 'react';
// Import semua ikon yang Anda butuhkan dari heroicons
import { ShoppingBagIcon, TicketIcon, HeartIcon, ShoppingCartIcon, DocumentTextIcon, TruckIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

// Komponen ini akan menerima nama kategori dan mengembalikan ikon yang sesuai
export default function CategoryIcon({ categoryName, className = 'w-6 h-6' }) {
    let IconComponent;

    switch (categoryName) {
        case 'Belanja':
            IconComponent = ShoppingBagIcon;
            break;
        case 'Hiburan':
            IconComponent = TicketIcon;
            break;
        case 'Kesehatan':
            IconComponent = HeartIcon;
            break;
        case 'Makanan & Minuman':
            IconComponent = ShoppingCartIcon;
            break;
        case 'Tagihan':
            IconComponent = DocumentTextIcon;
            break;
        case 'Transportasi':
            IconComponent = TruckIcon;
            break;
        default:
            IconComponent = QuestionMarkCircleIcon; // Ikon default jika kategori tidak dikenal
    }

    return <IconComponent className={className} />;
}