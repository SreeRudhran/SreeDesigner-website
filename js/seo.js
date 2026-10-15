/**
 * SREE DESIGNERS & BOUTIQUE — NIKE-GRADE ENTERPRISE SEO & JSON-LD SCHEMA GENERATOR
 * Generates Google Rich Snippets for LocalBusiness, Product/Service, BlogPosting, FAQPage, Organization & BreadcrumbList.
 */

const AtelierSEO = {
  
  // Inject or update JSON-LD script tag in document head
  setJsonLd(id, schemaObject) {
    let scriptTag = document.getElementById(id);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaObject, null, 2);
  },

  // 1. Organization & Social Profile Schema
  injectOrganizationSchema() {
    this.setJsonLd('seo-schema-org', {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://sreedesigners.in/#organization",
      "name": "Sree Designers & Boutique",
      "legalName": "Sree Designers & Boutique",
      "url": "https://sreedesigners.in/",
      "logo": "https://sreedesigners.in/assets/images/logo.png",
      "foundingDate": "2012",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Opp to IDBI Bank, Samalapuram, Annur - Avinashi - Mettupalayam Rd",
        "addressLocality": "Somanur",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641663",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-99763-44673",
        "contactType": "customer service",
        "areaServed": ["Samalapuram", "Somanur", "Karnempettai", "Coimbatore", "Tiruppur", "Tamil Nadu"],
        "availableLanguage": ["Tamil", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/sreedesigner_/",
        "https://www.youtube.com/@SreeDesignerss",
        "https://www.facebook.com/share/1GzvdiWwMT/?mibextid=wwXIfr",
        "https://wa.me/919976344673"
      ]
    });
  },

  // 2. LocalBusiness Studio Schemas (Samalapuram & Karnempettai)
  injectLocalBusinessSchema() {
    this.setJsonLd('seo-schema-localbusiness', [
      {
        "@context": "https://schema.org",
        "@type": "Boutique",
        "@id": "https://sreedesigners.in/#studio-samalapuram",
        "name": "Sree Designers & Boutique — Samalapuram Branch",
        "image": "https://sreedesigners.in/assets/images/hero_model.png",
        "telephone": "+91-99763-44673",
        "priceRange": "₹450 - ₹15,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Opp to IDBI Bank, Samalapuram, Annur - Avinashi - Mettupalayam Rd",
          "addressLocality": "Somanur",
          "addressRegion": "Tamil Nadu",
          "postalCode": "641663",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 11.0825,
          "longitude": 77.1654
        },
        "hasMap": "https://maps.app.goo.gl/Q9bF9IHpnFQpJMmTR",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:30",
            "closes": "20:30"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Boutique",
        "@id": "https://sreedesigners.in/#studio-karnempettai",
        "name": "Sree Designers & Boutique — Karnempettai Branch",
        "image": "https://sreedesigners.in/assets/images/hero_model.png",
        "telephone": "+91-99763-44673",
        "priceRange": "₹450 - ₹15,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "AutoStand, Annur Road",
          "addressLocality": "Karnempettai",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "IN"
        },
        "hasMap": "https://maps.app.goo.gl/oh7WH1mDCn5YH6f59",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "09:30",
            "closes": "20:30"
          }
        ]
      }
    ]);
  },

  // 3. WebSite & Sitelinks SearchBox Schema
  injectWebSiteSchema() {
    this.setJsonLd('seo-schema-website', {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://sreedesigners.in/",
      "name": "Sree Designers & Boutique",
      "publisher": { "@id": "https://sreedesigners.in/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sreedesigners.in/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
  },

  // 4. Product / Service Item Schema (Nike-grade Product & Offer & Rating Microdata for Google Shopping)
  injectProductServiceSchema(showcaseItem) {
    if (!showcaseItem) return;
    
    const allImages = [
      showcaseItem.main_image_url,
      ...(showcaseItem.images?.map(img => typeof img === 'string' ? img : img.image_url) || [])
    ]
    .filter(Boolean)
    .map(url => {
      const clean = url.replace(/\.(jpg|png|jpeg)$/i, '.webp');
      return clean.startsWith('http') ? clean : `https://sreedesigners.in/${clean.replace(/^\//, '')}`;
    });

    const skuId = String(showcaseItem.id || showcaseItem.slug || 'PRODUCT');
    const price = typeof showcaseItem.starting_price === 'number' ? showcaseItem.starting_price : (parseInt(showcaseItem.starting_price) || 2500);

    this.setJsonLd('seo-schema-product', {
      "@context": "https://schema.org/",
      "@type": "Product",
      "@id": `https://sreedesigners.in/product?id=${encodeURIComponent(skuId)}#product`,
      "name": showcaseItem.title,
      "description": showcaseItem.description || `Custom ${showcaseItem.title} handcrafted by master artisans at Sree Designers boutique in Coimbatore & Tiruppur.`,
      "image": allImages,
      "sku": `SREE-${skuId.toUpperCase()}`,
      "mpn": `SREE-${skuId.toUpperCase()}`,
      "brand": {
        "@type": "Brand",
        "name": "Sree Designers & Boutique"
      },
      "category": (showcaseItem.tags && showcaseItem.tags[0]) || "Bridal Blouse & Maggam Work",
      "offers": {
        "@type": "Offer",
        "url": `https://sreedesigners.in/product?id=${encodeURIComponent(skuId)}`,
        "priceCurrency": "INR",
        "price": price,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Sree Designers & Boutique",
          "url": "https://sreedesigners.in/"
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": "IN",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 7,
          "returnMethod": "https://schema.org/ReturnInStore",
          "returnFees": "https://schema.org/FreeReturn"
        },
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "INR"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "IN"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 1,
              "maxValue": 3,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 2,
              "maxValue": 5,
              "unitCode": "DAY"
            }
          }
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "184",
        "bestRating": "5",
        "worstRating": "1"
      }
    });
  },

  // 5. BlogPosting + Author + FAQPage Schema
  injectBlogArticleSchema(blogPost) {
    if (!blogPost) return;

    const fullImageUrl = blogPost.featured_image_url.startsWith('http')
      ? blogPost.featured_image_url
      : `https://sreedesigners.in/${blogPost.featured_image_url}`;

    // Article Schema
    this.setJsonLd('seo-schema-blog', {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blogPost.seo_title || blogPost.title,
      "description": blogPost.seo_description || blogPost.excerpt,
      "image": [fullImageUrl],
      "datePublished": blogPost.published_at || blogPost.created_at,
      "dateModified": blogPost.updated_at || blogPost.published_at || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": blogPost.author_name || "Sree Designers Master Atelier",
        "jobTitle": "Master Embroidery Specialist",
        "worksFor": { "@id": "https://sreedesigners.in/#organization" }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sree Designers & Boutique",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sreedesigners.in/assets/images/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sreedesigners.in/#blog-${blogPost.slug}`
      }
    });

    // FAQPage Schema for Blog FAQs
    if (blogPost.faq_items && Array.isArray(blogPost.faq_items) && blogPost.faq_items.length > 0) {
      this.setJsonLd('seo-schema-faq', {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": blogPost.faq_items.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      });
    }
  },

  // Initialize all base schemas
  init() {
    this.injectOrganizationSchema();
    this.injectLocalBusinessSchema();
    this.injectWebSiteSchema();
  }
};

// Auto-run base schemas on load
document.addEventListener('DOMContentLoaded', () => AtelierSEO.init());
window.AtelierSEO = AtelierSEO;
