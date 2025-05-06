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

  interface simpleBarChartProps {
    users: {name: string; email: string; loans_count: number; reserves_count: number}[];
  }

  const UsersSimpleBarChart = ({ users }: simpleBarChartProps) => {
    const chartData = users.map((user) => ({
      name: user.name,
      loans: user.loans_count || 0,
      reserves: user.reserves_count || 0
    }));

     const { t } = useTranslations();

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
                <Bar dataKey="loans" fill="#2563eb" name={t('ui.statistics.loans.legend')} />
                <Bar dataKey="reserves" fill="#f59e0b" name = {t('ui.statistics.reserves.legend')} />
            </BarChart>
        </ResponsiveContainer>
    );
  };

  export default UsersSimpleBarChart;
