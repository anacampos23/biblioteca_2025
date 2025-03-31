

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { router } from '@inertiajs/react';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, Building2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FloorFormProps {
    initialData?: {
        id: string;
        floor_number: number;
        capacity_zones: number;
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

export function FloorForm({ initialData, page, perPage }: FloorFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            floor_number: initialData?.floor_number ?? '',
            capacity_zones: initialData?.capacity_zones ?? 0,
        },
        onSubmit: async ({ value }) => {
            const floorData = {
                ...value,
            };

            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Piso creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['floors'] });

                    // Construct URL with page parameters
                    let url = '/floors';
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
                        toast.error(initialData ? t('messages.users.error.update') : t('messages.users.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/floors/${initialData.id}`, floorData, options);
            } else {
                router.post('/floors', floorData, options);
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
                        {/* Floor Number field */}
                        <div className= 'mt-5'>
                            <form.Field
                                name="floor_number"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return value === undefined || value === null 
                                            ? t('ui.validation.required', { attribute: t('ui.floors.fields.capacity_zones.name')})
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                {t('ui.floors.fields.floor_number')}
                                            </div>
                                        </Label>
                                        
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type='number'
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.floors.placeholders.floor_number')}
                                            disabled={form.state.isSubmitting}
                                            required={false}
                                            autoComplete="off"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            </form.Field>
                        </div>
                        {/* Capacity_zones field */}
                        <div className= 'mt-5'>
                            <form.Field
                                name="capacity_zones"
                                validators={{
                                    onChangeAsync: async ({ value }) => {
                                        await new Promise((resolve) => setTimeout(resolve, 500));
                                        return value === undefined || value === null 
                                            ? t('ui.validation.required', { attribute: t('ui.floors.fields.capacity_zones.name')})
                                            : value < 0 || value > 20
                                              ? t('ui.validation.capacity_zones', { attribute: t('ui.floors.fields.capacity_zones') })
                                              : undefined;
                                    },
                                }}
                            >
                                {(field) => (
                                    <>
                                        <Label htmlFor={field.name}>
                                            <div className="mb-1 flex items-center gap-1">
                                                {t('ui.floors.fields.capacity_zones.title')}
                                            </div>
                                        </Label>
                                        
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type='number'
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            onBlur={field.handleBlur}
                                            placeholder={t('ui.floors.placeholders.capacity_zones')}
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
                            let url = '/floors';
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
                        {t('ui.users.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.users.buttons.saving')
                                    : initialData
                                      ? t('ui.users.buttons.update')
                                      : t('ui.users.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
