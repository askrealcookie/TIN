import http from 'node:http';
import { performance } from 'node:perf_hooks';
import { routeRequest } from './router.js';

const PORT = 3000;

function addCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer(async (req, res) => {
  const start = performance.now();
  const url = new URL(req.url, `http://${req.headers.host}`);

  res.on('finish', () => {
    const end = performance.now();
    console.log(
      `${req.method} ${url.pathname} ${res.statusCode} ${(end - start).toFixed(2)} ms`
    );
  });

  try {
    addCorsHeaders(res);

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    await routeRequest(req, res);
  } catch (error) {
    if (res.headersSent) {
      res.end();
      return;
    }

    if (error.statusCode) {
      res.writeHead(error.statusCode, {
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({ error: error.message }));
      return;
    }

    console.error(error);
    res.writeHead(500, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({ error: 'Wewnętrzny błąd serwera.' }));
  }
});

server.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
