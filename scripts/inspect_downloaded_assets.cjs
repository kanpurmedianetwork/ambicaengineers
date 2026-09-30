const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'images', 'live_images_manifest.json'), 'utf8'));

console.log('=== ASSET CATEGORY BREAKDOWN ===');
const categories = {};
manifest.forEach(m => {
  categories[m.category] = (categories[m.category] || 0) + 1;
});
console.log(categories);

console.log('\n--- SAMPLE PUMP IMAGES ---');
manifest.filter(m => m.category === 'pumps').slice(0, 10).forEach(m => {
  console.log(`- ${m.localPath} (Alt: "${m.alt}", Size: ${Math.round(m.sizeBytes/1024)} KB)`);
});

console.log('\n--- SAMPLE VALVE IMAGES ---');
manifest.filter(m => m.category === 'valves').slice(0, 10).forEach(m => {
  console.log(`- ${m.localPath} (Alt: "${m.alt}", Size: ${Math.round(m.sizeBytes/1024)} KB)`);
});

console.log('\n--- SAMPLE CUSHION PAD IMAGES ---');
manifest.filter(m => m.category === 'cushion_pads').forEach(m => {
  console.log(`- ${m.localPath} (Alt: "${m.alt}", Size: ${Math.round(m.sizeBytes/1024)} KB)`);
});

console.log('\n--- SAMPLE EVENT IMAGES ---');
manifest.filter(m => m.category === 'events').slice(0, 8).forEach(m => {
  console.log(`- ${m.localPath} (Alt: "${m.alt}", Size: ${Math.round(m.sizeBytes/1024)} KB)`);
});
