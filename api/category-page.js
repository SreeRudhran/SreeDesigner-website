const fs = require('fs');
const path = require('path');

const CATEGORY_HTML_PATH = path.join(__dirname, '../category-template.html');
let baseHtml = null;

function getBaseHtml() {
  if (!baseHtml) {
    try {
      baseHtml = fs.readFileSync(CATEGORY_HTML_PATH, 'utf8');
    } catch (e) {
      console.error('Failed to load category.html:', e.message);
      baseHtml = '';
    }
  }
  return baseHtml;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const CATEGORY_DESCRIPTIONS = {
  'Hand Embroidered Blouses': 'Explore bespoke handcrafted bridal blouses, zardozi embroidery & custom-fitted couture tailored by master artisans in Coimbatore & Tiruppur.',
  'Bridal Blouse & Maggam Work': 'Signature South Indian bridal blouse tailoring, heirloom maggam zardozi threadwork, padded trial fittings, and 48-hr express delivery.',
  'Machine Embroidered Blouse': 'Precision computer-guided machine embroidery blouses with clean geometric borders and floral motifs at accessible atelier pricing.',
  'Lehengas & Festive Couture': 'Custom bridal lehenga tailoring, flared wedding skirts, handcrafted blouses, and festive dupattas in Coimbatore & Tiruppur.',
  'Kurtis & Chudidhar': 'Designer bridal trousseau kurtis, custom salwar suits, chudidhars, and festive occasion wear tailored to your perfect fit.',
  'Zardozi Work': 'Intricate hand zardozi metallic wire embroidery, kundan stones, cutwork back necks, and antique gold threadwork on pure silk.',
  'Frocks & Gowns': 'Bespoke evening gowns, wedding reception frocks, and festive ethnic dresses tailored by Sree Designers.'
};

module.exports = (req, res) => {
  const html = getBaseHtml();
  if (!html) {
    return res.status(500).send('Internal Server Error: Missing category template.');
  }

  const rawCat = (req.query.cat || '').trim();

  // If no specific category requested, serve baseline category template
  if (!rawCat) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).send(html);
  }

  const catName = rawCat.slice(0, 80);
  const cleanTitle = `${catName} Collection | Sree Designers Coimbatore`;
  const canonicalUrl = `https://sreedesigners.in/category?cat=${encodeURIComponent(catName)}`;
  const catDesc = CATEGORY_DESCRIPTIONS[catName] || `Explore bespoke ${catName} designs tailored by master artisans at Sree Designers Coimbatore & Tiruppur boutiques.`;

  let modified = html;

  // 1. Replace <title>
  modified = modified.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(cleanTitle)}</title>`
  );

  // 2. Replace <link rel="canonical" ...>
  modified = modified.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" id="pageCanonical" href="${canonicalUrl}">`
  );

  // 3. Replace <meta name="description" ...>
  modified = modified.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${escapeHtml(catDesc)}"`
  );

  // 4. Replace OpenGraph tags
  modified = modified.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${escapeHtml(cleanTitle)}"`
  );
  modified = modified.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${escapeHtml(catDesc)}"`
  );
  modified = modified.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${canonicalUrl}"`
  );

  // 5. Replace Category Badge
  modified = modified.replace(
    /<span\s+class="cat-badge"\s+id="catBadge">.*?<\/span>/i,
    `<span class="cat-badge" id="catBadge">CATEGORY · ${escapeHtml(catName.toUpperCase())}</span>`
  );

  // 6. Replace Category H1 Title
  modified = modified.replace(
    /<h1\s+class="cat-title"\s+id="catTitle">.*?<\/h1>/i,
    `<h1 class="cat-title" id="catTitle">${escapeHtml(catName)}</h1>`
  );

  // 7. Replace Subtitle
  modified = modified.replace(
    /<p\s+class="cat-sub"\s+id="catSubtitle">.*?<\/p>/i,
    `<p class="cat-sub" id="catSubtitle">${escapeHtml(catDesc)}</p>`
  );

  // 8. Replace Breadcrumb
  modified = modified.replace(
    /<span\s+class="breadcrumb-current"\s+id="breadcrumbCat">.*?<\/span>/i,
    `<span class="breadcrumb-current" id="breadcrumbCat">${escapeHtml(catName)}</span>`
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
  return res.status(200).send(modified);
};
