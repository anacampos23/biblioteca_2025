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

interface ZoneIndexStatisticsProps extends PageProps {
    zones_movement: { ISBN: number; zone_id: string; loans_count: number; reserves_count: number; zone_name: string }[];
}

export default function ZoneIndexStatistics({zones_movement }: ZoneIndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: t('ui.statistics.zoneIndex.title'),
        href: '/statistics/zoneIndex',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t('ui.statistics.book.title')} />

      <StatisticLayout className="p-4">
      <ZonesSimpleBarChart zones_movement={zones_movement}/>
      </StatisticLayout>
    </AppLayout>
  );
}
