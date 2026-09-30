const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    }).on('error', (err) => resolve({ status: 500, error: err.message, data: '' }));
  });
}

function cleanHtmlText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function scrapeAll() {
  const urlsPath = path.join(__dirname, 'all_live_urls.json');
  if (!fs.existsSync(urlsPath)) {
    console.error('all_live_urls.json not found!');
    return;
  }
  const urls = JSON.parse(fs.readFileSync(urlsPath, 'utf8'));

  const results = [];
  const allImages = new Map(); // url -> { alt, pages: [] }

  console.log(`Starting scrape of ${urls.length} pages...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Fetching ${url}...`);
    const res = await fetchUrl(url);

    if (res.status !== 200 || !res.data) {
      console.log(`  Failed or status ${res.status}`);
      results.push({ url, status: res.status, error: res.error });
      continue;
    }

    const html = res.data;

    // Title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Meta description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : '';

    // Headings
    const h1s = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || []).map(cleanHtmlText);
    const h2s = (html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).map(cleanHtmlText);
    const h3s = (html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || []).map(cleanHtmlText);

    // Images
    // Wix image patterns: https://static.wixstatic.com/media/...
    const imgMatches = html.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.]+/g) || [];
    const pageImgs = [...new Set(imgMatches)];

    // Tag matching for alt text
    const imgTagRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let tm;
    while ((tm = imgTagRegex.exec(html)) !== null) {
      const tag = tm[0];
      const srcMatch = tag.match(/src=["']([^"']+)["']/i);
      const altMatch = tag.match(/alt=["']([^"']*)["']/i);
      if (srcMatch) {
        const src = srcMatch[1];
        const alt = altMatch ? altMatch[1].trim() : '';
        if (src.includes('wixstatic.com/media/')) {
          const rawMatch = src.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.]+/);
          if (rawMatch) {
            const rawUrl = rawMatch[0];
            if (!allImages.has(rawUrl)) {
              allImages.set(rawUrl, { rawUrl, fullSrc: src, alt, pages: [url] });
            } else {
              const existing = allImages.get(rawUrl);
              if (!existing.alt && alt) existing.alt = alt;
              if (!existing.pages.includes(url)) existing.pages.push(url);
            }
          }
        }
      }
    }

    // Add any images found in raw regex
    pageImgs.forEach(imgUrl => {
      if (!allImages.has(imgUrl)) {
        allImages.set(imgUrl, { rawUrl: imgUrl, fullSrc: imgUrl, alt: '', pages: [url] });
      } else {
        const existing = allImages.get(imgUrl);
        if (!existing.pages.includes(url)) existing.pages.push(url);
      }
    });

    // Body text snippet
    const bodyText = cleanHtmlText(html);

    results.push({
      url,
      status: res.status,
      title,
      description,
      h1s,
      h2s,
      h3s,
      imagesCount: pageImgs.length,
      images: pageImgs,
      contentSnippet: bodyText.substring(0, 1500)
    });
  }

  const imagesArray = Array.from(allImages.values());

  fs.writeFileSync(path.join(__dirname, 'scraped_pages.json'), JSON.stringify(results, null, 2));
  fs.writeFileSync(path.join(__dirname, 'all_scraped_images.json'), JSON.stringify(imagesArray, null, 2));

  console.log(`\nSCRAPING COMPLETE:`);
  console.log(`- Scraped ${results.length} pages.`);
  console.log(`- Discovered ${imagesArray.length} unique Wix media images across the site.`);
}

scrapeAll();
