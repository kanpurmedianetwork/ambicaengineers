const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

function getAllFiles(dir, exts = []) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      res.push(...getAllFiles(full, exts));
    } else if (exts.length === 0 || exts.some(e => item.endsWith(e))) {
      res.push(full);
    }
  }
  return res;
}

console.log('=== COMPREHENSIVE ASSET & TAG AUDIT ===\n');

// 1. Check all files on disk
const publicFiles = new Set(getAllFiles(publicDir).map(f => path.relative(publicDir, f).replace(/\\/g, '/')));
const srcFiles = new Set(getAllFiles(srcDir).map(f => path.relative(srcDir, f).replace(/\\/g, '/')));

console.log(`Public files indexed: ${publicFiles.size}`);
console.log(`Src files indexed: ${srcFiles.size}`);

// 2. Scan all tsx, ts, html, css files
const codeFiles = [path.join(rootDir, 'index.html'), ...getAllFiles(srcDir, ['.tsx', '.ts', '.css', '.html'])];

const imageRefs = [];
const missingImages = [];

for (const file of codeFiles) {
  const relFile = path.relative(rootDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  // Match src="..." poster="..." href="..."
  const attrRegex = /(?:src|poster|href)\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = attrRegex.exec(content)) !== null) {
    const val = match[1];
    if (/\.(png|jpe?g|webp|svg|gif|avif|ico|webm|mp4)(\?.*)?$/i.test(val) || val.startsWith('/images/') || val.startsWith('/videos/')) {
      imageRefs.push({ file: relFile, ref: val });
    }
  }

  // Match url('...')
  const cssUrlRegex = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
  while ((match = cssUrlRegex.exec(content)) !== null) {
    const val = match[1];
    if (!val.startsWith('data:') && !val.startsWith('http')) {
      imageRefs.push({ file: relFile, ref: val });
    }
  }

  // Match imageUrl: "...", logoUrl: "...", bannerUrl: "...", coverImage: "..."
  const dataImgRegex = /(?:imageUrl|logoUrl|bannerUrl|coverImage|image)\s*:\s*["']([^"']+)["']/g;
  while ((match = dataImgRegex.exec(content)) !== null) {
    imageRefs.push({ file: relFile, ref: match[1] });
  }

  // Match array of images ["...", "..."]
  const arrayImgRegex = /images\s*:\s*\[([\s\S]*?)\]/g;
  while ((match = arrayImgRegex.exec(content)) !== null) {
    const inner = match[1];
    const sub = /["']([^"']+)["']/g;
    let subMatch;
    while ((subMatch = sub.exec(inner)) !== null) {
      if (/\.(png|jpe?g|webp|svg|gif|avif|ico)$/i.test(subMatch[1])) {
        imageRefs.push({ file: relFile, ref: subMatch[1] });
      }
    }
  }
}

// Check each reference
for (const item of imageRefs) {
  let val = item.ref.trim();
  if (val.startsWith('http://') || val.startsWith('https://')) {
    if (val.includes('ambicaengineers.in/')) {
      const pubPath = val.split('ambicaengineers.in/')[1].split('?')[0].split('#')[0];
      if (!publicFiles.has(pubPath)) {
        missingImages.push({ ...item, reason: `ambicaengineers.in/${pubPath} not found in public/` });
      }
    }
    continue;
  }
  if (val.startsWith('data:') || val.includes('${')) continue;

  if (val.startsWith('/')) {
    const clean = val.slice(1).split('?')[0].split('#')[0];
    if (!publicFiles.has(clean)) {
      missingImages.push({ ...item, reason: `public/${clean} does not exist` });
    }
  } else if (val.startsWith('.')) {
    const absDir = path.dirname(path.join(rootDir, item.file));
    const resolved = path.resolve(absDir, val.split('?')[0].split('#')[0]);
    if (!fs.existsSync(resolved)) {
      missingImages.push({ ...item, reason: `Relative path ${val} does not exist` });
    }
  }
}

// Deduplicate missing images
const uniqueMissingImages = [];
const seen = new Set();
for (const m of missingImages) {
  const k = `${m.file}:::${m.ref}`;
  if (!seen.has(k)) {
    seen.add(k);
    uniqueMissingImages.push(m);
  }
}

console.log(`\n--- 1. IMAGE AUDIT ---`);
console.log(`Total image/media references found: ${imageRefs.length}`);
console.log(`Missing images in code: ${uniqueMissingImages.length}`);
if (uniqueMissingImages.length > 0) {
  uniqueMissingImages.forEach(m => console.log(`  [MISSING] ${m.ref} in ${m.file} (${m.reason})`));
} else {
  console.log(`  All ${imageRefs.length} media references in code resolve to existing files on disk!`);
}

// 3. Scan all <img> tags for alt attributes
console.log(`\n--- 2. ACCESSIBILITY & ALT TAGS AUDIT ---`);
const imgTagRegex = /<img\b([^>]*?)>/gi;
const missingAltTags = [];
let totalImgTags = 0;

for (const file of codeFiles) {
  const relFile = path.relative(rootDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = imgTagRegex.exec(content)) !== null) {
    totalImgTags++;
    const attrs = match[1];
    // Check if alt is present
    const hasAlt = /\balt\s*=\s*[{'"]/i.test(attrs);
    const hasEmptyAlt = /\balt\s*=\s*["']\s*["']/i.test(attrs);
    if (!hasAlt) {
      missingAltTags.push({ file: relFile, snippet: match[0], reason: 'Missing alt attribute completely' });
    } else if (hasEmptyAlt) {
      missingAltTags.push({ file: relFile, snippet: match[0], reason: 'Empty alt=""' });
    }
  }
}

console.log(`Total <img> tags scanned: ${totalImgTags}`);
console.log(`<img> tags with missing/empty alt: ${missingAltTags.length}`);
missingAltTags.forEach(m => console.log(`  [ALT ISSUE] in ${m.file}: ${m.reason} -> ${m.snippet.slice(0, 100)}`));

// 4. Meta & Open Graph Tags Audit
console.log(`\n--- 3. OPEN GRAPH & META TAGS AUDIT ---`);
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

const ogTagsToCheck = [
  'og:type',
  'og:url',
  'og:site_name',
  'og:title',
  'og:description',
  'og:image',
  'og:image:width',
  'og:image:height',
  'og:image:alt',
  'og:image:type',
  'og:locale',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image',
  'twitter:image:alt'
];

console.log('Checking index.html for standard social meta tags:');
for (const tag of ogTagsToCheck) {
  const isProp = tag.startsWith('og:');
  const attr = isProp ? 'property' : 'name';
  const reg = new RegExp(`<meta\\s+${attr}=["']${tag}["']\\s+content=["']([^"']*)["']`, 'i');
  const match = indexHtml.match(reg);
  if (match) {
    console.log(`  [OK] <meta ${attr}="${tag}" content="${match[1]}" />`);
  } else {
    console.log(`  [MISSING in index.html] ${tag}`);
  }
}

// 5. Canonical Tags Audit
console.log(`\n--- 4. CANONICAL TAGS AUDIT ---`);
const canonicalMatch = indexHtml.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
if (canonicalMatch) {
  console.log(`  index.html canonical: ${canonicalMatch[1]}`);
} else {
  console.log(`  [CRITICAL] index.html is missing <link rel="canonical" ... />`);
}

// Check sitemap.xml
const sitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`  sitemap.xml exists with ${locs.length} URLs.`);
  console.log(`  Sample sitemap URLs:`);
  locs.slice(0, 5).forEach(l => console.log(`    - ${l}`));
} else {
  console.log(`  [MISSING] sitemap.xml does not exist in public/`);
}
