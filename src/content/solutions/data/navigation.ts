export type SolutionsMegaMenuCategory = {
  slug: string;
  title: string;
  description: string;
  featuredIcon: string;
  links: Array<{ label: string; href: string }>;
};

export const solutionsMegaMenuData: SolutionsMegaMenuCategory[] = [
  {
    slug: "business-systems",
    title: "Business Systems",
    description: "ERP, CRM, HRMS and core finance platforms.",
    featuredIcon: "Layers",
    links: [
      { label: "ERP Solutions", href: "/solutions/erp" },
      { label: "CRM Solutions", href: "/solutions/crm" },
      { label: "HRMS", href: "/solutions/hrms" },
      { label: "Accounting", href: "/solutions/accounting" },
    ],
  },
  {
    slug: "commerce",
    title: "Commerce",
    description: "Ecommerce, POS, marketplaces and booking platforms.",
    featuredIcon: "ShoppingCart",
    links: [
      { label: "Ecommerce Platforms", href: "/solutions/ecommerce-platforms" },
      { label: "POS Systems", href: "/solutions/pos-systems" },
      { label: "Marketplace Platforms", href: "/solutions/marketplace-platforms" },
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    description: "Business analytics, assistants, and knowledge systems.",
    featuredIcon: "Bot",
    links: [
      { label: "AI Assistant", href: "/solutions/ai-assistant" },
      { label: "Voice Assistant", href: "/solutions/voice-assistant" },
      { label: "Knowledge Management", href: "/solutions/knowledge-management-system" },
      { label: "Business Analytics", href: "/solutions/business-analytics" },
    ],
  },
];
