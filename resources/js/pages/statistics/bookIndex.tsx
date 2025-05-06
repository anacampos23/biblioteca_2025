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

interface bookIndexStatisticsProps extends PageProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
}

export default function UserIndexStatistics({ books, loans, }: bookIndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('ui.statistics.bookIndex.title'),
        href: '/statistics/bookIndex',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.statistics.book.title')} />

      <StatisticLayout className="p-4">
          <BooksSimpleBarChart books={books} loans={loans}/>
      </StatisticLayout>
    </AppLayout>
  );
}
