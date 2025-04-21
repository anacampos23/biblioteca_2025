import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { PageProps } from '@inertiajs/core';
import { User } from 'lucide-react';
import { LoanForm } from '../loans/components/LoanForm';

interface EditLoanProps extends PageProps {
    loan: {
        id: string;
        start_loan: string;
        end_loan: string;
        due_date: string;
        active: boolean;
        user_id: string;
        book_id: string;
        name: string;
        email: string;
        title: string;
        author: string;
        ISBN: number;
    };
    page?: string;
    perPage?: string;
}

export default function EditLoan({ loan, page, perPage }: EditLoanProps) {
    const { t } = useTranslations();

    return (
        <LoanLayout title={t('ui.loans.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <User color="#2762c2" />
                                {t('ui.loans.cards.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm
                            initialData={loan}
                            page={page}
                            perPage={perPage}
                        />
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}
