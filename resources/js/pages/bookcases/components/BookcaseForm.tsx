import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, User, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserFormProps {
    initialData?: {
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

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="text-destructive mt-1 text-sm">{field.state.meta.errors.join(', ')}</p>
            ) : null}
            {field.state.meta.isValidating ? <p className="text-muted-foreground mt-1 text-sm">Validating...</p> : null}
        </>
    );
}

const iconComponents = {
    Users: Users,
    Products: PackageOpen,
    Reports: FileText,
    Config: Bolt,
};

const categorias = [
    { id: 1, icon: 'Users', label: 'users', perms: 'users' },
    { id: 2, icon: 'Products', label: 'products', perms: 'products' },
    { id: 3, icon: 'Reports', label: 'reports', perms: 'reports' },
    { id: 4, icon: 'Config', label: 'configurations', perms: 'config' },
];

var permisosUsuarioFinal: string[] = [];

export function UserForm({ initialData, page, perPage, roles, rolesConPermisos, permisosAgrupados, permisosDelUsuario }: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const [arrayPermisosState, setArrayPermisosState] = useState(permisosUsuarioFinal);

    useEffect(() => {
        if (permisosDelUsuario && initialData) {
            permisosUsuarioFinal = permisosDelUsuario;
            setArrayPermisosState(permisosDelUsuario);
        } else {
            permisosUsuarioFinal = [];
            setArrayPermisosState(permisosUsuarioFinal);
        }
    }, [permisosDelUsuario]);

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            email: initialData?.email ?? '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            const userData = {
                ...value,
                permisos: arrayPermisosState,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Usuario creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['users'] });

                    // Construct URL with page parameters
                    let url = '/users';
                    if (page) {
                        url += `?page=${page}`;
                        if (perPage) {
                            url += `&per_page=${perPage}`;
                        }
                    }

                    router.visit(url);
                },
                onError: (errors: Record<string, string>) => {
                    if (Object.keys(errors).length === 0) {
                        toast.error(initialData ? t('messages.users.error.update') : t('messages.users.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, userData, options);
            } else {
                router.post('/users', userData, options);
            }
        },
    });

    // Manejador de dependencias

    function comprobadorDependencias(permiso: string, parent: string) {
        if (permiso == 'users.view' || permiso == 'products.view' || permiso == 'reports.view' || permiso == 'config.access') {
            return false;
        } else {
            return !permisosUsuarioFinal.includes(parent);
        }
    }

    // Manejador de checkboxes

    function togglePermiso(permiso: string) {
        if (permisosUsuarioFinal.includes(permiso)) {
            switch (permiso) {
                case 'users.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter(
                        (permiso) => !['users.edit', 'users.delete', 'users.create'].includes(permiso),
                    );
                    break;
                case 'products.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter(
                        (permiso) => !['products.edit', 'products.delete', 'products.create'].includes(permiso),
                    );
                    break;
                case 'reports.view':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter((permiso) => !['reports.print', 'reports.export'].includes(permiso));
                    break;
                case 'config.access':
                    permisosUsuarioFinal = permisosUsuarioFinal.filter((permiso) => !['config.modify'].includes(permiso));
                    break;
            }
            permisosUsuarioFinal = permisosUsuarioFinal.filter((element) => element !== permiso);
            setArrayPermisosState(permisosUsuarioFinal);
        } else {
            permisosUsuarioFinal = [...permisosUsuarioFinal, permiso];
            setArrayPermisosState(permisosUsuarioFinal);
        }
    }

    // Manejador del select

    function roleSelector(role: string) {
        const permisosDelRol = rolesConPermisos[role];

        permisosUsuarioFinal = [];
        setArrayPermisosState(permisosUsuarioFinal);

        permisosDelRol.forEach((permiso) => {
            togglePermiso(permiso);
        });
    }

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [showPassword, setShowPassword] = useState(false);

    const accesoPermisos = false;

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <Tabs defaultValue="userForm">
                    <TabsList className="w-full">
                        <TabsTrigger value="userForm" className="w-1/2">
                            {t('ui.users.tabs.userForm')}
                        </TabsTrigger>
                        <TabsTrigger value="permissionsForm" className="w-1/2" disabled={accesoPermisos}>
                            {t('ui.users.tabs.permissionsForm')}
                        </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsContent value="userForm" className="w-full">
                        {/* Name field */}
                        <div>
                            <form.Field
                                name="name"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.users.fields.name').toLowerCase() })
                                            : value.length < 2
                                              ? t('ui.validation.min.string', { attribute: t('ui.users.fields.name').toLowerCase(), min: '2' })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <User color="grey" size={18} />
                                                {t('ui.users.fields.name')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.users.placeholders.name')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        {/* Email field */}
                        <div>
                            <form.Field
                                name="email"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.users.fields.email').toLowerCase() })
                                            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                              ? t('ui.validation.email', { attribute: t('ui.users.fields.email').toLowerCase() })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                <Mail color="grey" size={18} />
                                                {t('ui.users.fields.email')}
                                            </div>
                                        </Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.users.placeholders.email')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>

                        {/* Password field */}
                        <div>
                            <form.Field
                                name="password"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        if (!initialData && (!value || value.length === 0)) {
                                            return t('ui.validation.required', { attribute: t('ui.users.fields.password').toLowerCase() });
                                        }
                                        if (value && value.length > 0 && value.length < 8) {
                                            return t('ui.validation.min.string', {
                                                attribute: t('ui.users.fields.password').toLowerCase(),
                                                min: '8',
                                            });
                                        }
                                        return undefined;
                                    },
                                }}
                            >
                                {(field) => {
                                    return (
                                        <>
                                            <Label htmlFor={field.name}>
                                                <div className="mb-1 flex items-center gap-1">
                                                    <Lock color="grey" size={18} />
                                                    {initialData ? t('ui.users.fields.password_optional') : t('ui.users.fields.password')}
                                                </div>
                                            </Label>

                                            {/* Input and Toggle Wrapper */}
                                            <div className="relative w-full">
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={field.state.value}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    onBlur={field.handleBlur}
                                                    placeholder={t('ui.users.placeholders.password')}
                                                    disabled={form.state.isSubmitting}
                                                    autoComplete="off"
                                                    required={false}
                                                    className="pr-10"
                                                />

                                                {/* Visibility Toggle Button */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>

                                            <p className="text-muted-foreground mt-1 text-xs">{t('ui.users.placeholders.passRulings')}</p>

                                            <FieldInfo field={field} />
                                        </>
                                    );
                                }}
                            </form.Field>
                        </div>
                    </TabsContent>
                    <TabsContent value="permissionsForm" className="w-full">
                        {/* Pre-selections field */}
                        <div>
                            <Label>
                                <div className="mb-1 flex items-center gap-1">
                                    <Shield color="grey" size={18} />
                                    {t('ui.users.fields.rolPpal')}
                                </div>
                            </Label>
                            <Select onValueChange={(value) => roleSelector(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t('ui.users.roles.default')} />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* <SelectItem value="default">{t('ui.users.roles.default')}</SelectItem> */}
                                    {roles?.map((role) => (
                                        <SelectItem key={String(role)} value={String(role)}>
                                            {t('ui.users.roles.' + role)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-3 mb-3">
                                <Separator />
                            </div>

                            {/* Permisos Especificos */}

                            <div className="mt-3 mb-1 flex items-center gap-1">
                                <Shield color="#2762c2" size={18} />
                                {t('ui.users.fields.permisos')}
                            </div>
                            <div className="mt-2 flex grid grid-cols-2 gap-4">
                                {categorias.map((categoria) => {
                                    const permisosCat = permisosAgrupados[categoria.perms];
                                    const permisoPadre = permisosCat[0];

                                    const catKey = categoria.icon;

                                    const Icono = iconComponents[catKey as keyof typeof iconComponents];

                                    return (
                                        <Card className="grow" key={categoria.id}>
                                            <CardHeader>
                                                <div className="flex gap-1">
                                                    <Icono size={18} color="blue" />
                                                    <CardTitle>{t('ui.users.gridelements.' + categoria.label)}</CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                {permisosCat.map((permiso) => (
                                                    <div className="items-top flex space-x-2" key={String(permiso)}>
                                                        <Checkbox
                                                            className="border-blue-500"
                                                            id={String(permiso)}
                                                            value={String(permiso)}
                                                            checked={arrayPermisosState.includes(permiso)}
                                                            onCheckedChange={() => {
                                                                togglePermiso(permiso);
                                                            }}
                                                            disabled={comprobadorDependencias(permiso, permisoPadre)}
                                                        />
                                                        <div className="m-1 grid gap-1.5 leading-none">
                                                            <label
                                                                htmlFor={String(permiso)}
                                                                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {t('ui.users.permisos.' + categoria.icon + '.' + permiso)}
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/users';
                            if (page) {
                                url += `?page=${page}`;
                                if (perPage) {
                                    url += `&per_page=${perPage}`;
                                }
                            }
                            router.visit(url);
                        }}
                        disabled={form.state.isSubmitting}
                    >
                        <X />
                        {t('ui.users.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.users.buttons.saving')
                                    : initialData
                                      ? t('ui.users.buttons.update')
                                      : t('ui.users.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
