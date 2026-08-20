import type { ServiceCategorySlug } from "@/content/services/types";

export type ServicesMegaMenuCategory = {
  slug: ServiceCategorySlug;
  title: string;
  description: string;
  featuredIcon: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export const servicesMegaMenuData: ServicesMegaMenuCategory[] = [
  {
    slug: "software-development",
    title: "Software Development",
    description: "Enterprise software systems for scale, resilience, and operational visibility.",
    featuredIcon: "Code2",
    links: [
      { label: "Custom Software Development", href: "/services/custom-software-development" },
      { label: "Enterprise Software Development", href: "/services/enterprise-software-development" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "CRM Development", href: "/services/crm-development" },
      { label: "ERP Development", href: "/services/erp-development" },
      { label: "API Development", href: "/services/api-development" },
      { label: "Legacy Software Modernization", href: "/services/legacy-software-modernization" },
      { label: "Software Consulting", href: "/services/software-consulting" },
    ],
  },
  {
    slug: "ai-development",
    title: "AI Development",
    description: "Practical AI systems for automation, knowledge intelligence, and decision quality.",
    featuredIcon: "Bot",
    links: [
      { label: "AI Consulting", href: "/services/ai-consulting" },
      { label: "AI Agents", href: "/services/ai-agents" },
      { label: "Voice AI Development", href: "/services/voice-ai-development" },
      { label: "Generative AI", href: "/services/generative-ai" },
      { label: "LLM Development", href: "/services/llm-development" },
      { label: "RAG Systems", href: "/services/rag-systems" },
      { label: "OpenAI Integration", href: "/services/openai-integration" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "Business AI Solutions", href: "/services/business-ai-solutions" },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description: "SEO-first and performance-driven web engineering for growth-stage and enterprise teams.",
    featuredIcon: "Globe",
    links: [
      { label: "Next.js Development", href: "/services/nextjs-development" },
      { label: "React Development", href: "/services/react-development" },
      { label: "PHP Development", href: "/services/php-development" },
      { label: "Laravel Development", href: "/services/laravel-development" },
      { label: "WordPress Development", href: "/services/wordpress-development" },
      { label: "Headless CMS Development", href: "/services/headless-cms-development" },
      { label: "Jamstack Development", href: "/services/jamstack-development" },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Development",
    description: "Mobile applications engineered for reliability, speed, and product traction.",
    featuredIcon: "Smartphone",
    links: [
      { label: "React Native Development", href: "/services/react-native-development" },
      { label: "Android App Development", href: "/services/android-app-development" },
      { label: "iOS App Development", href: "/services/ios-app-development" },
      { label: "Cross Platform Development", href: "/services/cross-platform-development" },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Cloud architecture, automation, and reliability practices for production confidence.",
    featuredIcon: "CloudCog",
    links: [
      { label: "AWS Consulting", href: "/services/aws-consulting" },
      { label: "Microsoft Azure", href: "/services/microsoft-azure" },
      { label: "Google Cloud", href: "/services/google-cloud" },
      { label: "DevOps Consulting", href: "/services/devops-consulting" },
      { label: "Docker Services", href: "/services/docker-services" },
      { label: "CI/CD Implementation", href: "/services/cicd-implementation" },
      { label: "Monitoring & Observability", href: "/services/monitoring-observability" },
    ],
  },
  {
    slug: "business-technology-services",
    title: "Business Services",
    description: "Technology leadership and delivery models that support business growth goals.",
    featuredIcon: "BriefcaseBusiness",
    links: [
      { label: "Virtual CTO", href: "/services/virtual-cto" },
      { label: "Dedicated Development Team", href: "/services/dedicated-development-team" },
      { label: "Staff Augmentation", href: "/services/staff-augmentation" },
      { label: "MVP Development", href: "/services/mvp-development" },
      { label: "Product Development", href: "/services/product-development" },
      { label: "Digital Transformation", href: "/services/digital-transformation" },
      { label: "Technology Consulting", href: "/services/technology-consulting" },
    ],
  },
];
