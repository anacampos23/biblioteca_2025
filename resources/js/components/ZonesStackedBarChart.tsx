import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useTranslations } from '@/hooks/use-translations';
import { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import * as React from "react";

interface stackedBarChartProps {
    zones_movement: { ISBN: number; zone_id: string; loans_count: number; reserves_count: number; zone_name: string }[];
}

const ZonesStackedBarChart = ({ zones_movement }: stackedBarChartProps) => {
    // Aquí es donde debes llamar a useTranslations
    const { t } = useTranslations();

    const zoneNameMap: Record<string, string> = {
        Literature: t('ui.zones.list.Literature'),
        Novel: t('ui.zones.list.Novel'),
        'Science and Technology': t('ui.zones.list.Science and Technology'),
        Humanities: t('ui.zones.list.Humanities'),
        Art: t('ui.zones.list.Art'),
        Lifestyle: t('ui.zones.list.Lifestyle'),
        Children: t('ui.zones.list.Children'),
        'Young Adult': t('ui.zones.list.Young Adult'),
    };

    const chartData = zones_movement.map((zone) => ({
        name: zoneNameMap[zone.zone_name] || zone.zone_name,
        loans: zone.loans_count || 0,
        reserves: zone.reserves_count || 0,
    }));

    const labels = [
        { key: 'loans', color: '#2563eb', name: t('ui.statistics.loans.legend') },
        { key: 'reserves', color: '#f59e0b', name: t('ui.statistics.reserves.legend') },
    ];

    const [barProps, setBarProps] = useState(labels.reduce((acc, { key }) => ({ ...acc, [key]: false }), { hover: null as string | null }));

    const handleLegendMouseEnter = (e: any) => {
        if (!barProps[e.dataKey]) {
            setBarProps({ ...barProps, hover: e.dataKey });
        }
    };

    const handleLegendMouseLeave = () => {
        setBarProps({ ...barProps, hover: null });
    };

    const selectBar = (e: any) => {
        setBarProps({
            ...barProps,
            [e.dataKey]: !barProps[e.dataKey],
            hover: null,
        });
    };

    return (
        <ScrollArea className="w-96 rounded-md border sm:w-full">
            <div className="min-w-[800px] p-4">
                <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis
                    dataKey="name"
                    angle={-45} // Rota las etiquetas
                    textAnchor="end" // Alinea el texto al final
                    height={100} // Ajusta la altura para más espacio
                    tick={{ fontSize: 12 }} // Opcional: puedes ajustar el tamaño de las letras
                    dy={10} // Ajuste vertical para evitar solapamientos
                />
                <YAxis />
                <Tooltip />
                <Legend onClick={selectBar} onMouseOver={handleLegendMouseEnter} onMouseOut={handleLegendMouseLeave} />
                {labels.map((label, index) => (
                    <Bar
                        key={index}
                        dataKey={label.key}
                        fill={label.color}
                        stackId="a"
                        name={label.name}
                        hide={barProps[label.key] === true}
                        fillOpacity={barProps.hover === label.key || barProps.hover === null ? 1 : 0.6}
                    />
                ))}
            </BarChart>
        </ResponsiveContainer>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default ZonesStackedBarChart;
