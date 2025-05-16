import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { BookUp  } from 'lucide-react';
import { number } from 'zod';
import { LoanForm } from './components/LoanForm';
import { usePage } from '@inertiajs/react';

interface LoanFormProps {
    initialData?: {
        id: string;
        start_loan: string;
        end_loan: string;
        due_date: string;
        active: boolean;
        user_id: string;
        book_id: string;
        name: string;
        email: string;
        title: string;
        author: string;
        ISBN: number;
    };
    ISBN_available: { id: string; ISBN: number; }[];
    books: { id: string; title: string; author:string; ISBN: number; }[];
    booksAvailable: { id: string; title: string; author:string; ISBN: number; }[];
    users: { id: string; name: string; email:string; }[];
    ISBN_email: {book_id: string, user_id: string}[];
    page?: string;
    perPage?: string;
}

export default function CreateLoan({initialData, users, books, ISBN_available, booksAvailable, ISBN_email,page, perPage}: LoanFormProps) {
    const { t } = useTranslations();
    const url=window.location.href;
    const param = new URLSearchParams(window.location.search);

    const title = param.get('title');
    const author = param.get('author');

    return (
        <LoanLayout title={t('ui.loans.card.new')}>
            <div className="flex w-full justify-center self-center md:w-[60%] lg:w-[50%]">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <BookUp  className="text-indigo-700" />
                                {t('ui.loans.card.create')}
                            </div>
                        </CardTitle>
                        <CardDescription className= "font-semibold mt-2">{title}</CardDescription>
                        <CardDescription>{author}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm users={users} books={books} ISBN_available={ISBN_available} booksAvailable={booksAvailable} ISBN_email={ISBN_email}/>
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
