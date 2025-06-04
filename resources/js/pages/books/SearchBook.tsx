import { Pagination } from '@/components/stack-table';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useBooks } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface BookIndexProps {
    genresList?: { id: string; genre_name: string }[];
    zonesArray?: { id: string; name: string }[];
}

export default function SearchBook({ genresList, zonesArray }: BookIndexProps) {
    const { t } = useTranslations();
    const { url } = usePage();

    // Obtener los parámetros de la URL actual
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    // Inicializar el estado con los valores de la URL o los valores predeterminados
    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});

    // Combine filters
    const combinedSearch = [
        filters.title ? filters.title : 'null',
        filters.author ? filters.author : 'null',
        filters.genre ? filters.genre : 'null',
        filters.ISBN ? filters.ISBN : 'null',
        filters.editorial ? filters.editorial : 'null',
        filters.available ? filters.available : 'null',
        filters.reserved ? filters.reserved : 'null',
        filters.bookcase_name ? filters.bookcase_name : 'null',
        filters.name ? filters.name : 'null',
        filters.floor_number ? filters.floor_number : 'null',
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    //Filters
    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    //Boton disponible/no disponible
    const handleToggleAvailabilityFilter = (availability: boolean) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            available: availability.toString(),
        }));
    };

    //ISBN count
    interface BookCount {
        ISBN: string;
        isbn_count: number;
    }

    const booksData = books ?? {
        data: [],
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            per_page: perPage,
            to: 0,
            total: 0,
        },
    };

    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                    </div>

                    <div className="space-y-4">
                        <FiltersTable
                            filters={
                                [
                                    {
                                        id: 'title',
                                        label: t('ui.books.filters.title'),
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.title'),
                                    },
                                    {
                                        id: 'author',
                                        label: t('ui.books.filters.author'),
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.author'),
                                    },
                                    {
                                        id: 'genre',
                                        label: t('ui.books.filters.genre'),
                                        type: 'select',
                                        options: genresList?.map((genre) => ({
                                            label: t(`ui.books.genres.${genre.genre_name}`),
                                            value: genre.genre_name,
                                        })),
                                        placeholder: t('ui.books.placeholders.genre'),
                                    },
                                    {
                                        id: 'ISBN',
                                        label: t('ui.books.filters.ISBN'),
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.ISBN'),
                                    },
                                    {
                                        id: 'editorial',
                                        label: t('ui.books.filters.editorial'),
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.editorial'),
                                    },
                                    {
                                        id: 'available',
                                        label: t('ui.books.filters.availability'),
                                        type: 'select',
                                        options: [
                                            { value: 'true', label: t('ui.books.filters.available') },
                                            { value: 'false', label: t('ui.books.filters.not_available') },
                                        ],
                                        placeholder: t('ui.books.placeholders.available'),
                                    },
                                    {
                                        id: 'reserved',
                                        label: t('ui.books.filters.reserve'),
                                        type: 'select',
                                        options: [
                                            { value: 'true', label: t('ui.books.filters.reserved') },
                                            { value: 'false', label: t('ui.books.filters.not_reserved') },
                                        ],
                                        placeholder: t('ui.books.placeholders.reserved'),
                                    },
                                    {
                                        id: 'bookcase_name',
                                        label: t('ui.books.filters.bookcase_name'),
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.bookcase_name'),
                                    },
                                    {
                                        id: 'name',
                                        label: t('ui.books.filters.name'),
                                        type: 'select',
                                        options: zonesArray.map((zone) => ({
                                            label: t(`ui.zones.list.${zone.name}`),
                                            value: zone.name,
                                        })),
                                        placeholder: t('ui.books.placeholders.name'),
                                    },
                                    {
                                        id: 'floor_number',
                                        label: t('ui.books.filters.floor_number'),
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.floor_number'),
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {booksData?.data?.map((book) => (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div key={book.id} className="flex flex-row gap-6 space-y-2 rounded-xl bg-gray-100 dark:bg-stone-900 dark:hover:bg-stone-800 p-4 shadow-lg hover:bg-white">
                                        <div className="w-40">
                                            {book.image_path ? (
                                                <img src={book.image_path} alt="Current book image" className="h-auto w-40 rounded-md" />
                                            ) : (
                                                <div className="flex h-40 items-center justify-center">
                                                    <img src="/storage/images/icon_book.png" alt="Book" className="h-auto w-20" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold">{book.title}</h2>
                                            <p>
                                                <strong>{t('ui.books.columns.author')}:</strong> {book.author}
                                            </p>
                                            <p>
                                                <strong>{t('ui.books.columns.genre')}:</strong>{' '}
                                                {JSON.parse(book.genre || '[]')
                                                    .map((genre: string) => t(`ui.books.genres.${genre}`))
                                                    .join(', ')}
                                            </p>

                                            <p>
                                                <strong>{t('ui.books.columns.ISBN')}:</strong> {book.ISBN}
                                            </p>
                                            <p>
                                                <strong>{t('ui.books.columns.editorial')}:</strong> {book.editorial}
                                            </p>
                                            <p>
                                                <strong>{t('ui.books.columns.available')}:</strong>{' '}
                                                {book.available ? t('ui.books.filters.available') : t('ui.books.filters.not_available')}
                                            </p>
                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogTitle> {t('ui.books.import_title')} </DialogTitle>
                                    {t('ui.books.import_description')}

                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>

                    <Pagination
                        meta={booksData.meta}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                        perPageOptions={[10, 25, 50, 100]}
                    />
                </div>
            </div>
        </BookLayout>
    );
}
