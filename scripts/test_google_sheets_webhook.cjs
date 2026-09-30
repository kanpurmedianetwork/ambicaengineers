const https = require('https');

const url1 = 'https://script.google.com/macros/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';
const url2 = 'https://script.google.com/a/macros/ambicapanels.com/s/AKfycbwePD5bXarfFA87qQVzAoPbCvfGwHg-Bwo1p3I_3E0Svs_LjOeMCO3PCmkiSeqDvtjOeQ/exec';

function makeRequest(targetUrl, method, postData) {
  return new Promise((resolve) => {
    console.log(`\n--- Testing ${method} ${targetUrl} ---`);
    const parsed = new URL(targetUrl);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (postData) {
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log('HEADERS:', res.headers.location ? `Location: ${res.headers.location}` : res.headers['content-type']);
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('BODY:', body.slice(0, 300));
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          console.log('Following redirect to:', res.headers.location);
          // Follow redirect with GET
          https.get(res.headers.location, (redRes) => {
            let redBody = '';
            redRes.on('data', d => redBody += d);
            redRes.on('end', () => {
              console.log(`REDIRECT RESULT: ${redRes.statusCode}`, redBody.slice(0, 300));
              resolve({ statusCode: redRes.statusCode, body: redBody });
            });
          });
        } else {
          resolve({ statusCode: res.statusCode, body });
        }
      });
    });

    req.on('error', (e) => {
      console.error('ERROR:', e.message);
      resolve({ error: e.message });
    });

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run() {
  const samplePayload = JSON.stringify({
    action: 'get_last_number',
    id: 'RFQ-TEST-001',
    customerName: 'Test Customer',
    companyName: 'Test Co',
    phone: '9876543210',
    email: 'test@example.com',
    city: 'Noida',
    country: 'India',
    currency: 'INR',
    items: [{ productName: 'A10VSO Pump', quantity: 1 }],
    notes: 'Testing webhook sync',
    submittedAt: new Date().toISOString()
  });

  // Test GET on url1
  await makeRequest(url1, 'GET');
  // Test POST on url1
  await makeRequest(url1, 'POST', samplePayload);
  // Test GET on url2
  await makeRequest(url2, 'GET');
  // Test POST on url2
  await makeRequest(url2, 'POST', samplePayload);
}

run();
