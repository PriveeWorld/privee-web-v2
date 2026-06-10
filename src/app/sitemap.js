import { getClient } from '../lib/sanity/client';

export default async function sitemap() {
  const baseUrl = 'https://www.privee.world';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/discover`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/arena`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/cinema`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privee-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/priveehub`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/support`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/newsroom`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/child-safety-standards`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  let blogRoutes = [];
  try {
    const client = getClient();
    const posts = await client.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/newsroom/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch (error) {
    // Sitemap still works with static routes if Sanity is unavailable
  }

  return [...staticRoutes, ...blogRoutes];
}
