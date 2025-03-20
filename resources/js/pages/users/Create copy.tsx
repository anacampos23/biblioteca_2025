import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox";
import { User, Shield } from 'lucide-react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

        <Tabs defaultValue="account" >
          <TabsList className="flex justify-center w-full"> 
            <TabsTrigger value="account">{t("ui.common.basic")}</TabsTrigger>
            <TabsTrigger value="password">{t("ui.common.roles")}</TabsTrigger>
          </TabsList>

          <Separator className="mt-0" />

          <TabsContent value="account">
      
            <UserForm /> 

          </TabsContent>
          <TabsContent value="password">
          {/* Roles y permisos */}
          <div>
            <div className="text-s font-bold mt-2 text-gray-700 flex items-center">
              <Shield  className="h-4 w-4 mr-2 my-2" />{t("ui.users.roles_permissions.role_title")}</div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("ui.users.roles_permissions.roles_selector")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("ui.users.roles_permissions.user")}</SelectItem>
                <SelectItem value="dark">{t("ui.users.roles_permissions.admin")}</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm mt-2 text-gray-700">{t("ui.users.roles_permissions.roles_footer")}</div>
            <Separator className="my-4 w-full" /> {/* Línea de separación*/}

            {/* Checkbox */}
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
                </p>
                </div>
            </div>

          </div>  
          </TabsContent>
        </Tabs>
          
        </div>
      </div>
    </UserLayout>
  );
}
