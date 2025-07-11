import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useTranslations } from '@/hooks/use-translations';

interface simpleBarChartProps {
    books: { ISBN: number; title: string; loans_count: number }[];
    loans: { id: string; start_loan: Date; book_id: string }[];
}

const BooksSimpleBarChart = ({ books }: simpleBarChartProps) => {
    const chartData = books.map((book) => ({
        name: book.title,
        loans: book.loans_count || 0,
    }));

    const { t } = useTranslations();

    return (
        <ScrollArea className="w-96 rounded-md border sm:w-full">
            <div className="min-w-[800px] p-4">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="4 1 2" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={250} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="loans" fill="#2563eb" name={t('ui.statistics.loans.legend')} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default BooksSimpleBarChart;
