import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { get } from "lodash";

export function useTranslations() {
  const { translations } = usePage<PageProps>().props;

  const t = (key: string, replacements: Record<string, string> = {}) => {
    let translation = get(translations, key, key);

    Object.entries(replacements).forEach(([key, value]) => {
      translation = translation.replace(`:${key}`, value);
    });

    return translation;
  };

  return { t };
}
