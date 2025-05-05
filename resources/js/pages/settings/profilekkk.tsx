import { useState } from 'react';
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

import { UserCombobox } from './userCombobox';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp, BookmarkCheck, Book, Barcode, Clock4, ClockAlert, ChevronRight  } from 'lucide-react';

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface profileProps {
    users: { id: string; name: string; email: string }[];
    loans: {
        id: string;
        start_loan: Date;
        end_loan: Date;
        due_date: Date;
        active: boolean;
        user_id: string;
        book_id: string;
        book: {
            title: string;
            author: string;
        };
    }[];
}

export default function Profile({ users, loans }: profileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const getUserLoans = (userId: string | null) => {
        if (!userId) return [];
        return loans.filter((loan) => loan.user_id === userId);
    };

    const filteredUsers = selectedUserId
        ? users.filter((user) => user.id === selectedUserId)
        : users;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description="" />

                    {/* Combobox para seleccionar usuario */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('ui.settings.profile.select_user')}
                        </label>
                        <UserCombobox
                            users={users}
                            onSelectUser={(userId) => setSelectedUserId(userId)}
                        />
                    </div>

                    {/* Timeline */}
                    <div key={activeUser.id} className="mt-8">
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
            </SettingsLayout>
        </AppLayout>
    );
}
