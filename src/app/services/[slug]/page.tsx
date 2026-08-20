import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceLandingPage } from "@/components/sections/service-page-sections";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllServices, getRelatedServices, getServiceBySlug } from "@/content/services";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema } from "@/seo/schemas";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return generateSEOMetadata({
      title: "Service Not Found",
      description: "The requested service page could not be found.",
      canonical: canonicalFromPath("/services"),
      noIndex: true,
    });
  }

  return generateSEOMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    canonical: canonicalFromPath(`/services/${service.slug}`),
    keywords: [...service.keywords.primary, ...service.keywords.secondary, ...service.keywords.semantic],
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getRelatedServices(service.slug, 6);
  const canonicalUrl = canonicalFromPath(`/services/${service.slug}`);

  return (
    <main id="main-content" className="flex-1">
      <JsonLd
        id={`${service.slug}-breadcrumb-schema`}
        data={buildBreadcrumbSchema([
          { name: "Home", item: canonicalFromPath("/") },
          { name: "Services", item: canonicalFromPath("/services") },
          { name: service.title, item: canonicalUrl },
        ])}
      />

      <JsonLd
        id={`${service.slug}-service-schema`}
        data={buildServiceSchema({
          name: service.title,
          description: service.summary,
          serviceType: service.categoryTitle,
          url: canonicalUrl,
        })}
      />

      <JsonLd
        id={`${service.slug}-faq-schema`}
        data={buildFaqSchema(service.faq.map((item) => ({ question: item.question, answer: item.answer })))}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <ServiceLandingPage service={service} relatedServices={relatedServices} />
    </main>
  );
}
