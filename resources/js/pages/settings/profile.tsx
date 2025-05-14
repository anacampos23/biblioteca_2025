import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp, BookmarkCheck, Book, Barcode, Clock4, ClockAlert, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    days_overdue: number;
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

    const loansItems = filteredUserItems.filter((item) => item.type === 'loan');
    const reservesItems = filteredUserItems.filter((item) => item.type === 'reserve');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-10 px-4 py-4 lg:px-8">
                    {/* Encabezado */}
                    <div className="space-y-2 text-center">
                        <HeadingSmall title={t('ui.settings.statistics')} description="" />
                        <h2 className="text-2xl font-semibold text-stone-800 dark:text-white">{activeUser.name}</h2>
                    </div>

                    {/* Selector de fecha */}
                    <div className="mx-auto flex max-w-2xl flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
                        <div className="w-full">
                            <label htmlFor="dateSelect" className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                                {t('ui.settings.profile.select_date')}
                            </label>
                            <input
                                type="date"
                                id="dateSelect"
                                onChange={handleDateSelect}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-stone-600 focus:ring-stone-600 dark:bg-stone-100 dark:text-black"
                            />
                        </div>
                        <div className="w-full lg:w-[40%]">
                            <label className="mb-2 block text-sm opacity-0 select-none">.</label>
                            <button
                                className="w-full rounded-lg bg-stone-800 px-4 py-2 font-medium text-white shadow transition hover:bg-stone-700"
                                onClick={() => setSelectedDate(undefined)}
                            >
                                {t('ui.settings.profile.all')}
                            </button>
                        </div>
                    </div>

                    {/* Tabs para los diferentes tipos de contenido */}
                    <Tabs defaultValue="all">
                        <TabsList className="flex gap-4 justify-center">
                            <TabsTrigger value="all">{t('ui.settings.profile.all')}</TabsTrigger>
                            <TabsTrigger value="loans">{t('ui.settings.profile.loans')}</TabsTrigger>
                            <TabsTrigger value="reserves" className="ml-3">{t('ui.settings.profile.reserves')}</TabsTrigger>
                        </TabsList>

                        {/* TabsContent para todos los elementos */}
                        <TabsContent value="all">
                            <VerticalTimeline lineColor="#e5e7eb">
                                {filteredUserItems.map((item) => {
                                    const elementColor =
                                        item.type === 'reserve' && item.status === 'waiting'
                                            ? '#f59e0b'
                                            : item.type === 'reserve' && item.status === 'contacted'
                                            ? '#ea580c'
                                            : item.type === 'reserve' && item.status === 'finished'
                                              ? '#6b7280'
                                              : item.type === 'loan' && item.active === true
                                                ? '#2563eb'
                                                : '#9ca3af';

                                    return (
                                        <VerticalTimelineElement
                                            key={item.id}
                                            date={new Date(item.type === 'loan' ? item.start_loan : item.created_at).toLocaleDateString()}
                                            iconStyle={{
                                                backgroundColor: elementColor,
                                                color: '#fff',
                                                boxShadow: `0 0 0 4px rgba(0, 0, 0, 0.05)`,
                                            }}
                                            contentStyle={{
                                                background: 'transparent',
                                                borderTop: `6px solid ${elementColor}`,
                                                boxShadow: '0 6px 12px rgba(28, 27, 27, 0.24)',
                                                padding: '24px',
                                                borderRadius: '9px',
                                                color: 'inherit',
                                            }}
                                            contentArrowStyle={{ borderRight: `7px solid ${elementColor}` }}
                                            icon={item.type === 'loan' ? <BookUp /> : <BookmarkCheck />}
                                        >
                                            <h3 className="mb-4 text-lg leading-tight font-bold dark:text-white" style={{ color: elementColor }}>
                                                {item.type === 'loan' ? t('ui.settings.profile.loan') : t('ui.settings.profile.reserve')}
                                            </h3>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Book size={22} />
                                                {item.book.title}
                                            </div>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Barcode size={20} />
                                                ISBN: {item.book.ISBN}
                                            </div>

                                            {item.type === 'loan' ? (
                                                <div className="space-y-2 text-base text-gray-800 dark:text-white">
                                                    <div className="flex items-center gap-2">
                                                        <Clock4 size={20} />
                                                        {new Date(item.start_loan).toLocaleDateString()} –{' '}
                                                        {item.end_loan ? new Date(item.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}
                                                    </div>
                                                    <div
                                                        className={`flex items-center gap-2 ${item.days_overdue === 0 ? 'text-gray-800 dark:text-white' : 'text-red-500'}`}
                                                    >
                                                        <ClockAlert size={20} />
                                                        {t('ui.settings.profile.days_overdue')} {item.days_overdue}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                    <ChevronRight size={20} />
                                                    {t('ui.settings.profile.status.title')}{' '}
                                                    {item.status === 'waiting'
                                                        ? t('ui.settings.profile.status.waiting')
                                                        : item.status === 'contacted'
                                                          ? t('ui.settings.profile.status.contacted')
                                                          : t('ui.settings.profile.status.finished')}
                                                </div>
                                            )}
                                        </VerticalTimelineElement>
                                    );
                                })}
                            </VerticalTimeline>
                        </TabsContent>

                        {/* TabsContent para préstamos */}
                        <TabsContent value="loans">
                            <VerticalTimeline lineColor="#e5e7eb">
                                {loansItems.map((item) => {
                                    const elementColor =
                                        item.type === 'loan' && item.active === true ? '#2563eb' : '#9ca3af';
                                    return (
                                        <VerticalTimelineElement
                                            key={item.id}
                                            date={new Date(item.start_loan).toLocaleDateString()}
                                            iconStyle={{
                                                backgroundColor: elementColor,
                                                color: '#fff',
                                                boxShadow: `0 0 0 4px rgba(0, 0, 0, 0.05)`,
                                            }}
                                            contentStyle={{
                                                background: 'transparent',
                                                borderTop: `6px solid ${elementColor}`,
                                                boxShadow: '0 6px 12px rgba(28, 27, 27, 0.24)',
                                                padding: '24px',
                                                borderRadius: '9px',
                                                color: 'inherit',
                                            }}
                                            contentArrowStyle={{ borderRight: `7px solid ${elementColor}` }}
                                            icon={<BookUp />}
                                        >
                                            <h3 className="mb-4 text-lg leading-tight font-bold dark:text-white" style={{ color: elementColor }}>
                                                {t('ui.settings.profile.loan')}
                                            </h3>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Book size={22} />
                                                {item.book.title}
                                            </div>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Barcode size={20} />
                                                ISBN: {item.book.ISBN}
                                            </div>

                                            <div className="space-y-2 text-base text-gray-800 dark:text-white">
                                                <div className="flex items-center gap-2">
                                                    <Clock4 size={20} />
                                                    {new Date(item.start_loan).toLocaleDateString()} –{' '}
                                                    {item.end_loan ? new Date(item.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}
                                                </div>
                                                <div
                                                    className={`flex items-center gap-2 ${item.days_overdue === 0 ? 'text-gray-800 dark:text-white' : 'text-red-500'}`}
                                                >
                                                    <ClockAlert size={20} />
                                                    {t('ui.settings.profile.days_overdue')} {item.days_overdue}
                                                </div>
                                            </div>
                                        </VerticalTimelineElement>
                                    );
                                })}
                            </VerticalTimeline>
                        </TabsContent>

                        {/* TabsContent para reservas */}
                        <TabsContent value="reserves">
                            <VerticalTimeline lineColor="#e5e7eb">
                                {reservesItems.map((item) => {
                                    const elementColor =
                                        item.status === 'waiting'
                                            ? '#f59e0b'
                                            : item.status === 'contacted'
                                            ? '#ea580c'
                                            : '#6b7280';
                                    return (
                                        <VerticalTimelineElement
                                            key={item.id}
                                            date={new Date(item.created_at).toLocaleDateString()}
                                            iconStyle={{
                                                backgroundColor: elementColor,
                                                color: '#fff',
                                                boxShadow: `0 0 0 4px rgba(0, 0, 0, 0.05)`,
                                            }}
                                            contentStyle={{
                                                background: 'transparent',
                                                borderTop: `6px solid ${elementColor}`,
                                                boxShadow: '0 6px 12px rgba(28, 27, 27, 0.24)',
                                                padding: '24px',
                                                borderRadius: '9px',
                                                color: 'inherit',
                                            }}
                                            contentArrowStyle={{ borderRight: `7px solid ${elementColor}` }}
                                            icon={<BookmarkCheck />}
                                        >
                                            <h3 className="mb-4 text-lg leading-tight font-bold dark:text-white" style={{ color: elementColor }}>
                                                {t('ui.settings.profile.reserve')}
                                            </h3>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Book size={22} />
                                                {item.book.title}
                                            </div>

                                            <div className="mb-2 flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <Barcode size={20} />
                                                ISBN: {item.book.ISBN}
                                            </div>

                                            <div className="flex items-center gap-2 text-base text-gray-800 dark:text-white">
                                                <ChevronRight size={20} />
                                                {t('ui.settings.profile.status.title')}{' '}
                                                {item.status === 'waiting'
                                                    ? t('ui.settings.profile.status.waiting')
                                                    : item.status === 'contacted'
                                                      ? t('ui.settings.profile.status.contacted')
                                                      : t('ui.settings.profile.status.finished')}
                                            </div>
                                        </VerticalTimelineElement>
                                    );
                                })}
                            </VerticalTimeline>
                        </TabsContent>
                    </Tabs>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
