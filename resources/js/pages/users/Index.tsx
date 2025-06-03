import { createActionsColumn, createDateColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/use-translations';
import { User, useDeleteUser, useUsers } from '@/hooks/users/useUsers';
import { UserLayout } from '@/layouts/users/UserLayout';
import { Link, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { CalendarClock, PencilIcon, PlusIcon, TrashIcon, FileUp  } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface userProps {
    loans: any[];
    reserves: any[];
}
export default function UsersIndex({ loans, reserves }: userProps) {
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
    // Combine name and email filters into a single search string if they exist
    const combinedSearch = [filters.name ? filters.name : 'null', filters.email ? filters.email : 'null'];

    const {
        data: users,
        isLoading,
        isError,
        refetch,
    } = useUsers({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });
    const deleteUserMutation = useDeleteUser();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUserMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.users.deleted_error') || 'Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    //Filters
    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters !== filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
    };

    const columns = useMemo(
        () =>
            [
                createTextColumn<User>({
                    id: 'name',
                    header: t('ui.users.columns.name') || 'Name',
                    accessorKey: 'name',
                }),
                createTextColumn<User>({
                    id: 'email',
                    header: t('ui.users.columns.email') || 'Email',
                    accessorKey: 'email',
                }),
                createDateColumn<User>({
                    id: 'created_at',
                    header: t('ui.users.columns.created_at') || 'Created At',
                    accessorKey: 'created_at',
                }),
                createActionsColumn<User>({
                    id: 'actions',
                    header: t('ui.users.columns.actions') || 'Actions',
                    renderActions: (user) => {
                        //User activity
                        const userLoans = loans?.filter((loan) => loan.user_id === user.id);
                        const userReserves = reserves?.filter((reserve) => reserve.user_id === user.id);

                        const hasActivity = userLoans?.length > 0 || userReserves?.length > 0;
                        return (
                            <>
                                {hasActivity ? (
                                    <Link href={`/users/${user.id}`}>
                                        <Button variant="outline" size="icon" title={t('ui.users.buttons.show') || 'Edit user'}>
                                            <CalendarClock className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant="outline" size="icon" disabled title={t('ui.users.buttons.show') || 'Edit user'}>
                                        <CalendarClock className="h-4 w-4" />
                                    </Button>
                                )}
                                <Link href={`/users/${user.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                    <Button variant="outline" size="icon" title={t('ui.users.buttons.edit') || 'Edit user'}>
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <DeleteDialog
                                    id={user.id}
                                    onDelete={handleDeleteUser}
                                    title={t('ui.users.delete.title') || 'Delete user'}
                                    description={
                                        t('ui.users.delete.description') || 'Are you sure you want to delete this user? This action cannot be undone.'
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
                        );
                    },
                }),
            ] as ColumnDef<User>[],
        [t, handleDeleteUser],
    );

    return (
        <UserLayout title={t('ui.users.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <h1 className="text-3xl font-bold">{t('ui.users.title')}</h1>
                        {/* <Link href="/users/show">
                          <Button>
                              <CalendarClock  className="mr-2 h-4 w-4" />
                              {t('ui.users.buttons.usersTimeline')}
                          </Button>
                      </Link> */}
                        <div className="mt-4 flex flex-col gap-2 md:mt-0 md:flex-row">
                            <a href="/users/export" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-stone-300 text-stone-900 hover:bg-stone-200">
                                    <FileUp className="mr-2 h-4 w-4" />
                                    {t('ui.users.export')}
                                </Button>
                            </a>
                            <Link href="/users/create">
                                <Button>
                                    <PlusIcon className="mr-2 h-4 w-4" />
                                    {t('ui.users.buttons.new')}
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
                                        users ?? {
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
        </UserLayout>
    );
}
