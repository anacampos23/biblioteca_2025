import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Floor, useDeleteFloor, useFloors } from "@/hooks/floors/useFloors";
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
import { FloorLayout } from "@/layouts/floors/FloorLayout";

export default function FloorsIndex() {
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

  const { data: floors, isLoading, isError, refetch } = useFloors({
    page: currentPage,
    perPage: perPage,
  });
  const deleteFloorMutation = useDeleteFloor();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteFloor = async (id: string) => {
    try {
      await deleteFloorMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.floors.deleted_error") || "Error deleting floor");
      console.error("Error deleting floor:", error);
    }
  };

  const columns = useMemo(() => ([
    createTextColumn<Floor>({
      id: "floor_number",
      header: t("ui.floors.columns.floor_number") || "Floor number",
      accessorKey: "floor_number",
    }),
    createTextColumn<Floor>({
      id: "capacity_zones",
      header: t("ui.floors.columns.capacity_zones") || "Capacity Zones",
      accessorKey: "capacity_zones",
    }),
    createActionsColumn<Floor>({
      id: "actions",
      header: t("ui.users.columns.actions") || "Actions",
      renderActions: (floor) => (
        <>
          <Link href={`/floors/${floor.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.floors.buttons.edit") || "Edit floor"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={floor.id}
            onDelete={handleDeleteFloor}
            title={t("ui.floors.delete.title") || "Delete floor"}
            description={t("ui.floors.delete.description") || "Are you sure you want to delete this floor? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.users.buttons.delete") || "Delete user"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Floor>[]), [t, handleDeleteFloor]);

  return (
      <FloorLayout title={t('ui.floors.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                      <Link href="/floors/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.floors.buttons.new')}
                          </Button>
                      </Link>
                  </div>
                  <div></div>

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                  {
                                      id: 'floor_number',
                                      label: t('ui.floors.filters.floor_number'), 
                                      type: 'text',
                                      placeholder: t('ui.floors.placeholders.floor_number'), 
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
                              <div className="mb-4 text-red-500">{t('ui.users.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.users.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      floors ?? {
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
      </FloorLayout>
  );
}
