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

interface bookIndexStatisticsProps extends PageProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
}

export default function UserIndexStatistics({ books, loans }: bookIndexStatisticsProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.statistics.navigation.bookIndex'),
            href: '/statistics/bookIndex',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.statistics.navigation.bookIndex')} />

            <StatisticLayout>
                <div>
                {/* Encabezado */}
                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-semibold text-stone-800 mb-2 dark:text-white">{t('ui.statistics.books.title')}</h2>
                </div>
                <BooksSimpleBarChart books={books} loans={loans} />
                </div>
            </StatisticLayout>
        </AppLayout>
    );
}
