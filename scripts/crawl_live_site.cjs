const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', reject);
  });
}

const subSitemaps = [
  'https://www.ambicaengineers.in/pages-sitemap.xml',
  'https://www.ambicaengineers.in/store-products-sitemap.xml',
  'https://www.ambicaengineers.in/store-categories-sitemap.xml',
  'https://www.ambicaengineers.in/dynamic-hydrualics-valves_p_b9d76b18_8352_4224_a6dc_f3a3a59e2387_0_5000-sitemap.xml',
  'https://www.ambicaengineers.in/dynamic-hydraulic-pump_p_ca3e1385_2be6_49bf_a613_c6fe35b9707c_0_5000-sitemap.xml',
  'https://www.ambicaengineers.in/dynamic-items_p_b740ff78_671b_4453_85bc_5888b835e87c_0_5000-sitemap.xml'
];

async function main() {
  const allUrls = new Set();
  const sitemapDetails = {};

  for (const sitemapUrl of subSitemaps) {
    try {
      console.log(`Fetching ${sitemapUrl}...`);
      const res = await fetchUrl(sitemapUrl);
      console.log(`Status: ${res.status}`);
      if (res.status === 200) {
        const locRegex = /<loc>(.*?)<\/loc>/g;
        let m;
        const urls = [];
        while ((m = locRegex.exec(res.data)) !== null) {
          const u = m[1].trim();
          urls.push(u);
          allUrls.add(u);
        }
        console.log(`Found ${urls.length} URLs in ${sitemapUrl}`);
        sitemapDetails[sitemapUrl] = urls;
        
        // Also check for image:loc inside sitemap
        const imgRegex = /<image:loc>(.*?)<\/image:loc>/g;
        let im;
        const images = [];
        while ((im = imgRegex.exec(res.data)) !== null) {
          images.push(im[1].trim());
        }
        if (images.length > 0) {
          console.log(`Found ${images.length} images in sitemap: ${sitemapUrl}`);
        }
      }
    } catch (e) {
      console.error(`Error fetching ${sitemapUrl}: ${e.message}`);
    }
  }

  const list = Array.from(allUrls);
  console.log(`\nTOTAL UNIQUE SITEMAP URLS: ${list.length}`);
  fs.writeFileSync(path.join(__dirname, 'all_live_urls.json'), JSON.stringify(list, null, 2));
  fs.writeFileSync(path.join(__dirname, 'sitemap_breakdown.json'), JSON.stringify(sitemapDetails, null, 2));

  list.forEach((u, idx) => console.log(`${idx + 1}. ${u}`));
}

main();
