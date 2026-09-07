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
  },
  {
    slug: 'giant-squid-neck',
    name: 'Giant Squid Neck',
    category: 'squid',
    image: `${IMG}giant-squid-neck.png`,
  },
  {
    slug: 'giant-squid-wing',
    name: 'Giant Squid Wing',
    category: 'squid',
    image: `${IMG}giant-squid-wing.png`,
  },
  {
    slug: 'giant-squid-rings',
    name: 'Giant Squid Rings',
    category: 'squid',
    image: `${IMG}giant-squid-rings.png`,
  },
  {
    slug: 'giant-squid-bp',
    name: 'Giant Squid BP',
    category: 'squid',
    image: `${IMG}giant-squid-bp.png`,
  },
  {
    slug: 'giant-squid-sexual-organ',
    name: 'Giant Squid Sexual Organ',
    category: 'squid',
    image: `${IMG}giant-squid-sexual-organ.png`,
  },
  {
    slug: 'giant-squid-tentacles',
    name: 'Giant Squid Tentacles',
    category: 'squid',
    image: `${IMG}giant-squid-tentacles.png`,
  },

  // ─── TILAPIA ─────────────────────────────────────────────────────
  {
    slug: 'tilapia-fillet-ivp',
    name: 'Tilapia Fillet IVP',
    category: 'tilapia',
    image: `${IMG}tilapia-fillet-ivp.png`,
  },
  {
    slug: 'tilapia-whole-round',
    name: 'Tilapia WR',
    category: 'tilapia',
    image: `${IMG}tilapia-whole-round.png`,
  },
  {
    slug: 'tilapia-gs',
    name: 'Tilapia G/S',
    category: 'tilapia',
    image: `${IMG}tilapia-gs.png`,
  },
  {
    slug: 'tilapia-breaded-raw',
    name: 'Raw Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-raw.png`,
  },
  {
    slug: 'tilapia-breaded-prefried',
    name: 'Pre-fried Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-prefried.png`,
  },

  // ─── SHRIMP (Litopenaeus vannamei) ───────────────────────────────
  {
    slug: 'shrimp-vannamei-hoso',
    name: 'Vannamei Shrimp HOSO',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-hoso.png`,
  },
  {
    slug: 'shrimp-vannamei-pd',
    name: 'Vannamei Shrimp PD',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-pd.png`,
  },
  {
    slug: 'shrimp-cooked-pd',
    name: 'Cooked, Peeled & Deveined Shrimp',
    category: 'shrimp',
    image: `${IMG}shrimp-cooked-pd.png`,
  },
  {
    slug: 'shrimp-paste',
    name: 'Shrimp Paste',
    category: 'shrimp',
    image: `${IMG}shrimp-paste.png`,
  },

  // ─── PANGA / PANGASIUS ───────────────────────────────────────────
  {
    slug: 'rose-panga-fillet',
    name: 'Rose Panga Fillet',
    category: 'panga',
    image: `${IMG}rose-panga-fillet.png`,
  },
  {
    slug: 'panga-steaks',
    name: 'Panga Steaks',
    category: 'panga',
    image: `${IMG}panga-steaks.png`,
  },
  {
    slug: 'panga-breaded-fillet',
    name: 'Breaded Panga Fillet',
    category: 'panga',
    image: `${IMG}panga-breaded-fillet.png`,
  },

  // ─── TUNA ────────────────────────────────────────────────────────
  {
    slug: 'tuna-steaks',
    name: 'Tuna Steaks',
    category: 'tuna',
    image: `${IMG}tuna-steaks.png`,
  },
  {
    slug: 'tuna-cubes',
    name: 'Tuna Cubes',
    category: 'tuna',
    image: `${IMG}tuna-cubes.png`,
  },
];
