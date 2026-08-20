export type IndustriesMegaMenuCategory = {
  slug: string;
  title: string;
  description: string;
  featuredIcon: string;
  links: Array<{ label: string; href: string }>;
};

export const industriesMegaMenuData: IndustriesMegaMenuCategory[] = [
  {
    slug: "business-finance",
    title: "Business & Finance",
    description: "Financial systems, insurance and government digital services.",
    featuredIcon: "Globe",
    links: [
      { label: "Finance", href: "/industries/finance" },
      { label: "Insurance", href: "/industries/insurance" },
      { label: "Legal", href: "/industries/legal" },
      { label: "Government", href: "/industries/government" },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial",
    description: "Retail, hospitality, and real-estate digital platforms.",
    featuredIcon: "BriefcaseBusiness",
    links: [
      { label: "Retail", href: "/industries/retail" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Construction", href: "/industries/construction" },
    ],
  },
  {
    slug: "industrial",
    title: "Industrial",
    description: "Manufacturing, automotive and logistics technology.",
    featuredIcon: "Cog",
    links: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Automotive", href: "/industries/automotive" },
      { label: "Logistics", href: "/industries/logistics" },
    ],
  },
  {
    slug: "public-social",
    title: "Public & Social",
    description: "Healthcare, education and civic technology platforms.",
    featuredIcon: "Heart",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
    ],
  },
];
