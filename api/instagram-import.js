const https = require('https');
const { verifySessionToken, parseBody } = require('./_auth');

// Scraper API Configuration
// Supports RapidAPI (Instagram Scraper API) if configured
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'instagram-scraper-api2.p.rapidapi.com';

function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.end(JSON.stringify(data));
}

function extractShortcode(urlStr) {
  if (!urlStr) return null;
  const str = urlStr.trim();
  // Support /p/CODE, /reel/CODE, /reels/CODE, /tv/CODE, /share/p/CODE, /share/r/CODE
  const match = str.match(/\/(?:p|reel|reels|tv|r)\/([A-Za-z0-9_-]+)/i);
  if (match) return match[1];
  // Support direct shortcode
  if (!str.includes('/') && str.length >= 8 && /^[A-Za-z0-9_-]+$/.test(str)) {
    return str;
  }
  return null;
}

function cleanOgDescription(raw) {
  if (!raw) return '';
  // HTML entity decode
  let text = raw
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#064;/g, '@')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => {
      try { return String.fromCodePoint(parseInt(code, 16)); } catch(e) { return ''; }
    });

  // Strip Instagram boilerplate: e.g. '136 likes, 8 comments - user on May 15, 2022: "Actual caption here"'
  const colonQuoteMatch = text.match(/:\s*\"([\s\S]*)\"/);
  if (colonQuoteMatch && colonQuoteMatch[1]) {
    text = colonQuoteMatch[1].trim();
  }
  return text.trim();
}

async function downloadImageAsBase64(imageUrl) {
  if (!imageUrl) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    clearTimeout(timeout);
    if (!res.ok) return imageUrl; // fallback to raw URL if status not ok
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();
    const b64 = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${b64}`;
  } catch (err) {
    console.warn('Download image as base64 failed:', err.message);
    return imageUrl; // fallback to raw CDN URL
  }
}

function analyzeCaption(caption) {
  const text = (caption || '').toLowerCase();
  
  // 1. Color extraction
  let color = 'Bespoke Designer';
  const colorMap = [
    { key: 'rani pink', label: 'Rani Pink' },
    { key: 'pink', label: 'Rani Pink' },
    { key: 'red', label: 'Bridal Red' },
    { key: 'vermilion', label: 'Vermilion Red' },
    { key: 'wine', label: 'Deep Wine' },
    { key: 'purple', label: 'Royal Purple' },
    { key: 'maroon', label: 'Maroon' },
    { key: 'green', label: 'Emerald Green' },
    { key: 'bottle green', label: 'Bottle Green' },
    { key: 'blue', label: 'Royal Blue' },
    { key: 'navy', label: 'Navy Blue' },
    { key: 'yellow', label: 'Mustard Yellow' }
  ];
  for (const c of colorMap) {
    if (text.includes(c.key)) { color = c.label; break; }
  }

  // 2. Work type & Categories
  const tags = [];
  let workType = 'Hand Embroidered';
  let estPrice = 2800;

  if (text.includes('maggam') || text.includes('bridal') || text.includes('zardozi')) {
    tags.push('Bridal Blouse & Maggam Work');
  }
  if (text.includes('zardozi') || text.includes('kundan') || text.includes('nakshi')) {
    tags.push('Zardozi Work');
    workType = 'Zardozi & Kundan Maggam Work';
    estPrice = 3800;
  }
  if (text.includes('aari') || text.includes('hand embroidery') || text.includes('french knot')) {
    tags.push('Hand Embroidered Blouses');
    if (estPrice < 3200) estPrice = 3200;
  }
  if (text.includes('machine') || text.includes('computer')) {
    tags.push('Machine Embroidered Blouse');
    workType = 'High-Precision Machine Embroidery';
    estPrice = 1800;
  }
  if (text.includes('lehenga')) {
    tags.push('Lehengas & Festive Couture');
    estPrice = 6500;
  }
  if (text.includes('kurti') || text.includes('salwar') || text.includes('chudidhar')) {
    tags.push('Kurtis & Chudidhar');
    estPrice = 1200;
  }

  // Fallback tag if empty
  if (tags.length === 0) {
    tags.push('Bridal Blouse & Maggam Work', 'Hand Embroidered Blouses');
  }

  // 3. Sleeve / Neck feature
  let feature = 'Blouse Designs';
  if (text.includes('puff')) feature = 'Puff Sleeve Blouse Designs';
  else if (text.includes('cutwork')) feature = 'Cutwork Sleeve Blouse Designs';
  else if (text.includes('scallop')) feature = 'Scalloped Neck Blouse Designs';
  else if (text.includes('elbow')) feature = 'Elbow Length Sleeve Blouse Designs';

  const suggestedTitle = `${color} ${feature} | ${workType}`;

  // Clean description from caption (remove excessive hashtags)
  const cleanDesc = (caption || '')
    .replace(/#[\w_]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300);

  return {
    suggestedTitle,
    suggestedPrice: estPrice,
    suggestedTags: tags,
    cleanDesc: cleanDesc || `${color} silk blouse featuring bespoke hand-embroidered artisanal motifs tailored to perfection.`
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed. Use POST.' });
  }

  // Auth check
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  const session = verifySessionToken(token);
  if (!session) {
    return sendJson(res, 401, { error: 'Unauthorized. Admin session required.' });
  }

  try {
    const body = await parseBody(req);
    const postUrl = (body.url || '').trim();
    const shortcode = extractShortcode(postUrl);

    if (!shortcode) {
      return sendJson(res, 400, { error: 'Invalid Instagram URL. Please provide a link like https://www.instagram.com/p/SHORTCODE/ or /reel/SHORTCODE/' });
    }

    // 1. If RapidAPI Key is configured, query the Scraper API
    if (RAPIDAPI_KEY) {
      try {
        const apiUrl = `https://${RAPIDAPI_HOST}/v1/post_info?code_or_id_or_url=${encodeURIComponent(shortcode)}`;
        const apiRes = await fetch(apiUrl, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST
          }
        });

        if (apiRes.ok) {
          const raw = await apiRes.json();
          const postData = raw.data || raw;

          const caption = postData.caption?.text || postData.edge_media_to_caption?.edges?.[0]?.node?.text || '';
          const analysis = analyzeCaption(caption);

          // Extract carousel images (Slide 1, Slide 2, etc.)
          let rawImages = [];
          if (Array.isArray(postData.carousel_media) && postData.carousel_media.length > 0) {
            rawImages = postData.carousel_media.map(m => m.image_versions2?.candidates?.[0]?.url || m.display_url).filter(Boolean);
          } else if (Array.isArray(postData.edge_sidecar_to_children?.edges)) {
            rawImages = postData.edge_sidecar_to_children.edges.map(e => e.node?.display_url).filter(Boolean);
          } else if (postData.image_versions2?.candidates?.[0]?.url) {
            rawImages = [postData.image_versions2.candidates[0].url];
          } else if (postData.display_url) {
            rawImages = [postData.display_url];
          }

          // Download as base64 to ensure permanent storage without CDN expiration
          const downloadedImages = [];
          for (let i = 0; i < Math.min(rawImages.length, 3); i++) {
            const b64 = await downloadImageAsBase64(rawImages[i]);
            if (b64) downloadedImages.push(b64);
          }

          if (downloadedImages.length > 0) {
            return sendJson(res, 200, {
              success: true,
              source: 'rapidapi',
              shortcode,
              images: downloadedImages,
              caption,
              ...analysis
            });
          }
        }
      } catch (scraperErr) {
        console.warn('RapidAPI scraper request failed:', scraperErr.message);
      }
    }

    // 2. Direct Social Crawler OpenGraph extraction
    // Meta renders full og:image and og:description for social crawler user-agents
    try {
      const targetUrl = `https://www.instagram.com/p/${shortcode}/`;
      let igRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      if (!igRes.ok) {
        // Fallback to Twitterbot User-Agent
        igRes = await fetch(targetUrl, {
          headers: {
            'User-Agent': 'Twitterbot/1.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        });
      }

      if (igRes.ok) {
        const html = await igRes.text();
        const ogImgMatch = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                           html.match(/name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
        const ogDescMatch = html.match(/property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                            html.match(/name=["']description["']\s+content=["']([^"']+)["']/i);

        const rawCaption = ogDescMatch ? ogDescMatch[1] : '';
        const cleanCaption = cleanOgDescription(rawCaption);
        const analysis = analyzeCaption(cleanCaption);

        const images = [];
        if (ogImgMatch && ogImgMatch[1]) {
          const rawImgUrl = ogImgMatch[1].replace(/&amp;/g, '&');
          const dataUrl = await downloadImageAsBase64(rawImgUrl);
          if (dataUrl) {
            images.push(dataUrl);
          }
        }

        if (images.length > 0 || cleanCaption) {
          return sendJson(res, 200, {
            success: true,
            source: 'instagram_direct',
            shortcode,
            images,
            caption: cleanCaption,
            ...analysis
          });
        }
      }
    } catch (fallbackErr) {
      console.warn('Direct Instagram crawler fetch failed:', fallbackErr.message);
    }

    // 3. Fallback response if no image or caption was extractable
    const analysis = analyzeCaption(body.caption || '');
    return sendJson(res, 200, {
      success: true,
      source: 'manual_input',
      shortcode,
      images: [],
      message: 'Instagram details prepared. Please pick photo(s) using + Add Photos.',
      ...analysis
    });

  } catch (err) {
    return sendJson(res, 500, { error: err.message });
  }
};
