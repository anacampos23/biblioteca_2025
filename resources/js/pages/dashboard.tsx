import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Users, User, Building2, MapPin, LibraryBig, Book, ArrowUpRight, BookmarkCheck, ChartPie  } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import CardFlip from "@/components/ui/card-flip";
import { Icon } from '@/components/icon';
import { useTranslations } from '@/hooks/use-translations';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PageProps{
    auth: {
        user:any;
        permissions:string[];
    }
    [key: string]: unknown;
}

export default function Dashboard() {
    const { t } = useTranslations();

    const { auth } = usePage<PageProps>().props;
    console.log("Permisos del usuario:", auth.permissions);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.users.title')}
                    description={t('ui.users.description')}
                    href="/users"
                    icon={Users}
                />}
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.floors.title')}
                    description= {t('ui.floors.description')}
                    href="/floors"
                    icon={Building2}
                />}
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.zones.title')}
                    description= {t('ui.zones.description')}
                    href="/zones"
                    icon={MapPin}
                />}
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.bookcases.title')}
                    description= {t('ui.bookcases.description')}
                    href="/bookcases"
                    icon={LibraryBig}
                />}
                {auth.permissions.includes('products.view') &&
                <DashboardCard
                    title={t('ui.books.title')}
                    description= {t('ui.books.description')}
                    href="/books"
                    icon={Book}
                />}
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.loans.title')}
                    description= {t('ui.loans.description')}
                    href="/loans"
                    icon={ArrowUpRight }
                />}
                {auth.permissions.includes('users.view') &&
                <DashboardCard
                    title={t('ui.reserves.title')}
                    description= {t('ui.reserves.description')}
                    href="/reserves"
                    icon={BookmarkCheck  }
                />}
                {auth.permissions.includes('reports.view') &&
                <DashboardCard
                    title={t('ui.statistics.title')}
                    description= {t('ui.statistics.description')}
                    href="/statistics/bookIndex"
                    icon={ChartPie }
                />}

                <CardFlip
                    contentFront={
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Usuario 1</h3>
                                <p className="text-sm text-muted-foreground">descripcion de usuario</p>
                            </div>
                        </div>
                    }
                    contentBack={
                        <div className="flex w-full h-full items-center gap-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <Icon iconNode={User} className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">cliente 2</h3>
                                <p className="text-sm text-muted-foreground">descripcion de cliente</p>

                            </div>
                        </div>
                    }
                />

            </div>
        </AppLayout>
    );
}
