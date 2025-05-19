import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookcaseLayout } from '@/layouts/bookcases/BookcaseLayout';
import { BookcaseForm } from '@/pages/bookcases/components/BookcaseForm';
import { PageProps } from '@inertiajs/core';
import { Book } from 'lucide-react';


interface EditBookcaseProps extends PageProps {
    bookcase: {
        id: string;
        bookcase_name: number;
        zone_id: string;
        floor_id:string;
};
    zones?: {id: string; name: string; floor_id: string; bookcases_count:number;} [];
    floors?: {id:string; floor_number: number; capacity_zones: number;}[];
    bookcases?:{id:string; bookcase_name: string; floor_id: string; zone_id: string; }[];
    page?: string;
    perPage?: string;

}

export default function EditBookcase({ bookcase, zones, floors, bookcases }: EditBookcaseProps) {
    const { t } = useTranslations();

    return (
        <BookcaseLayout title={t('ui.bookcases.cards.edit.edit')}>
            <div className="flex w-full justify-center self-center md:w-[70%] lg:w-[50%]">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <Book color="#2762c2" />
                                {t('ui.bookcases.cards.edit.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.bookcases.cards.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookcaseForm
                            initialData={bookcase} zones={zones} floors={floors} bookcases={bookcases}
                        />
                    </CardContent>
                </Card>
            </div>
        </BookcaseLayout>
    );
}
