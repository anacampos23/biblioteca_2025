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
    users: {name: string; email: string; loans_count: number; reserves_count: number}[];
  }

  const UsersStackedBarChart = ({ users }: stackedBarChartProps) => {
    const chartData = users.map((user) => ({
      name: user.name,
      loans: user.loans_count || 0,
      reserves: user.reserves_count || 0
    }));

     const { t } = useTranslations();

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    angle={-45} // Rotar las etiquetas
                    textAnchor="end" // Alinear el texto al final
                    height={170} // Ajustar la altura para más espacio
                    tick={{ fontSize: 12 }} // Ajustar el tamaño de las letras
                    dy={10} // Ajuste vertical para evitar solapamientos
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="loans" fill="#2563eb" stackId="a" name={t('ui.statistics.loans.legend')} />
                <Bar dataKey="reserves" fill="#f59e0b" stackId="a" name = {t('ui.statistics.reserves.legend')} />
            </BarChart>
        </ResponsiveContainer>
    );
  };

  export default UsersStackedBarChart;
