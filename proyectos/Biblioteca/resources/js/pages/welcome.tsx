import { Head, usePage } from '@inertiajs/react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Benefits from '@/components/landing/Benefits';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';

interface PageProps {
    auth: {
        user: any;
    };
}

export default function Welcome() {
    const page = usePage<{props: PageProps}>();
    const auth = page.props.auth;

    return (
        <>
            <Head title="Biblioteca 2025 - Sistema de Gestión de Bibliotecas">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <Header auth={auth as { user: any }} />
                <Hero auth={auth as { user: any }} />
                <Features />
                <Benefits />
                <Cta auth={auth as { user: any }} />
                <Footer />
            </div>
        </>
    );
}
