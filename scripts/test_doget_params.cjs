const https = require('https');

const targetUrl = 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

function testParam(paramName, paramVal) {
  return new Promise((resolve) => {
    const url = `${targetUrl}?${paramName}=${encodeURIComponent(paramVal)}`;
    https.get(url, res => {
      if (res.headers.location) {
        https.get(res.headers.location, redRes => {
          let data = '';
          redRes.on('data', d => data += d);
          redRes.on('end', () => {
            resolve({ param: paramName, data });
          });
        });
      } else {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
          resolve({ param: paramName, data });
        });
      }
    });
  });
}

async function main() {
  const params = [
    ['data', '{"action":"get"}'],
    ['data', '{"id":"test"}'],
    ['q', 'get'],
    ['action', 'get'],
    ['action', 'read'],
    ['action', 'getLastNumber'],
    ['action', 'getLastId'],
    ['action', 'get_last'],
    ['action', 'count'],
    ['data', 'get'],
    ['payload', '{"action":"get"}']
  ];

  for (const [p, v] of params) {
    const res = await testParam(p, v);
    if (!res.data.startsWith('<!DOCTYPE')) {
      console.log(`PARAM ${p}=${v} =>`, res.data);
    } else {
      console.log(`PARAM ${p}=${v} => HTML (${res.data.length} bytes)`);
    }
  }
}

main();
