import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useTranslations } from '@/hooks/use-translations';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, Building2, MapPin, LibraryBig, Book, ArrowUpRight, BookmarkCheck, ChartPie } from 'lucide-react';
import AppLogo from './app-logo';

interface PageProps {
    auth: {
        user: any;
        permissions: string[];
    };
    [key: string]: unknown;
}

const mainNavItems = (t: (key: string) => string, permissions: string[]): NavItem[] => {
    const items: NavItem[] = [];

    // Siempre mostrar el Dashboard
    items.push({
        title: t('ui.navigation.items.dashboard'),
        url: '/dashboard',
        icon: LayoutGrid,
    });

    // Agregar los ítems condicionalmente según los permisos
    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.users'),
            url: '/users',
            icon: Users,
        });
    }

    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.floors'),
            url: '/floors',
            icon: Building2,
        });
    }

    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.zones'),
            url: '/zones',
            icon: MapPin,
        });
    }

    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.bookcases'),
            url: '/bookcases',
            icon: LibraryBig,
        });
    }

    if (permissions.includes('products.view')) {
        items.push({
            title: t('ui.navigation.items.books'),
            url: '/books',
            icon: Book,
        });
    }

    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.loans'),
            url: '/loans',
            icon: ArrowUpRight,
        });
    }

    if (permissions.includes('users.view')) {
        items.push({
            title: t('ui.navigation.items.reserves'),
            url: '/reserves',
            icon: BookmarkCheck,
        });
    }

    if (permissions.includes('reports.view')) {
        items.push({
            title: t('ui.navigation.items.statistics'),
            url: '/statistics/bookIndex',
            icon: ChartPie,
        });
    }

    return items;
};

const footerNavItems = (t: (key: string) => string): NavItem[] => [
    {
        title: t('ui.navigation.items.repository'),
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: t('ui.navigation.items.documentation'),
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { t } = useTranslations();
    const { auth } = usePage<PageProps>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems(t, auth.permissions)} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems(t)} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
