const { verifySessionToken, parseBody } = require('./_auth');

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

  // 1. GET: Return reviews
  if (req.method === 'GET') {
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const fetchUrl = `${SUPABASE_URL}/rest/v1/testimonials?select=*&order=created_at.desc`;
        const sbRes = await fetch(fetchUrl, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (sbRes.ok) {
          const reviews = await sbRes.json();
          return sendJson(res, 200, { success: true, source: 'supabase', reviews });
        }
      } catch (err) {
        console.warn('Supabase reviews fetch failed:', err.message);
      }
    }
    return sendJson(res, 200, {
      success: true,
      source: 'local_master',
      supabase_configured: !!(SUPABASE_URL && SUPABASE_KEY),
      message: 'Serverless reviews sync endpoint active.'
    });
  }

  // Auth check for mutations
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const session = verifySessionToken(token);

  if (!session) {
    return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
  }

  // 2. POST: Create review
  if (req.method === 'POST') {
    try {
      const body = await parseBody(req);
      if (!body.customer_name || !body.review_text) {
        return sendJson(res, 400, { error: 'Customer name and review text are required.' });
      }

      if (SUPABASE_URL && SUPABASE_KEY) {
        const sbUrl = `${SUPABASE_URL}/rest/v1/testimonials`;
        const payload = {
          customer_name: body.customer_name,
          location: body.location || 'Coimbatore',
          rating: parseInt(body.rating) || 5,
          work_type: body.work_type || 'Bridal Blouse',
          review_text: body.review_text,
          branch: body.branch || 'Samalapuram',
          is_featured: !!body.is_featured,
          created_at: new Date().toISOString()
        };

        const insertRes = await fetch(sbUrl, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(payload)
        });

        if (insertRes.ok) {
          const savedData = await insertRes.json();
          return sendJson(res, 200, { success: true, saved: savedData, source: 'supabase' });
        }
      }

      return sendJson(res, 200, { success: true, source: 'ack', message: 'Review saved.' });
    } catch (err) {
      return sendJson(res, 500, { error: err.message });
    }
  }

  // 3. DELETE: Remove review
  if (req.method === 'DELETE') {
    const id = req.query?.id;
    if (!id) return sendJson(res, 400, { error: 'Review ID is required.' });

    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const delUrl = `${SUPABASE_URL}/rest/v1/testimonials?id=eq.${encodeURIComponent(id)}`;
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
