/**
 * SREE DESIGNERS & BOUTIQUE — MASTER REVIEWS DATA
 * Unified review records synchronized across admin, homepage, and local SEO schema.
 */

const MASTER_REVIEWS = [
  {
    id: 'rev-priyadharshini-coimbatore',
    customer_name: 'Priyadharshini K.',
    location: 'Coimbatore',
    work_type: 'Bridal Muhurtham Blouse',
    rating: 5,
    review_text: 'The fitting was absolutely spot on! The padded cups and intricate peacock aari work on my muhurtham blouse turned out even better than I envisioned. Delivered 2 days before schedule with zero gaping.',
    is_featured: true,
    branch: 'Samalapuram',
    created_at: '2026-10-10T11:30:00Z'
  },
  {
    id: 'rev-ananya-tiruppur',
    customer_name: 'Ananya R.',
    location: 'Tiruppur',
    work_type: 'Maggam Work & Reception Blouse',
    rating: 5,
    review_text: 'Zero gaping at the back neck and flawless armhole comfort. Their trial fitting session gave me complete peace of mind for my big day. Best bridal boutique in Tiruppur & Coimbatore!',
    is_featured: true,
    branch: 'Karnempettai',
    created_at: '2026-10-04T14:15:00Z'
  },
  {
    id: 'rev-sangeetha-nri',
    customer_name: 'Sangeetha M.',
    location: 'NRI Bride / Coimbatore',
    work_type: 'Express Bridal Fitting',
    rating: 5,
    review_text: 'Ordered remotely from abroad with just measurement photos. When I visited the Samalapuram branch for trial, it fitted like a dream without needing a single alteration. Highly recommended!',
    is_featured: true,
    branch: 'Samalapuram',
    created_at: '2026-09-28T09:45:00Z'
  },
  {
    id: 'rev-kavitha-tiruppur',
    customer_name: 'Kavitha Mohan',
    location: 'Tiruppur',
    work_type: 'Designer Silk Saree Blouses',
    rating: 5,
    review_text: 'Got 4 blouses stitched for my sister\'s wedding including heavy zardozi hand embroidery. Every blouse fit like a glove on the very first trial. Master tailor understood the neck depth requirements perfectly.',
    is_featured: false,
    branch: 'Karnempettai',
    created_at: '2026-09-20T12:00:00Z'
  },
  {
    id: 'rev-sowmya-avinashi',
    customer_name: 'Sowmya N.',
    location: 'Avinashi / Tiruppur',
    work_type: 'Pure Hand Aari Cutwork Blouse',
    rating: 5,
    review_text: 'Outstanding craftsmanship and attention to detail. The scalloped sweetheart neck and kundan work matched my Kanchipuram silk saree perfectly. Highly recommend Sree Designers!',
    is_featured: false,
    branch: 'Samalapuram',
    created_at: '2026-09-15T16:20:00Z'
  },
  {
    id: 'rev-deepika-palladam',
    customer_name: 'Deepika R.',
    location: 'Palladam / Coimbatore',
    work_type: 'Festive Raw Silk Maggam Blouse',
    rating: 5,
    review_text: 'Trial room experience was top tier. The padded bust lining and armhole cut has zero bunching. Best bridal boutique in the region.',
    is_featured: false,
    branch: 'Karnempettai',
    created_at: '2026-09-02T13:00:00Z'
  }
];

function getUnifiedReviews() {
  let custom = [];
  try {
    custom = JSON.parse(localStorage.getItem('custom_review_items') || '[]');
  } catch(e) {}
  
  if (!Array.isArray(custom)) custom = [];
  const customIds = new Set(custom.map(r => String(r.id)));
  return [...custom, ...MASTER_REVIEWS.filter(r => !customIds.has(String(r.id)))];
}

if (typeof window !== 'undefined') {
  window.MASTER_REVIEWS = MASTER_REVIEWS;
  window.getUnifiedReviews = getUnifiedReviews;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MASTER_REVIEWS, getUnifiedReviews };
}
