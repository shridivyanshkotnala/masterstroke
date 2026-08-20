import { getPublicEnv } from "@/lib/env";

export function AnalyticsPlaceholders() {
  const gaId = getPublicEnv("NEXT_PUBLIC_GA_ID");
  const clarityId = getPublicEnv("NEXT_PUBLIC_CLARITY_ID");
  const linkedInId = getPublicEnv("NEXT_PUBLIC_LINKEDIN_ID");
  const metaPixelId = getPublicEnv("NEXT_PUBLIC_META_PIXEL");

  return (
    <div
      data-analytics-root
      data-ga-id={gaId}
      data-clarity-id={clarityId}
      data-linkedin-id={linkedInId}
      data-meta-pixel-id={metaPixelId}
      aria-hidden="true"
      className="hidden"
    />
  );
}
