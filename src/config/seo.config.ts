export const seoConfig = {
  defaultTitle: "Kotnala Consultancy",
  titleTemplate: "%s | Kotnala Consultancy",
  defaultDescription:
    "Kotnala Consultancy architects scalable, secure, and search-first digital foundations.",
  twitterHandle: "@kotnalaconsulting",
  category: "technology",
  locale: "en_US",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
} as const;
