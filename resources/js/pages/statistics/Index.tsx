import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import { StatisticLayout } from '@/layouts/statistics/StatisticLayout';
import { usePage } from '@inertiajs/react';
import SimpleBarChart from '@/components/simpleBarChart'; // ajusta la ruta según dónde esté
import { PageProps } from '@/types';

interface IndexStatisticsProps extends PageProps {
    books: { id: string; title: string }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
}

export default function IndexStatistics({ books, loans }: IndexStatisticsProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  return (
    <StatisticLayout title={t('ui.statistics.title')}>
      <div className="p-4">
        <SimpleBarChart books={books} loans={loans}/>
      </div>
    </StatisticLayout>
  );
}
