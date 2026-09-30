const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const desktopRoot = path.join(__dirname, '..');
const scratchRoot = 'C:\\Users\\pc\\.gemini\\antigravity\\scratch\\ambica-engineers';

const images = JSON.parse(fs.readFileSync(path.join(__dirname, 'all_scraped_images.json'), 'utf8'));

// Determine target directory and filename for each image
function categorize(img, index) {
  const pages = img.pages || [];
  const alt = (img.alt || '').toLowerCase().trim();
  const rawUrl = img.rawUrl;
  const extMatch = rawUrl.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';

  let category = 'general';
  if (pages.some(p => p.includes('blank-38') || p.includes('blank-18') || p.includes('blank-19') || p.includes('blank-17') || p.includes('projects'))) {
    category = 'events';
  } else if (pages.some(p => p.includes('blank-24') || p.includes('ceramic-flower-vase'))) {
    category = 'cushion_pads';
  } else if (pages.some(p => p.includes('about-us'))) {
    category = 'about';
  } else if (pages.some(p => p.includes('blank-10') || p.includes('blank-12') || p.includes('blank-14') || p.includes('hydrualics-valves') || p.includes('blank-23'))) {
    category = 'valves';
  } else if (pages.some(p => p.includes('/blank') || p.includes('blank-36') || p.includes('blank-37') || p.includes('blank-9') || p.includes('blank-13') || p.includes('blank-15') || p.includes('blank-21') || p.includes('hydraulic-pump'))) {
    category = 'pumps';
  } else if (pages.some(p => p.includes('blank-22') || p.includes('blank-33') || p.includes('blank-28') || p.includes('hydraulic-motor'))) {
    category = 'motors';
  } else if (pages.some(p => p === 'https://www.ambicaengineers.in/' || p === 'https://www.ambicaengineers.in')) {
    category = 'home';
  }

  // Generate safe filename
  let baseName = '';
  if (alt && !alt.includes('chatgpt') && !alt.includes('capture') && !alt.includes('untitled') && !alt.includes('apiz51')) {
    baseName = alt
      .replace(/\.[a-z0-9]+$/i, '')
      .replace(/[^a-z0-9]+/gi, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase();
  }

  const hash = rawUrl.substring(rawUrl.lastIndexOf('/') + 1).replace(/[^a-z0-9]/gi, '_').substring(0, 16);
  if (!baseName || baseName.length < 3) {
    baseName = `${category}_${hash}_${index + 1}`;
  } else {
    baseName = `${baseName}_${index + 1}`;
  }

  const filename = `${baseName}.${ext}`;
  const relPath = `images/live/${category}/${filename}`;

  return { category, filename, relPath };
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const req = https.get(url, { headers: { 'User-Agent': 'AmbicaLiveMigration/1.0 (contact@ambicaengineers.in)' }, timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        resolve({ success: false, status: res.statusCode, size: 0 });
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(destPath, buf);
        resolve({ success: true, status: res.statusCode, size: buf.length, buf });
      });
    });
    req.on('error', err => resolve({ success: false, error: err.message, size: 0 }));
  });
}

async function main() {
  console.log(`Starting download of ${images.length} assets...`);
  const manifest = [];
  const concurrency = 6;
  let active = 0;
  let completed = 0;
  let failed = 0;

  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    const { category, filename, relPath } = categorize(item, i);
    const destDesktop = path.join(desktopRoot, 'public', relPath);
    const destScratch = path.join(scratchRoot, 'public', relPath);

    item.localPath = '/' + relPath.replace(/\\/g, '/');
    item.category = category;
    item.savedFilename = filename;

    // Concurrency queue
    while (active >= concurrency) {
      await new Promise(r => setTimeout(r, 50));
    }

    active++;
    downloadImage(item.rawUrl, destDesktop).then(result => {
      active--;
      completed++;
      if (result.success) {
        // Also copy to scratch
        const scratchDir = path.dirname(destScratch);
        if (!fs.existsSync(scratchDir)) {
          fs.mkdirSync(scratchDir, { recursive: true });
        }
        if (result.buf) {
          fs.writeFileSync(destScratch, result.buf);
        }
        item.sizeBytes = result.size;
        console.log(`[${completed}/${images.length}] OK: ${relPath} (${Math.round(result.size / 1024)} KB)`);
      } else {
        failed++;
        console.warn(`[${completed}/${images.length}] FAILED: ${item.rawUrl} (${result.status || result.error})`);
      }
    });

    manifest.push(item);
  }

  // Wait for all to finish
  while (active > 0) {
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\nALL DOWNLOADS FINISHED!`);
  console.log(`- Success: ${completed - failed}`);
  console.log(`- Failed: ${failed}`);

  // Save manifests
  const manifestDestDesktop = path.join(desktopRoot, 'public', 'images', 'live_images_manifest.json');
  const manifestDestScratch = path.join(scratchRoot, 'public', 'images', 'live_images_manifest.json');
  fs.writeFileSync(manifestDestDesktop, JSON.stringify(manifest, null, 2));
  fs.writeFileSync(manifestDestScratch, JSON.stringify(manifest, null, 2));
  console.log(`Saved live_images_manifest.json with ${manifest.length} records.`);
}

main();
