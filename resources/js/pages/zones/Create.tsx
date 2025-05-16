import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { ZoneLayout } from '@/layouts/zones/ZoneLayout';
import { ZoneForm } from '@/pages/zones/components/ZoneForm';
import { Building2  } from 'lucide-react';
import { number } from 'zod';

interface ZoneFormProps {
    initialData?: {
        id: string;
        name: string;
        floor_id: string;
    };
    floors?: { id: string; floor_number: number; capacity_zones: number; }[];
    floor_zone_id:{ floor_id: string; name: string }[];
    page?: string;
    perPage?: string;
}

export default function CreateZone({initialData, page, perPage, floors, floor_zone_id}: ZoneFormProps) {
    const { t } = useTranslations();

    return (
        <ZoneLayout title={t('ui.zones.cards.title')}>
            <div className="flex w-full justify-center self-center md:w-[70%] lg:w-[50%]">
                <Card className="w-full m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white ">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1 mt-5">
                                <Building2  color="#2762c2" />
                                {t('ui.zones.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.zones.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <ZoneForm
                        floors={floors}
                        floor_zone_id={floor_zone_id}/>
                    </CardContent>
                </Card>
            </div>
        </ZoneLayout>
    );
}
