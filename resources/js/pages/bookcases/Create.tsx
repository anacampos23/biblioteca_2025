import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookcaseLayout } from '@/layouts/bookcases/BookcaseLayout';
import { BookcaseForm } from '@/pages/bookcases/components/BookcaseForm';
import { Book } from 'lucide-react';

interface BookcaseFormProps {
    initialData?: {
        id: string;
        bookcase_name: number;
        zone_id: string;
        floor_id:string;
    page?: string;
    perPage?: string;
};
}

export default function CreateUser() {
    const { t } = useTranslations();

    return (
        <BookcaseLayout title={t('ui.bookcases.create')}>
            <div className="flex w-full justify-center self-center md:w-[70%] lg:w-[50%]">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <Book color="#2762c2" />
                                {t('ui.bookcases.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.bookcases.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookcaseForm  />
                    </CardContent>
                </Card>
            </div>
        </BookcaseLayout>
    );
}
