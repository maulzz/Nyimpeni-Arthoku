// resources/js/Components/BarChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ chartData }) {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Perbandingan Pemasukan & Pengeluaran' },
        },
        scales: {
            y: { ticks: { callback: (value) => `Rp ${value / 1000}k` } } // Format sumbu Y
        }
    };

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Pemasukan',
                data: chartData.incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.8)', // Hijau
            },
            {
                label: 'Pengeluaran',
                data: chartData.expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.8)', // Merah
            },
        ],
    };

    return <Bar options={options} data={data} />;
}