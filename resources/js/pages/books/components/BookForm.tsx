import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        genre: string;
        ISBN: number;
        editorial: string;
        bookcase_id: string;
        zone_id: string;
        floor_id: string;
        bookcase_name: number;
        name: string;
        floor_number: number;
    };
    bookcases?: { id: string; bookcase_name: number }[];
    zones?: { id: string; name: string; floor_id: string }[];
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

var permisosUsuarioFinal: string[] = [];

export function BookForm({ initialData, page, perPage, bookcases, zones, floors, floor_zone_id }: BookFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const url = window.location.href;
    const param = new URLSearchParams(window.location.search);

    const bookBookcase_name = param.get('bookcase_name');
    const zone_name = param.get('name');
    const bookFloor_number = param.get('floor_number');

    // Estado para manejar la zona personalizada
    const [customZone, setCustomZone] = useState<string>('');

    // Lista de zonas predefinidas
    const zoneNames = ['Literature', 'Novel', 'Science and Technology', 'Humanities', 'Art', 'Lifestyle', 'Children', 'Young Adult'];

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
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            genre: initialData?.genre ?? '',
            ISBN: initialData?.ISBN ?? '',
            editorial: initialData?.editorial ?? '',
            bookcase_name: initialData?.bookcase_name ?? bookBookcase_name ?? '',
            name: initialData?.name ?? zone_name ?? '',
            floor_number: initialData?.floor_number ?? bookFloor_number ?? '',
        },
        onSubmit: async ({ value }) => {
            const bookData = {
                ...value,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Usuario creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['books'] });

                    // Construct URL with page parameters
                    let url = '/books';
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
                        toast.error(initialData ? t('messages.books.error.update') : t('messages.books.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/books/${initialData.id}`, bookData, options);
            } else {
                router.post('/books', bookData, options);
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
                {/* Title field */}
                <div>
                    <form.Field
                        name="title"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? 'El título es obligatorio' : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">

                                        {t('ui.books.fields.title')}
                                    </div>
                                </Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.title')}
                                    disabled={form.state.isSubmitting}
                                    required
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>
                {/* Author field */}
                <div>
                    <form.Field
                        name="title"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? 'El autor es obligatorio' : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">

                                        {t('ui.books.fields.title')}
                                    </div>
                                </Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="text"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.books.placeholders.title')}
                                    disabled={form.state.isSubmitting}
                                    required
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* ISBN field */}
                <div>
                    <form.Field
                        name="ISBN"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value ? 'holi' : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1">

                                        {t('ui.loans.fields.ISBN')}
                                    </div>
                                </Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    type="number"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.loans.placeholders.ISBN')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
                                <FieldInfo field={field} />
                            </>
                        )}
                    </form.Field>
                </div>

                {/* Zones field */}
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
                        name="floor_number"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                console.log('Validando:', { value, name: form.state.values.name, existing: floor_zone_id });
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.zones.fields.floor_name').toLowerCase() })
                                    : !unique_floor_zone(value, form.state.values.name) && value != initialData?.floor_id
                                      ? t('ui.validation.zone_floor', { attribute: t('ui.floors.fields.floor') })
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
                                    value={field.state.value?.toString()} // Por si `field.state.value` es number
                                    onValueChange={(value) => field.handleChange(Number(value))} // Convertimos el string a número
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
                <div className="mt-3 mt-4 flex justify-center gap-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            let url = '/books';
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
                        {t('ui.books.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.books.buttons.saving')
                                    : initialData
                                      ? t('ui.books.buttons.update')
                                      : t('ui.books.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
