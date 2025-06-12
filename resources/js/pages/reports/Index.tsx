import { FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { ReportLayout } from '@/layouts/reports/ReportLayout';
import { PageProps } from '@/types';
import { FileUp } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Filters {
    start_loan_from?: string;
    start_loan_to?: string;
    end_loan_from?: string;
    end_loan_to?: string;
}

interface Report {
    id: number;
    name: string;
    downloadUrl: string;
}

interface indexprops extends PageProps {
    lang: string;
}

export default function ReportsIndex({ lang }: indexprops) {
    const { t } = useTranslations();
    const [filters, setFilters] = useState<Filters>({});
    const [page, setPage] = useState(1);

    const handleFilterChange = (newFilters: Record<string, any>) => {
        const transformedFilters: Record<string, any> = {};

        for (const [key, value] of Object.entries(newFilters)) {
            if (value && typeof value === 'object' && 'from' in value && 'to' in value) {
                transformedFilters[`${key}_from`] = value.from ? new Date(value.from).toISOString().slice(0, 10) : undefined;
                transformedFilters[`${key}_to`] = value.to ? new Date(value.to).toISOString().slice(0, 10) : undefined;
            } else {
                transformedFilters[key] = value === 'null' || value === '' ? undefined : value;
            }
        }
        // Actualiza solo si hay cambios
        const filtersChanged = JSON.stringify(transformedFilters) !== JSON.stringify(filters);
        if (filtersChanged) {
            setFilters(transformedFilters);
        }
    };

    // Datos fijos de informes
    const reportData: Report[] = [
        { id: 1, name: t('ui.reports.name.loanDuration'), downloadUrl: '/reports/loanDuration/export' },
        { id: 2, name: t('ui.reports.name.loanedBooks'), downloadUrl: '/reports/activeUsers/export' },
        { id: 3, name: t('ui.reports.name.activeUsers'), downloadUrl: '/reports/topBooks/export' },
    ];

    // Paginación simulada (todo en una página)
    const data = {
        data: reportData,
        meta: {
            current_page: 1,
            from: 1,
            last_page: 1,
            per_page: 10,
            to: reportData.length,
            total: reportData.length,
        },
    };

    // Definición de columnas para la tabla
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: t('ui.reports.columns.reports'),
            },
            {
                accessorKey: 'downloadUrl',
                header: t('ui.reports.columns.download'),
                cell: ({ getValue }: any) => (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(getValue() as string, '_blank')}
                        className="cursor-pointer bg-stone-300 text-stone-900 hover:bg-stone-200"
                    >
                        <FileUp className="mr-2 h-4 w-4" />
                        {t('ui.reports.columns.download_excel')}
                    </Button>
                ),
            },
        ],
        [],
    );

    // Función exportExcel, por si quieres usarla para exportar según filtros (no usada en la tabla actual)
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
        <ReportLayout title={t('ui.reports.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <FiltersTable
                    lang={lang}
                    filters={[
                        {
                            id: 'start_loan',
                            label: t('ui.reports.filters.start'),
                            type: 'dateRange',
                            placeholder: t('ui.reports.filters.from_to'),
                        },
                        {
                            id: 'end_loan',
                            label: t('ui.reports.filters.end'),
                            type: 'dateRange',
                            placeholder: 'Fecha fin',
                        },
                    ]}
                    onFilterChange={handleFilterChange}
                    initialValues={filters}
                />

                <div className="mt-6">
                    <Table data={data} columns={columns} onPageChange={setPage} noResultsMessage={t('ui.common.no_results') || 'No loans found'} />
                </div>
                </div>

                {/* Botón de exportación genérico */}
                {/* <div className="mt-6">
          <Button
            className="cursor-pointer bg-stone-300 text-stone-900 hover:bg-stone-200"
            onClick={exportExcel}
          >
            <FileUp className="mr-2 h-4 w-4" />
            {t('ui.books.export')}
          </Button>
        </div> */}
            </div>
        </ReportLayout>
    );
}
