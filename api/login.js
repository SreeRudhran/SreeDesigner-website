const {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  timingSafeCompare,
  signToken,
  parseBody,
  sendJson
} = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = await parseBody(req);
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return sendJson(res, 400, { error: 'Email and password are required' });
    }

    if (email.length > 256 || password.length > 256) {
      return sendJson(res, 400, { error: 'Input length exceeds allowable limit' });
    }

    if (!ADMIN_PASSWORD) {
      console.error('[API:login] ADMIN_PASSWORD environment variable is not configured.');
      return sendJson(res, 500, { error: 'Authentication service not configured. Please set ADMIN_PASSWORD in environment variables.' });
    }

    const isEmailMatch = timingSafeCompare(email.trim().toLowerCase(), ADMIN_EMAIL.trim().toLowerCase());
    const isPassMatch  = timingSafeCompare(password.trim(), ADMIN_PASSWORD.trim());

    if (!isEmailMatch || !isPassMatch) {
      // Mitigate brute-force credential stuffing with artificial delay
      await new Promise(r => setTimeout(r, 300));
      return sendJson(res, 401, { error: 'Invalid email or password' });
    }

    const { token, expiresAt } = signToken(ADMIN_EMAIL);

    return sendJson(res, 200, {
      success: true,
      token,
      email: ADMIN_EMAIL,
      expiresAt
    });
  } catch (err) {
    console.error('[API:login] Internal error:', err);
    return sendJson(res, 500, { error: 'Authentication service error' });
  }
};
