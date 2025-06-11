import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { Loan, useDeleteLoan, useLoans } from "@/hooks/loans/useLoans";
import { PencilIcon, PlusIcon, TrashIcon, BookCheck , SearchCheck, TimerReset, FileUp } from "lucide-react";
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
import { LoanLayout } from "@/layouts/loans/LoanLayout";
import { router } from "@inertiajs/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageProps } from "@/types";

interface indexprops extends PageProps {
    lang:string,
}

export default function ReportsIndex({ lang }:indexprops) {
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
    filters.start_loan ? filters.start_loan : "null",
    filters.end_loan ? filters.end_loan : "null",
    filters.due_date ? filters.due_date : "null",
    filters.days_overdue !== null && filters.days_overdue !== undefined ? filters.days_overdue : "null",
    filters.active ? filters.active : "null",
  ]

  const { data: loans, isLoading, isError, refetch } = useLoans({
    search: combinedSearch,
    page: currentPage,
    perPage: perPage,
  });
  const deleteLoanMutation = useDeleteLoan();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteLoan = async (id: string) => {
    try {
      await deleteLoanMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.loans.deleted_error") || "Error deleting loan");
      console.error("Error deleting loan:", error);
    }
  };

  //Return book
  function handleChangeStatus (loan_id: string){
    const newReturned = new Date().toISOString().split('T')[0];
    const informacion = new FormData();
    informacion.append('newStatus', '0');
    informacion.append('newReturned', newReturned);
    informacion.append('_method', 'PUT');
    router.post(`/loans/${loan_id}`, informacion);
    setTimeout(function(){
        refetch();
    }, 500)
  };

    //Change DueDate
    function handleChangeDueDate (loan_id: string,due_date: string){
        const dueDate = new Date(due_date);
        dueDate.setDate(dueDate.getDate() + 15);
        const newDueDate = dueDate.toISOString().split('T')[0]; // formato YYYY-MM-DD

        const informacion = new FormData();
        informacion.append('newDueDate', newDueDate);
        informacion.append('_method', 'PUT');
        router.post(`/loans/${loan_id}`, informacion);
        setTimeout(function(){
            refetch();
        }, 500)
      };

      //Filters
  const handleFilterChange = (newFilters: Record<string, any>) => {
    const filtersChanged = newFilters!==filters;

    if (filtersChanged) {
        setCurrentPage(1);
    }
    setFilters(newFilters);
    };

    //Search active/inactive
    const [showOnlyActive, setShowOnlyActive] = useState(false);


  const columns = useMemo(() => ([
    createTextColumn<Loan>({
      id: "title",
      header: t("ui.loans.columns.title") || "Title",
      accessorKey: "title",
    }),
   createActionsColumn<Loan>({
        id: "actions",
        header: t("ui.loans.columns.edit") || "Edit",
        renderActions: (loan) => (
          <>
              <a href="reports/loanDuration/export" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-stone-300 text-stone-900 hover:bg-stone-200">
                              <FileUp className="mr-2 h-4 w-4" />
                              {t('ui.reports.loanduration.button')}
                          </Button>
                      </a>
          </>
        ),
      }),
  ] as ColumnDef<Loan>[]), [t, handleDeleteLoan]);

  return (
      <LoanLayout title={t('ui.loans.title')}>
          <div className="p-6">
              <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl font-bold">{t('ui.loans.title')}</h1>

                <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row">
                    <a href="/loans/export" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-stone-300 text-stone-900 hover:bg-stone-200">
                              <FileUp className="mr-2 h-4 w-4" />
                              {t('ui.loans.export')}
                          </Button>
                      </a>
                    <Link href="/loans/create">
                          <Button>
                              <PlusIcon className="mr-2 h-4 w-4" />
                              {t('ui.loans.buttons.new')}
                          </Button>
                      </Link>
                </div>
                </div>


                  <div className="space-y-4">
                      <FiltersTable
                        lang={lang}
                          filters={
                              [
                                  {
                                    id: 'title',
                                    label: t('ui.loans.filters.title'),
                                    type: 'text',
                                    placeholder: t('ui.loans.placeholders.title'),
                                  },
                                  {
                                    id: 'author',
                                    label: t('ui.loans.filters.author'),
                                    type: 'text',
                                    placeholder: t('ui.loans.placeholders.author'),
                                },
                                {
                                    id: 'ISBN',
                                    label: t('ui.loans.filters.ISBN'),
                                    type: 'number',
                                    placeholder: t('ui.loans.placeholders.ISBN'),
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
                                    id: 'start_loan',
                                    label: t('ui.loans.filters.start_loan'),
                                    type: 'date',
                                    placeholder: t('ui.loans.placeholders.start_loan'),
                                },
                                {
                                    id: 'end_loan',
                                    label: t('ui.loans.filters.end_loan'),
                                    type: 'date',
                                    placeholder: t('ui.loans.placeholders.end_loan'),
                                },
                                {
                                    id: 'due_date',
                                    label: t('ui.loans.filters.due_date'),
                                    type: 'date',
                                    placeholder: t('ui.loans.placeholders.due_date'),
                                },
                                {
                                    id: 'days_overdue',
                                    label: t('ui.loans.filters.days_overdue'),
                                    type: 'number',
                                    placeholder: t('ui.loans.placeholders.days_overdue'),
                                    min: 0,
                                },
                                {
                                    id: 'active',
                                    label: t('ui.loans.filters.active'),
                                    type: 'select',
                                    options:[{value:'true', label: t('ui.loans.filters.active_status')}, {value:'false', label: t('ui.loans.filters.inactive_status')}],
                                    placeholder: t('ui.loans.placeholders.active'),
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
                              <div className="mb-4 text-red-500">{t('ui.loans.error_loading')}</div>
                              <Button onClick={() => refetch()} variant="outline">
                                  {t('ui.loans.buttons.retry')}
                              </Button>
                          </div>
                      ) : (
                          <div>
                              <Table
                                  data={
                                      loans ?? {
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
                                  noResultsMessage={t('ui.common.no_results') || 'No loans found'}
                              />
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </LoanLayout>
  );
}
