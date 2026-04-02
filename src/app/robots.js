export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-blog', '/api/', '/embed'],
      },
    ],
    sitemap: 'https://www.privee.world/sitemap.xml',
  };
}
