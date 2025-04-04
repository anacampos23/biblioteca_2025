import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Book, useDeleteBook, useBooks } from "@/hooks/books/useBooks";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";
import { BookLayout } from "@/layouts/books/BookLayout";

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
    filters.quantity ? filters.quantity : "null",
    filters.status ? filters.status : "null",
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

  const columns = useMemo(() => ([
    createTextColumn<Book>({
      id: "title",
      header: t("ui.books.columns.title") || "Title",
      accessorKey: "title",
    }),
    createTextColumn<Book>({
        id: "author",
        header: t("ui.books.columns.author") || "author",
        accessorKey: "author",
      }),
      createTextColumn<Book>({
        id: "genre",
        header: t("ui.books.columns.genre") || "genre",
        accessorKey: "genre",
      }),
      createTextColumn<Book>({
        id: "ISBN",
        header: t("ui.books.columns.ISBN") || "ISBN",
        accessorKey: "ISBN",
      }),
      createTextColumn<Book>({
        id: "editorial",
        header: t("ui.books.columns.editorial") || "editorial",
        accessorKey: "editorial",
      }),
      createTextColumn<Book>({
        id: "quantity",
        header: t("ui.books.columns.quantity") || "quantity",
        accessorKey: "quantity",
      }),
      createTextColumn<Book>({
        id: "status",
        header: t("ui.books.columns.status") || "status",
        accessorKey: "status",
      }),
      createTextColumn<Book>({
        id: "bookcase_name",
        header: t("ui.books.columns.bookcase_name") || "bookcase_name",
        accessorKey: "bookcase_name",
      }),
      createTextColumn<Book>({
        id: "name",
        header: t("ui.books.columns.name") || "name",
        accessorKey: "name",
      }),
      createTextColumn<Book>({
        id: "floor_number",
        header: t("ui.books.columns.floor_number") || "floor_number",
        accessorKey: "floor_number",
      }),
    createDateColumn<Book>({
      id: "created_at",
      header: t("ui.books.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Book>({
      id: "actions",
      header: t("ui.books.columns.actions") || "Actions",
      renderActions: (book) => (
        <>
          <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.books.buttons.edit") || "Edit book"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={book.id}
            onDelete={handleDeleteBook}
            title={t("ui.books.delete.title") || "Delete book"}
            description={t("ui.books.delete.description") || "Are you sure you want to delete this book? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.books.buttons.delete") || "Delete book"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Book>[]), [t, handleDeleteBook]);

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
                                    id: 'quantity',
                                    label: t('ui.books.filters.quantity'),
                                    type: 'number',
                                    placeholder: t('ui.books.placeholders.quantity'),
                                },
                                {
                                    id: 'status',
                                    label: t('ui.books.filters.status'),
                                    type: 'text',
                                    placeholder: t('ui.books.placeholders.status'),
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
                                }
                              ] as FilterConfig[]
                          }
                          onFilterChange={setFilters}
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
                                  noResultsMessage={t('ui.books.no_results') || 'No books found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </BookLayout>
  );
}
