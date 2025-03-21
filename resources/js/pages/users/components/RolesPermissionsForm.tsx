import { useForm, Controller } from "react-hook-form"; // Asegúrate de importar Controller de react-hook-form
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield } from 'lucide-react'; // Icono para el rol
import { Separator } from "@radix-ui/react-select";

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

export function PermissionsForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      selector: "", // Rol seleccionado
      permissions: [], // Los permisos seleccionados estarán aquí
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Formulario enviado:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full mx-auto rounded-lg shadow-lg">
      
      {/* Selección de rol */}
      <Controller
        name="selector"
        control={control}
        render={({ field }) => (
          <div>
            <Label htmlFor="selector" className="flex items-center mb-2">
              <Shield size={18} className="mr-2" />
              Rol Principal
            </Label>
            <Select
              value={field.value}
              onValueChange={field.onChange} // Asignar el valor del rol seleccionado
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      {/* Separador */}
      <Separator />

      {/* Permisos */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(permissionsGroup).map(([category, permissions]) => (
          <Card key={category}>
            <CardHeader>
              <h2>{category}</h2>
            </CardHeader>
            <CardContent>
              {permissions.map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Controller
                    name="permissions" // Asegúrate de que sea "permissions" para que se guarde correctamente en el formulario
                    control={control}
                    render={({ field }) => (
                      <Checkbox
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

      {/* Botón de envío */}
      <Button type="submit" className="w-full">
        Enviar
      </Button>
    </form>
  );
}