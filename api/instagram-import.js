const https = require('https');
const { verifySessionToken, parseBody } = require('./_auth');

// Scraper API Configuration (supports RapidAPI if configured)
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

function extractJsonObject(str) {
  let start = str.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = start; i < str.length; i++) {
    const char = str[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0) {
          const jsonSub = str.slice(start, i + 1);
          try {
            return JSON.parse(jsonSub);
          } catch(e) {
            return null;
          }
        }
      }
    }
  }
  return null;
}

function findShortcodeMedia(obj) {
  if (!obj || typeof obj !== 'object') return null;
  if (obj.shortcode_media) return obj.shortcode_media;
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const res = findShortcodeMedia(item);
      if (res) return res;
    }
  } else {
    for (const k of Object.keys(obj)) {
      if (typeof obj[k] === 'string' && obj[k].includes('shortcode_media')) {
        try {
          const inner = JSON.parse(obj[k]);
          const res = findShortcodeMedia(inner);
          if (res) return res;
        } catch(e) {}
      }
      const res = findShortcodeMedia(obj[k]);
      if (res) return res;
    }
  }
  return null;
}

function pickBestImageUrl(node) {
  if (!node) return null;
  if (Array.isArray(node.display_resources) && node.display_resources.length > 0) {
    const sorted = [...node.display_resources].sort((a, b) => b.config_width - a.config_width);
    const optimal = sorted.find(r => r.config_width <= 1200 && r.config_width >= 640);
    if (optimal) return optimal.src;
    return sorted[0].src;
  }
  return node.display_url || null;
}

function cleanOgDescription(raw) {
  if (!raw) return '';
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
    const timeout = setTimeout(() => controller.abort(), 9000);
    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    clearTimeout(timeout);
    if (!res.ok) return imageUrl;
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    const buffer = await res.arrayBuffer();
    const b64 = Buffer.from(buffer).toString('base64');
    return `data:${contentType};base64,${b64}`;
  } catch (err) {
    console.warn('Download image as base64 failed:', err.message);
    return imageUrl;
  }
}

function analyzeCaption(caption) {
  const text = (caption || '').toLowerCase();
  
  // 1. Color extraction
  let color = 'Designer';
  const colorMap = [
    { key: 'deep purple', label: 'Deep Purple' },
    { key: 'purple', label: 'Royal Purple' },
    { key: 'plum', label: 'Plum Purple' },
    { key: 'wine', label: 'Wine Maroon' },
    { key: 'rani pink', label: 'Rani Pink' },
    { key: 'magenta', label: 'Magenta Pink' },
    { key: 'pink', label: 'Rani Pink' },
    { key: 'bridal red', label: 'Bridal Red' },
    { key: 'vermilion', label: 'Bright Red' },
    { key: 'maroon', label: 'Maroon' },
    { key: 'red', label: 'Bridal Red' },
    { key: 'emerald green', label: 'Emerald Green' },
    { key: 'bottle green', label: 'Bottle Green' },
    { key: 'teal', label: 'Teal Green' },
    { key: 'green', label: 'Emerald Green' },
    { key: 'royal blue', label: 'Royal Blue' },
    { key: 'navy', label: 'Navy Blue' },
    { key: 'blue', label: 'Royal Blue' },
    { key: 'mustard', label: 'Mustard Yellow' },
    { key: 'yellow', label: 'Yellow' },
    { key: 'gold', label: 'Antique Gold' },
    { key: 'black', label: 'Black' },
    { key: 'white', label: 'Ivory White' },
    { key: 'silver', label: 'Silver Grey' }
  ];
  for (const c of colorMap) {
    if (text.includes(c.key)) { color = c.label; break; }
  }

  // 2. Garment Category Tags
  const categoryTags = [];
  let estPrice = 2800;

  if (text.includes('maggam') || text.includes('bridal') || text.includes('wedding') || text.includes('muhurtham')) {
    categoryTags.push('Bridal Blouse & Maggam Work');
    estPrice = 3800;
  }
  if (text.includes('zardozi') || text.includes('zari') || text.includes('wirework')) {
    categoryTags.push('Zardozi Work');
    if (estPrice < 3500) estPrice = 3500;
  }
  if (text.includes('aari') || text.includes('hand embroidery') || text.includes('french knot') || text.includes('embroidery')) {
    if (!categoryTags.includes('Hand Embroidered Blouses')) categoryTags.push('Hand Embroidered Blouses');
    if (estPrice < 2800) estPrice = 2800;
  }
  if (text.includes('machine') || text.includes('computer')) {
    categoryTags.push('Machine Embroidered Blouse');
    estPrice = 1800;
  }
  if (text.includes('lehenga')) {
    categoryTags.push('Lehengas & Festive Couture');
    estPrice = 6500;
  }
  if (text.includes('kurti') || text.includes('salwar') || text.includes('chudidhar')) {
    categoryTags.push('Kurtis & Chudidhar');
    estPrice = 1200;
  }
  if (text.includes('alteration') || text.includes('tassel') || text.includes('kuchu')) {
    categoryTags.push('Bridal Saree Alterations & Tassels');
    if (estPrice > 1500) estPrice = 1200;
  }

  // Default fallback category if empty
  if (categoryTags.length === 0) {
    categoryTags.push('Bridal Blouse & Maggam Work', 'Hand Embroidered Blouses');
  }

  // 3. Design Tags (Necklines, Sleeves, Work Types)
  const designTags = [];

  // 3a. Necklines
  let detectedNeck = '';
  if (text.includes('boat neck') || text.includes('boatneck') || text.includes('boat')) {
    designTags.push('Boat Neck');
    detectedNeck = 'Boat Neck';
  } else if (text.includes('v neck') || text.includes('v-neck') || text.includes('deep v')) {
    designTags.push('V-Neck');
    detectedNeck = 'V-Neck';
  } else if (text.includes('sweetheart')) {
    designTags.push('Sweetheart Neck');
    detectedNeck = 'Sweetheart Neck';
  } else if (text.includes('keyhole') || text.includes('cutout back') || text.includes('teardrop')) {
    designTags.push('Keyhole Back');
    detectedNeck = 'Keyhole Back';
  } else if (text.includes('high neck') || text.includes('collar')) {
    designTags.push('High Neck / Collar');
    detectedNeck = 'High Neck';
  } else if (text.includes('round neck') || text.includes('u neck') || text.includes('u-neck') || text.includes('pot neck')) {
    designTags.push('Round / U-Neck');
    detectedNeck = 'U-Neck';
  }

  // 3b. Sleeves
  let detectedSleeve = '';
  if (text.includes('puff') || text.includes('puffed') || text.includes('balloon')) {
    designTags.push('Puff Sleeve');
    detectedSleeve = 'Puff Sleeve';
  } else if (text.includes('elbow') || text.includes('elbow length')) {
    designTags.push('Elbow Length Sleeve');
    detectedSleeve = 'Elbow Sleeve';
  } else if (text.includes('net sleeve') || text.includes('tissue sleeve') || text.includes('sheer sleeve') || text.includes('sheer')) {
    designTags.push('Sheer / Net Sleeve');
    detectedSleeve = 'Net Sleeve';
  } else if (text.includes('cap sleeve') || text.includes('short sleeve')) {
    designTags.push('Cap Sleeve');
    detectedSleeve = 'Cap Sleeve';
  }

  // 3c. Work Details
  let detectedWork = 'Hand Embroidery';
  if (text.includes('cutwork') || text.includes('cut work') || text.includes('scallop') || text.includes('scalloped')) {
    designTags.push('Cutwork');
  }
  if (text.includes('zardozi')) {
    designTags.push('Zardozi Work');
    detectedWork = 'Heavy Zardozi Work';
  } else if (text.includes('maggam')) {
    designTags.push('Maggam Work');
    detectedWork = 'Heavy Maggam Work';
  } else if (text.includes('aari')) {
    designTags.push('Aari Work');
    detectedWork = 'Hand Aari Work';
  } else if (text.includes('machine') || text.includes('computer')) {
    designTags.push('Machine Embroidery');
    detectedWork = 'Machine Embroidery';
  }

  if (text.includes('kundan') || text.includes('stone') || text.includes('bead') || text.includes('cutdana')) {
    designTags.push('Kundan / Stone Work');
  }

  // 4. Generate Simple High-Search-Intent Title
  // Format: [Color] [Neckline/Sleeve] Blouse Design with [Work Type]
  let designFeature = '';
  if (detectedNeck && detectedSleeve) {
    designFeature = `${detectedNeck} & ${detectedSleeve}`;
  } else if (detectedNeck) {
    designFeature = detectedNeck;
  } else if (detectedSleeve) {
    designFeature = detectedSleeve;
  } else if (designTags.includes('Cutwork')) {
    designFeature = 'Cutwork';
  }

  let suggestedTitle = '';
  if (text.includes('lehenga')) {
    suggestedTitle = `${color} Bridal Lehenga with ${detectedWork}`;
  } else if (text.includes('kurti') || text.includes('salwar')) {
    suggestedTitle = `${color} Designer Kurti Suit with ${detectedWork}`;
  } else {
    if (designFeature) {
      suggestedTitle = `${color} ${designFeature} Blouse Design with ${detectedWork}`;
    } else {
      suggestedTitle = `${color} Blouse Design with ${detectedWork}`;
    }
  }

  // 5. Clean, Simple, Customer-Focused Description
  let baseCaption = (caption || '')
    .replace(/#[\w_]+/g, '')
    .replace(/[^\x00-\x7F\u0B80-\u0BFF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240);

  let cleanDesc = '';
  if (baseCaption && baseCaption.length > 25) {
    cleanDesc = `${baseCaption}\n\n• Style & Fit: Custom tailored blouse with soft cotton inner lining, comfortable padded cups, and side margins for easy alterations.\n• Work: ${detectedWork} crafted by experienced boutique artisans in Coimbatore.`;
  } else {
    const neckDesc = detectedNeck ? `${detectedNeck} pattern` : 'Classic neckline';
    const sleeveDesc = detectedSleeve ? `${detectedSleeve}s` : 'comfortable sleeves';
    cleanDesc = `• Design: Beautiful ${color.toLowerCase()} blouse featuring an elegant ${neckDesc} with ${sleeveDesc}.\n• Embroidery: Fine ${detectedWork.toLowerCase()} detailed with gold zari, beads, and stone work.\n• Fabric & Material: Pure raw silk tailored with soft cotton inner lining and padded cups.\n• Fitting Assurance: Perfect bridal fitting with extra inner margins for easy size adjustment.`;
  }

  return {
    suggestedTitle,
    suggestedPrice: estPrice,
    suggestedTags: categoryTags,
    suggestedDesignTags: designTags,
    cleanDesc
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

    // 1. Primary Method: Direct Embed ServerJS Parser
    // Extracts true full-resolution slide photos in their original ratio (Slide 1, Slide 2, etc.)
    try {
      const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
      const embedRes = await fetch(embedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (embedRes.ok) {
        const html = await embedRes.text();
        let scMedia = null;

        const handleIdx = html.indexOf('s.handle(');
        if (handleIdx !== -1) {
          const parsed = extractJsonObject(html.slice(handleIdx + 8));
          if (parsed) {
            scMedia = findShortcodeMedia(parsed);
          }
        }

        if (scMedia) {
          let rawSlideUrls = [];
          if (scMedia.edge_sidecar_to_children?.edges?.length > 0) {
            // Multi-slide Carousel post: extract all slides in original ratio
            rawSlideUrls = scMedia.edge_sidecar_to_children.edges
              .map(e => pickBestImageUrl(e.node))
              .filter(Boolean);
          } else {
            // Single image or video post
            const mainImg = pickBestImageUrl(scMedia);
            if (mainImg) rawSlideUrls.push(mainImg);
          }

          const rawCaption = scMedia.edge_media_to_caption?.edges?.[0]?.node?.text || '';
          const cleanCaption = cleanOgDescription(rawCaption);
          const analysis = analyzeCaption(cleanCaption);

          // Download all extracted slide photos as permanent base64 data URLs (up to 4 slides)
          const downloadedImages = [];
          for (let i = 0; i < Math.min(rawSlideUrls.length, 4); i++) {
            const b64 = await downloadImageAsBase64(rawSlideUrls[i]);
            if (b64) downloadedImages.push(b64);
          }

          if (downloadedImages.length > 0) {
            return sendJson(res, 200, {
              success: true,
              source: 'instagram_embed_sidecar',
              shortcode,
              images: downloadedImages,
              caption: cleanCaption,
              ...analysis
            });
          }
        }
      }
    } catch (embedErr) {
      console.warn('Embed ServerJS extraction failed, trying fallbacks:', embedErr.message);
    }

    // 2. Secondary Method: RapidAPI (if configured in environment variables)
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

          const downloadedImages = [];
          for (let i = 0; i < Math.min(rawImages.length, 4); i++) {
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

    // 3. Tertiary Method: Social Crawler OpenGraph extraction
    try {
      const targetUrl = `https://www.instagram.com/p/${shortcode}/`;
      let igRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });

      if (!igRes.ok) {
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
          if (dataUrl) images.push(dataUrl);
        }

        if (images.length > 0 || cleanCaption) {
          return sendJson(res, 200, {
            success: true,
            source: 'instagram_opengraph',
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

    // 4. Default fallback if Meta strictly blocked all scrapers
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
