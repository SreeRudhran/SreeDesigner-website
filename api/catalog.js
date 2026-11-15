const https = require('https');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { verifySessionToken, parseBody } = require('./_auth');

// CommonJS require ensures Vercel NFT bundles catalogData.js into lambda and provides instant static fallback
let staticCatalog = null;
try {
  staticCatalog = require('../js/catalogData.js');
} catch (e) {
  console.warn('Could not require ../js/catalogData.js:', e.message);
}

// GitHub Persistence Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';
const REPO_OWNER = 'SreeRudhran';
const REPO_NAME = 'SreeDesigner-website';
const CATALOG_FILE_PATH = 'js/catalogData.js';
const LOCAL_CATALOG_PATH = path.join(__dirname, '../js/catalogData.js');

// Optional Supabase Configuration (fallback)
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// In-memory catalog cache for instant reads
let catalogCache = null;
let catalogCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

function requestGitHub(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.github.com',
      path: apiPath,
      method: method,
      headers: {
        'User-Agent': 'SreeDesigners-CatalogSync/1.0',
        'Authorization': 'token ' + GITHUB_TOKEN,
        'Accept': 'application/vnd.github.v3+json',
        ...(data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(d) });
        } catch(e) {
          resolve({ status: res.statusCode, raw: d });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function sanitizeCatalogText(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        const code = parseInt(hex, 16);
        if (code > 0 && code <= 0x10FFFF) return String.fromCodePoint(code);
      } catch(e) {}
      return ' ';
    })
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try {
        const code = parseInt(dec, 10);
        if (code > 0 && code <= 0x10FFFF) return String.fromCodePoint(code);
      } catch(e) {}
      return ' ';
    })
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/(?:&;)+/g, ' ')
    .replace(/&[a-zA-Z0-9#_]+;/g, ' ')
    .replace(/\s+([.,!?:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCatalogJs(content) {
  const startMatch = content.match(/const\s+MASTER_CATALOG\s*=\s*\[/);
  if (!startMatch) return null;
  const startPos = startMatch.index + startMatch[0].length - 1;
  const afterStart = content.slice(startPos);
  const endMatch = afterStart.match(/\r?\n\];/);
  if (!endMatch) return null;
  const endPos = startPos + endMatch.index + (endMatch[0].startsWith('\r\n') ? 3 : 2);
  const arrayStr = content.slice(startPos, endPos);
  const items = vm.runInNewContext('(' + arrayStr + ')');
  return { items, startPos, endPos };
}

function serializeCatalogJs(originalContent, items) {
  const parsed = parseCatalogJs(originalContent);
  if (!parsed) return null;
  const newArrayStr = JSON.stringify(items, null, 2);
  return originalContent.slice(0, parsed.startPos) + newArrayStr + originalContent.slice(parsed.endPos);
}

async function getLiveCatalogData() {
  // 1. Try local file if running with local filesystem
  if (fs.existsSync(LOCAL_CATALOG_PATH)) {
    try {
      const content = fs.readFileSync(LOCAL_CATALOG_PATH, 'utf8');
      const parsed = parseCatalogJs(content);
      if (parsed && Array.isArray(parsed.items)) {
        const cleanItems = parsed.items.map(it => ({
          ...it,
          title: sanitizeCatalogText(it.title),
          description: sanitizeCatalogText(it.description)
        }));
        return { source: 'local_file', items: cleanItems, content, sha: null };
      }
    } catch(e) {
      console.warn('Local catalog read failed:', e.message);
    }
  }

  // 2. Fetch from GitHub API
  if (GITHUB_TOKEN) {
    try {
      const ghRes = await requestGitHub('GET', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`);
      if (ghRes.status === 200 && ghRes.data && ghRes.data.content) {
        const content = Buffer.from(ghRes.data.content, 'base64').toString('utf8');
        const parsed = parseCatalogJs(content);
        if (parsed && Array.isArray(parsed.items)) {
          const cleanItems = parsed.items.map(it => ({
            ...it,
            title: sanitizeCatalogText(it.title),
            description: sanitizeCatalogText(it.description)
          }));
          return { source: 'github_api', items: cleanItems, content, sha: ghRes.data.sha };
        }
      }
    } catch(e) {
      console.warn('GitHub API catalog fetch failed:', e.message);
    }
  }

  // 3. Resilient fallback to CommonJS bundled MASTER_CATALOG
  if (staticCatalog && Array.isArray(staticCatalog.MASTER_CATALOG) && staticCatalog.MASTER_CATALOG.length > 0) {
    const cleanItems = staticCatalog.MASTER_CATALOG.map(it => ({
      ...it,
      title: sanitizeCatalogText(it.title),
      description: sanitizeCatalogText(it.description)
    }));
    return { source: 'bundled_static', items: cleanItems, content: '', sha: null };
  }

  return { source: 'none', items: [], content: '', sha: null };
}

async function commitCatalogToGitHub(newItems, commitMessage, existingSha, originalContent) {
  let finalContent = null;
  let targetSha = existingSha;

  // If we don't have SHA, fetch current from GitHub
  if (!targetSha) {
    const checkRes = await requestGitHub('GET', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`);
    if (checkRes.status === 200 && checkRes.data) {
      targetSha = checkRes.data.sha;
      if (!originalContent && checkRes.data.content) {
        originalContent = Buffer.from(checkRes.data.content, 'base64').toString('utf8');
      }
    }
  }

  if (originalContent) {
    finalContent = serializeCatalogJs(originalContent, newItems);
  }

  if (!finalContent) {
    throw new Error('Failed to serialize catalogData.js');
  }

  // Save to local file if it exists
  if (fs.existsSync(LOCAL_CATALOG_PATH)) {
    try {
      fs.writeFileSync(LOCAL_CATALOG_PATH, finalContent, 'utf8');
    } catch(e) {
      console.warn('Local file write error:', e.message);
    }
  }

  // Commit to GitHub repository with automatic conflict retry
  if (GITHUB_TOKEN && targetSha) {
    const gitAuthor = {
      name: process.env.GIT_COMMITTER_NAME || 'Sreeji',
      email: process.env.GIT_COMMITTER_EMAIL || 'sreeji321209@gmail.com'
    };
    let putRes = await requestGitHub('PUT', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`, {
      message: commitMessage,
      content: Buffer.from(finalContent, 'utf8').toString('base64'),
      sha: targetSha,
      branch: 'main',
      committer: gitAuthor,
      author: gitAuthor
    });

    // Handle 409 Conflict: concurrent write updated SHA
    if (putRes.status === 409) {
      console.warn('GitHub 409 Conflict detected. Re-fetching latest SHA and retrying...');
      const freshRes = await requestGitHub('GET', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`);
      if (freshRes.status === 200 && freshRes.data && freshRes.data.sha) {
        targetSha = freshRes.data.sha;
        const freshOriginal = Buffer.from(freshRes.data.content, 'base64').toString('utf8');
        finalContent = serializeCatalogJs(freshOriginal, newItems);
        putRes = await requestGitHub('PUT', `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${CATALOG_FILE_PATH}`, {
          message: commitMessage + ' (auto-retry)',
          content: Buffer.from(finalContent, 'utf8').toString('base64'),
          sha: targetSha,
          branch: 'main',
          committer: gitAuthor,
          author: gitAuthor
        });
      }
    }

    if (putRes.status === 200 || putRes.status === 201) {
      return { success: true, commit_sha: putRes.data.commit?.sha };
    } else {
      console.warn('GitHub commit response error:', putRes.status, putRes.data);
      return { success: false, error: putRes.data?.message || 'GitHub commit failed' };
    }
  }

  return { success: true, local_only: true };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // ─── 1. GET: Return catalog items ──────────────────────────────────────────
  if (req.method === 'GET') {
    // Check in-memory cache
    if (catalogCache && (Date.now() - catalogCacheTime < CACHE_TTL_MS)) {
      return sendJson(res, 200, { success: true, source: 'cache', items: catalogCache });
    }

    const { items, source } = await getLiveCatalogData();
    if (items.length > 0) {
      catalogCache = items;
      catalogCacheTime = Date.now();
      return sendJson(res, 200, { success: true, source, items });
    }

    const fallbackItems = (staticCatalog && staticCatalog.MASTER_CATALOG) ? staticCatalog.MASTER_CATALOG : [];
    return sendJson(res, 200, {
      success: true,
      source: 'local_master',
      items: fallbackItems,
      message: 'Catalog sync endpoint active.'
    });
  }

  // ─── AUTH CHECK FOR MUTATIONS ───────────────────────────────────────────────
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const session = verifySessionToken(token);

  if (!session) {
    return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
  }

  // ─── 2. POST / PUT: Create or Update Product ───────────────────────────────
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJson(res, 400, { error: 'Product title is required.' });
      }

      const { items, content, sha } = await getLiveCatalogData();
      let workingItems = [...items];

      const itemPayload = {
        id: body.id || ('prod-custom-' + Date.now()),
        title: sanitizeCatalogText(body.title),
        slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: sanitizeCatalogText(body.description || ''),
        starting_price: parseFloat(body.starting_price) || 2800,
        main_image_url: body.main_image_url || '',
        tags: Array.isArray(body.tags) ? body.tags : [body.tags || 'Hand Embroidered Blouses'],
        images: Array.isArray(body.images) ? body.images : [],
        instagram_url: body.instagram_url || '',
        is_published: body.is_published !== false,
        is_featured: !!body.is_featured,
        updated_at: new Date().toISOString()
      };

      const existingIdx = workingItems.findIndex(i => String(i.id) === String(itemPayload.id));
      if (existingIdx !== -1) {
        workingItems[existingIdx] = { ...workingItems[existingIdx], ...itemPayload };
      } else {
        workingItems.unshift(itemPayload);
      }

      // Update cache immediately
      catalogCache = workingItems;
      catalogCacheTime = Date.now();

      const commitAction = existingIdx !== -1 ? 'update' : 'add';
      const commitMsg = `admin(catalog): ${commitAction} product "${itemPayload.title}"`;
      const commitRes = await commitCatalogToGitHub(workingItems, commitMsg, sha, content);

      return sendJson(res, 200, {
        success: true,
        saved: itemPayload,
        synced_to_repo: commitRes.success,
        commit_sha: commitRes.commit_sha,
        message: 'Product saved and committed to repository. Production deployment is running.'
      });
    } catch (err) {
      console.error('Catalog POST/PUT error:', err);
      return sendJson(res, 500, { error: err.message });
    }
  }

  // ─── 3. DELETE: Remove Product ─────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return sendJson(res, 400, { error: 'Item ID is required.' });

    try {
      const { items, content, sha } = await getLiveCatalogData();
      const strId = String(id);
      const filtered = items.filter(i => String(i.id) !== strId);

      // Update cache immediately
      catalogCache = filtered;
      catalogCacheTime = Date.now();

      const commitMsg = `admin(catalog): delete product ${strId}`;
      const commitRes = await commitCatalogToGitHub(filtered, commitMsg, sha, content);

      return sendJson(res, 200, {
        success: true,
        deleted_id: strId,
        synced_to_repo: commitRes.success,
        commit_sha: commitRes.commit_sha,
        message: `Product ${strId} deleted and committed to repository. Production deployment is running.`
      });
    } catch(err) {
      console.error('Catalog DELETE error:', err);
      return sendJson(res, 500, { error: err.message });
    }
  }

  return sendJson(res, 405, { error: 'Method not allowed' });
};
