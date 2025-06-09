import { Pagination } from '@/components/stack-table';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { useBooks } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BooksearchLayout } from '@/layouts/booksearchs/BooksearchLayout';
import { usePage } from '@inertiajs/react';
import { ChevronRight  } from 'lucide-react';
import { useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@mui/material';

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

    //Expandir tarjeta
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    interface BookCardProps {
        book: any;
        index: number;
        onClick: (index: number) => void;
    }

    // Editar filtros
    // Estado para mostrar/ocultar filtros extra
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    // Define filtros visibles siempre
    const visibleFilters: FilterConfig[] = [
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
    ];

    // Define filtros ocultos que solo se muestran si showMoreFilters es true
    const hiddenFilters: FilterConfig[] = [
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
    ];
    const BookCard = ({ book, index, onClick }: BookCardProps) => {
        return (
            <Flipped flipId={`book-${book.id}`} stagger="card" shouldInvert={(prev, current) => index === prev || index === current}>
                <div className="bookCard" onClick={() => onClick(index)}>
                    <Flipped inverseFlipId={`book-${book.id}`}>
                        {/* Contenido de la tarjeta */}
                        <div className="my-1 grid grid-cols-1 gap-4">
                            <div
                                key={book.id}
                                className="flex flex-row gap-6 space-y-2 rounded-xl bg-gray-100 p-4 shadow-lg hover:bg-white dark:bg-stone-900 dark:hover:bg-stone-800"
                            >
                                {/* Texto */}
                                <div>
                                    <h2 className="text-xl font-bold">{book.title}</h2>
                                    <p>{book.author}</p>
                                    <p>
                                        {book.available ? (
                                            <div className="mt-2 flex flex-row">
                                                <div className="flex flex-row text-green-700">
                                                    {t('ui.books.filters.available')}
                                                    <ChevronRight className="mt-1 ml-1 h-4 w-4" />
                                                </div>
                                                <div>
                                                    {t('ui.books.location.floor')} {book.floor_number} , {''}
                                                    {t(`ui.zones.list.${book.name}`)} , {''}
                                                    {t('ui.books.location.bookcase')} {book.bookcase_name}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="mt-2 text-red-700"> {t('ui.books.filters.not_available')} </p>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Flipped>
                </div>
            </Flipped>
        );
    };

    const ExpandedBookCard = ({ book, index, onClick }: BookCardProps) => (
        <Flipped flipId={`book-${book.id}`} stagger="card" onStart={(el) => setTimeout(() => el.classList.add('expanded'), 400)}>
            <div className="expandedBookCard" onClick={() => onClick(index)}>
                <Flipped inverseFlipId={`book-${book.id}`}>
                    <div className="my-4 grid grid-cols-1 gap-4">
                        <div
                            key={book.id}
                            className="flex flex-row gap-6 space-y-2 rounded-xl border bg-white p-4 shadow-lg dark:bg-stone-900 dark:hover:bg-stone-800"
                        >
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
                                    {book.available ? (
                                        <div className="mt-2 flex flex-row">
                                            <div className="flex flex-row text-green-700">
                                                {' '}
                                                {t('ui.books.filters.available')}
                                                <ChevronRight className="mt-1 ml-1 h-4 w-4" />
                                            </div>
                                            <div>
                                                {t('ui.books.location.floor')} {book.floor_number} , {''}
                                                {t(`ui.zones.list.${book.name}`)} , {''}
                                                {t('ui.books.location.bookcase')} {book.bookcase_name}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="mt-2 text-red-700"> {t('ui.books.filters.not_available')} </p>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </Flipped>
            </div>
        </Flipped>
    );

    return (
        <BooksearchLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.navigation.items.booksearch')}</h1>
                    </div>

                    {/* <Carousel className="w-full max-w-sm bg-red-200">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">opf{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */}

                    <div className="flex justify-center flex-col items-center space-y-4 w-full">
                        <div className="flex flex-col justify-center p-4 rounded-lg dark:bg-stone-800 shadow-sm space-y-4 border-b-2">
                            <FiltersTable
                            filters={[...visibleFilters, ...(showMoreFilters ? hiddenFilters : [])]}
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                        />
                        </div>
                        <div className='hidden md:flex  w-full justify-center'>
                            {/* <Funnel className="mt-1 h-4 w-4" /> */}
                            <Button className="mt-2 bg-stone-800 p-4 hover:bg-stone-600 dark:bg-stone-400 " onClick={() => setShowMoreFilters(!showMoreFilters)} type="button">
                            {showMoreFilters ? t('ui.booksearch.button.hide') : t('ui.booksearch.button.more')}
                        </Button>
                        </div>
                    </div>
                    <div className='mt-6 pt-5 border-t-1 text-xl font-medium'> {t('ui.booksearch.list')} </div>
                    <Pagination
                        meta={booksData.meta}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                        perPageOptions={[10, 25, 50, 100]}
                    />
                    <div>
                        <Flipper flipKey={expandedIndex} decisionData={expandedIndex} spring="gentle">
                            <ul className="bookList">
                                {booksData?.data?.map((book, index) => (
                                    <li key={book.id}>
                                        {expandedIndex === index ? (
                                            <ExpandedBookCard book={book} index={index} onClick={() => setExpandedIndex(null)} />
                                        ) : (
                                            <BookCard book={book} index={index} onClick={() => setExpandedIndex(index)} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Flipper>
                    </div>
                </div>
            </div>
        </BooksearchLayout>
    );
}
