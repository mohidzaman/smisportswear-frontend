export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/dashboard/',
          '/api/',
          '/login/',
        ],
      },
    ],
    sitemap: 'https://smisportswears.site/sitemap.xml',
  };
}
