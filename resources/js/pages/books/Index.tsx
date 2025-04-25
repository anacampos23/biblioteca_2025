import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Book, useDeleteBook, useBooks } from "@/hooks/books/useBooks";
import { PencilIcon, PlusIcon, TrashIcon, Eye, BookUp, BookmarkCheck } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { BookLayout } from "@/layouts/books/BookLayout";
import TextLink from "@/components/text-link";

export default function BooksIndex() {
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
    filters.title ? filters.title : "null",
    filters.author ? filters.author : "null",
    filters.genre ? filters.genre : "null",
    filters.ISBN ? filters.ISBN : "null",
    filters.editorial ? filters.editorial : "null",
    filters.available ? filters.available : "null",
    filters.reserved ? filters.reserved : "null",
    filters.bookcase_name ? filters.bookcase_name : "null",
    filters.name ? filters.name : "null",
    filters.floor_number ? filters.floor_number : "null",
  ]

  const { data: books, isLoading, isError, refetch } = useBooks({
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
      toast.error(t("ui.books.deleted_error") || "Error deleting book");
      console.error("Error deleting book:", error);
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
        const filtersChanged = newFilters!==filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
        };

        //Boton disponible/no disponible
        const handleToggleAvailabilityFilter = (availability: boolean) => {
            setFilters(prevFilters => ({
              ...prevFilters,
              available: availability.toString(),
            }));
          };

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
                                      ? 'bg-green-500 text-white hover:bg-green-600'
                                      :
                                        'bg-white-300 text-gray-500 hover:bg-gray-100'
                              }`}
                          >
                              {book.available ? <BookUp className="h-4 w-4" /> : <BookmarkCheck className="h-4 w-4" />}
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
                  header: t('ui.books.columns.genre') || 'genre',
                  accessorKey: 'genre',
                  format: (value) => {
                      if (Array.isArray(value)) {
                          // Si el valor es un array, lo mapeamos a los textos correspondientes
                          return value.map((genre) => t(`ui.books.genres.${genre}`) || genre).join(', ');
                      }
                      return value; // Si no es un array, lo mostramos tal cual
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
              createDateColumn<Book>({
                  id: 'created_at',
                  header: t('ui.books.columns.created_at') || 'Created At',
                  accessorKey: 'created_at',
              }),
              createActionsColumn<Book>({
                  id: 'actions',
                  header: t('ui.books.columns.actions') || 'Actions',
                  renderActions: (book) => (
                      <>
                          <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                              <Button variant="outline" size="icon" title={t('ui.books.buttons.edit') || 'Edit book'}>
                                  <PencilIcon className="h-4 w-4" />
                              </Button>
                          </Link>
                          <DeleteDialog
                              id={book.id}
                              onDelete={handleDeleteBook}
                              title={t('ui.books.delete.title') || 'Delete book'}
                              description={
                                  t('ui.books.delete.description') || 'Are you sure you want to delete this book? This action cannot be undone.'
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
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                      <Link href="/books/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.books.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

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
                                    type: 'text',
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
                                    options:[{value:'true', label: t('ui.books.filters.available')}, {value:'false', label: t('ui.books.filters.not_available')}],
                                    placeholder: t('ui.books.placeholders.available'),
                                },
                                {
                                    id: 'reserved',
                                    label: t('ui.books.filters.reserve'),
                                    type: 'select',
                                    options:[{value:'true', label: t('ui.books.filters.reserved')}, {value:'false', label: t('ui.books.filters.not_reserved')}],
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
                                    type: 'text',
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
