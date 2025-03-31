import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { FloorLayout } from '@/layouts/floors/FloorLayout';
import { FloorForm } from '@/pages/floors/components/FloorForm';
import { PageProps } from '@inertiajs/core';
import { Building2 } from 'lucide-react';

interface EditFloorProps extends PageProps {
    floor: {
        id: string;
        floor_number: number;
        capacity_zones: number;
    };
    page?: string;
    perPage?: string;

}

export default function EditFloor({ floor, page, perPage }: EditFloorProps) {
    const { t } = useTranslations();

    return (
        <FloorLayout title={t('ui.floors.edit.name')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building2 color="#2762c2" />
                                {t('ui.floors.edit.name')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.floors.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm
                            initialData={floor}
                            page={page}
                            perPage={perPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </FloorLayout>
    );
}
