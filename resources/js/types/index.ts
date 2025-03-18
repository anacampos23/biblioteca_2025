import { LucideIcon } from "lucide-react";

export interface User {
  uuid: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  avatar?: string;
}

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface PageProps {
  translations: {
    ui: Record<string, any>;
    messages: Record<string, any>;
  };
  flash: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
}

export interface SharedData extends PageProps {
    auth: {
        user: User;
    };
}
