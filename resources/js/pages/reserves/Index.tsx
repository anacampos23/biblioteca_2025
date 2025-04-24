import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Reserve, useDeleteReserve, useReserves } from "@/hooks/reserves/useReserves";
import { PencilIcon, PlusIcon, TrashIcon,  BookUp } from "lucide-react";
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
import { ReserveLayout } from "@/layouts/reserves/ReserveLayout";
import { router } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
  } from "@/components/ui/dialog"; // tu componente personalizado


export default function ReservesIndex() {
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
    filters.ISBN ? filters.ISBN : "null",
    filters.name ? filters.name : "null",
    filters.email ? filters.email : "null",
    filters.status ? filters.status : "null",
  ]

  const { data: reserves, isLoading, isError, refetch } = useReserves({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteReserveMutation = useDeleteReserve();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteReserve = async (id: string) => {
    try {
      await deleteReserveMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.reserves.deleted_error") || "Error deleting reserve");
      console.error("Error deleting reserve:", error);
    }
  };

  //Filters
  const handleFilterChange = (newFilters: Record<string, any>) => {
    const filtersChanged = newFilters!==filters;

    if (filtersChanged) {
        setCurrentPage(1);
    }
    setFilters(newFilters);
    };


   // Crear préstamo
      async function handleCreateLoan(book_id: string, user_id: string, id: string) {
        router.get('/loans/create', { book_id, user_id, id });
        await deleteReserveMutation.mutateAsync(id);
      refetch();
      }


  const columns = useMemo(
      () =>
          [
              createActionsColumn<Reserve>({
                  id: 'actions',
                  header: t('ui.reserves.columns.loan') || 'Actions',
                  renderActions: (reserve) => (
                      <>
                          <Dialog>
                              <DialogTrigger asChild>
                                  <Button variant="outline" size="icon" className="text-green-600" title={t('ui.reserves.buttons.loan') || 'Delete reserve'}>
                                      <BookUp className="h-4 w-4" />
                                  </Button>
                              </DialogTrigger>

                              <DialogContent>
                                  <DialogTitle> {t('ui.reserves.messages.title') || '¿Quieres coger prestado el libro?'} </DialogTitle>
                                  <DialogDescription> {t('ui.reserves.messages.description') || 'El libro ya está disponible para ser prestado'} </DialogDescription>

                                  <DialogFooter>
                                      <DialogClose asChild>
                                          <Button  variant="outline">{t('ui.reserves.buttons.cancel') || 'Cancel'}</Button>
                                      </DialogClose>

                                      <DialogClose asChild>
                                          <Button
                                            className="bg-indigo-600"
                                            onClick={() =>handleCreateLoan(reserve.book_id, reserve.user_id, reserve.id)}
                                          >
                                            {t('ui.reserves.buttons.loan') || 'Loan'}
                                            <BookUp className="h-4 w-4" />
                                          </Button>
                                      </DialogClose>
                                  </DialogFooter>
                              </DialogContent>
                          </Dialog>

                          {/* <Dialog
              id={reserve.id}
              onDelete={handleDeleteReserve}
              title={t("ui.reserves.delete.title") || "Delete reserve"}
              description={t("ui.reserves.delete.description") || "Are you sure you want to delete this reserve? This action cannot be undone."}
              trigger={
                <Button variant="outline" size="icon" className="" title={t("ui.reserves.buttons.delete") || "Delete reserve"}>
                  <BookUp className="h-4 w-4" />
                </Button>
              }
            /> */}
                      </>
                  ),
              }),
              createTextColumn<Reserve>({
                  id: 'title',
                  header: t('ui.reserves.columns.title') || 'Title',
                  accessorKey: 'title',
              }),
              createTextColumn<Reserve>({
                  id: 'author',
                  header: t('ui.reserves.columns.author') || 'author',
                  accessorKey: 'author',
              }),
              createTextColumn<Reserve>({
                  id: 'ISBN',
                  header: t('ui.reserves.columns.ISBN') || 'ISBN',
                  accessorKey: 'ISBN',
              }),
              createTextColumn<Reserve>({
                  id: 'name',
                  header: t('ui.reserves.columns.name') || 'name',
                  accessorKey: 'name',
              }),
              createTextColumn<Reserve>({
                  id: 'email',
                  header: t('ui.reserves.columns.email') || 'email',
                  accessorKey: 'email',
              }),
              createTextColumn<Reserve>({
                id: 'status',
                header: t('ui.reserves.columns.status') || 'status',
                accessorKey: 'status',
                format: (value)=>(value? t('ui.reserves.filters.contacted') : t('ui.reserves.filters.waiting'))
            }),
              createActionsColumn<Reserve>({
                  id: 'delete',
                  header: t('ui.reserves.columns.delete') || 'Actions',
                  renderActions: (reserve) => (
                      <>
                          <DeleteDialog
                              id={reserve.id}
                              onDelete={handleDeleteReserve}
                              title={t('ui.reserves.delete.title') || 'Delete reserve'}
                              description={
                                  t('ui.reserves.delete.description') || 'Are you sure you want to delete this reserve? This action cannot be undone.'
                              }
                              trigger={
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      title={t('ui.reserves.buttons.delete') || 'Delete reserve'}
                                  >
                                      <TrashIcon className="h-4 w-4" />
                                  </Button>
                              }
                          />
                      </>
                  ),
              }),
          ] as ColumnDef<Reserve>[],
      [t, handleDeleteReserve],
  );

  return (
      <ReserveLayout title={t('ui.reserves.title')}>
          <div className="p-6">
              <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl font-bold">{t('ui.reserves.title')}</h1>

                <div className="flex flex-col sm:flex-row gap-2">

                    <Link href="/reserves/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.reserves.buttons.new')}
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
                                    label: t('ui.reserves.filters.title'),
                                    type: 'text',
                                    placeholder: t('ui.reserves.placeholders.title'),
                                  },
                                  {
                                    id: 'author',
                                    label: t('ui.reserves.filters.author'),
                                    type: 'text',
                                    placeholder: t('ui.reserves.placeholders.author'),
                                },
                                {
                                    id: 'ISBN',
                                    label: t('ui.reserves.filters.ISBN'),
                                    type: 'number',
                                    placeholder: t('ui.reserves.placeholders.ISBN'),
                                },
                                {
                                    id: 'name',
                                    label: t('ui.users.filters.name') || 'Nombre',
                                    type: 'text',
                                    placeholder: t('ui.users.placeholders.name') || 'Nombre...',
                                },
                                {
                                    id: 'email',
                                    label: t('ui.users.filters.email') || 'Email',
                                    type: 'text',
                                    placeholder: t('ui.users.placeholders.email') || 'Email...',
                                },
                                {
                                    id: 'status',
                                    label: t('ui.reserves.filters.status'),
                                    type: 'select',
                                    options:[{value:'true', label: t('ui.reserves.filters.contacted')}, {value:'false', label: t('ui.reserves.filters.waiting')}],
                                    placeholder: t('ui.reserves.placeholders.status'),
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
                              <div className="mb-4 text-red-500">{t('ui.reserves.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.reserves.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      reserves ?? {
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
                                  noResultsMessage={t('ui.common.no_results') || 'No reserves found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ReserveLayout>
  );
}
