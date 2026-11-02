const http = require('https');

const NAMESPACE = 'sreedesigners.in_v1';
const METRICS = [
  'qr_scans',
  'review_samalapuram',
  'review_karnempettai',
  'instagram_follow',
  'whatsapp_save',
  'catalog_browse'
];

function fetchAbacus(action, key) {
  return new Promise((resolve) => {
    const url = `https://abacus.jasoncameron.dev/${action}/${NAMESPACE}/${key}`;
    const req = http.get(url, { timeout: 4000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(typeof json.value === 'number' ? json.value : 0);
        } catch (e) {
          resolve(0);
        }
      });
    });
    req.on('error', () => resolve(0));
    req.on('timeout', () => { req.destroy(); resolve(0); });
  });
}

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
  // CORS & Methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // 1. POST: Increment a specific metric
  if (req.method === 'POST') {
    let actionKey = 'qr_scans';
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch(e) {}
      }
      if (body && body.action) {
        actionKey = String(body.action).trim().toLowerCase();
      }
    } catch(e) {}

    // Map common aliases
    const aliasMap = {
      'qr_scan': 'qr_scans',
      'in_store_qr_scan': 'qr_scans',
      'qr_code_scan': 'qr_scans',
      'review_samalapuram': 'review_samalapuram',
      'review_karnempettai': 'review_karnempettai',
      'instagram_follow': 'instagram_follow',
      'instagram': 'instagram_follow',
      'whatsapp_save_contact': 'whatsapp_save',
      'whatsapp_save': 'whatsapp_save',
      'browse_hand_embroidery': 'catalog_browse',
      'browse_machine_embroidery': 'catalog_browse',
      'browse_lehengas': 'catalog_browse',
      'browse_homepage': 'catalog_browse'
    };

    const targetKey = aliasMap[actionKey] || 'qr_scans';
    const newCount = await fetchAbacus('hit', targetKey);

    return sendJson(res, 200, {
      success: true,
      action: targetKey,
      count: newCount
    });
  }

  // 2. GET: Return all live counters for Admin Dashboard
  if (req.method === 'GET') {
    try {
      const results = await Promise.all(METRICS.map(k => fetchAbacus('get', k)));
      const stats = {};
      let totalInteractions = 0;

      METRICS.forEach((k, idx) => {
        stats[k] = results[idx] || 0;
        if (k !== 'qr_scans') totalInteractions += (results[idx] || 0);
      });

      stats.total_interactions = totalInteractions;
      stats.updated_at = new Date().toISOString();

      return sendJson(res, 200, {
        success: true,
        stats
      });
    } catch(err) {
      console.error('[API:qr-stats] Error fetching stats:', err);
      return sendJson(res, 500, { success: false, error: 'Could not load stats' });
    }
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS');
  return sendJson(res, 405, { error: 'Method not allowed' });
};
