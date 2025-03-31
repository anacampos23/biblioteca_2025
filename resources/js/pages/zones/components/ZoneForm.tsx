
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
        description: string;
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

export function ZoneForm({ initialData, page, perPage }: ZoneFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            name: initialData?.name ?? '',
            description: initialData?.description ?? '',
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
                                        {t('ui.zones.fields.name')}
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
                {/* Name field */}
                <div>
                    <form.Field
                        name="description"
                        validators={{
                            onChangeAsync: async ({ value }) => {
                                await new Promise((resolve) => setTimeout(resolve, 500));
                                return !value
                                    ? t('ui.validation.required', { attribute: t('ui.zones.fields.description.name').toLowerCase() })
                                    : value.length < 2
                                        ? t('ui.validation.min.string', { attribute: t('ui.zones.fields.description.name').toLowerCase(), min: '2' })
                                        : undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <>
                                <Label htmlFor={field.name}>
                                    <div className="mb-1 flex items-center gap-1 mt-5">
                                        {t('ui.zones.fields.description.title')}
                                    </div>
                                </Label>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    placeholder={t('ui.zones.placeholders.description')}
                                    disabled={form.state.isSubmitting}
                                    required={false}
                                    autoComplete="off"
                                />
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
