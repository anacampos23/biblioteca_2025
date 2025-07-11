import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Zone, useDeleteZone, useZones } from "@/hooks/zones/useZones";
import { PencilIcon, PlusIcon, TrashIcon, FileUp } from "lucide-react";
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
import { ZoneLayout } from "@/layouts/zones/ZoneLayout";

interface ZoneIndexProps {
    zonesArray?: { id: string; name: string;}[];
}

export default function ZonesIndex({zonesArray}: ZoneIndexProps)  {
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

  // Combine filters into a single search string if they exist
  const combinedSearch = [
    filters.name ? filters.name : "null",
    filters.floor_number ? filters.floor_number : "null"
  ]

  const { data: zones, isLoading, isError, refetch } = useZones({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteZoneMutation = useDeleteZone();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteZone = async (id: string) => {
    try {
      await deleteZoneMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.zones.deleted_error") || "Error deleting zone");
      console.error("Error deleting zone:", error);
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

  const columns = useMemo(
      () =>
          [
              createTextColumn<Zone>({
                  id: 'name',
                  header: t('ui.zones.columns.name'),
                  accessorKey: 'name',
                  format: (value) => {
                      const translateOrFallback = (name: string) => {
                          const key = `ui.zones.list.${name}`;
                          const translated = t(key);
                          return translated === key ? name : translated;
                      };

                      if (Array.isArray(value)) {
                          return value.map(translateOrFallback).join(', ');
                      }

                      return typeof value === 'string' ? translateOrFallback(value) : '';
                  },
              }),

              createTextColumn<Zone>({
                  id: 'floor_number',
                  header: t('ui.zones.columns.floor'),
                  accessorKey: 'floor_number',
                  format: (value) => t('ui.zones.columns.floor_number') + ' ' + value,
              }),
              createActionsColumn<Zone>({
                  id: 'actions',
                  header: t('ui.zones.columns.actions') || 'Actions',
                  renderActions: (zone) => (
                      <>
                          <Link href={`/zones/${zone.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                              <Button variant="outline" size="icon" title={t('ui.zones.buttons.edit') || 'Edit zone'}>
                                  <PencilIcon className="h-4 w-4" />
                              </Button>
                          </Link>
                          <DeleteDialog
                              id={zone.id}
                              onDelete={handleDeleteZone}
                              title={t('ui.zones.delete.title') || 'Delete zopne'}
                              description={
                                  t('ui.zones.delete.description') || 'Are you sure you want to delete this zone? This action cannot be undone.'
                              }
                              trigger={
                                  <Button
                                      variant="outline"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      title={t('ui.users.buttons.delete') || 'Delete user'}
                                  >
                                      <TrashIcon className="h-4 w-4" />
                                  </Button>
                              }
                          />
                      </>
                  ),
              }),
          ] as ColumnDef<Zone>[],
      [t, handleDeleteZone],
  );
  console.log(zonesArray);

  return (
      <ZoneLayout title={t('ui.zones.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between flex-col md:flex-row">
                      <h1 className="text-3xl font-bold">{t('ui.zones.title')}</h1>
                      <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row">
                        <a href="/zones/export" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-stone-300 text-stone-900 hover:bg-stone-200">
                              <FileUp className="mr-2 h-4 w-4" />
                              {t('ui.zones.export')}
                          </Button>
                      </a>
                      <Link href="/zones/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.zones.buttons.new')}
                          </Button>
                      </Link>
                      </div>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'name',
                                      label: t('ui.zones.filters.name'),
                                      type: 'select',
                                      options: zonesArray.map((zone) => ({
                                          label: t(`ui.zones.list.${zone.name}`),
                                          value: zone.name,
                                      })),
                                      placeholder: t('ui.zones.placeholders.name'),
                                  },
                                  {
                                      id: 'floor_number',
                                      label: t('ui.zones.filters.floor'),
                                      type: 'number',
                                      placeholder: t('ui.zones.placeholders.floor'),
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
                              <div className="mb-4 text-red-500">{t('ui.users.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.users.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      zones ?? {
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
                                  noResultsMessage={t('ui.users.no_results') || 'No users found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </ZoneLayout>
  );
}
