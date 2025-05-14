import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import StatisticLayout from "@/layouts/statistics/StatisticLayout";
import { type BreadcrumbItem, type SharedData } from '@/types';
import BooksSimpleBarChart from '@/components/BooksSimpleBarChart';
import UsersSimpleBarChart from '@/components/UsersStackedBarChart';
import ZonesSimpleBarChart from '@/components/ZonesStackedBarChart';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface IndexStatisticsProps extends PageProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
    users: { name: string; email: string; loans_count: number; reserves_count: number }[];
    zones_movement: { ISBN: number; zone_id: string; loans_count: number; reserves_count: number; zone_name: string }[];
}

export default function IndexStatistics({ books, users, loans, zones_movement }: IndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('ui.navigation.items.dashboard'),
        href: '/dashboard',
    },
    {
        title: t('ui.navigation.items.dashboard'),
        href: '/statistics/Index',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.settings.profile.title')} />

      <StatisticLayout breadcrumbs={breadcrumbs}>
          <BooksSimpleBarChart books={books} loans={loans}/>
          <UsersSimpleBarChart users={users}/>
          <ZonesSimpleBarChart zones_movement={zones_movement}/>
      </StatisticLayout>
    </AppLayout>
  );
}
