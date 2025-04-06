
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { User, Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, Building2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ZoneFormProps {
    initialData?: {
        id: string;
        name: string;
        floor_id: string;
    };
    floors?: { id: string; floor_number: number; capacity_zones: number; }[];
    floor_zone_id:{ floor_id: string; name: string }[];
    page?: string;
    perPage?: string;
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

export function ZoneForm({ initialData, page, perPage, floors, floor_zone_id }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    //Manejador unique floor_zone
    function unique_floor_zone(floor_id: string, name: string) {
        if (!floor_zone_id || !Array.isArray(floor_zone_id)) {
            return true; // Si no hay datos, asumimos que es único
        }
        // Concatenamos el `floor_id` y el `name` con un guion
        const floorZoneString = `${floor_id}-${name.toLowerCase()}`;

        // Verificamos si ya existe un objeto con esa combinación de `floor_id` y `name`
        const exists = floor_zone_id.some((item) => `${item.floor_id}-${item.name.toLowerCase()}` === floorZoneString);

        if (exists) {
            return false;
        }

        // Si no existe, es único
        return true;
    }


    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            floor_id: initialData?.floor_id?? '',
        },
        onSubmit: async ({ value }) => {
            const zoneData = {
                ...value,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['zones'] });

                    // Construct URL with page parameters
                    let url = '/zones';
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
                        toast.error(initialData ? t('messages.zones.error.update') : t('messages.zones.error.create'));
                    }

                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/zones/${initialData.id}`, zoneData, options);
            } else {
                router.post('/zones', zoneData, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };


    const accesoPermisos = false;

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                {/* Name field */}
                <div>
                    <form.Field
                        name="name"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.zones.fields.name').toLowerCase() })
                                    : value.length < 2
                                        ? t('ui.validation.min.string', { attribute: t('ui.zones.fields.name').toLowerCase(), min: '2' })
                                        : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1 mt-3">
                                        {t('ui.zones.fields.title')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.zones.placeholders.name')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                {/* Floor_number field */}
                <div>
                    <form.Field
                        name="floor_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                console.log("Validando:", { value, name: form.state.values.name, existing: floor_zone_id });
                                return !value
                                     ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor_name').toLowerCase() })
                                        : !unique_floor_zone(value, form.state.values.name) && value!=initialData?.floor_id
                                        ? t('ui.validation.zone_floor', { attribute: t('ui.floors.fields.floor') })
                                    : undefined;
                        },
                    }}

                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1 mt-3">
                                        {t('ui.zones.fields.floor_title')}
                                    </div>
                                </Label>
                                {/* Select dropdown para elegir el piso */}
                                <Select
                                    required={true}
                                    value={field.state.value}  // Aquí se asigna el valor por defecto (ID del piso)
                                    onValueChange={(value) => field.handleChange(value)} // Maneja el cambio de selección
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.zones.placeholders.selectFloor')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {floors?.map((floor) => (
                                            <SelectItem key={floor.id} value={floor.id.toString()}>
                                                {t("ui.floors.title_sing", { number: floor.floor_number })}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/zones';
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
                        {t('ui.zones.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.zones.buttons.saving')
                                    : initialData
                                      ? t('ui.zones.buttons.update')
                                      : t('ui.zones.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
