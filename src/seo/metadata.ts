import type { Metadata } from "next";

import { companyConfig } from "@/config/company.config";
import { siteConfig } from "@/config/site.config";
import { canonicalFromPath } from "@/seo/canonical";
import { seoDefaults } from "@/seo/config";
import { resolveKeywords } from "@/seo/keywords";
import { buildOpenGraph } from "@/seo/og";
import { buildRobots } from "@/seo/robots";
import { buildTwitter } from "@/seo/twitter";
import type { SEOInput } from "@/types/seo";

const resolveTitle = (title?: string): string => {
  if (!title) {
    return seoDefaults.defaultTitle;
  }

  return title;
};

export const generateSEOMetadata = (input: SEOInput = {}): Metadata => {
  const title = resolveTitle(input.title);
  const description = input.description ?? seoDefaults.defaultDescription;
  const canonical = input.canonical ?? canonicalFromPath("/");
  const category = input.category ?? seoDefaults.category;

  const openGraph =
    input.openGraph ??
    buildOpenGraph({
      title,
      description,
      canonical,
    });

  const twitter =
    input.twitter ??
    buildTwitter({
      title,
      description,
    });

  return {
    metadataBase: seoDefaults.metadataBase,
    title: {
      default: seoDefaults.defaultTitle,
      template: seoDefaults.titleTemplate,
    },
    description,
    keywords: resolveKeywords(input.keywords),
    applicationName: siteConfig.name,
    authors:
      input.authors ??
      [
        {
          name: companyConfig.name,
          url: siteConfig.siteUrl,
        },
      ],
    publisher: input.publisher ?? seoDefaults.publisher,
    alternates: input.alternates ?? {
      canonical,
      languages: {
        [siteConfig.defaultLocale]: canonical,
      },
    },
    robots: buildRobots(Boolean(input.noIndex)),
    openGraph,
    twitter,
    icons: input.icons ?? {
      icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicons/favicon.svg", type: "image/svg+xml" }],
    },
    verification: input.verification,
    category,
  };
};
