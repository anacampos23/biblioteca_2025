import { Link } from '@inertiajs/react';

interface HeaderProps {
    auth: {
        user: any;
    };
}

export default function Header({ auth }: HeaderProps) {
    return (
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                    <svg 
                        className="h-8 w-8 text-primary dark:text-primary-foreground" 
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
                    <span className="text-xl font-semibold">Biblioteca 2025</span>
                </div>
                <nav className="flex items-center space-x-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary dark:text-gray-300 dark:hover:text-primary-foreground"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
