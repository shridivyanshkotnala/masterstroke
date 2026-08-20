import type { Metadata } from "next";

import { StrategyCallWizard } from "@/components/forms/strategy-call-wizard";
import { generateSEOMetadata } from "@/seo/metadata";

export const metadata: Metadata = generateSEOMetadata({
  title: "Book Strategy Call",
  description:
    "Schedule a premium strategy consultation with Kotnala Consultancy. Google-authenticated booking, timezone-safe scheduling, and instant Google Meet invites.",
});

export default function BookCallPage() {
  return (
    <main id="main-content" className="flex-1">
      <StrategyCallWizard />
    </main>
  );
}
