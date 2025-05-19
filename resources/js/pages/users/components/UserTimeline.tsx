import HeadingSmall from '@/components/heading-small';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import { UserLayout } from '@/layouts/users/UserLayout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp, BookmarkCheck, Book, Barcode, Clock4, ClockAlert, ChevronRight, CalendarIcon  } from 'lucide-react';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';


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
    user: { id: string; name: string; email: string };
    loans: CombinedLoan[];
    reserves: CombinedReserve[];
    combined: CombinedItem[];
}

export default function UserTimeline({ user, loans, reserves, combined }: profileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;


    const getUserCombined = (userId: string) => {
        return combined.filter((item) => item.user_id === userId);
    };

    const userItems = getUserCombined(user.id);

    // Estado para la fecha seleccionada
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Función para manejar el cambio de la fecha seleccionada
    const handleDateSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = new Date(event.target.value); // convierte el string a Date
        setSelectedDate(dateValue);
    };

    // Filtrar los elementos por fecha (tanto préstamos como reservas)
 const [date, setDate] = useState<DateRange | undefined>(undefined);

    const filteredUserItems =
        date?.from && date?.to
            ? userItems.filter((item) => {
                  const itemDate = new Date(item.type === 'loan' ? item.start_loan : item.created_at);
                  return itemDate >= date.from! && itemDate <= date.to!;
              })
            : userItems;


    const loansItems = filteredUserItems.filter((item) => item.type === 'loan');
    const reservesItems = filteredUserItems.filter((item) => item.type === 'reserve');

    return (
        <div>
            <Head title={t('ui.users.timeline')} />
                <div className="w-full px-4 py-4 lg:px-8">
                    {/* Encabezado */}
                    <div className="space-y-2 text-center">
                        <HeadingSmall title={t('ui.users.timeline')} description="" />
                        <h2 className="text-2xl font-semibold text-stone-800 dark:text-white">{user.name}</h2>
                    </div>

                    {/* Selector de rango de fecha */}
                    <div className="flex justify-center mt-6">
                        <div className="flex w-full max-w-sm flex-col items-start gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-white">{t('ui.settings.profile.select_date')}</label>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={'outline'}
                                        className={cn(
                                            'w-full justify-start text-left font-normal dark:bg-stone-100 dark:text-black',
                                            !date && 'text-muted-foreground',
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, 'PPP')} - {format(date.to, 'PPP')}
                                                </>
                                            ) : (
                                                format(date.from, 'PPP')
                                            )
                                        ) : (
                                            <span>{t('ui.settings.profile.select_date')}</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                        locale={es}
                                    />
                                </PopoverContent>
                            </Popover>

                            {date?.from || date?.to ? (
                                <Button
                                    className="w-full rounded-lg bg-stone-800 px-4 py-2 font-medium text-white shadow transition hover:bg-stone-700"
                                    onClick={() => setDate(undefined)}
                                >
                                    {t('ui.settings.profile.all')}
                                </Button>
                            ) : null}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div key={user.id} className="mt-8">
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
                    </div>
                </div>
        </div>
    );
}
