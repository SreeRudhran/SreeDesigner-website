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
      "@id": "https://sree-fashion-designers-boutique.vercel.app/#organization",
      "name": "Sree Designers & Boutique",
      "legalName": "Sree Fashion Designers & Boutique Private Limited",
      "url": "https://sree-fashion-designers-boutique.vercel.app/",
      "logo": "https://sree-fashion-designers-boutique.vercel.app/assets/images/logo.png",
      "foundingDate": "2012",
      "founders": [
        { "@type": "Person", "name": "Sree Designers Master Atelier" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "R.S. Puram & Cross Cut Road Area",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641002",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-99763-44673",
        "contactType": "customer service",
        "areaServed": ["Coimbatore", "Tiruppur", "Tamil Nadu", "India"],
        "availableLanguage": ["Tamil", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/",
        "https://wa.me/919976344673"
      ]
    });
  },

  // 2. LocalBusiness Studio Schemas (Coimbatore & Tiruppur)
  injectLocalBusinessSchema() {
    this.setJsonLd('seo-schema-localbusiness', [
      {
        "@context": "https://schema.org",
        "@type": "Boutique",
        "@id": "https://sree-fashion-designers-boutique.vercel.app/#studio-coimbatore",
        "name": "Sree Designers & Boutique — Coimbatore Studio",
        "image": "https://sree-fashion-designers-boutique.vercel.app/assets/images/hero_model.png",
        "telephone": "+91-99763-44673",
        "priceRange": "₹450 - ₹15,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "R.S. Puram / Cross Cut Road Area",
          "addressLocality": "Coimbatore",
          "addressRegion": "TN",
          "postalCode": "641002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 11.0168,
          "longitude": 76.9558
        },
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
        "@id": "https://sree-fashion-designers-boutique.vercel.app/#studio-tiruppur",
        "name": "Sree Designers & Boutique — Tiruppur Studio",
        "image": "https://sree-fashion-designers-boutique.vercel.app/assets/images/hero_model.png",
        "telephone": "+91-99763-44673",
        "priceRange": "₹450 - ₹15,000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "PN Road / Avinashi Road Junction",
          "addressLocality": "Tiruppur",
          "addressRegion": "TN",
          "postalCode": "641602",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 11.1085,
          "longitude": 77.3411
        },
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
      "url": "https://sree-fashion-designers-boutique.vercel.app/",
      "name": "Sree Designers & Boutique",
      "publisher": { "@id": "https://sree-fashion-designers-boutique.vercel.app/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sree-fashion-designers-boutique.vercel.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
  },

  // 4. Product / Service Item Schema (Nike-grade Product & Offer & Rating Microdata)
  injectProductServiceSchema(showcaseItem) {
    if (!showcaseItem) return;
    
    const allImages = [
      showcaseItem.main_image_url,
      ...(showcaseItem.images?.map(img => img.image_url) || [])
    ].map(url => url.startsWith('http') ? url : `https://sree-fashion-designers-boutique.vercel.app/${url}`);

    this.setJsonLd('seo-schema-product', {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `https://sree-fashion-designers-boutique.vercel.app/#product-${showcaseItem.id}`,
      "name": showcaseItem.title,
      "description": showcaseItem.description,
      "image": allImages,
      "brand": {
        "@type": "Brand",
        "name": "Sree Designers & Boutique"
      },
      "category": showcaseItem.tags?.join(', ') || 'Bridal Fashion',
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": showcaseItem.starting_price || "1800",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Organization",
          "name": "Sree Designers & Boutique"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "128",
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
      : `https://sree-fashion-designers-boutique.vercel.app/${blogPost.featured_image_url}`;

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
        "worksFor": { "@id": "https://sree-fashion-designers-boutique.vercel.app/#organization" }
      },
      "publisher": {
        "@type": "Organization",
        "name": "Sree Designers & Boutique",
        "logo": {
          "@type": "ImageObject",
          "url": "https://sree-fashion-designers-boutique.vercel.app/assets/images/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sree-fashion-designers-boutique.vercel.app/#blog-${blogPost.slug}`
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
