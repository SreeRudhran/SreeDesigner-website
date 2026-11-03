const https = require('https');
const { verifySessionToken, parseBody } = require('./_auth');

// Scraper API Configuration
// Supports RapidAPI (Instagram Scraper API) or Apify
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
  const match = urlStr.match(/\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
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
  const cleanDesc = caption
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
          let images = [];
          if (Array.isArray(postData.carousel_media) && postData.carousel_media.length > 0) {
            images = postData.carousel_media.map(m => m.image_versions2?.candidates?.[0]?.url || m.display_url).filter(Boolean);
          } else if (Array.isArray(postData.edge_sidecar_to_children?.edges)) {
            images = postData.edge_sidecar_to_children.edges.map(e => e.node?.display_url).filter(Boolean);
          } else if (postData.image_versions2?.candidates?.[0]?.url) {
            images = [postData.image_versions2.candidates[0].url];
          } else if (postData.display_url) {
            images = [postData.display_url];
          }

          return sendJson(res, 200, {
            success: true,
            source: 'rapidapi',
            shortcode,
            images,
            caption,
            ...analysis
          });
        }
      } catch (scraperErr) {
        console.warn('RapidAPI scraper request failed:', scraperErr.message);
      }
    }

    // 2. Direct oEmbed fallback (Meta official oEmbed for public posts)
    try {
      const oembedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
      const oembedRes = await fetch(oembedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (oembedRes.ok) {
        const html = await oembedRes.text();
        const ogImgMatch = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i);
        const ogDescMatch = html.match(/property=["']og:description["']\s+content=["']([^"']+)["']/i);
        const caption = ogDescMatch ? ogDescMatch[1].replace(/&#39;/g, "'").replace(/&quot;/g, '"') : '';
        const analysis = analyzeCaption(caption);

        const images = [];
        if (ogImgMatch && ogImgMatch[1]) {
          images.push(ogImgMatch[1]);
        }

        return sendJson(res, 200, {
          success: true,
          source: 'oembed_fallback',
          shortcode,
          images,
          caption,
          ...analysis
        });
      }
    } catch (fallbackErr) {
      console.warn('Fallback oembed failed:', fallbackErr.message);
    }

    // Default friendly response if scraper is waiting for API configuration
    const analysis = analyzeCaption(body.caption || '');
    return sendJson(res, 200, {
      success: true,
      source: 'manual_input',
      shortcode,
      images: [],
      message: 'Scraper API key ready to be configured. Enter caption or upload slides.',
      ...analysis
    });

  } catch (err) {
    return sendJson(res, 500, { error: err.message });
  }
};
