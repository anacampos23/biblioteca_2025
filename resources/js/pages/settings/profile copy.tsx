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
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp } from 'lucide-react';
import { UserCombobox } from './userCombobox'; // 👈 Asegúrate de que el path sea correcto

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

                    {/* Mostrar préstamos del usuario seleccionado */}
                    {filteredUsers.map((user) => {
                        const userLoans = getUserLoans(user.id);

                        return (
                            <div key={user.id}>
                                <h2 className="font-semibold text-lg mb-2">{user.name}</h2>
                                <Timeline position="alternate">
                                    {userLoans.map((loan) => (
                                        <TimelineItem key={loan.id}>
                                            <TimelineOppositeContent align="right" variant="body2" color="text.secondary">
                                                {new Date(loan.start_loan).toLocaleDateString()}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="primary">
                                                    <BookUp />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                {t('ui.settings.profile.start_loan')} — <strong>{loan.book.title}</strong> ({new Date(loan.end_loan).toLocaleDateString()})
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        );
                    })}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
