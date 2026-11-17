const fs = require('fs');
const path = require('path');
const { MASTER_CATALOG } = require('../js/catalogData.js');

const PRODUCT_HTML_PATH = path.join(__dirname, '../product.html');
let baseHtml = null;

function getBaseHtml() {
  if (!baseHtml) {
    try {
      baseHtml = fs.readFileSync(PRODUCT_HTML_PATH, 'utf8');
    } catch (e) {
      console.error('Failed to load product.html:', e.message);
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

module.exports = (req, res) => {
  const html = getBaseHtml();
  if (!html) {
    return res.status(500).send('Internal Server Error: Missing product template.');
  }

  const idOrSlug = (req.query.id || req.query.slug || '').trim();

  // If no product ID requested, serve baseline product template
  if (!idOrSlug) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).send(html);
  }

  // Find product in catalog
  const item = MASTER_CATALOG.find(i => 
    String(i.id).toLowerCase() === idOrSlug.toLowerCase() ||
    (i.slug && i.slug.toLowerCase() === idOrSlug.toLowerCase())
  );

  if (!item) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  const cleanTitle = item.title || 'Custom Bridal Blouse';
  const rawDesc = item.description || item.short_desc || 'Handcrafted bespoke South Indian bridal blouse tailored at Sree Designers Coimbatore.';
  const cleanDesc = rawDesc.replace(/\s+/g, ' ').trim();
  const canonicalUrl = `https://sreedesigners.in/product?id=${encodeURIComponent(item.id)}`;
  const price = item.starting_price || 1800;
  
  let imageUrl = 'https://sreedesigners.in/assets/images/service_bridal.webp';
  if (item.main_image_url) {
    imageUrl = item.main_image_url.startsWith('http') ? item.main_image_url : `https://sreedesigners.in/${item.main_image_url.replace(/^\//, '')}`;
  }

  let modified = html;

  // 1. Replace <title>
  modified = modified.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(cleanTitle)} | Sree Designers Coimbatore</title>`
  );

  // 2. Replace <link rel="canonical" ...>
  modified = modified.replace(
    /<link\s+rel="canonical"[^>]*>/i,
    `<link rel="canonical" id="pageCanonical" href="${canonicalUrl}">`
  );

  // 3. Replace <meta name="description" ...>
  modified = modified.replace(
    /<meta\s+name="description"\s+content="[^"]*"/i,
    `<meta name="description" content="${escapeHtml(cleanDesc)}"`
  );

  // 4. Replace OpenGraph and Twitter tags
  modified = modified.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"/i,
    `<meta property="og:title" content="${escapeHtml(cleanTitle)} | Sree Designers"`
  );
  modified = modified.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"/i,
    `<meta property="og:description" content="${escapeHtml(cleanDesc)}"`
  );
  modified = modified.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"/i,
    `<meta property="og:url" content="${canonicalUrl}"`
  );
  modified = modified.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"/i,
    `<meta property="og:image" content="${imageUrl}"`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
    `<meta name="twitter:title" content="${escapeHtml(cleanTitle)} | Sree Designers"`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
    `<meta name="twitter:description" content="${escapeHtml(cleanDesc)}"`
  );
  modified = modified.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"/i,
    `<meta name="twitter:image" content="${imageUrl}"`
  );

  // 5. Replace H1 heading
  modified = modified.replace(
    /<h1\s+class="product-title"\s+id="productTitle">.*?<\/h1>/i,
    `<h1 class="product-title" id="productTitle">${escapeHtml(cleanTitle)}</h1>`
  );

  // 6. Replace Breadcrumb title
  modified = modified.replace(
    /<span\s+class="breadcrumb-current"\s+id="breadcrumbTitle">.*?<\/span>/i,
    `<span class="breadcrumb-current" id="breadcrumbTitle">${escapeHtml(cleanTitle)}</span>`
  );

  // 7. Replace Category Tag
  const categoryTag = (item.tags && item.tags[0]) ? item.tags[0].toUpperCase() : 'BRIDAL ATELIER';
  modified = modified.replace(
    /<span\s+class="product-category-tag"\s+id="productCategoryTag">.*?<\/span>/i,
    `<span class="product-category-tag" id="productCategoryTag">${escapeHtml(categoryTag)}</span>`
  );

  // 8. Replace Product Description Paragraph
  modified = modified.replace(
    /<p\s+id="productDesc"[^>]*>[\s\S]*?<\/p>/i,
    `<p id="productDesc" style="color:var(--ink-soft); font-size:0.95rem; margin-bottom:28px; line-height:1.65;">${escapeHtml(cleanDesc)}</p>`
  );

  // 9. Replace Price
  modified = modified.replace(
    /<span\s+class="price-main"\s+id="productPrice">.*?<\/span>/i,
    `<span class="price-main" id="productPrice">Starting from ₹${Number(price).toLocaleString('en-IN')}</span>`
  );

  // 10. Replace Schema JSON-LD
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    "name": cleanTitle,
    "description": cleanDesc,
    "image": [imageUrl],
    "sku": item.sku || `SREE-${item.id.toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": "Sree Designers & Boutique"
    },
    "category": item.category || "Bridal Blouse & Maggam Work",
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "INR",
      "price": price,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Sree Designers & Boutique",
        "url": "https://sreedesigners.in/"
      }
    }
  };
  modified = modified.replace(
    /<script\s+type="application\/ld\+json"\s+id="seo-schema-product">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json" id="seo-schema-product">\n${JSON.stringify(productSchema, null, 2)}\n</script>`
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
  return res.status(200).send(modified);
};
