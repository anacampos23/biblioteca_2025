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
import { useState } from 'react';

interface StackedBarChartProps {
  users: { name: string; email: string; loans_count: number; reserves_count: number }[];
}

const UsersStackedBarChart = ({ users }: StackedBarChartProps) => {
  const { t } = useTranslations();

  const chartData = users.map((user) => ({
    name: user.name,
    loans: user.loans_count || 0,
    reserves: user.reserves_count || 0
  }));

  const labels = [
    { key: 'loans', color: '#2563eb', name: t('ui.statistics.loans.legend') },
    { key: 'reserves', color: '#f59e0b', name: t('ui.statistics.reserves.legend') }
  ];

  const [barProps, setBarProps] = useState(
    labels.reduce(
      (acc, { key }) => ({ ...acc, [key]: false }),
      { hover: null as string | null }
    )
  );

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
      hover: null
    });
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={170}
          tick={{ fontSize: 12 }}
          dy={10}
        />
        <YAxis />
        <Tooltip />
        <Legend
          onClick={selectBar}
          onMouseOver={handleLegendMouseEnter}
          onMouseOut={handleLegendMouseLeave}
        />
        {labels.map((label, index) => (
          <Bar
            key={index}
            dataKey={label.key}
            fill={label.color}
            stackId="a"
            name={label.name}
            hide={barProps[label.key] === true}
            fillOpacity={
              barProps.hover === label.key || barProps.hover === null ? 1 : 0.6
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsersStackedBarChart;
