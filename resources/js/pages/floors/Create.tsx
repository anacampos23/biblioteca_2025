import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { Building2  } from 'lucide-react';
import { number } from 'zod';

interface FloorFormProps {
    initialData?: {
        id: string;
        name: string;
        category_zones: number;
    };
    page?: string;
    perPage?: string;
}

export default function CreateFloor({initialData, page, perPage}: FloorFormProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.cards.title')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <Building2  color="#2762c2" />
                                {t('ui.floors.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm/>
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
