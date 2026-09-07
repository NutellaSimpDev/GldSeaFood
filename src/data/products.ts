/**
 * Catalogo de productos — datos neutros al idioma.
 *
 * El nombre comercial va en ingles a proposito: es como el comprador B2B
 * busca el producto en el mercado internacional. Las descripciones, tags y
 * especificaciones traducibles viven en src/i18n/<lang>.ts, indexadas por `slug`.
 *
 * Fuente: "Golden SeaFood Catalog (4)_Fixed.pdf" (10 paginas, 21 productos).
 */

export type CategoryId = 'squid' | 'tilapia' | 'shrimp' | 'panga' | 'tuna';

export interface Product {
  slug: string;
  /** Nombre comercial internacional, identico al catalogo impreso. */
  name: string;
  category: CategoryId;
  image: string;
  boxWeightKg: number;
  boxWeightLb: number;
  /**
   * false = peso de caja tomado de una presentacion estandar del rubro,
   * NO confirmado contra la ficha tecnica real. La calculadora los usa,
   * asi que conviene validarlos antes de publicar.
   */
  weightConfirmed: boolean;
}

const IMG = 'images/catalog/';

export const categories: CategoryId[] = ['squid', 'tilapia', 'shrimp', 'panga', 'tuna'];

export const products: Product[] = [
  // ─── GIANT SQUID (Dosidicus gigas) ───────────────────────────────
  {
    slug: 'giant-squid-fillet',
    name: 'Giant Squid Fillet',
    category: 'squid',
    image: `${IMG}giant-squid-fillet.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: true,
  },
  {
    slug: 'giant-squid-neck',
    name: 'Giant Squid Neck',
    category: 'squid',
    image: `${IMG}giant-squid-neck.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: false,
  },
  {
    slug: 'giant-squid-wing',
    name: 'Giant Squid Wing',
    category: 'squid',
    image: `${IMG}giant-squid-wing.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: false,
  },
  {
    slug: 'giant-squid-rings',
    name: 'Giant Squid Rings',
    category: 'squid',
    image: `${IMG}giant-squid-rings.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
  {
    slug: 'giant-squid-bp',
    name: 'Giant Squid BP',
    category: 'squid',
    image: `${IMG}giant-squid-bp.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: false,
  },
  {
    slug: 'giant-squid-sexual-organ',
    name: 'Giant Squid Sexual Organ',
    category: 'squid',
    image: `${IMG}giant-squid-sexual-organ.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: false,
  },
  {
    slug: 'giant-squid-tentacles',
    name: 'Giant Squid Tentacles',
    category: 'squid',
    image: `${IMG}giant-squid-tentacles.png`,
    boxWeightKg: 20, boxWeightLb: 44, weightConfirmed: false,
  },

  // ─── TILAPIA ─────────────────────────────────────────────────────
  {
    slug: 'tilapia-fillet-ivp',
    name: 'Tilapia Fillet IVP',
    category: 'tilapia',
    image: `${IMG}tilapia-fillet-ivp.png`,
    boxWeightKg: 4.54, boxWeightLb: 10, weightConfirmed: true,
  },
  {
    slug: 'tilapia-whole-round',
    name: 'Tilapia WR (Whole Round)',
    category: 'tilapia',
    image: `${IMG}tilapia-whole-round.png`,
    boxWeightKg: 18.14, boxWeightLb: 40, weightConfirmed: true,
  },
  {
    slug: 'tilapia-gs',
    name: 'Tilapia G/S (Gutted & Scaled)',
    category: 'tilapia',
    image: `${IMG}tilapia-gs.png`,
    boxWeightKg: 18.14, boxWeightLb: 40, weightConfirmed: true,
  },
  {
    slug: 'tilapia-breaded-raw',
    name: 'Raw Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-raw.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
  {
    slug: 'tilapia-breaded-prefried',
    name: 'Pre-fried Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-prefried.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },

  // ─── SHRIMP (Litopenaeus vannamei) ───────────────────────────────
  {
    slug: 'shrimp-vannamei-hoso',
    name: 'Vannamei Shrimp HOSO',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-hoso.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
  {
    slug: 'shrimp-vannamei-pd',
    name: 'Vannamei Shrimp PD',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-pd.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
  {
    slug: 'shrimp-cooked-pd',
    name: 'Cooked, Peeled & Deveined Shrimp',
    category: 'shrimp',
    image: `${IMG}shrimp-cooked-pd.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: true,
  },
  {
    slug: 'shrimp-paste',
    name: 'Shrimp Paste',
    category: 'shrimp',
    image: `${IMG}shrimp-paste.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },

  // ─── PANGA / PANGASIUS ───────────────────────────────────────────
  {
    slug: 'rose-panga-fillet',
    name: 'Rose Panga Fillet',
    category: 'panga',
    image: `${IMG}rose-panga-fillet.png`,
    boxWeightKg: 15, boxWeightLb: 33, weightConfirmed: true,
  },
  {
    slug: 'panga-steaks',
    name: 'Panga Steaks',
    category: 'panga',
    image: `${IMG}panga-steaks.png`,
    boxWeightKg: 15, boxWeightLb: 33, weightConfirmed: false,
  },
  {
    slug: 'panga-breaded-fillet',
    name: 'Breaded Panga Fillet',
    category: 'panga',
    image: `${IMG}panga-breaded-fillet.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },

  // ─── TUNA ────────────────────────────────────────────────────────
  {
    slug: 'tuna-steaks',
    name: 'Tuna Steaks',
    category: 'tuna',
    image: `${IMG}tuna-steaks.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
  {
    slug: 'tuna-cubes',
    name: 'Tuna Cubes',
    category: 'tuna',
    image: `${IMG}tuna-cubes.png`,
    boxWeightKg: 10, boxWeightLb: 22, weightConfirmed: false,
  },
];
