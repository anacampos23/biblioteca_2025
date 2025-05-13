import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { PageProps } from '@inertiajs/core';
import { Book } from 'lucide-react';
import { BookForm } from './components/BookForm';
import { BookLayout } from '@/layouts/books/BookLayout';

interface EditBookProps extends PageProps {
     book: {
        id:string;
        title: string;
        author: string;
        genre: string;
        ISBN: number;
        editorial: string;
        bookcase_id: string;
        zone_id: string;
        floor_id: string;
        bookcase_name: number;
        name: string;
        floor_number: number;
    };
    bookcases?: {id: string; bookcase_name:number; floor_id:string; zone_id:string} [];
    zones?: {id: string; name: string; floor_id: string;} [];
    floors?: {id:string; floor_number: number; capacity_zones: number;}[];
     floor_zone_id:{ floor_id: string; name: string }[];
    page?: string;
    perPage?: string;
}

export default function EditBook({ book, bookcases, zones, floors, floor_zone_id }: EditBookProps) {
    const { t } = useTranslations();

    return (
        <BookLayout title={t('ui.books.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-6 mb-2">
                                <Book color="#2762c2" />
                                {t('ui.books.cards.editTitle')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.editDescription')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookForm
                           initialData={book} bookcases={bookcases} zones={zones} floors={floors} floor_zone_id={floor_zone_id}
                        />
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}
