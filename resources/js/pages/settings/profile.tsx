import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useTranslations } from '@/hooks/use-translations';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineConnector,
    TimelineDot,
    TimelineContent,
} from '@/components/ui/timeline';


interface profileProps {
    users: { id: string; name: string; email:string; }[];
    loans: { id: string; end_loan: Date; due_date:Date; active:boolean; user_id:string; book_id: string; }[];
}




export default function Profile({ users, loans }:profileProps) {
    const { t } = useTranslations();
    const page = usePage<SharedData>();
    const { auth } = page.props;
    console.log(loans);
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('ui.settings.profile.title'),
            href: '/settings/profile',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('ui.settings.profile.title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={t('ui.settings.statistics')}
                        description={t('')}
                    />
                    <Timeline position="alternate">
                          <TimelineItem>
                            <TimelineOppositeContent
                              sx={{ m: 'auto 0' }}
                              align="right"
                              variant="body2"
                              color="text.secondary"
                            >
                              9:30 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineConnector />
                              <TimelineDot>

                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>


                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineOppositeContent
                              sx={{ m: 'auto 0' }}
                              variant="body2"
                              color="text.secondary"
                            >
                              10:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineConnector />
                              <TimelineDot color="primary">

                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>

                                Code

                            Because it&apos;s awesome!
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineConnector />
                              <TimelineDot color="primary" variant="outlined">

                              </TimelineDot>
                              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>

                                Sleep
                              Because you need rest
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                              <TimelineDot color="secondary">

                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                Repeat
                              Because this is the life you love!
                            </TimelineContent>
                          </TimelineItem>
                        </Timeline>


                </div>


            </SettingsLayout>
        </AppLayout>
    );
}
