import {
  addImage,
  deleteImage,
  getImageById,
  getImages,
  getPaletteById,
  getPalettes
} from './storage.js';
import { isCorrectImage } from './validators.js';

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, {
    error: message
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject({
          statusCode: 400,
          message: 'Niepoprawny format JSON w body.'
        });
      }
    });

    req.on('error', () => {
      reject({
        statusCode: 400,
        message: 'Nie udało się odczytać body żądania.'
      });
    });
  });
}

export async function routeRequest(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.split('/').filter(Boolean);

  if (req.method === 'GET' && parts.length === 1 && parts[0] === 'palettes') {
    sendJson(res, 200, getPalettes());
    return;
  }

  if (req.method === 'GET' && parts.length === 2 && parts[0] === 'palettes') {
    const palette = getPaletteById(parts[1]);

    if (!palette) {
      sendError(res, 404, 'Nie znaleziono palety.');
      return;
    }

    sendJson(res, 200, palette);
    return;
  }

  if (req.method === 'GET' && parts.length === 1 && parts[0] === 'images') {
    sendJson(res, 200, getImages());
    return;
  }

  if (req.method === 'GET' && parts.length === 2 && parts[0] === 'images') {
    const image = getImageById(parts[1]);

    if (!image) {
      sendError(res, 404, 'Nie znaleziono obrazka.');
      return;
    }

    sendJson(res, 200, image);
    return;
  }

  if (req.method === 'POST' && parts.length === 1 && parts[0] === 'images') {
    const data = await readJsonBody(req);

    if (!isCorrectImage(data)) {
      sendError(res, 400, 'Obrazek musi mieć gridSize oraz tablicę cells.');
      return;
    }

    sendJson(res, 201, addImage(data));
    return;
  }

  if (req.method === 'DELETE' && parts.length === 2 && parts[0] === 'images') {
    const wasDeleted = deleteImage(parts[1]);

    if (!wasDeleted) {
      sendError(res, 404, 'Nie znaleziono obrazka do usunięcia.');
      return;
    }

    res.writeHead(204);
    res.end();
    return;
  }

  sendError(res, 404, 'Nie znaleziono endpointu.');
}
