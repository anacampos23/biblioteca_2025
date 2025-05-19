import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface BookcaseFormProps {
    initialData?: {
        id: string;
        bookcase_name: number;
        zone_id: string;
        floor_id: string;
    };
    zones?: { id: string; name: string; floor_id: string; bookcases_count: number }[];
    floors?: { id: string; floor_number: number; capacity_zones: number }[];
    floor_zone_id: { floor_id: string; name: string }[];
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

export function BookcaseForm({ initialData, floors, zones, floor_zone_id, page, perPage }: BookcaseFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    const url = window.location.href;
    const param = new URLSearchParams(window.location.search);

    console.log('valores iniciales', initialData);

    const bookBookcase_name = param.get('bookcase_name');
    const zone_name = param.get('name');
    const bookFloor_number = param.get('floor_number');

    //Manejar las zonas por piso seleccionado y las librerias por zona y piso
    let floorNow = undefined;
    let zoneNow = undefined;
    let bookcaseNow = undefined;
    const [selectedFloor, setSelectedFloor] = useState<string | undefined>(floorNow ?? undefined);
    const [selectedZone, setSelectedZone] = useState<string | undefined>(zoneNow ?? undefined);

    // Considerar el valor seleccionado o el valor inicial al editar
    const floorId = selectedFloor ?? initialData?.floor_id;
    const zoneId = selectedZone ?? initialData?.zone_id;

    // Filtrar zonas por el piso seleccionado
    const filteredZones = zones?.filter((zone) => zone.floor_id === floorId);

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            bookcase_name: initialData?.bookcase_name ?? bookBookcase_name ?? '',
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
                {/* Floor_number field */}
                <div>
                    <form.Field
                        name="floor_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.floor').toLowerCase() }) : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mt-2 mb-3 flex items-center gap-1">{t('ui.books.fields.floor')}</div>
                                </Label>
                                {/* Select dropdown para elegir el piso */}
                                <Select
                                    required={true}
                                    value={field.state.value ?? ''}
                                    onValueChange={(value) => {
                                        field.handleChange(value); // actualiza el valor del formulario
                                        setSelectedFloor(value); // actualiza tu estado local
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.zones.placeholders.selectFloor')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {floors?.map((floor) => (
                                            <SelectItem key={floor.id} value={floor.id}>
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

                {/* Zones field*/}
                <div>
                    <form.Field
                        name="zone_id"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? t('ui.validation.required', { attribute: t('ui.books.fields.zone').toLowerCase() }) : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.zone')}</div>
                                </Label>
                                <Select
                                    required={true}
                                    value={field.state.value}
                                    onValueChange={(value) => {
                                        field.handleChange(value);
                                        setSelectedZone(value);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('ui.zones.placeholders.selectZone')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredZones?.map((zone) => (
                                            <SelectItem key={zone.id} value={zone.id}>
                                                {t(`ui.zones.list.${zone.name}`)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                 {/* Bookcase Name field */}
                <div className="mt-5">
                    <form.Field
                        name="bookcase_name"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? value : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-3 flex items-center gap-1">{t('ui.bookcases.fields.bookcase_number')}</div>
                                </Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.bookcases.placeholders.bookcase_number')}
                                    disabled={form.state.isSubmitting}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-between sm:gap-2 md:gap-10">
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
                        {t('ui.bookcases.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.bookcases.buttons.saving')
                                    : initialData
                                      ? t('ui.bookcases.buttons.update')
                                      : t('ui.bookcases.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
