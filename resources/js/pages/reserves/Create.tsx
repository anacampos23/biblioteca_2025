import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ReserveLayout } from '@/layouts/reserves/ReserveLayout';
import { BookmarkCheck  } from 'lucide-react';
import { number } from 'zod';
import { usePage } from '@inertiajs/react';
import { ReserveForm } from './components/ReserveForm';

interface ReserveFormProps {
    initialData?: {
        id: string;
        user_id: string;
        book_id: string;
        name: string;
        email: string;
        title: string;
        author: string;
        ISBN: number;
    };
    users: { id: string; name: string; email:string; }[];
    ISBN_email: {ISBN: number, email: string}[];
    page?: string;
    perPage?: string;
}

export default function CreateReserve({initialData, users, ISBN_email, page, perPage}: ReserveFormProps) {
    const { t } = useTranslations();
    const url=window.location.href;
    const param = new URLSearchParams(window.location.search);

    const title = param.get('title');
    const author = param.get('author');

    return (
        <ReserveLayout title={t('ui.reserves.card.new')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="max-w-70% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white ">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <BookmarkCheck  className="text-indigo-700" />
                                {t('ui.reserves.card.create')}
                            </div>
                        </CardTitle>
                        <CardDescription className= "mt-2">{t('ui.reserves.card.not_available')}</CardDescription>
                        <CardDescription className= "font-semibold mt-4 underline">{t('ui.reserves.card.book')}</CardDescription>
                        <CardDescription className= "font-semibold">{title}</CardDescription>
                        <CardDescription>{author}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ReserveForm users={users} ISBN_email={ISBN_email}/>
                    </CardContent>
                </Card>
            </div>
        </ReserveLayout>
    );
}
