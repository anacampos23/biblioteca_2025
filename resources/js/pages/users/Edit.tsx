import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { User } from 'lucide-react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
}

export default function EditUser({ user, page, perPage }: EditUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.create")}>
    <div className="mx-auto my-auto shadow-lg rounded-md w-9/13 ">
      <CardHeader className="bg-gray-50 py-5">
        <CardTitle className="font-bold flex items-center "><User className="h-5 w-5 mr-2 my-2 text-blue-500" />{t("ui.users.create_new")}</CardTitle>
        {t("ui.users.information")}
      </CardHeader>
      

      <Separator className=" w-full" /> {/* Línea de separación*/}

      <UserForm initialData={user} page={page} perPage={perPage}/>

    </div>
  </UserLayout>
  );
}
