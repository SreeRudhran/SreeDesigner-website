const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const REPO_OWNER = 'SreeRudhran';
const REPO_NAME = 'SreeDesigner-website';
const CATALOG_FILE_PATH = 'js/catalogData.js';
const LOCAL_CATALOG_PATH = path.join(__dirname, '../js/catalogData.js');

let catalogCache = null;
let catalogCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000;

function parseCatalogJs(content) {
  try {
    const startMatch = content.match(/const\s+MASTER_CATALOG\s*=\s*\[/);
    if (!startMatch) return null;
    const startPos = startMatch.index + startMatch[0].length - 1;
    const endMatch = /\r?\n\];\r?\n\r?\n\/\/ Helper/.exec(content);
    if (!endMatch) return null;
    const endPos = endMatch.index + (endMatch[0].startsWith('\r\n') ? 3 : 2);
    const arrayStr = content.slice(startPos, endPos);
    const items = vm.runInNewContext('(' + arrayStr + ')');
    return items;
  } catch(e) {
    console.error('Failed to parse catalogData.js in product-image:', e.message);
    return null;
  }
}

async function getCatalogItems() {
  if (catalogCache && (Date.now() - catalogCacheTime < CACHE_TTL_MS)) {
    return catalogCache;
  }

  // 1. Local file read
  if (fs.existsSync(LOCAL_CATALOG_PATH)) {
    try {
      const content = fs.readFileSync(LOCAL_CATALOG_PATH, 'utf8');
      const items = parseCatalogJs(content);
      if (Array.isArray(items) && items.length > 0) {
        catalogCache = items;
        catalogCacheTime = Date.now();
        return items;
      }
    } catch(e) {
      console.warn('Local read error in product-image:', e.message);
    }
  }

  // 2. GitHub fallback
  if (GITHUB_TOKEN) {
    try {
      const items = await new Promise((resolve) => {
        const req = https.request({
          hostname: 'api.github.com',
          path: `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`,
          method: 'GET',
          headers: {
            'User-Agent': 'SreeDesigners-ImageServer/1.0',
            'Authorization': 'token ' + GITHUB_TOKEN,
            'Accept': 'application/vnd.github.v3+json'
          }
        }, res => {
          let d = '';
          res.on('data', c => d += c);
          res.on('end', () => {
            try {
              const parsed = JSON.parse(d);
              if (parsed && parsed.content) {
                const rawContent = Buffer.from(parsed.content, 'base64').toString('utf8');
                resolve(parseCatalogJs(rawContent));
                return;
              }
            } catch(e) {}
            resolve(null);
          });
        });
        req.on('error', () => resolve(null));
        req.end();
      });

      if (Array.isArray(items) && items.length > 0) {
        catalogCache = items;
        catalogCacheTime = Date.now();
        return items;
      }
    } catch(e) {
      console.warn('GitHub read error in product-image:', e.message);
    }
  }

  return [];
}

module.exports = async function handler(req, res) {
  const query = req.query || {};
  const id = query.id;
  const rawIndex = query.index !== undefined ? query.index : (query.type === 'main' ? 0 : 0);
  const index = parseInt(rawIndex, 10) || 0;

  if (!id) {
    res.statusCode = 400;
    return res.end('Missing product id parameter');
  }

  const items = await getCatalogItems();
  const product = items.find(i =>
    String(i.id) === String(id) ||
    String(i.slug) === String(id) ||
    String(i.id).toLowerCase() === String(id).toLowerCase()
  );

  if (!product) {
    res.statusCode = 404;
    return res.end('Product not found');
  }

  // Determine target image URL
  let targetImage = null;

  if (index === 0) {
    targetImage = product.main_image_url;
    if (!targetImage && Array.isArray(product.images) && product.images.length > 0) {
      const first = product.images[0];
      targetImage = typeof first === 'string' ? first : first.image_url;
    }
  } else {
    // Secondary slide image: index 1 maps to product.images[0] or product.images[index-1]
    if (Array.isArray(product.images) && product.images.length > 0) {
      // If product.images contains secondary images
      const subIdx = index - 1;
      const sub = product.images[subIdx] || product.images[index];
      if (sub) {
        targetImage = typeof sub === 'string' ? sub : sub.image_url;
      }
    }
    // Fallback to main image if requested index not found
    if (!targetImage) {
      targetImage = product.main_image_url;
    }
  }

  if (!targetImage) {
    res.statusCode = 404;
    return res.end('Image not found for product');
  }

  // Case A: Data URL (e.g. data:image/jpeg;base64,....)
  if (targetImage.startsWith('data:')) {
    const match = targetImage.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) {
      res.statusCode = 500;
      return res.end('Invalid data URL image format');
    }
    const contentType = match[1];
    const base64Data = match[2];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', imageBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.statusCode = 200;
    return res.end(imageBuffer);
  }

  // Case B: Static local asset file
  if (targetImage.startsWith('assets/') || targetImage.startsWith('/assets/')) {
    const cleanPath = targetImage.replace(/^\/+/, '');
    const localAssetPath = path.join(__dirname, '..', cleanPath);
    if (fs.existsSync(localAssetPath)) {
      try {
        const fileBuffer = fs.readFileSync(localAssetPath);
        const ext = path.extname(cleanPath).toLowerCase();
        const mimeTypes = {
          '.webp': 'image/webp',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.svg': 'image/svg+xml'
        };
        const contentType = mimeTypes[ext] || 'image/jpeg';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', fileBuffer.length);
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.statusCode = 200;
        return res.end(fileBuffer);
      } catch(e) {
        console.warn('Error reading local asset:', e.message);
      }
    }

    // Redirect to static asset URL if read fails
    res.writeHead(302, {
      'Location': 'https://sreedesigners.in/' + cleanPath,
      'Cache-Control': 'public, max-age=86400'
    });
    return res.end();
  }

  // Case C: Remote HTTP / HTTPS URL
  if (targetImage.startsWith('http://') || targetImage.startsWith('https://')) {
    res.writeHead(302, {
      'Location': targetImage,
      'Cache-Control': 'public, max-age=86400'
    });
    return res.end();
  }

  res.statusCode = 404;
  return res.end('Image format not supported');
};
