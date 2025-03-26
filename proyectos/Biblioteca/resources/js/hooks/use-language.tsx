import { router } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

export type Language = 'en' | 'es';

export function useLanguage(initialLocale: Language = 'en') {
    const [locale, setLocale] = useState<Language>(initialLocale);

    const updateLanguage = useCallback((lang: Language) => {
        setLocale(lang);
        router.put('/settings/languages', { locale: lang });
    }, []);

    useEffect(() => {
        setLocale(initialLocale);
    }, [initialLocale]);

    return { locale, updateLanguage } as const;
}
