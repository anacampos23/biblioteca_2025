import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { PageProps } from '@inertiajs/core';
import { Building2 } from 'lucide-react';

interface EditZoneProps extends PageProps {
    zone: {
        id: string;
        name: string;
        floor_id: string;
    };
    floors?: { id: string; floor_number: number; capacity_zones: number; }[];
    floor_zone_id:{ floor_id: string; name: string }[];
    page?: string;
    perPage?: string;

}

export default function EditZone({ zone, page, perPage, floors, floor_zone_id }: EditZoneProps) {
    const { t } = useTranslations();
    return (
        <ZoneLayout title={t('ui.zones.edit.name')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-6 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Building2 color="#2762c2" />
                                {t('ui.zones.edit.name')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ZoneForm
                            initialData={zone}
                            page={page}
                            perPage={perPage}
                            floors={floors}
                            floor_zone_id={floor_zone_id}
                        />
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );


}
