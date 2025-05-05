import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { PageProps } from '@inertiajs/core';
import { MessageSquareWarning  } from 'lucide-react';
import { Link } from "@inertiajs/react";
import { UserLayout } from '@/layouts/users/UserLayout';
import UserTimeline from './components/UserTimeline';

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

interface ShowUserProps {
    user: { id: string; name: string; email: string };
    loans: CombinedLoan[];
    reserves: CombinedReserve[];
    combined: CombinedItem[];
}

export default function Show({ user, loans, reserves, combined }: ShowUserProps) {
    const { t } = useTranslations();
    // Verificar si existen loans o reserves
    const hasLoansOrReserves = loans.some((loan) => loan.user_id === user.id) || reserves.some((reserve) => reserve.user_id === user.id);
    return (
        <UserLayout title={t('ui.users.timeline')}>
            <div className="flex min-h-screen w-full flex-col items-center px-6 py-8">
                <div className="mx-auto flex w-full max-w-4xl flex-col">
                    {/* Si hay loans o reserves, muestra el UserTimeline, si no, muestra el mensaje */}
                    {hasLoansOrReserves ? (
                        <UserTimeline user={user} loans={loans} reserves={reserves} combined={combined} />
                    ) : (
                        <div className="mt-20 flex flex-col items-center justify-center rounded-lg p-6 text-center text-xl font-semibold text-gray-700 dark:text-gray-100">
                            <div className="mb-4 text-9xl text-gray-700 dark:text-gray-100">
                                <MessageSquareWarning />
                            </div>
                            <p className="text-lg">{t('ui.users.no_loans_reserves')}</p>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
