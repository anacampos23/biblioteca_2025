import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import { Appearance as AppearanceType } from '@/hooks/use-appearance';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

interface AppearanceProps {
    currentAppearance: AppearanceType;
}

export default function Appearance({ currentAppearance }: AppearanceProps) {
    const { t } = useTranslations();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.appearance.title'),
            href: '/settings/appearance',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.appearance.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('ui.settings.appearance.title')}
                        description={t('ui.settings.appearance.description')}
                    />
                    <AppearanceTabs currentAppearance={currentAppearance} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
