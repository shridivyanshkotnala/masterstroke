import { siteConfig } from "@/config/site.config";
import { joinUrl } from "@/lib/url";

export const canonicalFromPath = (path: string = "/"): string =>
  joinUrl(siteConfig.siteUrl, path);
