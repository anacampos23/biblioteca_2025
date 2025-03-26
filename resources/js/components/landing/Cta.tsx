import { Link } from '@inertiajs/react';

interface CtaProps {
    auth: {
        user: any;
    };
}

export default function Cta({ auth }: CtaProps) {
    return (
        <section className="bg-primary py-20 text-primary-foreground dark:bg-primary/90">
            <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Comienza a gestionar tus bibliotecas hoy mismo
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg">
                    Optimiza la administración de tus bibliotecas con nuestro sistema integral.
                </p>
                <div className="mt-8 flex justify-center">
                    <Link
                        href={auth.user ? route('dashboard') : route('register')}
                        className="rounded-md bg-white px-6 py-3 text-base font-medium text-primary shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                        {auth.user ? 'Ir al Dashboard' : 'Comenzar Ahora'}
                    </Link>
                </div>
            </div>
        </section>
    );
}
