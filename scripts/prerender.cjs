const fs = require('fs');
const path = require('path');
const { build } = require('vite');
const { domain, allRoutes, escapeHtml } = require('./routes.cjs');

async function runPrerender() {
  console.log('--- Starting SSG Prerendering Pipeline ---');

  const rootDir = path.join(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');
  const distSsrDir = path.join(rootDir, 'dist-ssr');

  // Step 1: Build the SSR bundle using Vite
  console.log('1. Compiling SSR bundle with Vite...');
  await build({
    configFile: path.join(rootDir, 'vite.config.ts'),
    build: {
      ssr: path.join(rootDir, 'src/entry-server.tsx'),
      outDir: distSsrDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'cjs',
          entryFileNames: 'entry-server.cjs',
        },
      },
    },
    logLevel: 'warn',
  });

  const ssrBundlePath = path.join(distSsrDir, 'entry-server.cjs');
  const { render } = require(ssrBundlePath);

  // Step 2: Read template index.html from dist
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found! Run client build first.');
  }
  const baseTemplate = fs.readFileSync(templatePath, 'utf8');

  console.log(`2. Prerendering ${allRoutes.length} static routes...`);

  for (const route of allRoutes) {
    const renderUrl = route.is404 ? '/404' : route.path;
    let bodyHtml = '';
    try {
      bodyHtml = render(renderUrl);
    } catch (err) {
      console.error(`Error rendering route ${route.path}:`, err);
      throw err;
    }

    const canonicalUrl = `${domain}${route.path === '/' ? '/' : route.path}`;
    const safeTitle = escapeHtml(route.title);
    const safeDesc = escapeHtml(route.description);
    const safeImage = escapeHtml(route.image || `${domain}/images/og-image.jpg`);
    const robotsTag = route.is404 
      ? '<meta name="robots" content="noindex, nofollow" />' 
      : '<meta name="robots" content="index, follow" />';

    let pageHtml = baseTemplate;

    // Replace Title
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);

    // Replace Meta Description
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${safeDesc}" />`
    );

    // Replace Canonical Link
    pageHtml = pageHtml.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace Robots Meta
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']robots["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      robotsTag
    );

    // Remove any Keywords Meta tag
    pageHtml = pageHtml.replace(/<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>\s*/gi, '');

    // Replace Open Graph tags
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${safeTitle}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${safeDesc}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image" content="${safeImage}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+property=["']og:image:secure_url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:image:secure_url" content="${safeImage}" />`
    );

    // Replace Twitter Card tags
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:title" content="${safeTitle}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );
    pageHtml = pageHtml.replace(
      /<meta\s+name=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="twitter:image" content="${safeImage}" />`
    );

    // Replace <div id="root">...</div> with prerendered body
    const rootStart = pageHtml.indexOf('<div id="root">');
    if (rootStart !== -1) {
      const bodyEnd = pageHtml.indexOf('</body>', rootStart);
      if (bodyEnd !== -1) {
        pageHtml = pageHtml.slice(0, rootStart) + `<div id="root">${bodyHtml}</div>\n  ` + pageHtml.slice(bodyEnd);
      }
    }

    // Write output files
    if (route.path === '/') {
      fs.writeFileSync(templatePath, pageHtml, 'utf8');
    } else if (route.is404) {
      fs.writeFileSync(path.join(distDir, '404.html'), pageHtml, 'utf8');
    } else {
      // 1. Clean URL file: dist/<path>.html
      const cleanFilePath = path.join(distDir, `${route.path}.html`);
      fs.mkdirSync(path.dirname(cleanFilePath), { recursive: true });
      fs.writeFileSync(cleanFilePath, pageHtml, 'utf8');

      // 2. Directory index file: dist/<path>/index.html
      const dirIndexFilePath = path.join(distDir, route.path, 'index.html');
      fs.mkdirSync(path.dirname(dirIndexFilePath), { recursive: true });
      fs.writeFileSync(dirIndexFilePath, pageHtml, 'utf8');
    }
  }

  // Step 3: Clean up SSR build artifact
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  } catch {}

  console.log(`✓ Successfully prerendered ${allRoutes.length} pages to dist/`);
}

runPrerender().catch((err) => {
  console.error('Prerender build error:', err);
  process.exit(1);
});
