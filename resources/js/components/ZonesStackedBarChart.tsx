import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
  } from 'recharts';

import { useTranslations } from '@/hooks/use-translations';

interface stackedBarChartProps {
    zones_movement: { ISBN: number; zone_id: string; loans_count: number; reserves_count:number; zone_name: string }[];
}

const ZonesStackedBarChart = ({ zones_movement }: stackedBarChartProps) => {
    // Aquí es donde debes llamar a useTranslations
    const { t } = useTranslations();

    const zoneNameMap: Record<string, string> = {
        'Literature': t('ui.zones.list.Literature'),
        'Novel': t('ui.zones.list.Novel'),
        'Science and Technology': t('ui.zones.list.Science and Technology'),
        'Humanities': t('ui.zones.list.Humanities'),
        'Art': t('ui.zones.list.Art'),
        'Lifestyle': t('ui.zones.list.Lifestyle'),
        'Children': t('ui.zones.list.Children'),
        'Young Adult': t('ui.zones.list.Young Adult'),
      };


    const chartData = zones_movement.map((zone) => ({
        name: zoneNameMap[zone.zone_name] || zone.zone_name,
        loans: zone.loans_count || 0,
        reserves: zone.reserves_count || 0
    }));

    return (
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
                <Legend />
                <Bar dataKey="loans" fill="#2563eb" stackId="a" name={t('ui.statistics.loans.legend')} />
                <Bar dataKey="reserves" fill="#f59e0b" stackId="a" name={t('ui.statistics.reserves.legend')} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ZonesStackedBarChart;
