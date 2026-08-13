/**
 * SREE DESIGNERS & BOUTIQUE — SUPABASE CLIENT & SERVICE LAYER
 * Handles authentication, database CRUD queries, image compression & storage.
 */

// SUPABASE CONFIGURATION
const SUPABASE_CONFIG = {
  url: 'https://qailnqhcocmudqogyudr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhaWxucWhjb2NtdWRxb2d5dWRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY2MzQ3ODEsImV4cCI6MjEwMjIxMDc4MX0.AQe2TMNujxcBUpn2dfgiaUisZzO4jv1Yf2LAPqSToXg'
};

// Initialize Supabase JS Client safely
let supabase = null;
if (window.supabase && SUPABASE_CONFIG.url) {
  supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

// ----------------------------------------------------------------------------
// INITIAL DEMO / FALLBACK SEED DATA (Used when Supabase is not yet connected)
// ----------------------------------------------------------------------------
const FALLBACK_SHOWCASE = [
  {
    id: 'demo-1',
    title: 'Grand Regal Peacock Maggam Bridal Blouse',
    slug: 'grand-regal-peacock-maggam-bridal-blouse',
    description: 'Opulent South Indian bridal blouse featuring hand-stitched gold zardozi, ruby kundan stones, and high-density peacock embroidery motifs.',
    starting_price: 3800,
    main_image_url: 'assets/images/service_bridal.png',
    main_image_alt: 'Grand Regal Peacock Maggam Bridal Blouse by Sree Designers',
    is_published: true,
    sort_order: 1,
    tags: ['Bridal Work', 'Aari & Maggam', 'Hand Embroidery'],
    images: [
      { id: 'sub-1a', image_url: 'assets/images/service_bridal.png', alt_text: 'Full Back Design', caption: 'Full Regal Peacock Back Design' },
      { id: 'sub-1b', image_url: 'assets/images/party_blouse.jpg', alt_text: 'Sleeve Detail', caption: 'Sleeve Zardozi Border Detail' }
    ]
  },
  {
    id: 'demo-2',
    title: 'Precision Floral Machine Embroidery Blouse',
    slug: 'precision-floral-machine-embroidery-blouse',
    description: 'High-density computerized floral border embroidery crafted with color-matched Japanese silk threads on pure Kanchipuram silk material.',
    starting_price: 1800,
    main_image_url: 'assets/images/service_machine_embroidery.png',
    main_image_alt: 'Precision Machine Embroidery Saree Blouse',
    is_published: true,
    sort_order: 2,
    tags: ['Machine Embroidery', 'Blouse Stitching'],
    images: [
      { id: 'sub-2a', image_url: 'assets/images/service_machine_embroidery.png', alt_text: 'Front Neck Pattern', caption: 'Front Neckline Stitching' }
    ]
  },
  {
    id: 'demo-3',
    title: 'Artisanal Metallic Wire Hand Zardozi Work',
    slug: 'artisanal-metallic-wire-hand-zardozi-work',
    description: 'Bespoke hand embroidery created by master artisans featuring intricate cut beads, metallic thread highlights, and padded velvet border detailing.',
    starting_price: 2500,
    main_image_url: 'assets/images/service_hand_embroidery.png',
    main_image_alt: 'Hand Zardozi Embroidery Work by Sree Designers Boutique',
    is_published: true,
    sort_order: 3,
    tags: ['Hand Embroidery', 'Bridal Work'],
    images: [
      { id: 'sub-3a', image_url: 'assets/images/service_hand_embroidery.png', alt_text: 'Embroidery Close-up', caption: 'Close-up Hand Zardozi Texture' }
    ]
  },
  {
    id: 'demo-4',
    title: 'Opulent Silk Festive Lehenga Choli Set',
    slug: 'opulent-silk-festive-lehenga-choli-set',
    description: 'Custom stitched silk lehenga with waist canvas structuring, handcrafted tassel dupattas, and heavy festive skirt pleating.',
    starting_price: 4200,
    main_image_url: 'assets/images/service_lehenga.png',
    main_image_alt: 'Opulent Silk Festive Lehenga Custom Tailored',
    is_published: true,
    sort_order: 4,
    tags: ['Lehenga Couture', 'Bridal Work'],
    images: []
  },
  {
    id: 'demo-5',
    title: 'Designer Silk Chudidhar & Patterned Salwar',
    slug: 'designer-silk-chudidhar-patterned-salwar',
    description: 'Perfectly fitted silk salwar suit with custom neckline, designer pants, and lightweight silk dupatta lining.',
    starting_price: 1200,
    main_image_url: 'assets/images/service_salwar.png',
    main_image_alt: 'Silk Chudidhar Salwar Suit Custom Tailoring',
    is_published: true,
    sort_order: 5,
    tags: ['Salwar & Chudidhar'],
    images: []
  },
  {
    id: 'demo-6',
    title: 'Master Fit Garment Alterations & Restructuring',
    slug: 'master-fit-garment-alterations-restructuring',
    description: 'Saree blouse size adjustment, padded cup insertion, zipper replacements, and sleeve restructuring for vintage family heirlooms.',
    starting_price: 450,
    main_image_url: 'assets/images/service_alterations.png',
    main_image_alt: 'Saree Blouse Alteration and Re-fitting',
    is_published: true,
    sort_order: 6,
    tags: ['Garment Alterations'],
    images: []
  }
];

const FALLBACK_BLOGS = [
  {
    id: 'blog-1',
    title: 'Top 10 Bridal Blouse Embroidery Trends for South Indian Weddings',
    slug: 'top-10-bridal-blouse-embroidery-trends-south-indian-weddings',
    excerpt: 'Discover the latest hand zardozi motifs, peacock maggam designs, and Kanchipuram blouse necklines trending across Coimbatore and Tiruppur brides.',
    content: `
      <h3>1. Intricate Peacock & Floral Zardozi Motifs</h3>
      <p>Peacock embroidery continues to dominate bridal blouse fashion in South India. Hand-embroidered zardozi wires combined with ruby kundan stones create a 3D elevated look on silk blouses.</p>
      
      <h3>2. Elbow-Length Heavy Sleeve Borders</h3>
      <p>Brides are moving away from cap sleeves towards regal elbow-length sleeves with dense maggam borders that match Kanchipuram saree borders perfectly.</p>
      
      <h3>3. Custom Padded Fitting & Deep Necklines</h3>
      <p>Flawless fitting requires hand-dyed cotton linings and integrated padded cups for shape retention throughout long wedding ceremonies.</p>
    `,
    featured_image_url: 'assets/images/bridal_blouse.jpg',
    image_alt_text: 'Bridal Blouse Embroidery Trends South India',
    category: 'Bridal Trends',
    author_name: 'Sree Designers Master Atelier',
    read_time_minutes: 5,
    faq_items: [
      { question: 'How long before the wedding should I order my bridal blouse?', answer: 'We recommend placing your order 3 to 4 weeks prior to the wedding date to allow time for design discussion, hand embroidery, and final fitting.' },
      { question: 'Do I need to provide the blouse material?', answer: 'Yes! You bring your saree blouse fabric, and our boutique handles pattern design, embroidery, stitching, and custom padding.' }
    ],
    seo_title: 'Top 10 South Indian Bridal Blouse Embroidery Trends 2026',
    seo_description: 'Explore trending bridal blouse maggam work, zardozi embroidery, and custom saree blouse designs in Coimbatore & Tiruppur by Sree Designers.',
    is_published: true,
    published_at: new Date().toISOString()
  },
  {
    id: 'blog-2',
    title: 'Hand Embroidery vs. Machine Embroidery: Which is Right for Your Blouse?',
    slug: 'hand-embroidery-vs-machine-embroidery-blouse-guide',
    excerpt: 'Comparing turnaround time, intricate detail, density, and cost between traditional hand zardozi and digital precision machine embroidery.',
    content: `
      <p>Choosing between hand embroidery and machine embroidery depends on your budget, timeline, and occasion.</p>
      <h3>Hand Zardozi & Maggam Work</h3>
      <p>Hand embroidery uses authentic metallic threads, beads, and kundan stones hand-sewn by master artisans. It offers unmatched tactile texture and heirloom quality for bridal sarees.</p>
      <h3>Precision Machine Embroidery</h3>
      <p>Computerized machine embroidery offers rapid turnaround (within 48 hours) and pixel-perfect geometric or floral repeats at budget-friendly pricing.</p>
    `,
    featured_image_url: 'assets/images/hero_bg.jpg',
    image_alt_text: 'Hand Embroidery versus Machine Embroidery Comparison',
    category: 'Stitching Guide',
    author_name: 'Sree Designers Master Atelier',
    read_time_minutes: 4,
    faq_items: [
      { question: 'What is the price difference between machine and hand embroidery?', answer: 'Machine embroidery starts from ₹1,800 while bespoke hand zardozi embroidery starts from ₹2,500 to ₹4,500 depending on embroidery density.' }
    ],
    seo_title: 'Hand vs Machine Embroidery Saree Blouse Guide | Sree Designers',
    seo_description: 'Learn the differences in cost, durability, and craftsmanship between hand zardozi and machine embroidery blouses.',
    is_published: true,
    published_at: new Date().toISOString()
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 't-1',
    customer_name: 'Deepika Ranganathan',
    location: 'RS Puram, Coimbatore',
    rating: 5,
    comment: 'Sree Designers crafted my wedding blouse with breathtaking peacock zardozi work. The fitting was absolute perfection on the first trial without a single adjustment needed!',
    work_type: 'Bridal Maggam Blouse',
    date: '2026-08-01'
  },
  {
    id: 't-2',
    customer_name: 'Priya Sundaram',
    location: 'Avinashi Road, Tiruppur',
    rating: 5,
    comment: 'The machine embroidery work for my saree blouse was delivered in just 2 days. Super crisp threadwork and fantastic boutique service!',
    work_type: 'Machine Embroidery Blouse',
    date: '2026-07-28'
  },
  {
    id: 't-3',
    customer_name: 'Ananya Sridhar',
    location: 'Race Course, Coimbatore',
    rating: 5,
    comment: 'Rescued my mother’s vintage silk lehenga with re-fitting and cup restructuring. They preserved the original antique border while modernizing the waist drape!',
    work_type: 'Lehenga Restructuring',
    date: '2026-07-15'
  }
];

const FALLBACK_REELS = [
  {
    id: 'r-1',
    title: 'Hand Zardozi Peacock Border Crafting Process',
    caption: 'Watch master artisan hand-stitching ruby kundan stones & gold zardozi wires on pure silk.',
    instagram_url: 'https://instagram.com',
    thumbnail_url: 'assets/images/service_hand_embroidery.png',
    media_type: 'reel'
  },
  {
    id: 'r-2',
    title: 'Bridal Blouse Fitting & Transformation',
    caption: 'Before vs After custom padded fitting for our RS Puram studio bride.',
    instagram_url: 'https://instagram.com',
    thumbnail_url: 'assets/images/service_bridal.png',
    media_type: 'reel'
  }
];

// ----------------------------------------------------------------------------
// DATA SERVICE APIS (Combines Supabase & Fallback Storage)
// ----------------------------------------------------------------------------
const AtelierDataService = {

  // Fetch Showcase Items
  async getShowcaseItems(filterTag = 'All') {
    let items = [];
    if (supabase) {
      try {
        let query = supabase.from('showcase_items').select('*, showcase_images(*), showcase_item_tags(tags(name))').order('sort_order', { ascending: true });
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          items = data.map(item => ({
            ...item,
            tags: item.showcase_item_tags?.map(t => t.tags?.name).filter(Boolean) || [],
            images: item.showcase_images || []
          }));
        }
      } catch (e) {
        console.warn('Supabase offline, using local memory storage:', e);
      }
    }
    if (!items || items.length === 0) {
      items = [...FALLBACK_SHOWCASE];
    }
    // Combine custom items saved in local storage
    try {
      const customItems = JSON.parse(localStorage.getItem('custom_showcase_items') || '[]');
      if (customItems && customItems.length > 0) {
        items = [...customItems, ...items];
      }
    } catch(e) {}

    return items.filter(item => filterTag === 'All' || (item.tags && item.tags.includes(filterTag)));
  },

  // Fetch Single Showcase Item by ID or Slug
  async getShowcaseItemById(idOrSlug) {
    const items = await this.getShowcaseItems('All');
    if (!idOrSlug) return items[0];
    const found = items.find(i => String(i.id) === String(idOrSlug) || i.slug === idOrSlug || String(i.id).toLowerCase() === String(idOrSlug).toLowerCase());
    return found || items[0];
  },

  // Fetch Blog Posts
  async getBlogPosts() {
    let posts = [];
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').select('*').eq('is_published', true).order('published_at', { ascending: false });
        if (!error && data && data.length > 0) posts = data;
      } catch (e) {}
    }
    if (!posts || posts.length === 0) {
      posts = [...FALLBACK_BLOGS];
    }
    try {
      const customPosts = JSON.parse(localStorage.getItem('custom_blog_items') || '[]');
      if (customPosts && customPosts.length > 0) {
        posts = [...customPosts, ...posts];
      }
    } catch(e) {}
    return posts;
  },

  // Fetch Single Blog Post by Slug
  async getBlogPostBySlug(slug) {
    const posts = await this.getBlogPosts();
    return posts.find(p => p.slug === slug) || posts[0];
  },

  // Fetch Testimonials
  async getTestimonials() {
    let reviews = [];
    if (supabase) {
      try {
        const { data, error } = await supabase.from('testimonials').select('*').eq('is_published', true).order('created_at', { ascending: false });
        if (!error && data && data.length > 0) reviews = data;
      } catch (e) {}
    }
    if (!reviews || reviews.length === 0) {
      reviews = [...FALLBACK_TESTIMONIALS];
    }
    try {
      const customReviews = JSON.parse(localStorage.getItem('custom_review_items') || '[]');
      if (customReviews && customReviews.length > 0) {
        reviews = [...customReviews, ...reviews];
      }
    } catch(e) {}
    return reviews;
  },

  // Fetch Social Reels
  async getSocialPosts() {
    let reels = [];
    if (supabase) {
      try {
        const { data, error } = await supabase.from('social_posts').select('*').eq('is_published', true).order('created_at', { ascending: false });
        if (!error && data && data.length > 0) reels = data;
      } catch (e) {}
    }
    if (!reels || reels.length === 0) {
      reels = [...FALLBACK_REELS];
    }
    return reels;
  },

  // Image Upload Helper (Compresses image client-side to <250KB before upload)
  async uploadImage(file, folder = 'showcase') {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);

          if (supabase) {
            try {
              const blob = await (await fetch(compressedDataUrl)).blob();
              const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`;
              const { data, error } = await supabase.storage.from('portfolio').upload(fileName, blob, { contentType: 'image/jpeg' });
              if (!error && data) {
                const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
                resolve(publicUrlData.publicUrl);
                return;
              }
            } catch (err) {}
          }
          // Return compressed DataURL fallback
          resolve(compressedDataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  // Create Showcase Item
  async createShowcaseItem(item) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('showcase_items').insert([{
          title: item.title,
          slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: item.description,
          starting_price: parseFloat(item.starting_price) || 1800,
          main_image_url: item.main_image_url,
          main_image_alt: item.title,
          is_published: true
        }]).select();
        if (!error && data && data.length > 0) {
          const newItem = data[0];
          if (item.images && item.images.length > 0) {
            const imgInserts = item.images.map((url, idx) => ({
              showcase_item_id: newItem.id,
              image_url: url,
              sort_order: idx + 1
            }));
            await supabase.from('showcase_images').insert(imgInserts);
          }
          return newItem;
        }
      } catch (err) {
        console.warn('Supabase insert failed:', err);
      }
    }
    const newItem = {
      id: 'item-' + Date.now(),
      title: item.title,
      slug: item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: item.description,
      starting_price: parseFloat(item.starting_price) || 1800,
      main_image_url: item.main_image_url,
      tags: item.tags || ['Bridal Work'],
      images: (item.images || []).map((url, i) => ({ id: 'sub-' + i, image_url: url }))
    };
    FALLBACK_SHOWCASE.unshift(newItem);
    return newItem;
  },

  // Create Blog Article
  async createBlogPost(post) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('blog_posts').insert([{
          title: post.title,
          slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          excerpt: post.excerpt,
          content: post.content,
          featured_image_url: post.featured_image_url,
          author_name: post.author_name || 'Sree Designers Master Atelier',
          seo_title: post.seo_title || post.title,
          seo_description: post.seo_description || post.excerpt,
          faq_items: post.faq_items || [],
          is_published: true
        }]).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {
        console.warn('Supabase blog insert error:', err);
      }
    }
    const newPost = {
      id: 'blog-' + Date.now(),
      title: post.title,
      slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: post.excerpt,
      content: post.content,
      featured_image_url: post.featured_image_url,
      author_name: post.author_name || 'Sree Designers Master Atelier',
      category: post.category || 'Bridal Trends',
      read_time_minutes: 4,
      published_at: new Date().toISOString()
    };
    FALLBACK_BLOGS.unshift(newPost);
    return newPost;
  },

  // Create Testimonial / Review
  async createTestimonial(review) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('testimonials').insert([{
          client_name: review.client_name,
          location: review.location,
          rating: parseInt(review.rating) || 5,
          quote: review.quote,
          is_published: true
        }]).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {}
    }
    const newRev = {
      id: 't-' + Date.now(),
      customer_name: review.client_name,
      location: review.location,
      rating: parseInt(review.rating) || 5,
      comment: review.quote,
      work_type: review.work_type || 'Bridal Blouse'
    };
    FALLBACK_TESTIMONIALS.unshift(newRev);
    return newRev;
  },

  // Create Instagram Reel
  async createSocialPost(reel) {
    if (supabase) {
      try {
        const { data, error } = await supabase.from('social_posts').insert([{
          title: reel.title,
          instagram_url: reel.instagram_url,
          thumbnail_url: reel.thumbnail_url,
          caption: reel.caption,
          is_published: true
        }]).select();
        if (!error && data && data.length > 0) return data[0];
      } catch (err) {}
    }
    const newReel = {
      id: 'r-' + Date.now(),
      title: reel.title,
      instagram_url: reel.instagram_url,
      thumbnail_url: reel.thumbnail_url,
      caption: reel.caption
    };
    FALLBACK_REELS.unshift(newReel);
    return newReel;
  }
};

window.AtelierDataService = AtelierDataService;
