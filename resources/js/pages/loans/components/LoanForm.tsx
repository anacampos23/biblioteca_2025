

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
import { includes } from 'lodash';
import { Bolt, Eye, EyeOff, FileText, Lock, Mail, PackageOpen, Save, Shield, Building2, X, Barcode  } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


interface LoanFormProps {
    initialData?: {
        id: string;
        start_loan: string;
        end_loan: string;
        due_date: string;
        active: boolean;
        user_id: string;
        book_id: string;
        name: string;
        email: string;
        title: string;
        author: string;
        ISBN: number;
    };
    books: { id: string; title: string; author:string; ISBN: number; }[];
    booksAvailable: { id: string; title: string; author:string; ISBN: number; }[];
    users: { id: string; name: string; email:string; }[];
    ISBN_available: { id: string; ISBN: number; }[];
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

export function LoanForm({ initialData, page, perPage, users, books, ISBN_available, booksAvailable }: LoanFormProps) {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const url=window.location.href;
    const param = new URLSearchParams(window.location.search);

    const bookId = param.get('book_id');
    const bookISBN = param.get('ISBN');

    const bookISBNs = books.map(book => book.ISBN);
    const booksAvailableISBNs = booksAvailable.map(book => book.ISBN);
    const userEmails = users.map(user => user.email);

    // TanStack Form setup
    const form = useForm({
        defaultValues: {
            book_id: initialData?.book_id ?? bookId ?? '',
            email: initialData?.email ?? '',
            start_loan: initialData?.start_loan ?? '',
            end_loan: initialData?.end_loan ?? '',
            due_date: initialData?.due_date ?? '',
            active: initialData?.active ?? '',
            user_id: initialData?.user_id ?? '',
            name: initialData?.name ?? '',
            title: initialData?.title ?? '',
            author: initialData?.author ?? '',
            ISBN: Number(initialData?.ISBN ?? bookISBN) || 0,
        },

        onSubmit: async ({ value }) => {

            const loanData = {
                ...value,
            };

            console.log('Datos del formulario:', loanData);
            const options = {
                // preserveState:true,
                onSuccess: () => {
                    console.log('Préstamo creado con éxito.');

                    queryClient.invalidateQueries({ queryKey: ['loans'] });

                    // Construct URL with page parameters
                    let url = '/loans';
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
                        toast.error(initialData ? t('messages.loans.error.update') : t('messages.loans.error.create'));
                    }
                },
            };

            // Submit with Inertia
            if (initialData) {
                router.put(`/loans/${initialData.id}`, loanData, options);
            } else {
                router.post('/loans', loanData, options);
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
                {/* Capacity_zones field */}
                    <div>
                        <form.Field
                            name="ISBN"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.loans.fields.ISBN')})
                                        : !bookISBNs.includes(value) ? t('ui.validation.ISBN_not_available', {
                                            attribute: t('ui.books.fields.ISBN').toLowerCase(),
                                          })
                                        // : !booksAvailableISBNs.includes(value) ? t('ui.validation.ISBN_not_available', {
                                        // attribute: t('ui.books.fields.ISBN').toLowerCase(),
                                        // })

                                        :undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        <div className="mb-1 flex items-center gap-1">
                                            <Barcode  color="grey" size={18} />
                                            {t('ui.loans.fields.ISBN')}
                                        </div>
                                    </Label>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type='number'
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


                {/* Email field */}
                    <div className= 'mt-4 mb-6'>
                        <form.Field
                            name="email"
                            validators={{
                                onChangeAsync: async ({ value }) => {
                                    await new Promise((resolve) => setTimeout(resolve, 500));
                                    return !value
                                        ? t('ui.validation.required', { attribute: t('ui.users.fields.email').toLowerCase() })
                                        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                                            ? t('ui.validation.email', { attribute: t('ui.users.fields.email').toLowerCase() })
                                            : !userEmails.includes(value) ? t('ui.validation.email_not_exist', {
                                                attribute: t('ui.users.fields.email').toLowerCase(),
                                              })

                                            :undefined;
                                },
                            }}
                        >
                            {(field) => (
                                <>
                                    <Label htmlFor={field.name}>
                                        <div className="mb-1 flex items-center gap-1">
                                            <Mail color="grey" size={18} />
                                            {t('ui.users.fields.email')}
                                        </div>
                                    </Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        onBlur={field.handleBlur}
                                        placeholder={t('ui.users.placeholders.email')}
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
                            let url = '/loans';
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
                        {t('ui.loans.buttons.cancel')}
                    </Button>

                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <Button type="submit" disabled={!canSubmit}>
                                <Save />
                                {isSubmitting
                                    ? t('ui.loans.buttons.saving')
                                    : initialData
                                      ? t('ui.loans.buttons.update')
                                      : t('ui.loans.buttons.save')}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </div>
        </form>
    );
}
