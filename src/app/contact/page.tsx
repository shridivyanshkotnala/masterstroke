import type { Metadata } from "next";

import { ContactPageSections } from "@/components/sections/contact-page";
import { generateSEOMetadata } from "@/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Kotnala Consultancy",
  description:
    "Connect with Kotnala Consultancy for enterprise software modernization, AI consulting, and strategic technical leadership.",
});

export default function ContactPage() {
  return <ContactPageSections />;
}
