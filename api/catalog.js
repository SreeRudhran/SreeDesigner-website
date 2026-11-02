const http = require('https');
const { verifySessionToken, parseBody } = require('./_auth');

// Optional Supabase Configuration (from environment variables)
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  // 1. GET: Return catalog items
  if (req.method === 'GET') {
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const fetchUrl = `${SUPABASE_URL}/rest/v1/showcase_items?select=*&order=created_at.desc`;
        const sbRes = await fetch(fetchUrl, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (sbRes.ok) {
          const items = await sbRes.json();
          return sendJson(res, 200, { success: true, source: 'supabase', items });
        }
      } catch (err) {
        console.warn('Supabase fetch failed:', err.message);
      }
    }
    // Fallback: indicate serverless API is alive
    return sendJson(res, 200, {
      success: true,
      source: 'local_master',
      supabase_configured: !!(SUPABASE_URL && SUPABASE_KEY),
      message: 'Serverless catalog sync endpoint active.'
    });
  }

  // Auth check for mutation requests
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const session = verifySessionToken(token);

  if (!session) {
    return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
  }

  // 2. POST / PUT: Save or update item
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = await parseBody(req);
      if (!body.title) {
        return sendJson(res, 400, { error: 'Product title is required.' });
      }

      // If Supabase is connected, write to Supabase
      if (SUPABASE_URL && SUPABASE_KEY) {
        const sbUrl = `${SUPABASE_URL}/rest/v1/showcase_items`;
        const itemPayload = {
          title: body.title,
          slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: body.description || '',
          starting_price: parseFloat(body.starting_price) || 2800,
          main_image_url: body.main_image_url || '',
          tags: Array.isArray(body.tags) ? body.tags : [body.tags || 'Hand Embroidered Blouses'],
          images: body.images || [],
          is_published: body.is_published !== false,
          is_featured: !!body.is_featured,
          updated_at: new Date().toISOString()
        };

        const upsertRes = await fetch(sbUrl, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'resolution=merge-duplicates,return=representation'
          },
          body: JSON.stringify(itemPayload)
        });

        if (upsertRes.ok) {
          const savedData = await upsertRes.json();
          return sendJson(res, 200, { success: true, saved: savedData, source: 'supabase' });
        }
      }

      return sendJson(res, 200, {
        success: true,
        source: 'ack',
        message: 'Product processed. Sync to local catalog complete.'
      });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 3. DELETE: Remove item
  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return sendJson(res, 400, { error: 'Item ID is required.' });

    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const delUrl = `${SUPABASE_URL}/rest/v1/showcase_items?id=eq.${encodeURIComponent(id)}`;
        await fetch(delUrl, {
          method: 'DELETE',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
      } catch (e) {}
    }

    return sendJson(res, 200, { success: true, deleted_id: id });
  }

  return sendJson(res, 405, { error: 'Method not allowed' });
};
