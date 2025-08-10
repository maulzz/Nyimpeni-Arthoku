// resources/js/Components/Pagination.jsx
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="mt-6">
            {links.length > 3 && (
                <div className="flex flex-wrap -mb-1">
                    {links.map((link, key) => (
                        link.url === null ? (
                            <div
                                key={key}
                                className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-500 border rounded"
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </div>
                        ) : (
                            <Link
                                key={key}
                                className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-primary-sec text-gray-900 dark:text-white ${link.active ? 'bg-primary' : ''}`}
                                href={link.url}
                            >
                               <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </Link>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}