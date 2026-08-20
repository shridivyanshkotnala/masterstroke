type PublicEnvKey =
  | "NEXT_PUBLIC_SITE_URL"
  | "NEXT_PUBLIC_GA_ID"
  | "NEXT_PUBLIC_CLARITY_ID"
  | "NEXT_PUBLIC_LINKEDIN_ID"
  | "NEXT_PUBLIC_META_PIXEL";

type PublicEnv = Record<PublicEnvKey, string | undefined>;

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  NEXT_PUBLIC_LINKEDIN_ID: process.env.NEXT_PUBLIC_LINKEDIN_ID,
  NEXT_PUBLIC_META_PIXEL: process.env.NEXT_PUBLIC_META_PIXEL,
};

export const getPublicEnv = (key: PublicEnvKey): string | undefined => publicEnv[key];
