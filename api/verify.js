const {
  verifySessionToken,
  parseBody,
  sendJson
} = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    let token = null;

    // 1. Authorization header: Bearer <token>
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    }

    // 2. Fallback to POST body
    if (!token && req.method === 'POST') {
      const body = await parseBody(req);
      if (body && typeof body.token === 'string') {
        token = body.token.trim();
      }
    }

    // 3. Fallback to query param
    if (!token && req.query && typeof req.query.token === 'string') {
      token = req.query.token.trim();
    }

    if (!token) {
      return sendJson(res, 401, { valid: false, error: 'Authentication token is required' });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return sendJson(res, 401, { valid: false, error: 'Session expired or token is invalid' });
    }

    return sendJson(res, 200, {
      valid: true,
      email: payload.email,
      expiresAt: payload.exp
    });
  } catch (err) {
    console.error('[API:verify] Internal error:', err);
    return sendJson(res, 500, { valid: false, error: 'Authentication verification error' });
  }
};
