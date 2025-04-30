import { useState } from 'react'; // Importar useState
import HeadingSmall from '@/components/heading-small';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@/components/ui/timeline';
import { useTranslations } from '@/hooks/use-translations';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookUp } from 'lucide-react';
import * as React from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface profileProps {
    users: { id: string; name: string; email: string }[];
    loans: {
        id: string;
        start_loan: Date;
        end_loan: Date;
        due_date: Date;
        active: boolean;
        user_id: string;
        book_id: string;
        book: {
            title: string;
            author: string;
        };
    }[];
}

export default function Profile({ users, loans }: profileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];

    // Estado para el usuario seleccionado
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

    // Función para manejar el cambio del usuario seleccionado
    const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const dateValue = new Date(event.target.value); // convierte el string a Date
        setSelectedDate(dateValue);
    };

    // Obtener los préstamos de un usuario
    const getDateLoans = (startLoan: Date | undefined) => {
        if (startLoan === null) return []; // Si no se ha seleccionado un usuario, no mostrar préstamos
        return loans.filter((loan) => loan.start_loan === startLoan);
    };

    const filteredLoans = selectedDate
    ? loans.filter((loan) => loan.start_loan === selectedDate) // Filtrar usuarios por el seleccionado
    : loans;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title={t('ui.settings.statistics')} description={t('')} />

                    {/* Dropdown para seleccionar un usuario */}
                    {/* <div className="mb-4">
                        <label htmlFor="dateSelect" className="block text-sm font-medium text-gray-700">
                            {t('ui.settings.profile.select_user')}
                        </label>
                        <select
                            id="dateSelect"
                            value={selectedDate || ''}
                            onChange={handleDateSelect}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                            <option value="">{t('ui.settings.profile.select_user_default')}</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn('w-[240px] justify-start text-left font-normal', !selectedDate && 'text-muted-foreground')}
                            >
                                <CalendarIcon />
                                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                    </Popover>

                    {/* Mostrar préstamos solo para el usuario seleccionado */}
                    {filteredLoans.map((loan) => {
                        const userLoans = getDateLoans(loan.start_loan); // Obtener los préstamos de este usuario

                        return (
                            <div key={loan.id}>
                                {/* <h2>{users.name}</h2> Nombre del usuario */}
                                <Timeline position="alternate">
                                    {userLoans.map((loan) => (
                                        <TimelineItem key={loan.id}>
                                            <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
                                                {new Date(loan.start_loan).toLocaleDateString()}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineConnector />
                                                <TimelineDot color="primary">
                                                    <BookUp />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                                {t('ui.settings.profile.start_loan')}
                                                {loan.book.title} - {new Date(loan.end_loan).toLocaleDateString()}
                                            </TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        );
                    })}
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
