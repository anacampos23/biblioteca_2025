import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "./TableSkeleton";
import { Pagination } from "./Pagination";
import { useTranslations } from "@/hooks/use-translations";

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedData<T> {
  data: T[];
  meta?: PaginationMeta;
}

export interface TableProps<TData> {
  /** Los datos paginados para mostrar en la tabla */
  data: PaginatedData<TData>;
  /** Definición de columnas para la tabla */
  columns: ColumnDef<TData>[];
  /** Callback para cambiar de página */
  onPageChange: (page: number) => void;
  /** Callback para cambiar elementos por página */
  onPerPageChange?: (perPage: number) => void;
  /** Opciones de elementos por página */
  perPageOptions?: number[];
  /** Componente de filtros opcional */
  filters?: React.ReactNode;
  /** Mostrar estado de carga */
  loading?: boolean;
  /** Mensaje a mostrar cuando no hay resultados */
  noResultsMessage?: string;
  /** Clase CSS adicional para la tarjeta */
  className?: string;
}

export function Table<TData>({
  data,
  columns,
  onPageChange,
  onPerPageChange,
  perPageOptions,
  filters,
  loading = false,
  noResultsMessage,
  className,
}: TableProps<TData>) {
  const { t } = useTranslations();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (loading) {
    return <TableSkeleton columns={columns.length} rows={5} />;
  }

  return (
    <Card className="max-w-[calc(100vw-50px)] md:max-w-[calc(100vw-130px)]">
      {filters && <div className="p-4">{filters}</div>}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <UITable>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {noResultsMessage || t("ui.common.no_results")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </UITable>
        </div>
      </CardContent>
      {data.meta && data.meta.last_page > 1 && (
        <CardFooter className="px-6 py-4">
          <Pagination
            meta={data.meta}
            onPageChange={onPageChange}
            onPerPageChange={onPerPageChange}
            perPageOptions={perPageOptions}
          />
        </CardFooter>
      )}
    </Card>
  );
}
