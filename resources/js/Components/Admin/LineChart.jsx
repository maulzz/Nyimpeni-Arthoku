// resources/js/Components/LineChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart({ chartData }) {
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Jumlah Transaksi',
                data: chartData.data,
                borderColor: '#0D9488', 
                backgroundColor: 'rgba(13, 148, 136, 0.2)', 
                fill: true,
                tension: 0.3, 
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, 
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                }
            },
        },
    };

    return <Line data={data} options={options} />;
}