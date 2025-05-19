import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
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
import { Save, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BookFormProps {
    initialData?: {
        id: string;
        title: string;
        author: string;
        ISBN: number;
        genre: string;
        editorial: string;
        bookcase_id: string;
        zone_id: string;
        floor_id: string;
        bookcase_name: number;
        name: string;
        floor_number: number;
    };
    bookcases?: { id: string; bookcase_name: number; floor_id: string; zone_id: string }[];
    zones?: { id: string; name: string; floor_id: string }[];
    floors?: { id: string; floor_number: number; capacity_zones: number }[];
    floor_zone_id: { floor_id: string; name: string }[];
    books?:{title:string, author:string; ISBN:number; genre:string; editorial:string; bookcase_id:string; zone_id:string; floor_id:string}[];
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

export function BookForm({ initialData, page, perPage, bookcases, zones, floors, floor_zone_id, books }: BookFormProps) {
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
    const [selectedBookcase, setSelectedBookcase] = useState<string | undefined>(bookcaseNow ?? undefined);
    const [genreValue, setGenreValue] = useState<string[]>(initialData?.genre ? JSON.parse(initialData.genre) : []);

    // Considerar el valor seleccionado o el valor inicial al editar
    const floorId = selectedFloor ?? initialData?.floor_id;
    const zoneId = selectedZone ?? initialData?.zone_id;

    // Filtrar zonas por el piso seleccionado
    const filteredZones = zones?.filter((zone) => zone.floor_id === floorId);

    // Filtrar estanterías por zona y piso
    const filteredBookcases = bookcases?.filter((bookcase) => bookcase.floor_id === floorId && bookcase.zone_id === zoneId);

    // Estado para manejar la zona personalizada
    const [customZone, setCustomZone] = useState<string>('');

    // Lista de zonas predefinidas
    // const zoneNames = ['Literature', 'Novel', 'Science and Technology', 'Humanities', 'Art', 'Lifestyle', 'Children', 'Young Adult'];

    //Lista de géneros según la zona
    const genres = [
        'Poetry',
        'Theater',
        'Essay',
        'Short Story',
        'Classics',
        'Historical Novel',
        'Crime Novel',
        'Science Fiction Novel',
        'Romantic Novel',
        'Mathematics',
        'Physics',
        'Biology',
        'Computer Science',
        'Philosophy',
        'Psychology',
        'Sociology',
        'History',
        'Politics',
        'Painting',
        'Photography',
        'Architecture',
        'Music',
        'Cinema',
        'Health and Wellness',
        'Nutrition',
        'Sport',
        'Travel',
        "Children's Stories",
        'Illustrated Books',
        'Educational Books',
        'Young Adult Novel',
        'Young Adult Fantasy',
        'Young Adult Thriller',
    ];

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
            ISBN: initialData?.ISBN ?? '',
            genre: initialData?.genre ? JSON.parse(initialData?.genre) : (genreValue ?? []),
            editorial: initialData?.editorial ?? '',
            bookcase_id: initialData?.bookcase_id ?? '',
            zone_id: initialData?.zone_id ?? '',
            floor_id: initialData?.floor_id ?? '',
        },
        onSubmit: async ({ value }) => {
            const bookData = {
                ...value,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Libro creado con éxito.');

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
        form.setFieldValue('genre', genreValue);
        form.handleSubmit();
    };

    //Autocompletar si hay otro ejemplar con el mismo ISBN
    function handleISBNMatched(books: BookFormProps['books'], ISBN: number | string) {
        const isbnStr = String(ISBN); // Convertir a string para comprobar longitud

        if (isbnStr.length !== 13) {
            // Si no tiene 13 caracteres, no hacemos nada
            return;
        }

        const matchedBook = books?.find((book) => String(book.ISBN) === isbnStr);

        if (matchedBook) {
            form.setFieldValue('title', matchedBook.title);
            form.setFieldValue('author', matchedBook.author);
            const parsedGenres = JSON.parse(matchedBook.genre);
            setGenreValue(parsedGenres);
            form.setFieldValue('genre', parsedGenres);
            form.setFieldValue('editorial', matchedBook.editorial);
            // form.setFieldValue('floor_id', matchedBook.floor_id);
            // setSelectedFloor(matchedBook.floor_id);
            // form.setFieldValue('zone_id', matchedBook.zone_id);
            // setSelectedZone(matchedBook.zone_id);
            // form.setFieldValue('bookcase_id', matchedBook.bookcase_id);
            // setSelectedBookcase(matchedBook.bookcase_id);
        }
    }


    console.log('Initial Data Genre:', initialData?.genre);

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Tabs defaultValue="bookForm">
                <TabsList className="hidden grid-cols-2 md:grid">
                    <TabsTrigger value="bookForm">{t('ui.books.tabs.bookForm')}</TabsTrigger>
                    <TabsTrigger value="locationForm">{t('ui.books.tabs.locationForm')}</TabsTrigger>
                </TabsList>

                {/*Mobile - mostrar sin tabs*/}
                <div className="block space-y-6 md:hidden">
                    <TabsContent value="bookForm" forceMount>
                        {/* Title field */}
                        <div className="mt-2">
                            <form.Field
                                name="title"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.title').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-3 flex items-center gap-1">{t('ui.books.fields.title')}</div>
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
                                name="author"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.author').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.author')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.author')}
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
                                        const valueStr = value.toString();
                                        return valueStr.length < 13 || valueStr.length > 13 ? t('ui.validation.ISBNlenght') : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.loans.fields.ISBN')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                field.handleChange(value);
                                                handleISBNMatched(books, value);
                                            }}
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

                        {/* Genre field */}
                        <div className="mt-6 mb-6">
                            <form.Field
                                name="genre"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value || value.length === 0
                                            ? t('ui.validation.required', {
                                                  attribute: t('ui.books.fields.genre').toLowerCase(),
                                              })
                                            : undefined,
                                }}
                            >
                                {(field) => (
                                    <div className="space-y-4">
                                        <Label htmlFor={field.name} className="mb-1 flex items-center gap-1">
                                            {t('ui.books.fields.genre')}
                                        </Label>
                                        <MultiSelect
                                            id={field.name}
                                            value={field.state.value}
                                            defaultValue={field.state.value ?? initialData?.genre ?? form.state.values.genre}
                                            options={genres.map((genre) => ({
                                                label: t(`ui.books.genres.${genre}`),
                                                value: genre,
                                            }))}
                                            onValueChange={(value) => field.handleChange(value)}
                                            placeholder={t('ui.books.placeholders.selectGenre')}
                                            variant="inverted"
                                        />

                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Editorial field */}
                        <div>
                            <form.Field
                                name="editorial"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.editorial').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.editorial')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.editorial')}
                                            disabled={form.state.isSubmitting}
                                            required
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </TabsContent>
                    <TabsContent value="locationForm" forceMount>
                        {/* Floor_number field */}
                        <div>
                            <form.Field
                                name="floor_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.floor').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.floor')}</div>
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
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.zone').toLowerCase() })
                                            : undefined;
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

                        {/* Bookcases field*/}
                        <div>
                            <form.Field
                                name="bookcase_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.bookcase').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.bookcase')}</div>
                                        </Label>
                                        <Select
                                            required={true}
                                            value={field.state.value ?? ''}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                setSelectedBookcase(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.zones.placeholders.selectZone')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredBookcases?.map((bookcase) => (
                                                    <SelectItem key={bookcase.id} value={bookcase.id}>
                                                        {bookcase.bookcase_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </TabsContent>
                </div>

                {/*Laptop - mostrar tabs*/}
                <div className="hidden md:block">
                    <TabsContent value="bookForm">
                        {/* Title field */}
                        <div className="mt-2">
                            <form.Field
                                name="title"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.title').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-3 flex items-center gap-1">{t('ui.books.fields.title')}</div>
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
                                name="author"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.author').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.author')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.author')}
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
                                        const valueStr = value.toString();
                                        return valueStr.length < 13 || valueStr.length > 13 ? t('ui.validation.ISBNlenght') : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.loans.fields.ISBN')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            value={field.state.value}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                field.handleChange(value);
                                                handleISBNMatched(books, value);
                                            }}
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

                        {/* Genre field */}
                        <div className="mt-6 mb-6">
                            <form.Field
                                name="genre"
                                validators={{
                                    onChange: ({ value }) =>
                                        !value || value.length === 0
                                            ? t('ui.validation.required', {
                                                  attribute: t('ui.books.fields.genre').toLowerCase(),
                                              })
                                            : undefined,
                                }}
                            >
                                {(field) => (
                                    <div className="space-y-4">
                                        <Label htmlFor={field.name} className="mb-1 flex items-center gap-1">
                                            {t('ui.books.fields.genre')}
                                        </Label>
                                       <MultiSelect
                                            id={field.name}
                                            value={genreValue}
                                            options={genres.map((genre) => ({
                                                label: t(`ui.books.genres.${genre}`),
                                                value: genre,
                                            }))}
                                            onValueChange={setGenreValue}
                                            placeholder={t('ui.books.placeholders.selectGenre')}
                                            variant="inverted"
                                        />

                                        <FieldInfo field={field} />
                                    </div>
                                )}
                            </form.Field>
                        </div>

                        {/* Editorial field */}
                        <div>
                            <form.Field
                                name="editorial"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.editorial').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.editorial')}</div>
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="text"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.books.placeholders.editorial')}
                                            disabled={form.state.isSubmitting}
                                            required
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </TabsContent>
                    <TabsContent value="locationForm">
                        {/* Floor_number field */}
                        <div>
                            <form.Field
                                name="floor_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.floor').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.floor')}</div>
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
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.zone').toLowerCase() })
                                            : undefined;
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
                                            value={field.state.value ?? ''}
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

                        {/* Bookcases field*/}
                        <div>
                            <form.Field
                                name="bookcase_id"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return !value
                                            ? t('ui.validation.required', { attribute: t('ui.books.fields.bookcase').toLowerCase() })
                                            : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mt-6 mb-3 flex items-center gap-1">{t('ui.books.fields.bookcase')}</div>
                                        </Label>
                                        <Select
                                            required={true}
                                            value={field.state.value ?? ''}
                                            onValueChange={(value) => {
                                                field.handleChange(value);
                                                setSelectedBookcase(value);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('ui.zones.placeholders.selectZone')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredBookcases?.map((bookcase) => (
                                                    <SelectItem key={bookcase.id} value={bookcase.id}>
                                                        {bookcase.bookcase_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                    </TabsContent>
                </div>

                <Separator className="mt-3" />
                {/* Form buttons */}
                <div className="mt-3 mt-4 flex justify-between sm:gap-2 md:gap-10">
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
            </Tabs>
        </form>
    );
}
