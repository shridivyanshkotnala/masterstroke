const defaultKeywords = [
  "technology consulting",
  "platform engineering",
  "next.js consulting",
  "performance optimization",
  "technical seo",
  "enterprise architecture",
  "software modernization",
];

export const resolveKeywords = (keywords?: string[]): string[] => {
  if (!keywords || keywords.length === 0) {
    return defaultKeywords;
  }

  return Array.from(new Set([...defaultKeywords, ...keywords]));
};
