import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { t } = useTranslations();
    const currentPath = window.location.pathname;

    const sidebarNavItems: NavItem[] = [
        {
            title: t('ui.settings.navigation.profile'),
            url: '/settings/profile',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.password'),
            url: '/settings/password',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.appearance'),
            url: '/settings/appearance',
            icon: undefined,
        },
        {
            title: t('ui.settings.navigation.languages'),
            url: '/settings/languages',
            icon: undefined,
        },
    ];

    const [isPopoverOpen, setPopoverOpen] = useState(false); // Estado para controlar la visibilidad del popover

    return (
        <div className="px-4 py-6">
            <Heading title={t('ui.settings.title')} description={t('ui.settings.description')} />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                {/* Parte del sidebar que aparece solo en pantallas grandes */}
                <aside className="hidden lg:block w-full max-w-xl lg:w-48">
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
                                })}>
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
                                {t('ui.settings.navigation.all')}
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
                                        'bg-muted': currentPath === item.url,
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
                <div className="flex-1 w-full">
                    <section className="w-full space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
