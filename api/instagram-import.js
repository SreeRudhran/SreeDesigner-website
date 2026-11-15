const https = require('https');
const { verifySessionToken, parseBody } = require('./_auth');

// AI & Scraper Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
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
  const match = str.match(/\/(?:p|reel|reels|tv|r)\/([A-Za-z0-9_-]+)/i);
  if (match) return match[1];
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
          } catch (e) {
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
  if (obj.graphql?.shortcode_media) return obj.graphql.shortcode_media;

  for (const key of Object.keys(obj)) {
    try {
      const found = findShortcodeMedia(obj[key]);
      if (found) return found;
    } catch (e) {}
  }
  return null;
}

function decodeHtmlEntities(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    // Hexadecimal character references: &#x1F470; -> 👰
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        const code = parseInt(hex, 16);
        if (code > 0 && code <= 0x10FFFF) return String.fromCodePoint(code);
      } catch (e) {}
      return ' ';
    })
    // Decimal character references: &#128112; -> 👰
    .replace(/&#([0-9]+);/g, (_, dec) => {
      try {
        const code = parseInt(dec, 10);
        if (code > 0 && code <= 0x10FFFF) return String.fromCodePoint(code);
      } catch (e) {}
      return ' ';
    })
    // Standard HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    // Lingering orphan &; or repeated &;&;&;
    .replace(/(?:&;)+/g, ' ')
    .replace(/&[a-zA-Z0-9#_]+;/g, ' ');
}

function cleanCaptionText(raw) {
  if (!raw || typeof raw !== 'string') return '';
  let str = decodeHtmlEntities(raw);
  // Strip Instagram scraper prefix junk (e.g. '6 likes, 0 comments - sreedesigner_ on November 11, 2026: "')
  str = str.replace(/^(?:\d+[\d,]*\s+likes?,\s*\d+[\d,]*\s+comments?\s*-\s*)?[^\n:]+on\s+[A-Za-z]+\s+\d+,\s*\d{4}:\s*["“]?/i, '');
  str = str.replace(/^.*?on Instagram:\s*["“]?/i, '');
  str = str.replace(/^(?:\d+[\d,]*\s+likes?,\s*\d+[\d,]*\s+comments?\s*-\s*)/i, '');
  // Safely strip hashtags (must be preceded by whitespace or start of line)
  str = str.replace(/(?:^|\s)#[A-Za-z0-9_\u0B80-\u0BFF]+/g, ' ');
  // Clean emoji/pictographs cleanly into spaces so no symbol wreckage remains
  str = str.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, ' ');
  // Wipe any residual &; or malformed entity debris
  str = str.replace(/(?:&;)+/g, ' ');
  str = str.replace(/&[a-zA-Z0-9#_]+;/g, ' ');
  // Fix spacing around punctuation marks
  str = str.replace(/\s+([.,!?:])/g, '$1');
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

function cleanOgDescription(desc) {
  if (!desc) return '';
  let str = decodeHtmlEntities(desc);
  // Strip Instagram scraper prefix junk (e.g. '6 likes, 0 comments - sreedesigner_ on November 11, 2026: "' or 'on Instagram: "')
  str = str.replace(/^(?:\d+[\d,]*\s+likes?,\s*\d+[\d,]*\s+comments?\s*-\s*)?[^\n:]+on\s+[A-Za-z]+\s+\d+,\s*\d{4}:\s*["“]?/i, '');
  str = str.replace(/^.*?on Instagram:\s*["“]?/i, '');
  str = str.replace(/^(?:\d+[\d,]*\s+likes?,\s*\d+[\d,]*\s+comments?\s*-\s*)/i, '');
  str = str.replace(/["”]?\s*$/, '');
  str = str.replace(/[\r\n]+/g, ' ');
  str = str.replace(/(?:&;)+/g, ' ');
  str = str.replace(/\s+/g, ' ').trim();
  return str;
}

function pickBestImageUrl(node) {
  if (!node) return null;
  if (node.display_url) return node.display_url;
  if (Array.isArray(node.display_resources) && node.display_resources.length > 0) {
    return node.display_resources[node.display_resources.length - 1].src;
  }
  if (Array.isArray(node.image_versions2?.candidates) && node.image_versions2.candidates.length > 0) {
    return node.image_versions2.candidates[0].url;
  }
  return null;
}

async function downloadImageAsBase64(imageUrl) {
  if (!imageUrl) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(imageUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
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

// ─── BUILT-IN SMART PATTERN ANALYZER (FAST, 0MS, HIGH ACCURACY) ──────────────
function analyzeCaption(caption) {
  const text = (caption || '').toLowerCase();
  
  // 1. Color extraction (using regex word boundaries to avoid false positives like 'paired' triggering 'red')
  let color = 'Designer';
  const colorMap = [
    { regex: /\b(pastel green|mint green|pistachio green|pista green)\b/i, label: 'Pastel Green' },
    { regex: /\b(bottle green|dark green)\b/i, label: 'Bottle Green' },
    { regex: /\b(emerald green)\b/i, label: 'Emerald Green' },
    { regex: /\b(peacock green)\b/i, label: 'Peacock Green' },
    { regex: /\b(teal green|teal)\b/i, label: 'Teal Green' },
    { regex: /\b(lime green|olive green|green)\b/i, label: 'Green' },
    { regex: /\b(royal purple|deep purple|purple)\b/i, label: 'Royal Purple' },
    { regex: /\b(plum|wine maroon|wine)\b/i, label: 'Wine Purple' },
    { regex: /\b(rani pink|magenta pink|magenta|hot pink)\b/i, label: 'Rani Pink' },
    { regex: /\b(baby pink|pastel pink|pink)\b/i, label: 'Pastel Pink' },
    { regex: /\b(bridal red|crimson red|crimson|vermilion|maroon|ruby red|dark red)\b/i, label: 'Bridal Red' },
    { regex: /\bred\b/i, label: 'Red' },
    { regex: /\b(royal blue|navy blue|navy|sky blue|blue)\b/i, label: 'Royal Blue' },
    { regex: /\b(mustard yellow|mustard|haldi yellow|haldi|yellow)\b/i, label: 'Mustard Yellow' },
    { regex: /\b(antique gold|gold zari|gold|golden)\b/i, label: 'Antique Gold' },
    { regex: /\b(copper bronze|copper)\b/i, label: 'Copper Bronze' },
    { regex: /\b(black)\b/i, label: 'Black' },
    { regex: /\b(ivory white|ivory|white)\b/i, label: 'Ivory White' },
    { regex: /\b(silver grey|silver|grey|gray)\b/i, label: 'Silver Grey' }
  ];
  for (const c of colorMap) {
    if (c.regex.test(text)) { color = c.label; break; }
  }

  // 2. Garment Category Tags
  const categoryTags = [];
  let estPrice = 2400;

  if (text.includes('maggam') || text.includes('bridal') || text.includes('wedding') || text.includes('muhurtham')) {
    categoryTags.push('Bridal Blouse & Maggam Work');
    estPrice = 3200;
  }
  if (text.includes('zardozi') || text.includes('zari') || text.includes('wirework')) {
    categoryTags.push('Zardozi Work');
    if (estPrice < 2800) estPrice = 2800;
  }
  if (text.includes('aari') || text.includes('hand embroidery') || text.includes('french knot') || text.includes('embroidery')) {
    if (!categoryTags.includes('Hand Embroidered Blouses')) categoryTags.push('Hand Embroidered Blouses');
    if (estPrice < 2400) estPrice = 2400;
  }
  if (text.includes('machine') || text.includes('computer')) {
    categoryTags.push('Machine Embroidered Blouse');
    estPrice = 1800;
  }
  if (text.includes('lehenga') || text.includes('skirt')) {
    categoryTags.push('Lehengas & Festive Couture');
    estPrice = 6500;
  }
  if (text.includes('kurti') || text.includes('salwar') || text.includes('chudidhar')) {
    categoryTags.push('Kurtis & Chudidhar');
    estPrice = 1200;
  }
  if (text.includes('alteration') || text.includes('tassel') || text.includes('kuchu') || text.includes('latkan')) {
    categoryTags.push('Bridal Saree Alterations & Tassels');
  }

  // Default fallback category if empty
  if (categoryTags.length === 0) {
    categoryTags.push('Bridal Blouse & Maggam Work', 'Hand Embroidered Blouses');
  }

  // 3. Design Tags (Necklines, Sleeves, Work Types)
  const designTags = [];

  // 3a. Necklines & Backs
  let detectedNeck = '';
  if (/\b(tie-up|tie up|tassel|latkan|latkans)\b/i.test(text)) {
    designTags.push('Tie-Up Back');
    detectedNeck = 'Tie-Up Back';
  } else if (/\b(boat neck|boatneck|boat)\b/i.test(text)) {
    designTags.push('Boat Neck');
    detectedNeck = 'Boat Neck';
  } else if (/\b(v neck|v-neck|deep v)\b/i.test(text)) {
    designTags.push('V-Neck');
    detectedNeck = 'V-Neck';
  } else if (/\b(sweetheart)\b/i.test(text)) {
    designTags.push('Sweetheart Neck');
    detectedNeck = 'Sweetheart Neck';
  } else if (/\b(square neck|square)\b/i.test(text)) {
    designTags.push('Square Neck');
    detectedNeck = 'Square Neck';
  } else if (/\b(collar|chinese collar|mandarin)\b/i.test(text)) {
    designTags.push('High Neck / Collar');
    detectedNeck = 'Collar Neck';
  } else if (/\b(keyhole|cutout back|teardrop)\b/i.test(text)) {
    designTags.push('Keyhole Back');
    detectedNeck = 'Keyhole Back';
  } else if (/\b(round neck|u neck|u-neck|pot neck)\b/i.test(text)) {
    designTags.push('Round / U-Neck');
    detectedNeck = 'U-Neck';
  }

  // 3b. Sleeves
  let detectedSleeve = '';
  if (/\b(brocade sleeve|brocade sleeves|brocade)\b/i.test(text)) {
    designTags.push('Brocade Sleeve');
    detectedSleeve = 'Brocade Sleeves';
  } else if (/\b(puff|puffed|balloon)\b/i.test(text)) {
    designTags.push('Puff Sleeve');
    detectedSleeve = 'Puff Sleeves';
  } else if (/\b(elbow|elbow length)\b/i.test(text)) {
    designTags.push('Elbow Length Sleeve');
    detectedSleeve = 'Elbow Sleeves';
  } else if (/\b(net sleeve|tissue sleeve|sheer sleeve|sheer)\b/i.test(text)) {
    designTags.push('Sheer / Net Sleeve');
    detectedSleeve = 'Net Sleeves';
  } else if (/\b(cap sleeve|short sleeve)\b/i.test(text)) {
    designTags.push('Cap Sleeve');
    detectedSleeve = 'Cap Sleeves';
  } else if (/\b(sleeveless|strap)\b/i.test(text)) {
    designTags.push('Sleeveless');
    detectedSleeve = 'Sleeveless';
  } else if (/\b(full sleeve|long sleeve)\b/i.test(text)) {
    designTags.push('Full Sleeve');
    detectedSleeve = 'Full Sleeves';
  } else if (/\b(ruffle|frill)\b/i.test(text)) {
    designTags.push('Ruffle Sleeve');
    detectedSleeve = 'Ruffle Sleeves';
  }

  // 3c. Work Details
  let detectedWork = 'Hand Aari Work';
  if (/\bcutwork\b/i.test(text) || /\bcut work\b/i.test(text) || /\bscallop\b/i.test(text)) {
    designTags.push('Cutwork');
  }
  if (/\bzardozi\b/i.test(text) && (/\baari\b/i.test(text) || /\bmaggam\b/i.test(text))) {
    designTags.push('Zardozi Work', 'Aari Work');
    detectedWork = 'Aari & Zardozi Work';
  } else if (/\bzardozi\b/i.test(text)) {
    designTags.push('Zardozi Work');
    detectedWork = 'Heavy Zardozi Work';
  } else if (/\bmaggam\b/i.test(text)) {
    designTags.push('Maggam Work');
    detectedWork = 'Gold Maggam Work';
  } else if (/\baari\b/i.test(text)) {
    designTags.push('Aari Work');
    detectedWork = 'Hand Aari Work';
  } else if (/\bmachine\b/i.test(text) || /\bcomputer\b/i.test(text)) {
    designTags.push('Machine Embroidery');
    detectedWork = 'Machine Embroidery';
  }

  if (text.includes('kundan') || text.includes('stone') || text.includes('cutdana')) {
    designTags.push('Kundan / Stone Work');
  }
  if (text.includes('pearl') || text.includes('muthu') || text.includes('bead')) {
    designTags.push('Pearl / Bead Work');
  }
  if (text.includes('thread') || text.includes('french knot') || text.includes('resham')) {
    designTags.push('Thread / Resham Work');
  }

  // 4. Generate Simple, Natural, High-Volume Search Title
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

  // 5. Clean, Simple, Customer-Focused Description (Zero Complicated Jargon)
  let baseCaption = cleanCaptionText(caption)
    .replace(/(?:&;)+/g, ' ')
    .replace(/\s+([.,!?:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240);

  let cleanDesc = '';
  const neckDesc = detectedNeck ? `${detectedNeck} pattern` : 'Classic comfortable neckline';
  const sleeveDesc = detectedSleeve ? `${detectedSleeve}s` : 'comfortable sleeves';

  if (baseCaption && baseCaption.length > 30) {
    cleanDesc = `${baseCaption}\n\n• Design: ${neckDesc} with ${sleeveDesc}.\n• Embroidery Work: ${detectedWork} crafted by experienced boutique artisans in Coimbatore.\n• Fabric & Lining: Pure silk fabric with soft cotton inner lining and padded cups.\n• Stitching & Fit: Custom tailored with 2-inch inner margins for easy size adjustment.`;
  } else {
    cleanDesc = `• Design: Beautiful ${color.toLowerCase()} blouse featuring an elegant ${neckDesc} with ${sleeveDesc}.\n• Embroidery Work: Fine ${detectedWork.toLowerCase()} detailed with gold zari, beads, and stone work.\n• Fabric & Lining: Pure raw silk tailored with soft cotton inner lining and padded cups.\n• Fitting Assurance: Perfect bridal fitting with extra inner margins for easy size adjustment.`;
  }

  return {
    suggestedTitle,
    suggestedPrice: estPrice,
    suggestedTags: categoryTags,
    suggestedDesignTags: designTags,
    cleanDesc
  };
}

// ─── GEMINI 2.0 FLASH / PRO MULTIMODAL API (OPTIONAL DEEP ENHANCEMENT) ────────
async function callGemini(caption, sampleImageBase64) {
  if (!GEMINI_API_KEY) return null;

  try {
    const parts = [
      {
        text: `You are an expert South Indian boutique stylist for Sree Designers & Boutique in Coimbatore & Tiruppur.
Analyze the following Instagram blouse post caption and details:
"${caption}"

Output strict JSON with these exact fields:
{
  "suggestedTitle": "Simple, natural, customer-focused search title. Detect the primary blouse color from the caption/image (e.g. Pastel Green, Bottle Green, Royal Blue, Rani Pink, Bridal Red, Mustard Yellow). Format: [Detected Color] [Neck/Sleeve Style if present] Blouse Design with [Detected Work Type]. STRICT REQUIREMENT: NEVER use complex or pompous words like 'opulent', 'sartorial', 'ethereal', 'resplendent', 'tapestry'.",
  "suggestedPrice": 3800,
  "suggestedTags": ["Bridal Blouse & Maggam Work", "Hand Embroidered Blouses"],
  "suggestedDesignTags": ["Boat Neck", "Elbow Length Sleeve", "Aari Work"],
  "cleanDesc": "• Design: Beautiful [neck] and [sleeve] design\\n• Embroidery Work: Fine [work] with gold zari and beads\\n• Fabric & Lining: Pure silk with soft cotton inner lining\\n• Fitting Assurance: Tailored with padded cups and 2-inch alteration margins"
}`
      }
    ];

    if (sampleImageBase64 && sampleImageBase64.startsWith('data:image')) {
      const match = sampleImageBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(apiUrl, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return JSON.parse(text);
      }
    }
  } catch (err) {
    console.warn('Gemini API call skipped or timed out:', err.message);
  }
  return null;
}

// ─── HYBRID AI ORCHESTRATOR ───────────────────────────────────────────────────
async function getHybridAnalysis(caption, sampleImageBase64) {
  const cleanInput = cleanCaptionText(caption);
  const fallback = analyzeCaption(cleanInput);

  if (GEMINI_API_KEY) {
    try {
      const geminiResult = await callGemini(cleanInput, sampleImageBase64);
      if (geminiResult && geminiResult.suggestedTitle) {
        return {
          suggestedTitle: cleanCaptionText(geminiResult.suggestedTitle) || fallback.suggestedTitle,
          suggestedPrice: geminiResult.suggestedPrice || fallback.suggestedPrice,
          suggestedTags: Array.isArray(geminiResult.suggestedTags) && geminiResult.suggestedTags.length ? geminiResult.suggestedTags : fallback.suggestedTags,
          suggestedDesignTags: Array.isArray(geminiResult.suggestedDesignTags) && geminiResult.suggestedDesignTags.length ? geminiResult.suggestedDesignTags : fallback.suggestedDesignTags,
          cleanDesc: cleanCaptionText(geminiResult.cleanDesc) || fallback.cleanDesc,
          ai_engine: 'gemini-flash'
        };
      }
    } catch (e) {
      console.warn('Gemini error, using smart pattern extractor:', e.message);
    }
  }

  return {
    ...fallback,
    ai_engine: 'smart-pattern-v2'
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  try {
    // 1. Session verification
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const session = verifySessionToken(token);
    if (!session) {
      return sendJson(res, 401, { error: 'Unauthorized: Session invalid or expired' });
    }

    const body = await parseBody(req);
    const postUrl = (body.url || '').trim();
    const shortcode = extractShortcode(postUrl);

    if (!shortcode) {
      return sendJson(res, 400, { error: 'Invalid Instagram URL. Please paste a link like https://www.instagram.com/p/CODE/ or https://www.instagram.com/reel/CODE/' });
    }

    // 1. High-Performance Primary Method: VxInstagram Open-Source Multi-Slide Engine
    try {
      const vxUrl = `https://vxinstagram.com/p/${shortcode}/`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7500);

      const vxRes = await fetch(vxUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      clearTimeout(timeout);

      let rawCaption = '';
      const rawSlideUrls = [];

      if (vxRes.ok) {
        const vxHtml = await vxRes.text();

        // Extract description/caption
        const descMatch = vxHtml.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i) ||
                          vxHtml.match(/name="description"\s+content="([^"]+)"/i);
        rawCaption = cleanCaptionText(descMatch ? descMatch[1] : '');

        // Extract all slide images from download links and image tags across cdninstagram.com and fbcdn.net
        const slideMatches = [
          ...vxHtml.matchAll(/href="(https:\/\/[^"]*?(?:cdninstagram\.com|fbcdn\.net)[^"]*?)"\s+download/gi),
          ...vxHtml.matchAll(/<a\s+[^>]*?href="(https:\/\/[^"]*?(?:cdninstagram\.com|fbcdn\.net)[^"]*?)"[^>]*?download/gi),
          ...vxHtml.matchAll(/<img\s+[^>]*?src="(https:\/\/[^"]*?(?:cdninstagram\.com|fbcdn\.net)[^"]*?)"/gi)
        ];

        for (const m of slideMatches) {
          const u = m[1].replace(/&amp;/g, '&');
          if (!rawSlideUrls.includes(u)) {
            rawSlideUrls.push(u);
          }
        }
      }

      // Supplementary Multi-Slide Probe: If fewer than 2 slides found, probe VxInstagram offload redirects
      if (rawSlideUrls.length < 2) {
        for (let slideIdx = 0; slideIdx < 8; slideIdx++) {
          try {
            const probeRes = await fetch(`https://vxinstagram.com/offload/${shortcode}/${slideIdx}`, {
              method: 'HEAD',
              redirect: 'manual',
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            });
            const loc = probeRes.headers.get('location');
            if (loc && (loc.includes('cdninstagram.com') || loc.includes('fbcdn.net'))) {
              const cleanLoc = loc.replace(/&amp;/g, '&');
              if (rawSlideUrls.includes(cleanLoc)) {
                // If redirected to an already seen image, carousel has ended
                break;
              }
              rawSlideUrls.push(cleanLoc);
            } else {
              break;
            }
          } catch (probeErr) {
            break;
          }
        }
      }

      if (rawSlideUrls.length > 0) {
        // Download all extracted slide photos as permanent base64 data URLs (up to 8 slides)
        const downloadedImages = [];
        for (let i = 0; i < Math.min(rawSlideUrls.length, 8); i++) {
          const b64 = await downloadImageAsBase64(rawSlideUrls[i]);
          if (b64) downloadedImages.push(b64);
        }

        if (downloadedImages.length > 0) {
          const analysis = await getHybridAnalysis(rawCaption, downloadedImages[0]);
          return sendJson(res, 200, {
            success: true,
            source: 'vxinstagram_multi_slide',
            shortcode,
            images: downloadedImages,
            caption: rawCaption,
            ...analysis
          });
        }
      }
    } catch (vxErr) {
      console.warn('VxInstagram multi-slide extraction failed, trying fallbacks:', vxErr.message);
    }

    // 2. Secondary Method: Instagram Embed ServerJS Data
    try {
      const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
      const embedRes = await fetch(embedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
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
            rawSlideUrls = scMedia.edge_sidecar_to_children.edges
              .map(e => pickBestImageUrl(e.node))
              .filter(Boolean);
          } else {
            const mainImg = pickBestImageUrl(scMedia);
            if (mainImg) rawSlideUrls.push(mainImg);
          }

          const rawCaption = scMedia.edge_media_to_caption?.edges?.[0]?.node?.text || '';
          const cleanCaption = cleanCaptionText(cleanOgDescription(rawCaption));

          // Download all extracted slide photos as permanent base64 data URLs (up to 4 slides)
          const downloadedImages = [];
          for (let i = 0; i < Math.min(rawSlideUrls.length, 4); i++) {
            const b64 = await downloadImageAsBase64(rawSlideUrls[i]);
            if (b64) downloadedImages.push(b64);
          }

          const analysis = await getHybridAnalysis(cleanCaption, downloadedImages[0]);

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

          const caption = cleanCaptionText(postData.caption?.text || postData.edge_media_to_caption?.edges?.[0]?.node?.text || '');

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

          const analysis = await getHybridAnalysis(caption, downloadedImages[0]);

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
        const cleanCaption = cleanCaptionText(cleanOgDescription(rawCaption));

        const images = [];
        let rawImgUrl = null;

        // Prefer uncropped full-resolution offload if reachable
        try {
          const offloadProbe = await fetch(`https://vxinstagram.com/offload/${shortcode}/0`, {
            method: 'HEAD',
            redirect: 'manual',
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          const offloadLoc = offloadProbe.headers.get('location');
          if (offloadLoc && (offloadLoc.includes('cdninstagram.com') || offloadLoc.includes('fbcdn.net'))) {
            rawImgUrl = offloadLoc.replace(/&amp;/g, '&');
          }
        } catch(e) {}

        if (!rawImgUrl && ogImgMatch && ogImgMatch[1]) {
          rawImgUrl = ogImgMatch[1].replace(/&amp;/g, '&');
        }

        if (rawImgUrl) {
          const dataUrl = await downloadImageAsBase64(rawImgUrl);
          if (dataUrl) images.push(dataUrl);
        }

        const analysis = await getHybridAnalysis(cleanCaption, images[0]);

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
    const analysis = await getHybridAnalysis(cleanCaptionText(body.caption || ''), null);
    return sendJson(res, 200, {
      success: true,
      source: 'manual_input',
      shortcode,
      images: [],
      message: 'Instagram details prepared. Please pick photo(s) using + Add Photos.',
      ...analysis
    });

  } catch (err) {
    console.error('Fatal Instagram Import error:', err);
    return sendJson(res, 500, { error: 'Failed to process Instagram link: ' + err.message });
  }
};
