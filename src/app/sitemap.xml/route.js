export async function GET() {
  const baseUrl = 'https://smisportswears.site';

  const staticRoutes = [
    { url: '', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.8, changefreq: 'monthly' },
    { url: '/products', priority: 0.9, changefreq: 'daily' },
    { url: '/categories', priority: 0.8, changefreq: 'weekly' },
    { url: '/gallery', priority: 0.8, changefreq: 'weekly' },
    { url: '/blog', priority: 0.9, changefreq: 'weekly' },
    { url: '/privacy-policy', priority: 0.5, changefreq: 'yearly' },
    { url: '/terms', priority: 0.5, changefreq: 'yearly' },
    { url: '/manufacturing', priority: 0.8, changefreq: 'monthly' },
    { url: '/customization', priority: 0.8, changefreq: 'monthly' },
    { url: '/how-to-order', priority: 0.8, changefreq: 'monthly' },
    // Service Pages
    { url: '/custom-sportswear', priority: 0.8, changefreq: 'monthly' },
    { url: '/football-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/basketball-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/volleyball-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/cricket-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/rugby-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/baseball-uniforms', priority: 0.8, changefreq: 'monthly' },
    { url: '/training-wear', priority: 0.8, changefreq: 'monthly' },
    { url: '/teamwear', priority: 0.8, changefreq: 'monthly' },
    { url: '/private-label-sportswear', priority: 0.8, changefreq: 'monthly' },
    { url: '/oem-sportswear', priority: 0.8, changefreq: 'monthly' },
    { url: '/manufacturing-process', priority: 0.8, changefreq: 'monthly' }
  ];

  let dynamicUrls = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const productsRes = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (productsRes.ok) {
      const products = await productsRes.json();
      const productUrls = products.map((product) => ({
        url: `/products/${product._id}`, // Assuming _id is used
        lastModified: product.updatedAt || product.createdAt || new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      }));
      dynamicUrls.push(...productUrls);
    }
  } catch (error) {
    console.error('Error fetching dynamic sitemap URLs:', error);
  }

  const allUrls = [...staticRoutes, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified || new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemapXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  });
}
