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
            ISBN: number;
        };
    }[];
    reserves: {
        id: string;
        status: boolean;
        user_id: string;
        book_id: string;
        book: {
            title: string;
            author: string;
            ISBN: number;
        };
    }[];
    combined: {
        id: string;
        type: 'loan' | 'reserve';
        user_id: string;
        book_id: string;
        book: {
            title: string;
            author: string;
            ISBN: number;
        };
    }[];
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
    //Obtener los préstamos de un usuario
    const getUserLoans = (userId: string) => {
        return loans.filter((loan) => loan.user_id === userId);
    };

    // Obtener el usuario autenticado (por ejemplo, usando el auth prop)
    const activeUser = users.find((user) => user.name === auth.user.name);

    if (!activeUser) {
        return <div>{t('ui.settings.profile.no_user_found')}</div>; // Si no se encuentra el usuario
    }

    const userLoans = getUserLoans(activeUser.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description={t('')} />

                            <div key={activeUser.id}>
                                <h2>{activeUser.name}</h2> {/* Nombre del usuario */}
                                <Timeline position="alternate">
                                    {userLoans.map((loan, index) => (
                                        <TimelineItem key={loan.id}>
                                            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                                <div>{new Date(loan.start_loan).toLocaleDateString()} -</div>
                                                <div>{loan.end_loan ? new Date(loan.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}</div>
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="primary" >
                                                    <BookUp/>
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>

                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                <div className="text-m font-bold">
                                                {t('ui.settings.profile.loan')}
                                                </div>
                                                <div className="text-sm">{loan.book.title}</div>
                                                <div className="text-sm">ISBN: {loan.book.ISBN}</div>
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
