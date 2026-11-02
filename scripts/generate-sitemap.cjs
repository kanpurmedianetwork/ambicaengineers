const fs = require('fs');
const path = require('path');
const { domain, getCanonicalRoutes } = require('./routes.cjs');

const today = new Date().toISOString().split('T')[0];
const canonicalRoutes = getCanonicalRoutes();

// Build Sitemap XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalRoutes.map(u => `  <url>
    <loc>${u.path === '/' ? `${domain}/` : `${domain}${u.path}`}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`Successfully generated public/sitemap.xml with ${canonicalRoutes.length} canonical URLs.`);

// Build robots.txt
const robotsTxt = `User-agent: *
Allow: /

# Explicit Search & AI Crawler Directives
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

const robotsPath = path.join(__dirname, '../public/robots.txt');
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`Successfully generated public/robots.txt pointing to ${domain}/sitemap.xml.`);
