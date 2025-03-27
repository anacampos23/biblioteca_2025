import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { UserLayout } from '@/layouts/users/UserLayout';
import { FloorForm } from '@/pages/users/components/FloorForm';
import { User } from 'lucide-react';
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

export default function CreateUser({}: FloorFormProps) {
    const { t } = useTranslations();

    return (
        <UserLayout title={t('ui.users.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <User color="#2762c2" />
                                {t('ui.users.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.users.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <FloorForm/>
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    );
}
