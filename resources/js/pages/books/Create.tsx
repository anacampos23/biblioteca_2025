import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { BookForm } from '@/pages/books/components/BookForm';
import { Book } from 'lucide-react';
import { string } from 'zod';

interface BookFormProps {
    initialData?: {
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

export default function CreateBook({ bookcases, zones, floors, floor_zone_id }: BookFormProps) {
    const { t } = useTranslations();

    return (
        <BookLayout title={t('ui.books.create')}>
            <div className="flex justify-center items-start px-2 sm:px-4 py-4 min-h-screen">
                <Card className="md:max-w-4xl shadow-lg dark:shadow-xs dark:shadow-white p-4 sm:p-6">
                    <CardHeader>
                        <CardTitle>
                            <div className="gap-2 mt-4 mb-2 text-lg sm:text-xl">
                                <Book color="#2762c2" />
                                {t('ui.books.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookForm bookcases={bookcases} zones={zones} floors={floors} floor_zone_id={floor_zone_id}/>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}
