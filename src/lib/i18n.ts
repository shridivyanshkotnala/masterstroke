import { siteConfig } from "@/config/site.config";

export const isSupportedLocale = (locale: string): boolean =>
  siteConfig.locales.includes(locale as (typeof siteConfig.locales)[number]);

export const localizePath = (path: string, locale: string = siteConfig.defaultLocale): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === siteConfig.defaultLocale) {
    return normalizedPath;
  }

  return `/${locale}${normalizedPath}`;
};
