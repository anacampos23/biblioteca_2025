import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface BookcaseFormProps {
    initialData?: {
        id: string;
        bookcase_name: number;
        zone_id: string;
        floor_id: string;
    };
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

export function BookcaseForm({ initialData, page, perPage }: BookcaseFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            bookcase_name: initialData?.bookcase_name ?? '',
            zone_id: initialData?.floor_id ?? '',
            floor_id: initialData?.floor_id ?? '',
        },
        onSubmit: async ({ value }) => {
            const bookcaseData = {
                ...value,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Usuario creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['bookcases'] });

                    // Construct URL with page parameters
                    let url = '/bookcases';
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
                        toast.error(initialData ? t('messages.bookcases.error.update') : t('messages.bookcases.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/bookcases/${initialData.id}`, bookcaseData, options);
            } else {
                router.post('/bookcases', bookcaseData, options);
            }
        },
    });

    // Form submission handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                {/* Select para zonas */}
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
                                    <div className="mt-3 mb-1 flex items-center gap-1">{t('ui.zones.fields.title')}</div>
                                </Label>
                                <Select required={true} value={field.state.value} onValueChange={(value) => field.handleChange(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.zones.placeholders.selectZone')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {zoneNames.map((zone) => (
                                            <SelectItem key={zone} value={zone}>
                                                {t(`ui.zones.list.${zone}`)} {/* Traducimos cada zona con t() */}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

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
                                console.log('Validando:', { value, name: form.state.values.name, existing: floor_zone_id });
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor_name').toLowerCase() })
                                    : !unique_floor_zone(value, form.state.values.name) && value != initialData?.floor_id
                                      ? t('ui.validation.zone_floor', { attribute: t('ui.floors.fields.floor') })
                                      : validateFloorCapacity(value)
                                        ? t('ui.validation.zone_overload', { attribute: t('ui.zones.fields.floor_name').toLowerCase() })
                                        : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mt-3 mb-1 flex items-center gap-1">{t('ui.zones.fields.floor_title')}</div>
                                </Label>
                                {/* Select dropdown para elegir el piso */}
                                <Select
                                    required={true}
                                    value={field.state.value} // Aquí se asigna el valor por defecto (ID del piso)
                                    onValueChange={(value) => field.handleChange(value)} // Maneja el cambio de selección
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.zones.placeholders.selectFloor')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {floors?.map((floor) => (
                                            <SelectItem key={floor.id} value={floor.id.toString()}>
                                                {t('ui.floors.title_sing', { number: floor.floor_number })}
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
                <div className="mt-3 mt-4 flex justify-center gap-1">
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
