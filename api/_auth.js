const crypto = require('crypto');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sreedesigners.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.createHash('sha256').update((ADMIN_PASSWORD || 'sree_secure_salt_random_2026') + '_sree_atelier_jwt_salt_2026').digest('hex');

/**
 * Constant-time string comparison using SHA-256 digests to prevent timing attacks.
 */
function timingSafeCompare(a, b) {
  const hashA = crypto.createHash('sha256').update(String(a || '')).digest();
  const hashB = crypto.createHash('sha256').update(String(b || '')).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

/**
 * Encodes string/object into base64url format.
 */
function toBase64Url(input) {
  const str = typeof input === 'string' ? input : JSON.stringify(input);
  return Buffer.from(str, 'utf8').toString('base64url');
}

/**
 * Decodes base64url string to utf-8.
 */
function fromBase64Url(b64url) {
  return Buffer.from(b64url, 'base64url').toString('utf8');
}

/**
 * Issues a cryptographically signed session token with a 24-hour expiration.
 */
function signToken(email, expiresInMs = 24 * 60 * 60 * 1000) {
  const now = Date.now();
  const exp = now + expiresInMs;
  const header = toBase64Url({ alg: 'HS256', typ: 'JWT' });
  const payload = toBase64Url({
    email,
    iat: now,
    exp,
    nonce: crypto.randomBytes(16).toString('hex')
  });
  const data = `${header}.${payload}`;
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return {
    token: `${data}.${sig}`,
    expiresAt: exp
  };
}

/**
 * Verifies the cryptographically signed session token and checks expiry.
 * Returns decoded payload if valid, null otherwise.
 */
function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;
  const data = `${headerB64}.${payloadB64}`;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');

  const bufReceived = Buffer.from(sigB64);
  const bufExpected = Buffer.from(expectedSig);

  if (bufReceived.length !== bufExpected.length || !crypto.timingSafeEqual(bufReceived, bufExpected)) {
    return null; // Signature tampering or mismatch
  }

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64));
    if (!payload || typeof payload !== 'object') return null;
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) {
      return null; // Token expired
    }
    if (!timingSafeCompare(payload.email, ADMIN_EMAIL)) {
      return null; // Email mismatch
    }
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Parse request body safely across Vercel and Node HTTP server.
 */
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

/**
 * Send JSON response supporting both Vercel helper and native Node.
 */
function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

module.exports = {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  SESSION_SECRET,
  timingSafeCompare,
  signToken,
  verifySessionToken,
  parseBody,
  sendJson
};
