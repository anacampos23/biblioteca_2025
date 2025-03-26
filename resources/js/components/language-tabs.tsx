import { Language, useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface LanguageTabProps extends HTMLAttributes<HTMLDivElement> {
    currentLocale: Language;
}

export default function LanguageTabs({ className = '', currentLocale, ...props }: LanguageTabProps) {
    const { locale, updateLanguage } = useLanguage(currentLocale);

    const languages: { value: Language; flag: string; label: string }[] = [
        { value: 'en', flag: '🇬🇧', label: 'English' },
        { value: 'es', flag: '🇪🇸', label: 'Español' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            {languages.map(({ value, flag, label }) => (
                <button
                    key={value}
                    onClick={() => updateLanguage(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        locale === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <span className="mr-1.5 text-lg">{flag}</span>
                    <span className="text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
