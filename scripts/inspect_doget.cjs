const https = require('https');

const targetUrl = 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

function queryGet(query) {
  return new Promise((resolve) => {
    const fullUrl = targetUrl + (query ? '?' + query : '');
    https.get(fullUrl, res => {
      if (res.headers.location) {
        https.get(res.headers.location, redRes => {
          let data = '';
          redRes.on('data', d => data += d);
          redRes.on('end', () => {
            resolve({ query, status: redRes.statusCode, data });
          });
        });
      } else {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
          resolve({ query, status: res.statusCode, data });
        });
      }
    });
  });
}

async function main() {
  const tests = [
    '',
    'data=test',
    'id=test',
    'type=get',
    'action=read',
    'action=getAll',
    'action=last',
    'action=get_last',
    'action=get_last_id',
    'action=get_last_number',
    'action=next',
    'action=getNextId',
    'action=count',
    'sheet=Sheet1',
    'method=get',
    'op=read'
  ];

  for (const t of tests) {
    const r = await queryGet(t);
    if (!r.data.startsWith('<!DOCTYPE')) {
      console.log(`QUERY [${t}]:`, r.data);
    } else {
      // Check if there is JSON inside or error
      const m = r.data.match(/\{[^}]+\}/);
      if (m) console.log(`HTML with JSON [${t}]:`, m[0]);
    }
  }
}

main();
