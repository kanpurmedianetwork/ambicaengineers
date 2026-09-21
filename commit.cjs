const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname);

async function run() {
  console.log('Initializing git repository in:', repoDir);
  await git.init({ fs, dir: repoDir, defaultBranch: 'main' });
  console.log('Git repo initialized.');

  // Helper to recursively get all files respecting simple ignore
  function getAllFiles(dir, base = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      if (['node_modules', '.git', 'dist', 'dist-ssr', '.system_generated'].includes(entry.name)) {
        continue;
      }
      const fullPath = path.join(dir, entry.name);
      const relPath = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        files = files.concat(getAllFiles(fullPath, relPath));
      } else {
        if (!entry.name.endsWith('.log')) {
          files.push(relPath);
        }
      }
    }
    return files;
  }

  const allFiles = getAllFiles(repoDir);
  console.log(`Staging ${allFiles.length} files...`);

  for (const file of allFiles) {
    await git.add({ fs, dir: repoDir, filepath: file });
  }
  console.log('All files staged.');

  const sha = await git.commit({
    fs,
    dir: repoDir,
    message: 'feat: Modernize Ambica Engineers portal to Squarespace-grade Clean Architecture with exact brand colors\n\n- Scraped Wix catalog and migrated to Clean Architecture (Domain, Application, Infrastructure, Presentation)\n- Exact brand colors (#EF7D01 Ambica Orange, #0A0F1D Enterprise Navy, #FFFFFF and #F8FAFC luminous surfaces)\n- Interactive Component Telemetry Showcase in Hero\n- Asymmetric Bento Grid layout and certified standards\n- Parametric catalog filtering by brand and category\n- Two-column product detail pages with technical spec tables\n- RFQ Bill of Materials cart drawer with multi-currency and WhatsApp dispatch\n- Streamlined, decluttered 5-item navigation bar\n- Verified 0 build errors across all routes',
    author: {
      name: 'Ambica Engineers Engineering Team',
      email: 'engineering@ambicaengineers.in',
    }
  });

  console.log('Successfully committed! Commit SHA:', sha);
}

run().catch(err => {
  console.error('Commit failed:', err);
  process.exit(1);
});
