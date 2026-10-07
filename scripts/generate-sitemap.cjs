const fs = require('fs');
const path = require('path');

const domain = 'https://www.ambicaengineers.in';
const today = new Date().toISOString().split('T')[0];

// 1. Static Pages
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/solutions/wood-panel', priority: '0.9', changefreq: 'monthly' },
  { path: '/events', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
];

// 2. Read Brands
const brandsFilePath = path.join(__dirname, '../src/infrastructure/data/brands.data.ts');
const brandsContent = fs.readFileSync(brandsFilePath, 'utf8');
const brandRegex = /id:\s*['"]([^'"]+)['"]/g;
const brandIds = [];
let match;
while ((match = brandRegex.exec(brandsContent)) !== null) {
  if (!brandIds.includes(match[1])) {
    brandIds.push(match[1]);
  }
}

// 3. Read Products
const productsFilePath = path.join(__dirname, '../src/infrastructure/data/products.data.ts');
const productsContent = fs.readFileSync(productsFilePath, 'utf8');
const productRegex = /slug:\s*['"]([^'"]+)['"]/g;
const productSlugs = [];
while ((match = productRegex.exec(productsContent)) !== null) {
  if (!productSlugs.includes(match[1])) {
    productSlugs.push(match[1]);
  }
}

console.log(`Found ${brandIds.length} brands and ${productSlugs.length} products.`);

// Build URLs
const urls = [];

// Add Static Routes
staticRoutes.forEach(r => {
  urls.push({
    loc: r.path === '' ? `${domain}/` : `${domain}${r.path}`,
    lastmod: today,
    changefreq: r.changefreq,
    priority: r.priority
  });
});

// Add Brand Routes
brandIds.forEach(id => {
  urls.push({
    loc: `${domain}/brands/${id}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: '0.8'
  });
});

// Add Product Routes
productSlugs.forEach(slug => {
  urls.push({
    loc: `${domain}/products/${slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.8'
  });
});

// XML Content
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${urls.length} URLs.`);

// Also generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

const robotsPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`Successfully generated public/robots.txt pointing to ${domain}/sitemap.xml.`);
