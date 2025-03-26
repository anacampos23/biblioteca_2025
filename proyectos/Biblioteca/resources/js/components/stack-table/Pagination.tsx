import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { PaginationMeta } from "./Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationProps {
  /** Metadatos de paginación */
  meta: PaginationMeta;
  /** Callback para cambio de página */
  onPageChange: (page: number) => void;
  /** Callback para cambiar elementos por página */
  onPerPageChange?: (perPage: number) => void;
  /** Opciones de elementos por página */
  perPageOptions?: number[];
  /** Texto personalizado para mostrar información de resultados */
  showingText?: string;
  /** Placeholder para texto personalizado */
  textPlaceholders?: Record<string, string>;
}

/**
 * Calcula qué números de página mostrar en la paginación
 */
function getPageNumbers(currentPage: number, totalPages: number): number[] {
  // Si hay 5 o menos páginas, mostrar todas
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  // Calcular el rango de páginas a mostrar
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  
  // Ajustar si estamos cerca del final
  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - 4);
  }
  
  // Generar el array de números de página
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
}

export function Pagination({
  meta,
  onPageChange,
  onPerPageChange,
  perPageOptions = [10, 25, 50, 100],
  showingText,
  textPlaceholders,
}: PaginationProps) {
  const { t } = useTranslations();
  const pageNumbers = getPageNumbers(meta.current_page, meta.last_page);
  
  return (
    <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
        <div className="text-sm text-muted-foreground">
          {showingText || 
            t("ui.common.showing_results", {
              from: String(meta.from || 0),
              to: String(meta.to || 0),
              total: String(meta.total || 0),
              ...textPlaceholders,
            })
          }
        </div>
        
        {onPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t("ui.common.per_page") || "Por página"}:
            </span>
            <Select
              value={String(meta.per_page)}
              onValueChange={(value) => onPerPageChange(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={String(meta.per_page)} />
              </SelectTrigger>
              <SelectContent>
                {perPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="flex space-x-1 self-end sm:self-auto">
        {/* Versión desktop */}
        <div className="hidden sm:flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={meta.current_page === 1}
          >
            {t("ui.common.pagination.first")}
          </Button>
          
          {pageNumbers.map(pageNumber => (
            <Button
              key={pageNumber}
              variant={pageNumber === meta.current_page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              disabled={pageNumber === meta.current_page}
              className="w-9"
            >
              {pageNumber}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(meta.last_page)}
            disabled={meta.current_page === meta.last_page}
          >
            {t("ui.common.pagination.last")}
          </Button>
        </div>
        
        {/* Versión móvil */}
        <div className="flex flex-col sm:hidden items-center space-y-2">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={meta.current_page === 1}
              className="px-3"
            >
              {t("ui.common.pagination.first")}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(meta.current_page - 1)}
              disabled={meta.current_page === 1}
              className="px-3"
            >
              {t("ui.common.pagination.previous")}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(meta.current_page + 1)}
              disabled={meta.current_page === meta.last_page}
              className="px-3"
            >
              {t("ui.common.pagination.next")}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(meta.last_page)}
              disabled={meta.current_page === meta.last_page}
              className="px-3"
            >
              {t("ui.common.pagination.last")}
            </Button>
          </div>
          
          <span className="text-sm text-muted-foreground">
            {meta.current_page} / {meta.last_page}
          </span>
        </div>
      </div>
    </div>
  );
}
