import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
  ArrowUpRight,
  Book,
  BookmarkCheck,
  Building2,
  ChartPie,
  LibraryBig,
  MapPin,
  Users,
  BookOpenText,
} from 'lucide-react';

interface PageProps {
  auth: {
    user: any;
    permissions: string[];
  };
  [key: string]: unknown;
}

export default function Dashboard() {
  const { t } = useTranslations();
  const { auth } = usePage<PageProps>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('ui.navigation.items.dashboard'),
      href: '/dashboard',
    },
  ];

  const cards = [
    {
      permission: 'users.view',
      title: t('ui.users.title'),
      description: t('ui.users.description'),
      href: '/users',
      icon: Users,
    },
    {
      permission: 'users.view',
      title: t('ui.floors.title'),
      description: t('ui.floors.description'),
      href: '/floors',
      icon: Building2,
    },
    {
      permission: 'users.view',
      title: t('ui.zones.title'),
      description: t('ui.zones.description'),
      href: '/zones',
      icon: MapPin,
    },
    {
      permission: 'users.view',
      title: t('ui.bookcases.title'),
      description: t('ui.bookcases.description'),
      href: '/bookcases',
      icon: LibraryBig,
    },
    {
      permission: 'users.view',
      title: t('ui.books.title'),
      description: t('ui.books.description'),
      href: '/books',
      icon: Book,
    },
    {
      permission: 'products.view',
      title: t('ui.books.searchBook'),
      description: t('ui.books.searchBook_description'),
      href: '/books/search',
      icon: BookOpenText ,
    },
    {
      permission: 'users.view',
      title: t('ui.loans.title'),
      description: t('ui.loans.description'),
      href: '/loans',
      icon: ArrowUpRight,
    },
    {
      permission: 'users.view',
      title: t('ui.reserves.title'),
      description: t('ui.reserves.description'),
      href: '/reserves',
      icon: BookmarkCheck,
    },
    {
      permission: 'reports.view',
      title: t('ui.statistics.title'),
      description: t('ui.statistics.description'),
      href: '/statistics/bookIndex',
      icon: ChartPie,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.navigation.items.dashboard')} />
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(
          (card, index) =>
            auth.permissions.includes(card.permission) && (
              <DashboardCard
                key={index}
                title={card.title}
                description={card.description}
                href={card.href}
                icon={card.icon}
              />
            )
        )}
      </div>
    </AppLayout>
  );
}
