import { useForm } from "@tanstack/react-form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator";


const permissionsGroup = {

    "users": [
        { id: "view", label: "Ver usuarios" },
        { id: "create", label: "Crear usuarios" },
        { id: "edit", label: "Editar usuarios" },
        { id: "delete", label: "Eliminar usuarios" },
    ],

    "products": [
        { id: "view", label: "Ver productos" },
        { id: "create", label: "Crear productos" },
        { id: "edit", label: "Editar productos" },
        { id: "delete", label: "Eliminar productos" },
    ],

    "reports": [
        { id: "view", label: "Ver reportes" },
        { id: "export", label: "Exportar reportes" },
        { id: "import", label: "Importar reportes" },
    ],

    "settings": [
        { id: "view", label: "Ver reportes" },
        { id: "export", label: "Acceso a configuración" },
        { id: "import", label: "Modificar configuración" },
    ]

 } as const;

export function PermissionsForm() {
    const form = useForm({
        defaultValues: {
            verify_check1: false,
            verify_check2: false,
            verify_check3: false,
            verify_check4: false,
            selector: "",
            items: ["view"],
        },
        onSubmit: async ({ value }) => {
            console.log("Formulario enviado:", value);
            toast.success("Formulario enviado con éxito");
        },
    });


    return (

        <form onSubmit={form.handleSubmit} className="space-y-6 w-full mx-auto rounded-lg shadow-lg">

            {/* Selección de categoría */}
            <form.Field name="selector">
                {(field) => (
                    <div>
                        <Label htmlFor="selector" className="flex items-center mb-2">
                            <Shield size={18} className="mr-2" />
                            Rol Principal

                        </Label>
                        <Select
                            onValueChange={(value) => field.handleChange(value)}
                            value={field.state.value}
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
            </form.Field>

            <Separator/>

            {/* Permissions Container */}
            <FormItem className="grid grid-cols-2 gap-4">

                {/* Users Perms */}
                <Card>
                    <CardContent>
                        {/* Checkbox de verify_check */}
                        <form.Field name="verify_check1" defaultValue={false}>
                            {(field) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.state.value}
                                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                                    />
                                    <Label>Suscribirse al boletín</Label>
                                </div>
                            )}
                        </form.Field>
                        <form.Field name="verify_check2" defaultValue={false}>
                            {(field) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.state.value}
                                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                                    />
                                    <Label>Suscribirse al boletín</Label>
                                </div>
                            )}
                        </form.Field>
                        <form.Field name="verify_check3" >
                            {(field) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.state.value}
                                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                                    />
                                    <Label>Suscribirse al boletín</Label>
                                </div>
                            )}
                        </form.Field>
                        <form.Field name="verify_check4" defaultValue={false}>
                            {(field) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.state.value}
                                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                                    />
                                    <Label>Suscribirse al boletín</Label>
                                </div>
                            )}
                        </form.Field>
                    </CardContent>
                </Card>


            </FormItem>

            {/* Botón de envío */}
            <Button type="submit" className="w-full">
                Enviar
            </Button>
        </form>
    );
}