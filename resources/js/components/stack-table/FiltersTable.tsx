import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import { useTranslations } from '@/hooks/use-translations';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { enUS, es } from 'date-fns/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar localización española
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Para soporte de formatos como "PPP"
import { CalendarIcon, FilterIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Configurar dayjs
dayjs.extend(localizedFormat);
dayjs.locale('es'); // Establecer español como idioma predeterminado

/**
 * Tipos de filtros disponibles
 */
export type FilterType = 'text' | 'select' | 'date' | 'dateRange' | 'number';

/**
 * Opciones para un filtro de tipo select
 */
export interface SelectOption {
    label: string;
    value: string;
}

/**
 * Configuración base para todos los filtros
 */
export interface BaseFilterConfig {
    /** Identificador único del filtro */
    id: string;
    /** Etiqueta para mostrar */
    label: string;
    /** Tipo de filtro */
    type: FilterType;
    /** Valor predeterminado */
    defaultValue?: any;
    /** Placeholder */
    placeholder?: string;
}

/**
 * Configuración para filtro de texto
 */
export interface TextFilterConfig extends BaseFilterConfig {
    type: 'text';
    defaultValue?: string;
}

/**
 * Configuración para filtro de selección
 */
export interface SelectFilterConfig extends BaseFilterConfig {
    type: 'select';
    options: SelectOption[];
    defaultValue?: string;
}

/**
 * Configuración para filtro de fecha
 */
export interface DateFilterConfig extends BaseFilterConfig {
    type: 'date';
    defaultValue?: Date;
    min?: Date;
    max?: Date;
}

/**
 * Configuración para filtro de rango de fechas
 */
export interface DateRangeFilterConfig extends BaseFilterConfig {
    type: 'dateRange';
    defaultValue?: { from: Date; to: Date };
    min?: Date;
    max?: Date;
}

/**
 * Configuración para filtro numérico
 */
export interface NumberFilterConfig extends BaseFilterConfig {
    type: 'number';
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * Unión de todos los tipos de configuración de filtros
 */
export type FilterConfig = TextFilterConfig | SelectFilterConfig | DateFilterConfig | DateRangeFilterConfig | NumberFilterConfig;

/**
 * Props para el componente FiltersTable
 */
export interface FiltersTableProps {
    /** Configuración de filtros */
    filters: FilterConfig[];
    /** Callback para cuando cambian los filtros */
    onFilterChange: (filters: Record<string, any>) => void;
    /** Valores iniciales */
    initialValues?: Record<string, any>;
    /** Debounce en ms para filtros de texto (por defecto 300ms) */
    debounce?: number;
    /** Título para el popover de filtros en móvil */
    filtersTitle?: string;
    /** Texto para el botón de filtros */
    filtersButtonText?: string;
    /** Texto para el botón de limpiar filtros */
    clearFiltersText?: string;
    /**Lenguaje */
    lang?: string;
}

const langMap = {
    en: enUS,
    es: es,
};

/**
 * Componente para filtrar datos de una tabla
 */
export function FiltersTable({
    filters,
    onFilterChange,
    initialValues = {},
    debounce = 300,
    filtersTitle,
    filtersButtonText,
    clearFiltersText,
    lang,
}: FiltersTableProps) {
    const { t } = useTranslations();
    const [open, setOpen] = useState(false);
    const [filterValues, setFilterValues] = useState<Record<string, any>>(initialValues || {});
    const debouncedFilterValues = useDebounce(filterValues, debounce);

    // Crear un esquema de validación a partir de los filtros
    const formSchema = z.object(
        filters.reduce(
            (acc, filter) => {
                switch (filter.type) {
                    case 'text':
                        acc[filter.id] = z.string().optional();
                        break;
                    case 'select':
                        acc[filter.id] = z.string().optional();
                        break;
                    case 'date':
                        acc[filter.id] = z.date().optional();
                        break;
                    case 'dateRange':
                        acc[filter.id] = z
                            .object({
                                from: z.date().optional(),
                                to: z.date().optional(),
                            })
                            .optional();
                        break;
                    case 'number':
                        acc[filter.id] = z.number().optional();
                        break;
                }
                return acc;
            },
            {} as Record<string, any>,
        ),
    );

    // Configurar el formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    // Actualizar los filtros cuando cambian los valores del formulario
    useEffect(() => {
        onFilterChange(debouncedFilterValues);
    }, [debouncedFilterValues, onFilterChange]);

    // Manejar cambios en los filtros
    const handleFilterChange = (id: string, value: any) => {
        setFilterValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Limpiar todos los filtros
    const handleClearFilters = () => {
        const emptyValues = filters.reduce(
            (acc, filter) => {
                acc[filter.id] = undefined;
                return acc;
            },
            {} as Record<string, any>,
        );

        setFilterValues(emptyValues);
        form.reset(emptyValues);
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = Object.values(filterValues).some((value) => value !== undefined && value !== '' && value !== null);

    return (
        <div className="w-full">
            <div className="hidden flex-wrap items-end gap-4 md:flex">
                <Form {...form}>
                    <div className="flex flex-wrap gap-4">
                        {filters.map((filter) => (
                            <FormField
                                key={filter.id}
                                control={form.control}
                                name={filter.id}
                                render={({ field }) => (
                                    <FormItem className="min-w-[200px] flex-1">
                                        <FormLabel>{filter.label}</FormLabel>
                                        <FormControl>
                                            {renderFilterInput(filter, field, lang, (value) => handleFilterChange(filter.id, value))}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                </Form>

                {hasActiveFilters && (
                    <Button variant="ghost" className="h-9 px-2 lg:px-3" onClick={handleClearFilters}>
                        <XIcon className="mr-2 h-4 w-4" />
                        {clearFiltersText || t('ui.common.filters.clear')}
                    </Button>
                )}
            </div>

            <div className="md:hidden">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <FilterIcon className="mr-2 h-4 w-4" />
                            {filtersButtonText || t('ui.common.filters.title')}
                            {hasActiveFilters && (
                                <span className="bg-primary ml-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                                    {Object.values(filterValues).filter((value) => value !== undefined && value !== '' && value !== null).length}
                                </span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="space-y-4">
                            <h4 className="font-medium">{filtersTitle || t('ui.common.filters.title')}</h4>
                            <Form {...form}>
                                <div className="space-y-4">
                                    {filters.map((filter) => (
                                        <FormField
                                            key={filter.id}
                                            control={form.control}
                                            name={filter.id}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{filter.label}</FormLabel>
                                                    <FormControl>
                                                        {renderFilterInput(filter, field, lang, (value) => handleFilterChange(filter.id, value))}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </Form>
                            <div className="flex justify-end gap-2">
                                {hasActiveFilters && (
                                    <Button variant="outline" size="sm" onClick={handleClearFilters}>
                                        {clearFiltersText || t('ui.common.filters.clear')}
                                    </Button>
                                )}
                                <Button size="sm" onClick={() => setOpen(false)}>
                                    {t('ui.common.buttons.close')}
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
const today = new Date();

/**
 * Función auxiliar para renderizar el input correcto según el tipo de filtro
 */
function renderFilterInput(filter: FilterConfig, field: any, lang: string, onChange: (value: any) => void) {
    switch (filter.type) {
        case 'text':
            return (
                <Input
                    placeholder={filter.placeholder}
                    value={field.value || ''}
                    onChange={(e) => {
                        field.onChange(e.target.value);
                        onChange(e.target.value || undefined);
                    }}
                />
            );
        case 'select':
            return (
                <Select
                    value={field.value || ''}
                    onValueChange={(value) => {
                        field.onChange(value);
                        onChange(value || undefined);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {(filter as SelectFilterConfig).options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        case 'date':
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? dayjs(field.value).format('LL') : <span>{filter.placeholder || 'Seleccionar fecha'}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            timeZone="Europe/Madrid"
                            mode="single"
                            locale={langMap[lang]}
                            selected={field.value}
                            onSelect={(date: Date | undefined) => {
                                field.onChange(date);
                                onChange(date);
                            }}
                            initialFocus
                            disabled={(date) => date > today}
                        />
                    </PopoverContent>
                </Popover>
            );
        case 'dateRange':
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                'w-full max-w-[200px] justify-start truncate overflow-hidden text-left font-normal text-ellipsis whitespace-nowrap',
                                !field.value && 'text-muted-foreground',
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value?.from && field.value?.to
                                ? `${dayjs(field.value.from).format('L')} - ${dayjs(field.value.to).format('L')}`
                                : filter.placeholder || 'Seleccionar rango de fechas'}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            timeZone="Europe/Madrid"
                            mode="range"
                            locale={langMap[lang]}
                            selected={field.value}
                            onSelect={(range: { from?: Date; to?: Date } | undefined) => {
                                field.onChange(range);
                                onChange(range);
                            }}
                            initialFocus
                            disabled={(date) => date > today}
                        />
                    </PopoverContent>
                </Popover>
            );

        case 'number':
            return (
                <Input
                    type="number"
                    placeholder={filter.placeholder}
                    value={field.value ?? ''}
                    onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        field.onChange(val);
                        onChange(val);
                    }}
                    min={(filter as NumberFilterConfig).min}
                    max={(filter as NumberFilterConfig).max}
                    step={(filter as NumberFilterConfig).step}
                />
            );
        default:
            return null;
    }
}
