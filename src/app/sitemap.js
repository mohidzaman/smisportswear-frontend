export default async function sitemap() {
  const baseUrl = 'https://smisportswears.site';

  const routes = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.9, changefreq: 'weekly' },
    { url: '/products', priority: 0.9, changefreq: 'daily' },
    { url: '/manufacturing', priority: 0.9, changefreq: 'weekly' },
    { url: '/customization', priority: 0.9, changefreq: 'weekly' },
    { url: '/how-to-order', priority: 0.9, changefreq: 'weekly' },
    { url: '/gallery', priority: 0.9, changefreq: 'daily' },
    { url: '/contact', priority: 0.9, changefreq: 'weekly' },
    
    // Service Pages
    { url: '/custom-sportswear', priority: 0.9, changefreq: 'weekly' },
    { url: '/football-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/basketball-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/volleyball-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/cricket-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/rugby-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/baseball-uniforms', priority: 0.9, changefreq: 'weekly' },
    { url: '/training-wear', priority: 0.9, changefreq: 'weekly' },
    { url: '/teamwear', priority: 0.9, changefreq: 'weekly' },
    { url: '/private-label-sportswear', priority: 0.9, changefreq: 'weekly' },
    { url: '/oem-sportswear', priority: 0.9, changefreq: 'weekly' },
    { url: '/manufacturing-process', priority: 0.9, changefreq: 'weekly' }
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}
