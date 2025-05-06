import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { StatisticLayout } from '@/layouts/statistics/StatisticLayout';
import { usePage } from '@inertiajs/react';
import BooksSimpleBarChart from '@/pages/statistics/BooksSimpleBarChart';
import UsersSimpleBarChart from '@/pages/statistics/UsersSimpleBarChart';
import ZonesSimpleBarChart from '@/pages/statistics/ZonesSimpleBarChart';
import { PageProps } from '@/types';

interface IndexStatisticsProps extends PageProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
    users: {name: string; email: string; loans_count: number; reserves_count: number}[];
    zones_movement: {ISBN:number; zone_id: string; loans_count: number; reserves_count:number; zone_name:string}[];

}

export default function IndexStatistics({ books, users, loans, zones_movement }: IndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  return (
    <StatisticLayout title={t('ui.statistics.title')}>
      <div className="p-4">
        <BooksSimpleBarChart books={books} loans={loans}/>
        <UsersSimpleBarChart users={users}/>
        <ZonesSimpleBarChart zones_movement={zones_movement}/>
      </div>
    </StatisticLayout>
  );
}
