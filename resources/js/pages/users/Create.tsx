import { UserForm } from "@/pages/users/components/UserFormUniq";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield } from 'lucide-react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"



export default function CreateUser() {
  const { t } = useTranslations();
  

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="mx-auto my-auto shadow-lg p-6 rounded-md w-9/13">
        <CardHeader>
          <CardTitle className="font-bold flex items-center"><User className="h-5 w-5 mr-2 my-2 text-blue-500" />{t("ui.users.create_new")}</CardTitle>
          {t("ui.users.information")}
        </CardHeader>

        <Separator className="my-4 w-full" /> {/* Línea de separación*/}

        <div>

            <UserForm /> 
        
          
        </div>
      </div>
    </UserLayout>
  );
}
