import { useForm, Controller } from "react-hook-form"; // Asegúrate de importar Controller de react-hook-form
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Users } from 'lucide-react'; // Icono para el rol
import { Separator } from "@/components/ui/separator"
import { FormField } from "@/components/ui/form";
import { useTranslations } from "@/hooks/use-translations";



type FormValues = {
  selector: string; // Definir explícitamente que 'selector' es un string
  permissions: string[]; // Definir explícitamente que 'permissions' es un array de strings
};

export function PermissionsForm() {
  const { t } = useTranslations();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      selector: "", // Rol seleccionado
      permissions: [], // Los permisos seleccionados estarán aquí
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Formulario enviado:", data);
  };

  // const categories = [
  //   { id: "users", label: t("ui.users.roles_permissions.users_permissions") },
  //   { id: "products", label: t("ui.users.roles_permissions.products_permissions") },
  //   { id: "reports", label: t("ui.users.roles_permissions.reports_permissions") },
  //   { id: "settings", label: t("ui.users.roles_permissions.settings_permissions") },
  // ];

  
  const permissionsGroup = {
    [t("ui.users.roles_permissions.users_permissions")]: [
      { id: "users.view", label: t("ui.users.roles_permissions.users_view") },
      { id: "users.create", label: t("ui.users.roles_permissions.users_create") },
      { id: "users.edit", label: t("ui.users.roles_permissions.users_edit") },
      { id: "users.delete", label: t("ui.users.roles_permissions.users_delete") },
    ],
    [t("ui.users.roles_permissions.products_permissions")]: [
      { id: "products.view", label: t("ui.users.roles_permissions.products_view") },
      { id: "products.create", label: t("ui.users.roles_permissions.products_create") },
      { id: "products.edit", label: t("ui.users.roles_permissions.products_edit") },
      { id: "products.delete", label: t("ui.users.roles_permissions.products_delete") },
    ],
    [t("ui.users.roles_permissions.reports_permissions")]: [
      { id: "reports.view", label: t("ui.users.roles_permissions.reports_view") },
      { id: "reports.export", label: t("ui.users.roles_permissions.reports_export") },
      { id: "reports.print", label: t("ui.users.roles_permissions.reports_print")  },
    ],
    [t("ui.users.roles_permissions.settings_permissions")]: [
      { id: "settings.view", label: t("ui.users.roles_permissions.settings_access")  },
      { id: "settings.export", label: t("ui.users.roles_permissions.settings_modification")  },
    ]
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto rounded-lg">
      
      {/* Selección de rol */}
      <FormField
        name="selector"
        control={control}
        render={({ field }) => (
          <div>
            <Label htmlFor="selector" className="flex items-center my-4">
              <Shield size={18} className="mr-2" />
              {t("ui.users.roles_permissions.role_title")}
            </Label>

            <Select
              value={field.value}
              onValueChange={field.onChange} // Asignar el valor del rol seleccionado
            >
              <SelectTrigger>
                <SelectValue placeholder={t("ui.users.roles_permissions.roles_selector")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>
            <div className="text-xs mt-2 text-gray-700">{t("ui.users.roles_permissions.roles_footer")}</div>
          </div>
        )}
      />

      {/* Separador */}
      <Separator className=" w-full" /> {/* Línea de separación*/}  

      {/* Permisos */}
      <div>
        <div>
        <Label className="flex items-center my-4">
                <Shield size={18} className="mr-2 text-blue-500" />
                {t("ui.users.roles_permissions.specific_permissions")}
              </Label>
        </div>  
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(permissionsGroup).map(([category, permissions]) => (
            <Card key={category} className= "bg-gray-50">
              <CardHeader>
                <h2>{category}</h2>
              </CardHeader>
              <CardContent>
                {permissions.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2 m-1">
                    <Controller
                      name="permissions" // Asegúrate de que sea "permissions" para que se guarde correctamente en el formulario
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                        className="border-blue-500"  
                        checked={field.value.includes(id)} // Ahora 'field.value' es un array de strings
                          onCheckedChange={(checked) => {
                            if (checked) {
                              // Añadir permiso al array si está seleccionado
                              field.onChange([...field.value, id]);
                            } else {
                              // Eliminar permiso si está desmarcado
                              field.onChange(field.value.filter((value: string) => value !== id));
                            }
                          }}
                        />
                      )}
                    />
                    <Label>{label}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </form>
  );
}