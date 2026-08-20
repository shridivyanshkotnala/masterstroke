/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kotnalaconsulting.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: false,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  autoLastmod: true,
  exclude: ["/api/*", "/admin/*"],
};
