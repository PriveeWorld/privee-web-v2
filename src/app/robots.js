export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-blog', '/api/', '/embed'],
      },
    ],
    sitemap: 'https://privee.world/sitemap.xml',
  };
}
