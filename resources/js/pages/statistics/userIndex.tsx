import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import StatisticLayout from "@/layouts/statistics/StatisticLayout";
import { type BreadcrumbItem, type SharedData } from '@/types';
import BooksSimpleBarChart from '@/pages/statistics/BooksSimpleBarChart';
import UsersSimpleBarChart from '@/pages/statistics/UsersSimpleBarChart';
import ZonesSimpleBarChart from '@/pages/statistics/ZonesSimpleBarChart';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';

interface userIndexStatisticsProps extends PageProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
    users: { name: string; email: string; loans_count: number; reserves_count: number }[];
    zones_movement: { ISBN: number; zone_id: string; loans_count: number; reserves_count: number; zone_name: string }[];
}

export default function UserIndexStatistics({ books, users, loans, zones_movement }: userIndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('ui.statistics.userIndex.title'),
        href: '/statistics/userIndex',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.settings.profile.title')} />

      <StatisticLayout className="p-4">
          <UsersSimpleBarChart users={users}/>
      </StatisticLayout>
    </AppLayout>
  );
}
