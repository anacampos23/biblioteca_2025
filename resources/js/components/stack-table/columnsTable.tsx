import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

/**
 * Opciones para crear una columna base
 */
export interface CreateColumnOptions<TData, TValue = unknown> {
  /** ID único de la columna */
  id: string;
  /** Texto o nodo del encabezado */
  header: string | React.ReactNode;
  /** Clave para acceder a los datos (opcional si se proporciona cell) */
  accessorKey?: keyof TData;
  /** Renderizador personalizado de celda */
  cell?: (props: { row: { original: TData } }) => React.ReactNode;
  /** Habilitar ordenación */
  enableSorting?: boolean;
  /** Clase CSS para la celda */
  className?: string;
}

/**
 * Opciones para crear una columna de texto
 */
export interface CreateTextColumnOptions<TData> 
  extends Omit<CreateColumnOptions<TData, string>, 'accessorKey' | 'cell'> {
  /** Clave para acceder a los datos */
  accessorKey: keyof TData;
  /** Formato para el texto */
  format?: (value: string) => string;
}

/**
 * Opciones para crear una columna de fecha
 */
export interface CreateDateColumnOptions<TData>
  extends Omit<CreateColumnOptions<TData, string>, 'accessorKey' | 'cell'> {
  /** Clave para acceder a los datos */
  accessorKey: keyof TData;
  /** Formato de fecha */
  dateFormat?: Intl.DateTimeFormatOptions;
  /** Locale para el formato de fecha */
  locale?: string;
}

/**
 * Opciones para crear una columna de acciones
 */
export interface CreateActionsColumnOptions<TData>
  extends Omit<CreateColumnOptions<TData, void>, 'accessorKey' | 'cell'> {
  /** Función que renderiza las acciones */
  renderActions: (row: TData) => React.ReactNode;
}

/**
 * Crea una columna base con opciones predeterminadas
 */
export function createColumn<TData, TValue = unknown>(
  options: CreateColumnOptions<TData, TValue>
): ColumnDef<TData, TValue> {
  const { id, header, accessorKey, cell, enableSorting = true, className } = options;

  // Para resolver errores de TypeScript, necesitamos manejar los tipos correctamente
  const columnDef: ColumnDef<TData, TValue> = {
    id,
    // Solo asignamos accessorKey si está definido
    ...(accessorKey ? { accessorKey } : {}),
    header: enableSorting
      ? ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="-ml-4"
            >
              {header}
              <span className="ml-2">
                {column.getIsSorted() === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : column.getIsSorted() === "desc" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </span>
            </Button>
          );
        }
      : () => header,
    cell: cell
      ? ({ row }) => (
          <div className={cn("", className)}>
            {cell({ row })}
          </div>
        )
      : ({ row, column }) => {
          const value = accessorKey ? row.getValue(column.id) : null;
          return (
            <div className={cn("", className)}>
              {value === null || value === undefined ? "" : String(value)}
            </div>
          );
        },
    enableSorting,
  };
  
  return columnDef;
}

/**
 * Crea una columna de texto con formato opcional
 */
export function createTextColumn<TData>(
  options: CreateTextColumnOptions<TData>
): ColumnDef<TData, string> {
  const { accessorKey, format, ...rest } = options;

  return createColumn<TData, string>({
    ...rest,
    accessorKey,
    cell: ({ row }) => {
      const value = row.original[accessorKey] as string;
      return format ? format(value) : value;
    },
  });
}

/**
 * Crea una columna de fecha con formato
 */
export function createDateColumn<TData>(
  options: CreateDateColumnOptions<TData>
): ColumnDef<TData, string> {
  const { 
    accessorKey, 
    dateFormat = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }, 
    locale = 'es-ES',
    ...rest 
  } = options;

  return createColumn<TData, string>({
    ...rest,
    accessorKey,
    cell: ({ row }) => {
      const value = row.original[accessorKey];
      if (!value) return "";
      
      try {
        const date = new Date(value as string);
        return new Intl.DateTimeFormat(locale, dateFormat).format(date);
      } catch (error) {
        console.error("Error formatting date:", error);
        return String(value);
      }
    },
  });
}

/**
 * Crea una columna de acciones
 */
export function createActionsColumn<TData>(
  options: CreateActionsColumnOptions<TData>
): ColumnDef<TData, void> {
  const { renderActions, ...rest } = options;

  return createColumn<TData, void>({
    ...rest,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {renderActions(row.original)}
      </div>
    ),
  });
}
