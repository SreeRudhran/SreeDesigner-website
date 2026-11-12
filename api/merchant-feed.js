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
    return vm.runInNewContext('(' + arrayStr + ')');
  } catch(e) {
    console.error('Failed to parse catalogData.js in merchant-feed:', e.message);
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
      console.warn('Local read error in merchant-feed:', e.message);
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
            'User-Agent': 'SreeDesigners-MerchantFeed/1.0',
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
      console.warn('GitHub read error in merchant-feed:', e.message);
    }
  }

  return [];
}

function escapeXml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    // Remove control characters (except newline, tab, carriage return)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function resolveProductImageLink(product, rawUrl, index) {
  if (!rawUrl) {
    return 'https://sreedesigners.in/assets/images/hero_model.png';
  }
  if (rawUrl.startsWith('data:')) {
    // Route through public binary image serving endpoint
    const idxParam = index === 0 ? 'main' : index;
    return `https://sreedesigners.in/product-image/${encodeURIComponent(product.id)}/${idxParam}.jpg`;
  }
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  const clean = rawUrl.replace(/^\/+/, '');
  return `https://sreedesigners.in/${clean}`;
}

function buildMerchantXml(items) {
  const publishedItems = items.filter(i => i && i.is_published !== false);

  const xmlItems = publishedItems.map(item => {
    const id = escapeXml(item.id);
    const title = escapeXml((item.title || 'Bespoke Designer Blouse').slice(0, 150));
    const description = escapeXml(item.description || `${item.title} — Handcrafted bespoke South Indian blouse tailored at Sree Designers studio.`);
    const link = `https://sreedesigners.in/product?id=${encodeURIComponent(item.id)}`;
    
    // Main image
    const mainImgUrl = resolveProductImageLink(item, item.main_image_url, 0);

    // Additional images
    const extraImages = [];
    if (Array.isArray(item.images)) {
      item.images.forEach((img, idx) => {
        const u = typeof img === 'string' ? img : img.image_url;
        if (u && u !== item.main_image_url) {
          extraImages.push(resolveProductImageLink(item, u, idx + 1));
        }
      });
    }

    const priceVal = (parseFloat(item.starting_price) || 2800).toFixed(2);
    const tag = (item.tags && item.tags[0]) || 'Bridal Blouse & Maggam Work';

    const additionalTags = extraImages.map(url => `      <g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`).join('\n');

    return `    <item>
      <g:id>${id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(mainImgUrl)}</g:image_link>${additionalTags ? '\n' + additionalTags : ''}
      <g:availability>in_stock</g:availability>
      <g:price>${priceVal} INR</g:price>
      <g:google_product_category>Apparel &amp; Accessories &gt; Clothing &gt; Traditional &amp; Ceremonial Clothing &gt; Sarees &amp; Blouses</g:google_product_category>
      <g:product_type>${escapeXml(tag)}</g:product_type>
      <g:brand>Sree Designers</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>false</g:identifier_exists>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Standard Courier / Studio Pickup</g:service>
        <g:price>0.00 INR</g:price>
      </g:shipping>
      <g:shipping_weight>0.5 kg</g:shipping_weight>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Sree Designers &amp; Boutique — Bridal Blouse &amp; Aari Work Atelier</title>
    <link>https://sreedesigners.in/</link>
    <description>Heirloom Bridal Blouse Stitching, Aari &amp; Maggam Embroidery, and Bespoke Lehengas in Coimbatore &amp; Tiruppur.</description>
${xmlItems}
  </channel>
</rss>`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  try {
    const items = await getCatalogItems();
    const xml = buildMerchantXml(items);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
    res.statusCode = 200;
    return res.end(xml);
  } catch(e) {
    console.error('Merchant feed generation error:', e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Error generating Google Merchant feed: ' + e.message);
  }
};

module.exports.buildMerchantXml = buildMerchantXml;
module.exports.parseCatalogJs = parseCatalogJs;
