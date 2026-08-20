import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllIndustries, getIndustryBySlug, getRelatedIndustries } from "@/content/industries";
import { canonicalFromPath } from "@/seo/canonical";
import { generateSEOMetadata } from "@/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/seo/schemas";
import { IndustryLandingPage } from "@/components/sections/industry-page-sections";

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllIndustries().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return generateSEOMetadata({ title: "Industry Not Found", description: "Requested industry not found.", canonical: canonicalFromPath("/industries"), noIndex: true });
  }

  return generateSEOMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    canonical: canonicalFromPath(`/industries/${industry.slug}`),
    keywords: [...industry.keywords.primary, ...industry.keywords.secondary, ...industry.keywords.semantic],
  });
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const related = getRelatedIndustries(industry.slug, 6);
  const canonicalUrl = canonicalFromPath(`/industries/${industry.slug}`);

  return (
    <main id="main-content" className="flex-1">
      <JsonLd id={`${industry.slug}-breadcrumb`} data={buildBreadcrumbSchema([{ name: "Home", item: canonicalFromPath("/") }, { name: "Industries", item: canonicalFromPath("/industries") }, { name: industry.title, item: canonicalUrl }])} />

      <JsonLd id={`${industry.slug}-faq`} data={buildFaqSchema(industry.faq.map((q) => ({ question: q.question, answer: q.answer })))} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.title }]} />

      <IndustryLandingPage industry={industry} related={related} />
    </main>
  );
}
