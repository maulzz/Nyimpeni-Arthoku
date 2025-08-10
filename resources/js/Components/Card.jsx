export default function Card({ children }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-800">
            {children}
        </div>
    );
}
