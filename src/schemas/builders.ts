import { companyConfig } from "@/config/company.config";
import { siteConfig } from "@/config/site.config";

type SchemaRecord = Record<string, unknown>;

export const buildOrganizationSchema = (): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: companyConfig.name,
  legalName: companyConfig.legalName,
  url: siteConfig.siteUrl,
  email: companyConfig.email,
  telephone: companyConfig.phone,
});

export const buildWebsiteSchema = (): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  inLanguage: siteConfig.defaultLocale,
});

export const buildBreadcrumbSchema = (
  items: Array<{ name: string; item: string }>,
): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.name,
    item: entry.item,
  })),
});

export const buildServiceSchema = (input: {
  name: string;
  description: string;
  serviceType: string;
  url: string;
}): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "Service",
  ...input,
  provider: {
    "@type": "Organization",
    name: companyConfig.name,
  },
});

export const buildArticleSchema = (input: {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  url: string;
}): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: input.headline,
  description: input.description,
  datePublished: input.datePublished,
  dateModified: input.dateModified,
  url: input.url,
  author: {
    "@type": "Person",
    name: input.authorName,
  },
  publisher: {
    "@type": "Organization",
    name: companyConfig.name,
  },
});

export const buildFaqSchema = (
  items: Array<{ question: string; answer: string }>,
): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.answer,
    },
  })),
});

export const buildPersonSchema = (input: {
  name: string;
  jobTitle?: string;
  image?: string;
  sameAs?: string[];
}): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "Person",
  ...input,
});

export const buildLocalBusinessSchema = (input: {
  name: string;
  url: string;
  telephone: string;
  addressCountry: string;
  addressRegion: string;
  addressLocality: string;
}): SchemaRecord => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: input.name,
  url: input.url,
  telephone: input.telephone,
  address: {
    "@type": "PostalAddress",
    addressCountry: input.addressCountry,
    addressRegion: input.addressRegion,
    addressLocality: input.addressLocality,
  },
});
