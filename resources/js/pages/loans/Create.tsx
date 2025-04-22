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
    users: { id: string; name: string; email:string; }[];
    page?: string;
    perPage?: string;
}

export default function CreateLoan({initialData, users, ISBN_available, page, perPage}: LoanFormProps) {
    const { t } = useTranslations();
    const url=window.location.href;
    const param = new URLSearchParams(window.location.search);

    const title = param.get('title');
    const author = param.get('author');

    return (
        <LoanLayout title={t('ui.loans.card.new')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <BookUp  color="#2762c2" />
                                {t('ui.loans.card.create')}
                            </div>
                        </CardTitle>
                        <CardDescription className= "font-semibold mt-2">{title}</CardDescription>
                        <CardDescription>{author}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm users={users} ISBN_available={ISBN_available}/>
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
