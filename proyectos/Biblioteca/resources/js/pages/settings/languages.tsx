import { Head } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';

import HeadingSmall from '@/components/heading-small';
import LanguageTabs from '@/components/language-tabs';
import { type BreadcrumbItem } from '@/types';
import { Language } from '@/hooks/use-language';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

interface LanguagesProps {
    languages: Record<string, { name: string; flag: string }>;
    currentLocale: Language;
}

export default function Languages({ currentLocale }: LanguagesProps) {
    const { t } = useTranslations();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.languages.title'),
            href: '/settings/languages',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.languages.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('ui.settings.languages.title')}
                        description={t('ui.settings.languages.description')}
                    />
                    <LanguageTabs currentLocale={currentLocale} />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
