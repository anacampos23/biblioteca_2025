
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon, PlusIcon, TrashIcon, ChevronDown, ChevronUp } from "lucide-react";
import { PageProps } from "@/types";
import { FloorLayout } from "@/layouts/floors/FloorLayaout";

export default function FloorIndex() {
    const { t } = useTranslations();
  
  
    return (
      <FloorLayout title={t('ui.floors.title')}>
          <div className="p-6">
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.floors.title')}</h1>
                        <Link href="/floors/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.floors.buttons.new')}
                            </Button>
                        </Link>
                    </div>
              </div>
          </div>
      </FloorLayout>
    );
  }