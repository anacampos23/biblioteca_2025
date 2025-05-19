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
    floor_zone_id:{ floor_id: string; name: string }[];
    page?: string;
    perPage?: string;

}

export default function EditBookcase({ bookcase, zones, floors, floor_zone_id }: EditBookcaseProps) {
    const { t } = useTranslations();

    return (
        <BookcaseLayout title={t('ui.bookcases.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Book color="#2762c2" />
                                {t('ui.bookcases.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.bookcases.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookcaseForm
                            initialData={bookcase} zones={zones} floors={floors} floor_zone_id={floor_zone_id}
                        />
                    </CardContent>
                </Card>
            </div>
        </BookcaseLayout>
    );
}
