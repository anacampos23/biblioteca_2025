import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

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
                    <div className="mb-10 flex w-full flex-col sm:w-[40%] sm:flex-row sm:items-end sm:gap-4">
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
                                <VerticalTimeline lineColor="#d1d5db">
                                    {filteredUserItems.map((item) => (
                                        <VerticalTimelineElement
                                            key={item.id}
                                            date={new Date(item.type === 'loan' ? item.start_loan : item.created_at).toLocaleDateString()}
                                            iconStyle={{
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
                                                color: '#fff',
                                                boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.05)',
                                            }}
                                            contentStyle={{
                                                background: '#f9fafb', // gris muy claro
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                borderRadius: '12px',
                                                padding: '20px',
                                                border: '1px solid #e5e7eb',
                                            }}
                                            contentArrowStyle={{ borderRight: '7px solid #f9fafb' }}
                                            icon={item.type === 'loan' ? <BookUp /> : <BookmarkCheck />}
                                        >
                                            <h3 className="mb-1 text-lg font-semibold text-stone-800">
                                                {item.type === 'loan' ? t('ui.settings.profile.loan') : t('ui.settings.profile.reserve')}
                                            </h3>
                                            <p className="text-sm text-stone-700">{item.book.title}</p>
                                            <p className="text-xs text-stone-500">ISBN: {item.book.ISBN}</p>
                                            {item.type === 'loan' ? (
                                                <p className="mt-1 text-sm text-stone-600">
                                                    {new Date(item.start_loan).toLocaleDateString()} -{' '}
                                                    {item.end_loan ? new Date(item.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}
                                                </p>
                                            ) : (
                                                <p className="mt-1 text-sm text-stone-600">
                                                    {t('ui.settings.profile.status.title')} {item.status}
                                                </p>
                                            )}
                                        </VerticalTimelineElement>
                                    ))}
                                </VerticalTimeline>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
