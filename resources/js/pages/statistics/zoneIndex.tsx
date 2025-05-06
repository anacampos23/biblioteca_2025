import React from 'react';
import { useTranslations } from '@/hooks/use-translations';
import StatisticLayout from "@/layouts/statistics/StatisticLayout";
import { type BreadcrumbItem, type SharedData } from '@/types';
import ZonesStackedBarChart from '@/components/ZonesStackedBarChart';
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
            title: t('ui.statistics.navigation.zoneIndex'),
            href: '/statistics/zoneIndex',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.statistics.navigation.zoneIndex')} />

            <StatisticLayout>
                <div>
                    {/* Encabezado */}
                    <div className="space-y-2 text-center">
                        <h2 className="mb-6 text-2xl font-semibold text-stone-800 dark:text-white">{t('ui.statistics.zones.title')}</h2>
                    </div>
                    <ZonesStackedBarChart zones_movement={zones_movement} />
                </div>
            </StatisticLayout>
        </AppLayout>
    );
}
