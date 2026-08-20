import type { NavItem } from "@/types/config";

export const navigationConfig: {
  primary: NavItem[];
  footer: NavItem[];
  legal: NavItem[];
} = {
  primary: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Solutions", href: "/solutions" },
    // Removed: Technologies and Resources are no longer primary navigation
    { label: "Company", href: "/company" },
    { label: "Contact", href: "/contact" },
  ],
  footer: [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
    { label: "Security", href: "/security" },
  ],
};
