const path = require('path');
const sharp = require(path.join(__dirname, '../node_modules/sharp'));

async function createOgImage() {
  const root = path.resolve(__dirname, '..');
  const logoPath = path.join(root, 'public/images/logo.png');
  const outPath = path.join(root, 'public/images/og-image.jpg');

  const logoBuffer = await sharp(logoPath)
    .resize({ width: 440 })
    .toBuffer();

  const svgText = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="70%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#EF7D01" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#0A0F1D" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="#0A0F1D" />
      <rect width="1200" height="630" fill="url(#grad)" />
      
      <!-- Subtle Grid -->
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
        <line x1="0" y1="105" x2="1200" y2="105" />
        <line x1="0" y1="210" x2="1200" y2="210" />
        <line x1="0" y1="315" x2="1200" y2="315" />
        <line x1="0" y1="420" x2="1200" y2="420" />
        <line x1="0" y1="525" x2="1200" y2="525" />
        <line x1="200" y1="0" x2="200" y2="630" />
        <line x1="400" y1="0" x2="400" y2="630" />
        <line x1="600" y1="0" x2="600" y2="630" />
        <line x1="800" y1="0" x2="800" y2="630" />
        <line x1="1000" y1="0" x2="1000" y2="630" />
      </g>

      <!-- Frame outline -->
      <rect x="36" y="36" width="1128" height="558" rx="20" fill="none" stroke="#334155" stroke-width="1.5" />
      <line x1="80" y1="36" x2="220" y2="36" stroke="#EF7D01" stroke-width="4" stroke-linecap="round" />
      
      <!-- Badge -->
      <rect x="80" y="240" width="350" height="36" rx="18" fill="#1e1814" stroke="#EF7D01" stroke-width="1.5" />
      <text x="100" y="263" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#EF7D01" letter-spacing="1.5">
        ENGINEERING LEGACY SINCE 1982
      </text>

      <!-- Headline -->
      <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
        PRECISION FLUID POWER &amp;
      </text>
      <text x="80" y="398" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="46" font-weight="800" fill="#EF7D01" letter-spacing="-0.5">
        WOOD PANEL MANUFACTURING
      </text>

      <!-- Subtitle -->
      <text x="80" y="460" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="20" fill="#94A3B8">
        Rexroth • Polyhydron • Nachi • Huade • Voith • European Cushion Pads
      </text>

      <!-- Domain footer -->
      <text x="80" y="535" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="600" fill="#64748B">
        www.ambicaengineers.in
      </text>
    </svg>
  `);

  await sharp(svgText)
    .composite([
      { input: logoBuffer, top: 80, left: 80 }
    ])
    .jpeg({ quality: 92 })
    .toFile(outPath);

  console.log('Successfully created:', outPath);
}

createOgImage().catch(console.error);
