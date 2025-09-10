import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://littlebowmeadows.ca';

  const routes = [
    '/',
    '/shop',
    '/book',
    '/privacy',
    '/terms',
    '/refunds',
    '/lab',
    '/pickup-schedule',
    '/success',
  ];

  const apps = [
    '/apps/ai-content-writer',
    '/apps/ai-customer-insights',
    '/apps/ai-marketing-assistant',
    '/apps/ai-menu-planner',
    '/apps/ai-wedding-planner',
    '/apps/inventory-manager',
    '/apps/order-tracker',
    '/apps/product-manager',
    '/apps/sales-analytics',
  ];

  const lastModified = new Date();

  return [...routes, ...apps].map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.5,
  }));
}
