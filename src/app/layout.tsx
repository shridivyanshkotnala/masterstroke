import type { Metadata, Viewport } from "next";
import { AnalyticsPlaceholders } from "@/analytics/analytics-placeholders";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipNav } from "@/components/layout/skip-nav";
import { CookiePlaceholder } from "@/components/shared/cookie-placeholder";
import { JsonLd } from "@/components/shared/json-ld";
import { siteConfig } from "@/config/site.config";
import { fontVariables } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/seo/schemas";
import "./globals.css";

export const metadata: Metadata = generateSEOMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full bg-grid-subtle font-body text-foreground">
        <AppProviders>
          <SkipNav />
          <JsonLd id="organization-schema" data={buildOrganizationSchema()} />
          <JsonLd id="website-schema" data={buildWebsiteSchema()} />
          <div className="flex min-h-full flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <CookiePlaceholder />
          <AnalyticsPlaceholders />
        </AppProviders>
      </body>
    </html>
  );
}
