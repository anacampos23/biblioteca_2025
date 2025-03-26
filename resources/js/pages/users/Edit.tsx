import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { UserForm } from '@/pages/users/components/UserForm';
import { PageProps } from '@inertiajs/core';
import { User } from 'lucide-react';

interface EditUserProps extends PageProps {
    user: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
    roles?: string[];
    rolesConPermisos: Record<string, string[]>;
    permisos?: string[];
    permisosAgrupados: Record<string, string[]>;
    permisosDelUsuario?: string[];
}

export default function EditUser({ user, page, perPage, roles, rolesConPermisos, permisos, permisosAgrupados, permisosDelUsuario }: EditUserProps) {
    const { t } = useTranslations();

    return (
        <UserLayout title={t('ui.users.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <User color="#2762c2" />
                                {t('ui.users.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.users.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <UserForm
                            initialData={user}
                            page={page}
                            perPage={perPage}
                            roles={roles}
                            rolesConPermisos={rolesConPermisos}
                            permisos={permisos}
                            permisosAgrupados={permisosAgrupados}
                            permisosDelUsuario={permisosDelUsuario}
                        />
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    );
}
