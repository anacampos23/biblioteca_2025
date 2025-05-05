import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { PageProps } from '@inertiajs/core';
import { Book } from 'lucide-react';
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
    return (
        <UserLayout title={t('ui.users.timeline')}>
            <div className="flex flex-col items-center w-full min-h-screen px-6 py-8 bg-gray-50 dark:bg-gray-800">
                <div className="flex flex-col w-full max-w-4xl mx-auto">
                    <UserTimeline user={user} loans={loans} reserves={reserves} combined={combined} />
                </div>
            </div>
        </UserLayout>
    );
}
