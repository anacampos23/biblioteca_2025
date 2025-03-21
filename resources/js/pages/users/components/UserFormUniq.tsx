import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { User, Mail, Lock, X, Save, Eye, EyeOff  } from 'lucide-react';
import { useState } from "react"; // Asegúrate de importar Controller de react-hook-form
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield } from 'lucide-react'; // Icono para el rol
import { Separator } from "@radix-ui/react-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissionsForm } from "@/pages/users/components/RolesPermissionsForm";





interface UserFormProps {
    initialData?: {
        id: string;
        name: string;
        email: string;
    };
    page?: string;
    perPage?: string;
}

// Field error display component
function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                </p>
            ) : null}
            {field.state.meta.isValidating ? (
                <p className="mt-1 text-sm text-muted-foreground">Validating...</p>
            ) : null}
        </>
    );
}


const permissionsGroup = {
    users: [
      { id: "users.view", label: "Ver usuarios" },
      { id: "users.create", label: "Crear usuarios" },
      { id: "users.edit", label: "Editar usuarios" },
      { id: "users.delete", label: "Eliminar usuarios" },
    ],
    products: [
      { id: "products.view", label: "Ver productos" },
      { id: "products.create", label: "Crear productos" },
      { id: "products.edit", label: "Editar productos" },
      { id: "products.delete", label: "Eliminar productos" },
    ],
    reports: [
      { id: "reports.view", label: "Ver reportes" },
      { id: "reports.export", label: "Exportar reportes" },
      { id: "reports.import", label: "Importar reportes" },
    ],
    settings: [
      { id: "settings.view", label: "Ver configuración" },
      { id: "settings.export", label: "Acceso a configuración" },
    ]
  };
  
  type FormValues = {
    selector: string;
    permissions: string[]; // Definir explícitamente que 'permissions' es un array de strings
  };

export function UserForm({ initialData, page, perPage}: UserFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? "",
            email: initialData?.email ?? "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            const options = {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });

                    // Construct URL with page parameters
                    let url = "/users";
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
                        toast.error(
                            initialData
                                ? t("messages.users.error.update")
                                : t("messages.users.error.create")
                        );
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/users/${initialData.id}`, value, options);
            } else {
                router.post("/users", value, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    const [showPassword, setShowPassword] = useState(false);


    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Tabs */}
            <div>

        <Tabs defaultValue="account" >
          <TabsList className="flex justify-center w-full"> 
            <TabsTrigger value="account">{t("ui.common.basic")}</TabsTrigger>
            <TabsTrigger value="password">{t("ui.common.roles")}</TabsTrigger>
          </TabsList>

          <Separator className="mt-0" />

          {/* Información básica */}
          <TabsContent value="account">
            
          <div>
                <form.Field
                    name="name"
                    validators={{
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) => setTimeout(resolve, 500));
                            return !value
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.name").toLowerCase() })
                                : value.length < 2
                                    ? t("ui.validation.min.string", { attribute: t("ui.users.fields.name").toLowerCase(), min: "2" })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Label htmlFor={field.name} className="flex items-center"><User className="h-4 w-4 mr-2 my-2" />{t("ui.users.fields.name")}</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.name")}
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
                                ? t("ui.validation.required", { attribute: t("ui.users.fields.email").toLowerCase() })
                                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                    ? t("ui.validation.email", { attribute: t("ui.users.fields.email").toLowerCase() })
                                    : undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            <Label htmlFor={field.name} className="flex items-center"><Mail className="h-4 w-4 mr-2 my-2" />{t("ui.users.fields.email")}</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                placeholder={t("ui.users.placeholders.email")}
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
                                return t("ui.validation.required", { attribute: t("ui.users.fields.password").toLowerCase() });
                            }
                            if (value && value.length > 0 && value.length < 8) {
                                return t("ui.validation.min.string", { attribute: t("ui.users.fields.password").toLowerCase(), min: "8" });
                            }
                            return undefined;
                        },
                    }}
                >
                    {(field) => (
                        <>
                            
                            <Label htmlFor={field.name} className="flex items-center">
                            <Lock  className="h-4 w-4 mr-2 my-2" />
                                {initialData
                                    ? t("ui.users.fields.password_optional")
                                    : t("ui.users.fields.password")}
                            </Label>
                            <div className="flex justify-between items-center relative max-w-full">
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type={showPassword ? "text" : "password"}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t("ui.users.placeholders.password")}
                                    disabled={form.state.isSubmitting}
                                    autoComplete="off"
                                    required={false}
                                ></Input>
                                <button className="p-2 right-2 absolute " onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            showPassword ? <Eye className="h-4 w-4 mr-2 my-2" /> : <EyeOff className="h-4 w-4 mr-2 my-2" />

                                        }
                                </button>
                            </div>
                            <FieldInfo field={field} />
                            <div className="text-xs mt-2 text-gray-700">{t("ui.users.password_footer")}</div>
                           
                        </>
                    )}
                </form.Field>
            </div>
          </TabsContent>

          {/* Roles y permisos */}
          <TabsContent value="password">
            
            < PermissionsForm />     

          </TabsContent>
        </Tabs>
</div>
            
            <Separator className="my-4 w-full" /> {/* Línea de separación*/}

            {/* Form buttons */}
            <div className="flex justify-between gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        let url = "/users";
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
                    <X className="h-4 w-4 mr-2 my-2" />{t("ui.users.buttons.cancel")}
                </Button>

                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                    {([canSubmit, isSubmitting]) => (
                        <Button type="submit" disabled={!canSubmit} className="text-white bg-blue-500 hover:bg-blue-900">
                            <Save className="h-4 w-4 mr-2 my-2 text-white" />
                            {isSubmitting
                                ? t("ui.users.buttons.saving")
                                : initialData
                                    ? t("ui.users.buttons.update")
                                    : t("ui.users.buttons.save")}
                        </Button>
                    )}
                </form.Subscribe>
            </div>
        </form>
    );
}

