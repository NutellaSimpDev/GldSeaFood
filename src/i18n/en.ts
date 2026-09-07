import type { Dict } from './es';

/**
 * English. Tipado como Dict: si falta una clave que existe en es.ts,
 * el build falla. Esa es la red de seguridad para agregar zh.ts luego.
 */
export const en: Dict = {
  meta: {
    title: 'Golden Seafood | Direct Import & Wholesale Logistics',
    description:
      'Golden Seafood - Leaders in direct import and wholesale logistics of premium frozen seafood products.',
  },

  nav: {
    inicio: 'Home',
    operaciones: 'Global Reach',
    productos: 'Catalog',
    calculadora: 'B2B Calculator',
    ventajas: 'Advantages',
    cta: 'Request a Quote',
  },

  hero: {
    badge: 'International Supply Network Active',
    title: 'Your Global Partner in Seafood Sourcing',
    subtitle:
      'We guarantee continuous supply of high-quality premium seafood for distributors and fish markets. Impeccable, certified cold-chain logistics, straight from origin to your warehouse.',
    ctaPrimary: 'Explore Catalog',
    ctaSecondary: 'Contact Us',
    kpiVolume: 'Consolidated Annual Volume',
    kpiCold: 'Guaranteed Cold Chain',
    kpiTrace: 'Document Tracking',
  },

  certifications: {
    label: 'Standards & Certifications:',
    items: {
      haccp: 'Hazard Analysis and Critical Control Points',
      fda: 'U.S. Facility Registration',
      bap: 'Best Aquaculture Practices',
      iso: 'Food Safety Management',
      senasa: 'Sanitary Import Permits',
    },
  },

  operations: {
    eyebrow: 'International Reach & Operating Ports',
    title: 'Direct Presence at Origin and Destination',
    body: 'We operate offices and sourcing contracts in the main fishing hubs of Asia and Latin America. We guarantee optimized transit times and steady slot allocation on reefer container vessels.',
    hint: 'Click a country card or the globe to see details',
    cta: 'View Product Catalog',
    loading: 'Loading global map',
    markets: {
      mx: { hub: 'Manzanillo / Veracruz', capacity: '18,000 MT/year' },
      cr: { hub: 'Puerto Caldera', capacity: '8,500 MT/year' },
      co: { hub: 'Buenaventura / Cartagena', capacity: '12,000 MT/year' },
      pe: { hub: 'Callao / Paita', capacity: '15,000 MT/year' },
      cn: { hub: 'Yantian (Shenzhen)', capacity: 'Primary Origin' },
      vn: { hub: 'Ho Chi Minh', capacity: 'Primary Origin' },
    },
    globe: {
      mx: 'Central distribution hub. Direct access to northern and central markets with certified cold-storage infrastructure.',
      cr: 'Strategic center in Central America with direct import operations and regional redistribution.',
      co: 'Presence in Bogotá and Buenaventura. Direct import with full customs management.',
      pe: 'Origin of Giant Squid Dosidicus gigas. Certified processing plants along the coast.',
      cn: 'Tilapia and panga sourcing through the port of Yantian, Shenzhen. Quality control at origin.',
      vn: 'Premium panga fillet production. High-technology processing with BAP certification.',
    },
  },

  catalog: {
    eyebrow: 'B2B Sourcing Catalog',
    title: 'Species & Processed Seafood Products',
    body: 'Select a category to review commercial presentations, size grades and industrial packing specifications.',
    all: 'All',
    categories: {
      squid: 'Giant Squid',
      tilapia: 'Tilapia',
      shrimp: 'Shrimp',
      panga: 'Panga',
      tuna: 'Tuna',
    },
    badge: '100% IQF',
    seeSpecs: 'View specifications',
    specsTitle: 'B2B Packing Specifications',
    quote: 'Request a Quote',
    empty: 'No products in this category.',
  },

  calculator: {
    badge: 'B2B Tool',
    title: 'Container Capacity Calculator',
    body: 'Estimate the approximate number of cartons and usable net weight per type of refrigerated (reefer) container.',
    step1: '1. Select the species / product',
    step2: '2. Reefer container type',
    c20: '20ft Reefer',
    c20sub: '~18 Tonnes',
    c40: '40ft High Cube',
    c40sub: '~26.5 Tonnes',
    resultTitle: 'Shipment Capacity Estimate',
    totalBoxes: 'Total Cartons',
    boxesUnit: 'Master Cartons',
    netWeight: 'Net Weight',
    optimized: 'Optimized Load',
    quote: 'Request a Quote',
    estimateNote: 'Reference weight: confirm the exact presentation with your account manager.',
  },

  advantages: {
    eyebrow: 'B2B Competitive Advantages',
    title: 'Full Guarantee on Every Container',
    body: 'We design continuous sourcing solutions that optimize your operating costs and protect your margins.',
    items: {
      cold: {
        title: 'Guaranteed Cold Chain',
        kpi: '0% Interruption',
        desc: 'Continuous thermal sensors from the plant of origin to your final warehouse. Constant temperature guaranteed at -18°C.',
      },
      trace: {
        title: 'Traceability & Document Tracking',
        kpi: '100% Traceability',
        desc: 'Real-time monitoring and orderly management of shipping files, BL, health certificates and commercial invoice for swift port release.',
      },
      weight: {
        title: 'Exact Weights & Size Grades',
        kpi: '±0% Deviation',
        desc: 'Packing audits at origin. We strictly comply with declared glazing percentages to protect your margins.',
      },
    },
  },

  contact: {
    eyebrow: 'Specialized Commercial Support',
    title: 'Start Your Corporate Quote',
    body: 'Build a proposal tailored to your volume requirements, destination port and shipping frequency.',
    noticeLabel: 'VOLUME NOTICE:',
    notice:
      'We only process requests for wholesale purchases and consolidated containers (20ft / 40ft reefer). We do not sell retail.',
    name: 'Full Name',
    namePh: 'Carlos Mendoza',
    company: 'Company / Legal Name',
    companyPh: 'Company Inc.',
    country: 'Country of Operation',
    countryPh: 'e.g. Mexico, Costa Rica, Colombia...',
    email: 'Corporate Email',
    emailPh: 'carlos.mendoza@company.com',
    product: 'Required Product',
    productPh: 'Select a product...',
    productMixed: 'Mixed Container / Multiple Species',
    details: 'Destination Port / Estimated Volume',
    detailsPh:
      'Indicate destination port (e.g. Manzanillo, Buenaventura, Caldera), estimated volume and purchase frequency...',
    submit: 'Send B2B Quote Request',
    success:
      'Request sent successfully. A sales representative will contact you within 24 business hours.',
  },

  footer: {
    about:
      'Regional leaders in the import and logistics of premium frozen seafood. Steady supply across Latin America.',
    linksTitle: 'Quick Links',
    quote: 'Quote Request',
    contactTitle: 'Regional Contact',
    sales: 'Sales:',
    latam: 'Latin America:',
    latamValue: 'Mexico, Costa Rica, Colombia, Peru.',
    modality: 'Terms:',
    modalityValue: 'FOB and CIF for wholesale volumes.',
    rights: '© 2026 Golden Seafood. All rights reserved. B2B sourcing.',
    terms: 'Terms & Conditions',
    privacy: 'B2B Privacy Policy',
    safety: 'Food Safety Regulations',
  },

  products: {
    'giant-squid-fillet': {
      tag: 'Dosidicus gigas · Peruvian Origin',
      desc: 'Clean mantle sheets with uniform whiteness and firm texture. An ideal base for repacking, secondary cutting and production of rings or strips.',
      specs: [
        ['Presentation', 'Block / raffia sack 20 kg'],
        ['Processing', 'Block frozen or IQF'],
        ['Origin', 'Peru — sanitary-approved plants'],
        ['Use', 'Repacking and industrial processing'],
      ],
    },
    'giant-squid-neck': {
      tag: 'Neck · Clean Cut',
      desc: 'Clean giant squid neck, skinless and cartilage-free. High yield and consistent texture for ring cutting or whole preparations.',
      specs: [
        ['Presentation', 'Raffia sack 20 kg'],
        ['Processing', 'Frozen on board / at origin'],
        ['Origin', 'Peru'],
        ['Texture', 'Firm, suitable for secondary processing'],
      ],
    },
    'giant-squid-wing': {
      tag: 'Wing · High Yield',
      desc: 'Giant squid wing, an economical cut with excellent yield. Widely used in the seafood snack industry and breaded preparations.',
      specs: [
        ['Presentation', 'Raffia sack 20 kg'],
        ['Processing', 'Block frozen'],
        ['Origin', 'Peru'],
        ['Channel', 'Industry and processors'],
      ],
    },
    'giant-squid-rings': {
      tag: 'Rings · Ready to Bread',
      desc: 'Uniformly graded rings cut from the mantle, ready to bread or cook. A high-turnover presentation in food service and retail.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'IQF (Individually Quick Frozen)'],
        ['Size grades', 'Per customer specification'],
        ['Channel', 'Food service, retail and HORECA'],
      ],
    },
    'giant-squid-bp': {
      tag: 'BP · Selected Pieces',
      desc: 'Graded, clean giant squid pieces with even whiteness. A versatile format for repacking and value-added product manufacturing.',
      specs: [
        ['Presentation', 'Raffia sack 20 kg'],
        ['Processing', 'Block frozen or IQF'],
        ['Origin', 'Peru'],
        ['Use', 'Repacking and value-added'],
      ],
    },
    'giant-squid-sexual-organ': {
      tag: 'Specialty · Asian Market',
      desc: 'A specialty product with sustained demand in Asian markets. Processed and graded at origin under export sanitary standards.',
      specs: [
        ['Presentation', 'Raffia sack 20 kg'],
        ['Processing', 'Block frozen'],
        ['Origin', 'Peru'],
        ['Market', 'Primarily Asia'],
      ],
    },
    'giant-squid-tentacles': {
      tag: 'Tentacles · Cleaned',
      desc: 'Clean tentacles graded by size. Firm texture and pronounced marine flavor, in high demand for grilling, sautéing and canning.',
      specs: [
        ['Presentation', 'Raffia sack 20 kg'],
        ['Processing', 'Block frozen or IQF'],
        ['Origin', 'Peru'],
        ['Channel', 'Food service and canneries'],
      ],
    },

    'tilapia-fillet-ivp': {
      tag: 'Skinless · White Flesh · Vacuum Packed',
      desc: 'Selected fillets of firm white flesh, boneless and skinless, individually vacuum packed (IVP). Strictly graded by weight.',
      specs: [
        ['Presentation', 'Master carton 10 lb (4.54 kg)'],
        ['Processing', 'IVP — individual vacuum pack'],
        ['Glazing', '10% to 20% per specification'],
        ['Size grades', '3-5 oz, 5-7 oz, 7-9 oz'],
      ],
    },
    'tilapia-whole-round': {
      tag: 'Unprocessed Whole Round',
      desc: 'Whole ungutted tilapia, frozen immediately after harvest. A lower cost-per-kilo format for plants with their own processing line.',
      specs: [
        ['Presentation', 'Master carton 40 lb (18.14 kg)'],
        ['Processing', 'Whole round frozen'],
        ['Sizes', '350-550g, 550-750g, 750g+'],
        ['Channel', 'Processing plants'],
      ],
    },
    'tilapia-gs': {
      tag: 'Whole · Gutted & Scaled',
      desc: 'Clean whole tilapia, gutted and scaled. Processed immediately after harvest to preserve flavor and flesh structure.',
      specs: [
        ['Presentation', 'Master carton 40 lb (18.14 kg)'],
        ['Specification', 'Gutted and scaled (G/S)'],
        ['Storage', 'IQF, individually bagged'],
        ['Sizes', '350-550g, 550-750g, 750g+'],
      ],
    },
    'tilapia-breaded-raw': {
      tag: 'Raw Breaded · Value Added',
      desc: 'Raw breaded tilapia fillet, ready to fry or bake at destination. Uniform coating with stable adhesion after thawing.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Raw breaded, IQF frozen'],
        ['Preparation', 'Fry or bake from frozen'],
        ['Channel', 'Food service and retail'],
      ],
    },
    'tilapia-breaded-prefried': {
      tag: 'Pre-fried · Ready to Serve',
      desc: 'Breaded tilapia fillet pre-fried at origin. Requires only final reheating, cutting kitchen time and shrinkage.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Breaded and pre-fried, IQF'],
        ['Preparation', 'Reheat from frozen'],
        ['Channel', 'Food service, chains and catering'],
      ],
    },

    'shrimp-vannamei-hoso': {
      tag: 'Head-On, Shell-On',
      desc: 'Whole farmed Vannamei shrimp, head-on and shell-on. Color and freshness preserved by immediate freezing at origin.',
      specs: [
        ['Presentation', 'Master carton 10 kg (blocks or IQF)'],
        ['Size grades', '20/30, 30/40, 40/50, 50/60, 60/70'],
        ['Storage', 'Frozen at -18°C'],
        ['Channel', 'Retail, HORECA and reprocessing'],
      ],
    },
    'shrimp-vannamei-pd': {
      tag: 'Raw · Peeled and Deveined',
      desc: 'Raw peeled and deveined Vannamei shrimp. Net yield with no peeling loss, ideal for production lines and high-volume kitchens.',
      specs: [
        ['Presentation', 'Master carton 10 kg (1 kg bags)'],
        ['Size grades', 'U15, 21/25, 31/40, 51/60, 70/90'],
        ['Storage', 'IQF at -18°C'],
        ['Channel', 'Industry and food service'],
      ],
    },
    'shrimp-cooked-pd': {
      tag: 'Ready to Eat · Peeled & Deveined',
      desc: 'Farmed shrimp peeled, deveined and steam-cooked at origin. Keeps a bright orange color, crisp texture and zero drip loss when thawed.',
      specs: [
        ['Presentation', 'Master carton 10 kg (1 kg bags)'],
        ['Size grades', 'U15, 21/25, 31/40, 51/60, 70/90'],
        ['Main channel', 'Supermarkets, hotels and restaurants'],
        ['Storage', 'IQF at -18°C'],
      ],
    },
    'shrimp-paste': {
      tag: 'Paste · Industrial Base',
      desc: 'Shrimp paste for industrial use: a base for sauces, fillings, seafood sausages and formed products. Homogeneous texture and concentrated flavor.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Ground and frozen at origin'],
        ['Use', 'Sauces, fillings and formed products'],
        ['Channel', 'Food industry'],
      ],
    },

    'rose-panga-fillet': {
      tag: 'Pangasius · Rose Fillet',
      desc: 'Panga fillet with a natural rose tone, well trimmed, fat-free, boneless and free of red line. 100% net yield for industrial canteens and processors.',
      specs: [
        ['Presentation', 'Master carton 15 kg'],
        ['Treatment', 'Phosphate-free or specified level'],
        ['Storage', 'IQF frozen at origin'],
        ['Size grades', '120-170g, 170-220g, 220g+'],
      ],
    },
    'panga-steaks': {
      tag: 'Steaks · Cross Cut',
      desc: 'Cross-cut panga with center bone, of uniform thickness. A high-turnover presentation in markets that favor the steak cut.',
      specs: [
        ['Presentation', 'Master carton 15 kg'],
        ['Processing', 'Cross cut, IQF'],
        ['Origin', 'Vietnam — BAP certified'],
        ['Channel', 'Retail and food service'],
      ],
    },
    'panga-breaded-fillet': {
      tag: 'Breaded · Value Added',
      desc: 'Breaded panga fillet with even coating and stable crispness after cooking. A format designed for fast-food chains and catering.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Breaded, IQF frozen'],
        ['Preparation', 'Fry or bake from frozen'],
        ['Channel', 'Chains, catering and food service'],
      ],
    },

    'tuna-steaks': {
      tag: 'Loin · Premium Cut',
      desc: 'Clean-cut tuna loins with deep color, selected for flesh quality. Quick freezing preserves texture and plate presentation.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Cut and quick frozen'],
        ['Weight', 'Per customer specification'],
        ['Channel', 'HORECA and premium retail'],
      ],
    },
    'tuna-cubes': {
      tag: 'Cubes · Portioned',
      desc: 'Evenly sized tuna cubes, ready to portion. An efficient format for poke, ceviche, stir-fries and quick-preparation lines.',
      specs: [
        ['Presentation', 'Master carton 10 kg'],
        ['Processing', 'Diced and IQF frozen'],
        ['Size', 'Uniform, per specification'],
        ['Channel', 'Food service and prepared meals'],
      ],
    },
  },
};
