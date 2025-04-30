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

// 👇 Esto va justo después de los imports
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

// 👇 Actualizas tu interface profileProps con este tipo
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
    //Obtener los préstamos de un usuario
    const getUserCombined = (userId: string) => {
        return combined.filter((item) => item.user_id === userId);
    };

    // Obtener el usuario autenticado (por ejemplo, usando el auth prop)
    const activeUser = users.find((user) => user.name === auth.user.name);

    if (!activeUser) {
        return <div>{t('ui.settings.profile.no_user_found')}</div>; // Si no se encuentra el usuario
    }

    const userItems = getUserCombined(activeUser.id);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description={t('')} />

                    <div key={activeUser.id}>
                        <h2>{activeUser.name}</h2> {/* Nombre del usuario */}
                        <Timeline position="alternate">
                            {userItems.map((item) => (
                                <TimelineItem key={item.id}>
                                    <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                        {item.type === 'loan' ? (
                                            <>
                                                <div>{new Date(item.start_loan!).toLocaleDateString()} - </div>
                                                <div>
                                                    {item.end_loan ? new Date(item.end_loan).toLocaleDateString() : t('ui.settings.profile.active')}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>{new Date(item.created_at!).toLocaleDateString()} - </div>
                                                <div>
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
