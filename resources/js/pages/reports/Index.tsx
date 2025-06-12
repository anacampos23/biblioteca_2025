import { FiltersTable } from '@/components/stack-table/FiltersTable';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { FileUp } from 'lucide-react';
import { useState } from 'react';

interface Filters {
    start_loan_from?: string;
    start_loan_to?: string;
    end_loan?: string;
}

export default function ReportsIndex({ start_loan_from, start_loan_to, end_loan }: Filters) {
    const { t } = useTranslations();
    const [filters, setFilters] = useState<Filters>({});

const handleFilterChange = (newFilters: Record<string, any>) => {
  const transformedFilters: Record<string, any> = {};

  for (const [key, value] of Object.entries(newFilters)) {
    if (value && typeof value === "object" && "from" in value && "to" in value) {
      transformedFilters[`${key}_from`] = value.from ? new Date(value.from).toISOString().slice(0, 10) : undefined;
      transformedFilters[`${key}_to`] = value.to ? new Date(value.to).toISOString().slice(0, 10) : undefined;
    } else if (key === 'end_loan') {
      transformedFilters[key] = value ? new Date(value).toISOString().slice(0, 10) : undefined;
    } else {
      transformedFilters[key] = value === "null" || value === "" ? undefined : value;
    }
  }
// Solo actualiza si han cambiado los valores
  const filtersChanged = JSON.stringify(transformedFilters) !== JSON.stringify(filters);
  if (filtersChanged) {
    setFilters(transformedFilters);
  }

};

    // Exportar con filtros
    const exportExcel = () => {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                query.append(key, value.toString());
            }
        });
        window.open(`reports/loanDuration/export?${query.toString()}`, '_blank');
    };


    return (
        <LoanLayout title="Informe préstamos">
            <div className="p-6">
                <FiltersTable
                    filters={[
                        {
                            id: 'start_loan',
                            label: 'Fecha inicio préstamo',
                            type: 'dateRange',
                            placeholder: 'Desde - Hasta',
                        },
                        {
                            id: 'end_loan',
                            label: 'Fecha fin préstamo',
                            type: 'date',
                            placeholder: 'Fecha fin',
                        },
                    ]}
                    onFilterChange={handleFilterChange}
                    initialValues={filters}
                />

                {/* Export book data */}
                <div>Descargar listado de duración de préstamos</div>
                <Button className="cursor-pointer bg-stone-300 text-stone-900 hover:bg-stone-200" onClick={exportExcel}>
                    {' '}
                    <FileUp className="mr-2 h-4 w-4" />
                    {t('ui.books.export')}
                </Button>
            </div>
        </LoanLayout>
    );
}
