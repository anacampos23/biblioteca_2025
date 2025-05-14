import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useState, type PropsWithChildren } from 'react';

interface StatisticLayoutProps extends PropsWithChildren {
  title: string;
}

export default function StatisticLayout({ title, children }: StatisticLayoutProps){
    const { t } = useTranslations();
    const currentPath = window.location.pathname;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.navigation.items.dashboard'),
            href: '/dashboard',
        },
        {
            title: t('ui.navigation.items.statistics'),
            href: '/floors',
        },
    ];
    if (title !== t('ui.navigation.items.statistics')) {
        breadcrumbs.push({
            title,
            href: '#',
        });
    }

    const sidebarNavItems: NavItem[] = [
        {
            title: t('ui.statistics.navigation.bookIndex'),
            url: '/statistics/bookIndex',
            icon: undefined,
        },
        {
            title: t('ui.statistics.navigation.userIndex'),
            url: '/statistics/userIndex',
            icon: undefined,
        },
        {
            title: t('ui.statistics.navigation.zoneIndex'),
            url: '/statistics/zoneIndex',
            icon: undefined,
        },
    ];

    const [isPopoverOpen, setPopoverOpen] = useState(false); // Estado para controlar la visibilidad del popover

    return (
        <div className="px-4 py-6">
            <Heading title={t('ui.statistics.title')} description={t('ui.statistics.description')} />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                {/* Parte del sidebar que aparece solo en pantallas grandes */}
                <aside className="hidden w-full max-w-xl lg:block lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.url}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-gray-300': currentPath === item.url,
                                    'text-gray-800': currentPath === item.url,
                                })}
                            >
                                <Link href={item.url} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                {/* Popover en móvil */}
                <div className="lg:hidden">
                    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full bg-stone-200 dark:bg-stone-800">
                                {t('ui.statistics.navigation.all')}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full max-w-xs space-y-2">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.url}
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-gray-300': currentPath === item.url,
                                        'text-blue-800': currentPath === item.url,
                                    })}
                                    onClick={() => setPopoverOpen(false)}
                                >
                                    <Link href={item.url} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </PopoverContent>
                    </Popover>
                </div>

                {/* Contenido principal ocupando toda la pantalla */}
                <div className="w-full flex-1">
                    <section className="w-full space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
