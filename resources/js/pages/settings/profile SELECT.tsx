import { useState } from 'react'; // Importar useState
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

    // Estado para el usuario seleccionado
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    // Función para manejar el cambio del usuario seleccionado
    const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(event.target.value);
    };

    // Obtener los préstamos de un usuario
    const getUserLoans = (userId: string | null) => {
        if (userId === null) return []; // Si no se ha seleccionado un usuario, no mostrar préstamos
        return loans.filter((loan) => loan.user_id === userId);
    };

    const filteredUsers = selectedUserId
        ? users.filter((user) => user.id === selectedUserId) // Filtrar usuarios por el seleccionado
        : users;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description={t('')} />

                    {/* Dropdown para seleccionar un usuario */}
                    <div className="mb-4">
                        <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700">
                            {t('ui.settings.profile.select_user')}
                        </label>
                        <select
                            id="userSelect"
                            value={selectedUserId || ''}
                            onChange={handleUserSelect}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md"
                        >
                            <option value="">{t('ui.settings.profile.select_user_default')}</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mostrar préstamos solo para el usuario seleccionado */}
                    {filteredUsers.map((user) => {
                        const userLoans = getUserLoans(user.id); // Obtener los préstamos de este usuario

                        return (
                            <div key={user.id}>
                                <h2>{user.name}</h2> {/* Nombre del usuario */}
                                <Timeline position="alternate">
                                    {userLoans.map((loan) => (
                                        <TimelineItem key={loan.id}>
                                            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                                {new Date(loan.start_loan).toLocaleDateString()}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="primary">
                                                    <BookUp />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                {t('ui.settings.profile.start_loan')}
                                                {loan.book.title} - {new Date(loan.end_loan).toLocaleDateString()}
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
