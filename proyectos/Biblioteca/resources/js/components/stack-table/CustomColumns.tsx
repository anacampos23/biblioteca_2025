import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/hooks/use-translations";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnsIcon, CheckIcon } from "lucide-react";

export interface ColumnOption {
  /** Identificador de la columna */
  id: string;
  /** Nombre para mostrar */
  label: string;
  /** Si la columna es obligatoria y no se puede ocultar */
  required?: boolean;
}

export interface CustomColumnsProps<TData> {
  /** Todas las columnas disponibles */
  columns: ColumnDef<TData>[];
  /** Opciones de columnas que se mostrarán en el dropdown */
  columnOptions: ColumnOption[];
  /** Callback para cambiar las columnas visibles */
  onColumnToggle: (visibleColumns: string[]) => void;
  /** Columnas actualmente visibles */
  visibleColumns: string[];
  /** Texto para el botón */
  buttonText?: string;
  /** Texto para el título del dropdown */
  dropdownTitle?: string;
}

export function CustomColumns<TData>({
  columnOptions,
  onColumnToggle,
  visibleColumns,
  buttonText,
  dropdownTitle,
}: CustomColumnsProps<TData>) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);

  const handleToggle = (columnId: string) => {
    if (visibleColumns.includes(columnId)) {
      // Si ya está visible, la ocultamos (a menos que sea requerida)
      const isRequired = columnOptions.find(
        (opt) => opt.id === columnId
      )?.required;
      
      if (!isRequired) {
        onColumnToggle(visibleColumns.filter((id) => id !== columnId));
      }
    } else {
      // Si está oculta, la mostramos
      onColumnToggle([...visibleColumns, columnId]);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ColumnsIcon className="mr-2 h-4 w-4" />
          {buttonText || t("ui.common.columns.button")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>
          {dropdownTitle || t("ui.common.columns.title")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columnOptions.map((column) => {
          const isVisible = visibleColumns.includes(column.id);
          return (
            <DropdownMenuItem
              key={column.id}
              onClick={(e) => {
                e.preventDefault();
                handleToggle(column.id);
              }}
              disabled={column.required && isVisible}
              className="flex items-center justify-between"
            >
              {column.label}
              {isVisible && <CheckIcon className="ml-2 h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Hook para gestionar las columnas personalizadas
 */
export function useCustomColumns<TData>(
  allColumns: ColumnDef<TData>[],
  initialVisibleColumnIds?: string[]
) {
  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(
    initialVisibleColumnIds || allColumns.map((col) => col.id as string)
  );

  // Filtrar las columnas basado en las columnas visibles
  const visibleColumns = allColumns.filter((col) => 
    visibleColumnIds.includes(col.id as string)
  );

  // Convertir las columnas a opciones para el dropdown
  const columnOptions: ColumnOption[] = allColumns.map((col) => ({
    id: col.id as string,
    label: typeof col.header === 'string' 
      ? col.header 
      : col.id as string,
    // Puedes definir columnas requeridas según tus necesidades
    required: false,
  }));

  return {
    visibleColumns,
    visibleColumnIds,
    setVisibleColumnIds,
    columnOptions,
  };
}
