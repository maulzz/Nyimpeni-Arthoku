import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', 
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#14B8A6 ', // Teal Utama
                    sec: '#0D9488',   // Teal Terang
                    dark: '#134E4A',    // Teal Gelap
                },
                accent: {
                    DEFAULT: '#A16207', // Coklat
                }
            },
        },
    },

    plugins: [forms],
};
