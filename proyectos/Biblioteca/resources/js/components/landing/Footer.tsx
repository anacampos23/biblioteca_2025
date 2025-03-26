import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white py-12 dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between md:flex-row">
                    <div className="flex items-center space-x-2">
                        <svg 
                            className="h-6 w-6 text-primary dark:text-primary-foreground" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                        <span className="text-lg font-semibold">Biblioteca 2025</span>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Biblioteca 2025. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="mt-6 flex space-x-6 md:mt-0">
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
                        >
                            Términos
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
                        >
                            Privacidad
                        </Link>
                        <Link
                            href="#"
                            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-foreground"
                        >
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
