const http = require('http');

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method,
      headers: data
        ? {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
          }
        : {},
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, body: parsed });
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  try {
    console.log('Creating note...');
    const create = await request('POST', '/api/notes', JSON.stringify({ title: 'Script Test', content: 'Created by test_api' }));
    console.log('Create response:', create);
    const id = create.body && create.body.id;
    if (!id) throw new Error('No id returned from create');

    console.log('Listing notes...');
    const list = await request('GET', '/api/notes');
    console.log('List response length:', Array.isArray(list.body) ? list.body.length : 'N/A');

    console.log('Deleting note id', id);
    const del = await request('DELETE', `/api/notes/${id}`);
    console.log('Delete response:', del);

    console.log('Final list...');
    const final = await request('GET', '/api/notes');
    console.log('Final list length:', Array.isArray(final.body) ? final.body.length : 'N/A');

    console.log('Test script completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
})();
