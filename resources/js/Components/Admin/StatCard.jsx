
export default function StatCard({ icon, title, value }) {
    return (
        <div className="rounded-lg shadow-lg bg-white p-6  dark:bg-gray-800">
            <div className="flex items-center">
                {/* Lingkaran untuk ikon */}
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400">
                    {/* Render komponen ikon yang dikirim melalui props */}
                    {icon}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
            </div>
        </div>
    );
}