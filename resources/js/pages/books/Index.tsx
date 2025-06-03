import CreateQR from '@/components/CreateQR';
import ReadQR from '@/components/ReadQR';
import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { Book, useBooks, useDeleteBook } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { BookCheck, BookUp, BookmarkCheck, Menu, PencilIcon, PlusIcon, QrCode, ScanQrCode, TrashIcon, FileUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface BookIndexProps {
    genresList?: { id: string; genre_name: string }[];
    zonesArray?: { id: string; name: string }[];
    floorsArray?: any[];
    bookcasesArray?: any[];
    booksWithImages?: {
        id: string;
        title: string;
        author: string;
        ISBN: number;
        genre: string;
        available: boolean;
        editorial: string;
        reserved: boolean;
        bookcase_id: string;
        zone_id: string;
        floor_id: string;
        image_path: string;
    }[];
    loan?: { id: string; book_id: string; user_id: string; active: boolean }[];
    reserve?: { id: string; book_id: string; user_id: string; status: string }[];
}

export default function BooksIndex({ genresList, zonesArray, booksWithImages, floorsArray, bookcasesArray, loan, reserve }: BookIndexProps) {
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
    const deleteBookMutation = useDeleteBook();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.books.deleted_error') || 'Error deleting book');
            console.error('Error deleting book:', error);
        }
    };

    // Crear préstamo o reserva
    function handleCreateLoan_ReserveBook(book_id: string, title: string, author: string, ISBN: number, available: boolean) {
        const informacion = new FormData();
        informacion.append('newReservationStatus', '1');
        informacion.append('_method', 'PUT');
        router.post(`/books/${book_id}`, informacion);
        // if (available === true) {
        // return router.get('/loans/create', { book_id, title, author, ISBN });
        // } else {
        // return router.get('/reserves/create', { book_id, title, author, ISBN });
        // }
    }

    //Filters
    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    //Escanear QR
    const [textoQR, setTextoQR] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    //Libro seleccionado QR Data
    const selectedBook = booksWithImages?.find((book) => book.id === textoQR);
    const selectedBookZone = selectedBook ? zonesArray?.find((zone) => zone.id === selectedBook.zone_id) : null;
    const selectedBookBookcase = selectedBook ? bookcasesArray?.find((bookcase) => bookcase.id === selectedBook.bookcase_id) : null;
    const selectedBookFloor = selectedBook ? floorsArray?.find((floor) => floor.id === selectedBook.floor_id) : null;
    const selectedBookLoan = selectedBook ? loan?.find((loan) => loan.book_id === selectedBook.id && loan.active === true) : null;
    const selectedBookReserve = selectedBook
        ? reserve?.find((reserve) => reserve.book_id === selectedBook.id && reserve.status !== 'finished')
        : null;

    //ISBN count
    interface BookCount {
        ISBN: string;
        isbn_count: number;
    }

    const columns = useMemo(
        () =>
            [
                createActionsColumn<Book>({
                    id: 'action_loan',
                    header: t('ui.books.columns.borrow') || 'Actions',
                    renderActions: (book) => (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                title={t('ui.books.buttons.reserve') || 'Reserve book'}
                                onClick={() => {
                                    handleCreateLoan_ReserveBook(book.id, book.title, book.author, book.ISBN, book.available);
                                }}
                                className={`${
                                    book.available
                                        ? 'cursor-pointer bg-green-500 text-white hover:bg-green-600'
                                        : 'bg-white-300 cursor-pointer text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                                {book.available ? (
                                    <BookUp className="h-4 w-4" />
                                ) : (
                                    <BookmarkCheck className={`h-4 w-4 ${book.reserved ? 'text-orange-500' : 'text-gray-500'}`} />
                                )}
                            </Button>
                        </>
                    ),
                }),
                createTextColumn<Book>({
                    id: 'title',
                    header: t('ui.books.columns.title') || 'Title',
                    accessorKey: 'title',
                }),
                createTextColumn<Book>({
                    id: 'author',
                    header: t('ui.books.columns.author') || 'author',
                    accessorKey: 'author',
                }),
                createTextColumn<Book>({
                    id: 'genre',
                    header: t('ui.books.columns.genre') || 'genre', // Título de la columna traducido
                    accessorKey: 'genre',
                    format: (value) => {
                        let genres = value;
                        if (typeof value === 'string') {
                            try {
                                genres = JSON.parse(value);
                            } catch (e) {
                                genres = [];
                            }
                        }
                        // Aquí traducimos cada género
                        return Array.isArray(genres)
                            ? genres
                                  .map((genre) => t(`ui.books.genres.${genre}`) || genre) // Traducción o el género original
                                  .join(', ')
                            : value;
                    },
                }),

                createTextColumn<Book>({
                    id: 'ISBN',
                    header: t('ui.books.columns.ISBN') || 'ISBN',
                    accessorKey: 'ISBN',
                }),
                createTextColumn<Book>({
                    id: 'editorial',
                    header: t('ui.books.columns.editorial') || 'editorial',
                    accessorKey: 'editorial',
                }),
                createTextColumn<Book>({
                    id: 'available',
                    header: t('ui.books.columns.available') || 'available',
                    accessorKey: 'available',
                    format: (value) => (value ? t('ui.books.filters.available') : t('ui.books.filters.not_available')),
                }),
                createTextColumn<Book>({
                    id: 'bookcase_name',
                    header: t('ui.books.columns.bookcase_name') || 'bookcase_name',
                    accessorKey: 'bookcase_name',
                }),
                createTextColumn<Book>({
                    id: 'name',
                    header: t('ui.books.columns.name') || 'name',
                    accessorKey: 'name',
                    format: (value) => {
                        if (Array.isArray(value)) {
                            return value.map((name) => t(`ui.books.zones.${name}`) || name).join(', ');
                        }
                        return typeof value === 'string' ? t(`ui.books.zones.${value}`) || value : '';
                    },
                }),
                createTextColumn<Book>({
                    id: 'floor_number',
                    header: t('ui.books.columns.floor_number') || 'floor_number',
                    accessorKey: 'floor_number',
                    format: (value) => t('ui.books.columns.floor_number') + ' ' + value,
                }),
                createActionsColumn<Book>({
                    id: 'isbn_loan_count',
                    header: t('ui.books.columns.isbn_loan_count') || 'Actions',
                    renderActions: ($book) => {
                        let $isbn_count = $book.isbn_count;
                        let $isbn_loan_count = $book.isbn_loan_count;
                        return (
                            <span>
                                {' '}
                                {$isbn_loan_count}/{$isbn_count}
                            </span>
                        );
                    },
                }),
                // createDateColumn<Book>({
                //     id: 'created_at',
                //     header: t('ui.books.columns.created_at') || 'Created At',
                //     accessorKey: 'created_at',
                // }),
                createActionsColumn<Book>({
                    id: 'actions',
                    header: t('ui.books.columns.actions') || 'Actions',
                    renderActions: (book) => (
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="icon" className="bg-stone-200 dark:bg-stone-800">
                                        <Menu className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full max-w-xs space-y-2">
                                    {/*Dialog QR Creation*/}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="mr-2"
                                                size="icon"
                                                title={t('ui.books.buttons.QR_create') || 'Create QR book'}
                                            >
                                                <QrCode className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogTitle> {t('ui.books.QR_create.title')} </DialogTitle>
                                            <div>
                                                <div className="m-2 rounded-md bg-indigo-100 p-2">
                                                    <div className="font-semibold">
                                                        {t('ui.books.QR_create.book_title')}
                                                        {book.title}
                                                    </div>
                                                    <div>
                                                        {t('ui.books.QR_create.book_author')}
                                                        {book.author}
                                                    </div>
                                                    <div>
                                                        {t('ui.books.QR_create.book_ISBN')}
                                                        {book.ISBN}
                                                    </div>
                                                </div>

                                                <CreateQR value={book.id} />

                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    {/*Edit book*/}
                                    <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                        <Button variant="outline" className="mr-2" size="icon" title={t('ui.books.buttons.edit') || 'Edit book'}>
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    {/*Delete book*/}
                                    <DeleteDialog
                                        id={book.id}
                                        onDelete={handleDeleteBook}
                                        title={t('ui.books.delete.title') || 'Delete book'}
                                        description={
                                            t('ui.books.delete.description') ||
                                            'Are you sure you want to delete this book? This action cannot be undone.'
                                        }
                                        trigger={
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                title={t('ui.books.buttons.delete') || 'Delete book'}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </>
                    ),
                }),
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row lg:gap-0">
                        <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                        <Dialog
                            // Vaciar TextoQR cuando se cierra el diálogo
                            open={isDialogOpen}
                            onOpenChange={(open) => {
                                setIsDialogOpen(open);
                                if (!open) {
                                    setTextoQR('');
                                }
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-stone-300 hover:bg-stone-400"
                                    title={t('ui.books.buttons.QR')}
                                >
                                    <ScanQrCode className="mr-2 h-4 w-4" />
                                    {t('ui.books.buttons.QR')}
                                </Button>
                            </DialogTrigger>

                            <DialogContent>
                                <DialogTitle> {t('ui.books.QR_reader.title')} </DialogTitle>
                                <div>
                                    <ReadQR onResult={(result) => setTextoQR(result)} />
                                    {selectedBook && (
                                        <div className="flex flex-col items-center gap-4 lg:flex-row">
                                            <div>
                                                {selectedBook.image_path ? (
                                                    <img src={selectedBook.image_path} alt="Current book image" className="h-auto w-40 rounded-md" />
                                                ) : null}
                                            </div>
                                            <div>
                                                <div className="mt-2 mb-5 flex flex-col font-medium">
                                                    <div>
                                                        <label className="underline">{t('ui.books.QR_reader.book_title')}</label>
                                                        {selectedBook.title}
                                                    </div>
                                                    <div>
                                                        <label className="underline">{t('ui.books.QR_reader.book_author')}</label>
                                                        {selectedBook.author}
                                                    </div>
                                                    <div>
                                                        <label className="underline">{t('ui.books.QR_reader.book_ISBN')}</label>
                                                        {selectedBook.ISBN}
                                                    </div>
                                                </div>
                                                <div className="mt-2 bg-indigo-100 p-3">
                                                    <div className={`font-semibold ${selectedBook.available ? 'text-indigo-600' : 'text-red-600'}`}>
                                                        {' '}
                                                        {selectedBook.available
                                                            ? t('ui.books.filters.available')
                                                            : t('ui.books.filters.not_available')}
                                                    </div>
                                                    <div>
                                                        {selectedBook.available && (
                                                            <div>
                                                                <div>
                                                                    {t('ui.books.QR_reader.bookcase')} {selectedBookBookcase?.bookcase_name}
                                                                </div>
                                                                <div>
                                                                    {t('ui.books.QR_reader.zone')}
                                                                    {t(`ui.zones.list.${selectedBookZone?.name}`)}
                                                                </div>
                                                                <div>
                                                                    {t('ui.books.QR_reader.floor')} {selectedBookFloor?.floor_number}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {!selectedBook.available && (
                                                            <div>
                                                                <div
                                                                    className={`mt-2 flex ${selectedBookLoan ? 'text-indigo-600' : 'text-stone-700'}`}
                                                                >
                                                                    <BookCheck className="mt-1 mr-2 h-4 w-4" />
                                                                    {selectedBookLoan
                                                                        ? t('ui.books.QR_reader.loaned')
                                                                        : t('ui.books.QR_reader.not_loaned')}
                                                                </div>
                                                                <div
                                                                    className={`mt-2 flex ${selectedBookReserve ? 'text-indigo-600' : 'text-stone-700'}`}
                                                                >
                                                                    <BookmarkCheck className="mt-1 mr-2 h-4 w-4" />
                                                                    {selectedBookReserve
                                                                        ? t('ui.books.QR_reader.reserved')
                                                                        : t('ui.books.QR_reader.not_reserved')}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">{t('ui.reserves.buttons.cancel') || 'Cancel'}</Button>
                                    </DialogClose>

                                    <DialogClose asChild>
                                        <Button
                                            className="bg-indigo-600"
                                            onClick={() => {
                                                if (selectedBook) {
                                                    handleCreateLoan_ReserveBook(
                                                        selectedBook.id,
                                                        selectedBook.title,
                                                        selectedBook.author,
                                                        selectedBook.ISBN,
                                                        selectedBook.available,
                                                    );
                                                }
                                            }}
                                        >
                                            {selectedBook?.available === true ? t('ui.books.columns.borrow') : t('ui.books.buttons.reserve')}
                                            <BookUp className="h-4 w-4" />
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row">
                            <a href="/books/export" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-indigo-500 hover:bg-indigo-800">
                                    <FileUp className="mr-2 h-4 w-4" />
                                    {t('ui.books.export')}
                                </Button>
                            </a>
                            <Link href="/books/create">
                                <Button className="cursor-pointer">
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    {t('ui.books.buttons.new')}
                                </Button>
                            </Link>
                        </div>
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
                                        options: genresList.map((genresList) => ({
                                            label: t(`ui.books.genres.${genresList.genre_name}`),
                                            value: genresList.genre_name,
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

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={4} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.books.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        books ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.common.no_results') || 'No books found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BookLayout>
    );
}
