/**
 * SREE DESIGNERS & BOUTIQUE — MASTER CATALOG DATA
 * Comprehensive universal seed products for all 7 signature categories.
 * Ensures consistent, rich catalog display across all devices, browsers, and private tabs.
 */

const MASTER_CATALOG = [
  // 🌟 REAL ATELIER SIGNATURE SHOWCASE (Added from live workshop)
  {
    id: 'prod-real-crimson-red-maggam',
    title: 'Bridal Red Heavy Maggam Work Blouse Designs | Cutout Back Neck Wedding Blouse',
    slug: 'bridal-red-heavy-maggam-work-blouse-designs',
    description: 'Showstopper bridal crimson red pure silk blouse featuring an ornate scalloped cutout back neck with illusion sheer net, heavy floral maggam elbow sleeves adorned with antique gold zardozi wires, emerald green thread rosettes, and hanging emerald crystal drop latkan beads.',
    starting_price: 4800,
    main_image_url: 'assets/images/blouse_bridal_red_maggam_back.jpg',
    tags: ['Bridal Blouse & Maggam Work', 'Hand Embroidered Blouses', 'Zardozi Work'],
    images: [
      { id: 'sub-rd-1', image_url: 'assets/images/blouse_bridal_red_maggam_back.jpg' },
      { id: 'sub-rd-2', image_url: 'assets/images/blouse_bridal_red_heavy_sleeve.jpg' }
    ]
  },
  {
    id: 'prod-real-bottle-green-zigzag',
    title: 'Bottle Green Net Blouse Designs | Zigzag Aari Work Keyhole Back Blouse',
    slug: 'bottle-green-zigzag-net-blouse-designs',
    description: 'Unique bottle green raw silk blouse featuring a multi-tiered chevron zigzag embroidered sheer net back neck with teardrop keyhole cut, crimson red floral rosettes, and matching elbow-length sleeves with ruby crystal drop latkan hangings.',
    starting_price: 3600,
    main_image_url: 'assets/images/blouse_bottle_green_zigzag_net_back.jpg',
    tags: ['Hand Embroidered Blouses', 'Bridal Blouse & Maggam Work', 'Zardozi Work'],
    images: [
      { id: 'sub-bg-1', image_url: 'assets/images/blouse_bottle_green_zigzag_net_back.jpg' },
      { id: 'sub-bg-2', image_url: 'assets/images/blouse_bottle_green_zigzag_sleeve.jpg' }
    ]
  },
  {
    id: 'prod-real-purple-contrast-net',
    title: 'Purple Illusion Net Blouse Designs | Contrast Sea Green Aari Work Blouse',
    slug: 'purple-illusion-net-blouse-designs',
    description: 'Rich royal purple silk blouse designed with a contrast sea-green illusion sheer net back neck, delicate floral gold aari bootis, dual-tone emerald green thread zardozi border work, and tailored elbow sleeves.',
    starting_price: 3400,
    main_image_url: 'assets/images/blouse_royal_purple_illusion_net_back.jpg',
    tags: ['Hand Embroidered Blouses', 'Bridal Blouse & Maggam Work', 'Zardozi Work'],
    images: [
      { id: 'sub-pr-1', image_url: 'assets/images/blouse_royal_purple_illusion_net_back.jpg' },
      { id: 'sub-pr-2', image_url: 'assets/images/blouse_royal_purple_floral_sleeve.jpg' }
    ]
  },
  {
    id: 'prod-real-rani-pink-tissue',
    title: 'Rani Pink Scallop Net Sleeve Blouse Designs | Sheer Back Aari Work Blouse',
    slug: 'rani-pink-scallop-net-sleeve-blouse-designs',
    description: 'Contemporary South Indian bridal blouse tailored in metallic shimmer Rani Pink tissue silk. Features handcrafted dual-layer scalloped sheer net sleeves with floral zardozi wire borders, illusion sheer net back neck with micro-bead sprinkles, built-in bust-contour padded cups, and trial fitting guarantee.',
    starting_price: 3400,
    main_image_url: 'assets/images/blouse_rani_pink_flatlay.jpg',
    tags: ['Hand Embroidered Blouses', 'Bridal Blouse & Maggam Work', 'Zardozi Work'],
    images: [
      { id: 'sub-rp-1', image_url: 'assets/images/blouse_rani_pink_flatlay.jpg' },
      { id: 'sub-rp-2', image_url: 'assets/images/blouse_rani_pink_sleeve.jpg' },
      { id: 'sub-rp-3', image_url: 'assets/images/blouse_rani_pink_neckline.jpg' }
    ]
  },
  {
    id: 'prod-real-peacock-green-v-neck',
    title: 'Peacock Green V Neck Net Blouse Designs | Floral Aari Work Bridal Blouse',
    slug: 'peacock-green-v-neck-net-blouse-designs',
    description: 'Bespoke Peacock Green silk blouse featuring a deep V-neck illusion sheer yellow net back with micro-bead bootis, hand-embroidered floral Aari borders, royal elbow-length sleeves with matching cuffs, and built-in padded cup trial fitting guarantee.',
    starting_price: 3200,
    main_image_url: 'assets/images/blouse_peacock_green_v_neck_back.jpg',
    tags: ['Hand Embroidered Blouses', 'Bridal Blouse & Maggam Work', 'Zardozi Work'],
    images: [
      { id: 'sub-pg-1', image_url: 'assets/images/blouse_peacock_green_v_neck_back.jpg' },
      { id: 'sub-pg-2', image_url: 'assets/images/blouse_peacock_green_sleeve_detail.jpg' },
      { id: 'sub-pg-3', image_url: 'assets/images/blouse_peacock_green_front_neck.jpg' }
    ]
  },
  // 1. Hand Embroidered Blouses
  {
    id: 'prod-he-1',
    title: 'Peacock Zardozi Hand Embroidered Blouse',
    slug: 'peacock-zardozi-hand-embroidered-blouse',
    description: 'Opulent South Indian bridal blouse featuring hand-stitched gold zardozi wires, ruby kundan stones, and high-density peacock embroidery motifs on pure silk.',
    starting_price: 3800,
    main_image_url: 'assets/images/service_hand_embroidery.png',
    tags: ['Hand Embroidered Blouses', 'Bridal Work', 'Zardozi Work'],
    images: [
      { id: 'sub-he-1a', image_url: 'assets/images/service_hand_embroidery.png' },
      { id: 'sub-he-1b', image_url: 'assets/images/service_bridal.png' }
    ]
  },
  {
    id: 'prod-he-2',
    title: 'Royal Magenta Zari Embroidered Silk Blouse',
    slug: 'royal-magenta-zari-embroidered-silk-blouse',
    description: 'Bespoke hand embroidery created by master artisans featuring intricate cut beads, metallic thread highlights, and padded velvet border detailing.',
    starting_price: 3200,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Hand Embroidered Blouses', 'Bridal Work'],
    images: [
      { id: 'sub-he-2a', image_url: 'assets/images/service_bridal.png' },
      { id: 'sub-he-2b', image_url: 'assets/images/service_hand_embroidery.png' }
    ]
  },
  {
    id: 'prod-he-3',
    title: 'Floral Lotus Aari Hand Needlework Blouse',
    slug: 'floral-lotus-aari-hand-needlework-blouse',
    description: 'Handcrafted lotus petal border embroidery with antique gold dabka wires, seed pearls, and custom elbow-length sleeve tailoring.',
    starting_price: 2800,
    main_image_url: 'assets/images/service_hand_embroidery.png',
    tags: ['Hand Embroidered Blouses'],
    images: []
  },
  {
    id: 'prod-he-4',
    title: 'Temple Border Elephant Motif Handwork Blouse',
    slug: 'temple-border-elephant-motif-handwork-blouse',
    description: 'Traditional temple gopuram arch embroidery with miniature elephant motifs, pearl chain accents, and deep U-neck structuring.',
    starting_price: 3500,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Hand Embroidered Blouses', 'Bridal Work'],
    images: []
  },

  // 2. Machine Embroidered Blouse
  {
    id: 'prod-me-1',
    title: 'Dark Brown Silk Embroidered Blouse with Scallop Sleeves',
    slug: 'dark-brown-silk-embroidered-blouse-scallop-sleeves',
    description: 'High-density computerized floral border embroidery crafted with color-matched Japanese silk threads on pure silk material with scallop sleeve finish.',
    starting_price: 1800,
    main_image_url: 'assets/images/service_machine_embroidery.png',
    tags: ['Machine Embroidered Blouse'],
    images: [
      { id: 'sub-me-1a', image_url: 'assets/images/service_machine_embroidery.png' }
    ]
  },
  {
    id: 'prod-me-2',
    title: 'Geometric Mirror Work Machine Embroidered Blouse',
    slug: 'geometric-mirror-work-machine-embroidered-blouse',
    description: 'Crisp computerized embroidery incorporating foil mirrors, dual-tone resham threadwork, and padded bridal bustier lining.',
    starting_price: 1600,
    main_image_url: 'assets/images/service_machine_embroidery.png',
    tags: ['Machine Embroidered Blouse'],
    images: []
  },
  {
    id: 'prod-me-3',
    title: 'Intricate Vine & Jaal Pattern Machine Blouse',
    slug: 'intricate-vine-jaal-pattern-machine-blouse',
    description: 'All-over back jaal vine embroidery with delicate florets, tailored for Kanchipuram silk sarees with 48-hour delivery guarantee.',
    starting_price: 1950,
    main_image_url: 'assets/images/service_machine_embroidery.png',
    tags: ['Machine Embroidered Blouse'],
    images: []
  },
  {
    id: 'prod-me-4',
    title: 'Neckline Butti Machine Embroidered Saree Blouse',
    slug: 'neckline-butti-machine-embroidered-saree-blouse',
    description: 'Minimalist elegant scatter butti pattern with concentrated neckline thread embroidery for festive family functions.',
    starting_price: 1400,
    main_image_url: 'assets/images/service_machine_embroidery.png',
    tags: ['Machine Embroidered Blouse'],
    images: []
  },

  // 3. Bridal Blouse & Maggam Work
  {
    id: 'prod-br-1',
    title: 'Grand Regal Peacock Maggam Bridal Blouse',
    slug: 'grand-regal-peacock-maggam-bridal-blouse',
    description: 'Showstopper bridal masterpiece with 3D embossed zardozi peacocks, authentic ruby kundan stones, and hand-dyed cotton inner lining.',
    starting_price: 4500,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Bridal Blouse & Maggam Work', 'Hand Embroidered Blouses'],
    images: [
      { id: 'sub-br-1a', image_url: 'assets/images/service_bridal.png' },
      { id: 'sub-br-1b', image_url: 'assets/images/service_hand_embroidery.png' }
    ]
  },
  {
    id: 'prod-br-2',
    title: 'Heritage Lakshmi Kasu Maggam Bridal Blouse',
    slug: 'heritage-lakshmi-kasu-maggam-bridal-blouse',
    description: 'Traditional gold Kasu coin detailing interwoven with emerald green stone cutwork and dense bridal sleeve borders.',
    starting_price: 4200,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Bridal Blouse & Maggam Work'],
    images: []
  },
  {
    id: 'prod-br-3',
    title: 'Cutwork Neckline Heavy Maggam Bridal Blouse',
    slug: 'cutwork-neckline-heavy-maggam-bridal-blouse',
    description: 'Bespoke scalloped cutwork along back neckline with hanging latkan pearls and French-knot silk thread fillings.',
    starting_price: 4800,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Bridal Blouse & Maggam Work'],
    images: []
  },
  {
    id: 'prod-br-4',
    title: 'Full Back Floral Bridal Maggam Embroidery',
    slug: 'full-back-floral-bridal-maggam-embroidery',
    description: 'Grand full-coverage bridal back design with radiant sun medallion and matching elbow border embroidery.',
    starting_price: 5200,
    main_image_url: 'assets/images/service_bridal.png',
    tags: ['Bridal Blouse & Maggam Work'],
    images: []
  },

  // 4. Kurtis & Chudidhar
  {
    id: 'prod-kc-1',
    title: 'Designer Pure Silk Chudidhar & Patterned Salwar Suit',
    slug: 'designer-pure-silk-chudidhar-salwar-suit',
    description: 'Custom fitted silk salwar suit with bespoke yoke neckline embroidery, designer palazzo/chudidhar pants, and lightweight dupatta.',
    starting_price: 1200,
    main_image_url: 'assets/images/service_salwar.png',
    tags: ['Kurtis & Chudidhar'],
    images: [
      { id: 'sub-kc-1a', image_url: 'assets/images/service_salwar.png' }
    ]
  },
  {
    id: 'prod-kc-2',
    title: 'Straight Cut Festive Silk Kurti with Zari Yoke',
    slug: 'straight-cut-festive-silk-kurti-zari-yoke',
    description: 'Tailored straight-cut festive kurti with gold threadwork on yoke, side slit piping, and breathable cotton lining.',
    starting_price: 950,
    main_image_url: 'assets/images/service_salwar.png',
    tags: ['Kurtis & Chudidhar'],
    images: []
  },
  {
    id: 'prod-kc-3',
    title: 'Anarkali Style Flared Festive Kurti',
    slug: 'anarkali-style-flared-festive-kurti',
    description: '16-kali flared floor length anarkali kurti crafted with micro pleating, gold lace borders, and custom sleeve styling.',
    starting_price: 1800,
    main_image_url: 'assets/images/service_salwar.png',
    tags: ['Kurtis & Chudidhar'],
    images: []
  },

  // 5. Lehengas & Festive Couture
  {
    id: 'prod-lh-1',
    title: 'Opulent Silk Festive Lehenga Choli Set',
    slug: 'opulent-silk-festive-lehenga-choli-set',
    description: 'Custom stitched silk lehenga with waist canvas structuring, handcrafted tassel latkans, and heavy festive skirt pleating.',
    starting_price: 4200,
    main_image_url: 'assets/images/service_lehenga.png',
    tags: ['Lehengas & Festive Couture', 'Bridal Work'],
    images: [
      { id: 'sub-lh-1a', image_url: 'assets/images/service_lehenga.png' }
    ]
  },
  {
    id: 'prod-lh-2',
    title: 'Bridal Velvet & Raw Silk Zardozi Lehenga',
    slug: 'bridal-velvet-raw-silk-zardozi-lehenga',
    description: 'Double flare bridal lehenga featuring 24 kali panels, antique zardozi borders, and custom padded sweetheart choli.',
    starting_price: 6500,
    main_image_url: 'assets/images/service_lehenga.png',
    tags: ['Lehengas & Festive Couture', 'Bridal Work'],
    images: []
  },
  {
    id: 'prod-lh-3',
    title: 'Floral Organza Lightweight Festive Lehenga',
    slug: 'floral-organza-lightweight-festive-lehenga',
    description: 'Airy printed organza lehenga with satin lining, ruffled cancan base, and contemporary sleeveless crop top.',
    starting_price: 3400,
    main_image_url: 'assets/images/service_lehenga.png',
    tags: ['Lehengas & Festive Couture'],
    images: []
  },

  // 6. Frocks & Gowns
  {
    id: 'prod-fg-1',
    title: 'Indo-Western Silk Evening Gala Gown',
    slug: 'indo-western-silk-evening-gala-gown',
    description: 'Floor-length flared designer gown with pleated bodice, hand-embellished waist belt, and premium crepe lining.',
    starting_price: 2800,
    main_image_url: 'assets/images/service_lehenga.png',
    tags: ['Frocks & Gowns'],
    images: []
  },
  {
    id: 'prod-fg-2',
    title: 'Princess Cut Birthday & Reception Festive Frock',
    slug: 'princess-cut-birthday-reception-festive-frock',
    description: 'Multi-tiered flared tulle and silk party frock with back bow, pearl neckline, and soft cotton comfort underskirt.',
    starting_price: 2200,
    main_image_url: 'assets/images/service_lehenga.png',
    tags: ['Frocks & Gowns'],
    images: []
  },

  // 7. Zardozi Work
  {
    id: 'prod-zw-1',
    title: 'Artisanal Metallic Wire Hand Zardozi Work',
    slug: 'artisanal-metallic-wire-hand-zardozi-work',
    description: 'Bespoke hand embroidery created by master artisans featuring intricate cut beads, metallic thread highlights, and padded velvet border detailing.',
    starting_price: 2500,
    main_image_url: 'assets/images/service_hand_embroidery.png',
    tags: ['Zardozi Work', 'Hand Embroidered Blouses'],
    images: []
  },
  {
    id: 'prod-zw-2',
    title: 'Antique Copper Wire Floral Zardozi Sleeves',
    slug: 'antique-copper-wire-floral-zardozi-sleeves',
    description: 'Dull gold and copper wire hand-embroidery on sleeve borders with sequin centers and relief padding.',
    starting_price: 2900,
    main_image_url: 'assets/images/service_hand_embroidery.png',
    tags: ['Zardozi Work'],
    images: []
  }
];

// Helper to get all items merging local storage additions with master catalog
function getUnifiedCatalog() {
  let customItems = [];
  try {
    customItems = JSON.parse(localStorage.getItem('custom_showcase_items') || '[]');
  } catch (e) {}

  const customIds = new Set(customItems.map(c => String(c.id)));
  // Filter out any default items that share an ID with custom items (for edits)
  const nonReplacedDefaults = MASTER_CATALOG.filter(d => !customIds.has(String(d.id)));

  return [...customItems, ...nonReplacedDefaults];
}

if (typeof window !== 'undefined') {
  window.MASTER_CATALOG = MASTER_CATALOG;
  window.getUnifiedCatalog = getUnifiedCatalog;
}
