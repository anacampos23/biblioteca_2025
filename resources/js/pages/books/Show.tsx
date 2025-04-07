import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { PageProps } from '@inertiajs/core';
import { Book } from 'lucide-react';
import { Link } from "@inertiajs/react";

interface ShowBookProps extends PageProps {
    book: {
        id: string;
        title: string;
        author: string;
        genre: string;
        ISBN: number;
        editorial: string;
        quantity: number;
        status: string;
        bookcase_id: string;
        zone_id: string;
        floor_id: string;
    };
    zones?: { id: string; name: string; floor_id: string; }[];
    floors?: { id: string; floor_number: number; capacity_zones: number; }[];
    bookcases?: { id: string; bookcase_name: string; }[];
    page?: string;
    perPage?: string;

}

export default function ShowBook({ book, page, perPage, zones, floors, bookcase_name }: ShowBookProps) {
    const { t } = useTranslations();
    console.log(book);
    return (
        <BookLayout title={t('ui.books.book')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-6 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Book color="#2762c2" />
                                {book.title}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.show.author')}:{book.author}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                    <div className="space-y-2">
                        <p><strong>{t('ui.books.show.genre')}:</strong> {book.genre}</p>
                        <p><strong>{t('ui.books.show.ISBN')}:</strong> {book.ISBN}</p>
                        <p><strong>{t('ui.books.show.editorial')}:</strong> {book.editorial}</p>
                        <p><strong>{t('ui.books.show.quantity')}:</strong> {book.quantity}</p>
                        <p><strong>{t('ui.books.show.status')}:</strong> {book.status}</p>
                        <Separator />
                        <div className='text-lg, font-semibold underline'>{t('ui.books.show.location')}</div>
                        <p><strong>{t('ui.books.show.bookcase')}:</strong> {bookcase_name}</p>
                        <p><strong>{t('ui.books.show.zone')}:</strong> {book.zone_id}</p>
                        <p><strong>{t('ui.books.show.floor')}:</strong> {book.floor_id}</p>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );


}
