export default async function sitemap() {
  const baseUrl = 'https://smisportswears.site';

  const routes = [
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

  const staticUrls = routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  let dynamicUrls = [];

  try {
    // Fetch products dynamically
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const productsRes = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (productsRes.ok) {
      const products = await productsRes.json();
      const productUrls = products.map((product) => ({
        url: `${baseUrl}/products/${product._id}`, // Assuming _id is used
        lastModified: product.updatedAt || product.createdAt || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
      dynamicUrls.push(...productUrls);
    }

    // Example for fetching blogs (if implemented later)
    /*
    const blogsRes = await fetch(`${apiUrl}/api/blogs`, { cache: 'no-store' });
    if (blogsRes.ok) {
      const blogs = await blogsRes.json();
      const blogUrls = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: blog.updatedAt || blog.createdAt || new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.6,
      }));
      dynamicUrls.push(...blogUrls);
    }
    */
  } catch (error) {
    console.error('Error fetching dynamic sitemap URLs:', error);
  }

  return [...staticUrls, ...dynamicUrls];
}
