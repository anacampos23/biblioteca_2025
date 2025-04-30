import HeadingSmall from '@/components/heading-small';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@/components/ui/timeline';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { Button } from "@/components/ui/button";


type CombinedLoan = {
    id: string;
    type: 'loan';
    user_id: string;
    book_id: string;
    book: {
        title: string;
        author: string;
        ISBN: number;
    };
    start_loan: Date;
    end_loan: Date | null;
    due_date: Date;
    active: boolean;
};

type CombinedReserve = {
    id: string;
    type: 'reserve';
    status: string;
    created_at: Date;
    deleted_at: Date;
    user_id: string;
    book_id: string;
    book: {
        title: string;
        author: string;
        ISBN: number;
    };
};

type CombinedItem = CombinedLoan | CombinedReserve;

interface profileProps {
    users: { id: string; name: string; email: string }[];
    loans: CombinedLoan[];
    reserves: CombinedReserve[];
    combined: CombinedItem[];
}

export default function Profile({ users, loans, reserves, combined }: profileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];

    const getUserCombined = (userId: string) => {
        return combined.filter((item) => item.user_id === userId);
    };

    const activeUser = users.find((user) => user.name === auth.user.name);

    if (!activeUser) {
        return <div>{t('ui.settings.profile.no_user_found')}</div>;
    }

    const userItems = getUserCombined(activeUser.id);

    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Función para manejar el cambio de la fecha seleccionada
    const handleDateSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = new Date(event.target.value); // convierte el string a Date
        setSelectedDate(dateValue);
    };

    // Filtrar los elementos por fecha (tanto préstamos como reservas)
    const filteredUserItems = selectedDate
        ? userItems.filter((item) => {
            // Filtrar por fecha para préstamos
            if (item.type === 'loan') {
                const loanDate = new Date(item.start_loan);
                return loanDate.toDateString() === selectedDate.toDateString();
            }
            // Filtrar por fecha para reservas
            if (item.type === 'reserve') {
                const reserveDate = new Date(item.created_at);
                return reserveDate.toDateString() === selectedDate.toDateString();
            }
            return false;
        })
        : userItems;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description={t('')} />
                    <h2>{activeUser.name}</h2>

                    {/* Filtro de fecha */}
                    <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:gap-4">
                        <div className="w-full sm:flex-1">
                            <label htmlFor="dateSelect" className="mb-1 block text-sm font-medium text-gray-700">
                                {t('ui.settings.profile.select_date')}
                            </label>
                            <input
                                type="date"
                                id="dateSelect"
                                onChange={handleDateSelect}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                            />
                        </div>

                        <div className="mt-4 w-full sm:mt-0 sm:w-auto">
                            <button
                                className="w-full rounded bg-stone-800 px-4 py-2 text-white transition hover:bg-stone-600 sm:w-auto"
                                onClick={() => setSelectedDate(undefined)}
                            >
                                {t('ui.settings.profile.all')}
                            </button>
                        </div>
                    </div>
                    <div key={activeUser.id}>
                        <Timeline position="alternate">
                            {filteredUserItems.map((item) => (
                                <TimelineItem key={item.id}>
                                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2">
                                        {item.type === 'loan' ? (
                                            <>
                                               <div className={`${!item.end_loan ? 'text-blue-500'  : 'text-gray-600 dark:text-gray-300'}`}>
                                                <div>{new Date(item.start_loan!).toLocaleDateString()} - </div>
                                                <div>
                                                    {item.end_loan ? new Date(item.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}
                                                </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className={`${item.status === 'waiting' ? 'text-orange-400'  : item.status === 'contacted' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>{new Date(item.created_at!).toLocaleDateString()} - </div>
                                                <div className={`${item.status === 'waiting' ? 'text-orange-400'  : item.status === 'contacted' ? 'text-orange-500' : 'text-gray-600 dark:text-gray-300'}`}>
                                                    {t('ui.settings.profile.status.title') + ' '}
                                                    {item.status === 'waiting'
                                                        ? t('ui.settings.profile.status.waiting')
                                                        : item.status === 'contacted'
                                                          ? t('ui.settings.profile.status.contacted')
                                                          : t('ui.settings.profile.status.finished')}
                                                </div>
                                            </>
                                        )}
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot
                                            sx={{
                                                backgroundColor:
                                                    item.type === 'reserve' && item.status === 'waiting'
                                                        ? '#ffaf3a'
                                                        : item.type === 'reserve' && item.status === 'contacted'
                                                          ? '#ff9800'
                                                          : item.type === 'reserve' && item.status === 'finished'
                                                            ? '#c1c1c1'
                                                            : item.type === 'loan' && item.active === true
                                                              ? '#1976d2'
                                                              : '#c1c1c1', // Azul para 'loan' y Naranja para 'reserve'
                                            }}
                                        >
                                            {item.type === 'loan' ? <BookUp /> : <BookmarkCheck />}
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        {item.type === 'loan' ? (
                                            <>
                                                <div className="text-m font-bold">{t('ui.settings.profile.loan')}</div>
                                                <div className="text-sm">{item.book.title}</div>
                                                <div className="text-sm">ISBN: {item.book.ISBN}</div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-m font-bold">{t('ui.settings.profile.reserve')}</div>
                                                <div className="text-sm">{item.book.title}</div>
                                                <div className="text-sm">ISBN: {item.book.ISBN}</div>
                                            </>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
