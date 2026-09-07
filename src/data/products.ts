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
  /**
   * Muestra el distintivo "100% IQF" en la tarjeta.
   * El calamar gigante va en bloque o saco de rafia, no IQF individual,
   * asi que ahi el distintivo seria incorrecto.
   */
  iqf: boolean;
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
    iqf: false,
  },
  {
    slug: 'giant-squid-neck',
    name: 'Giant Squid Neck',
    category: 'squid',
    image: `${IMG}giant-squid-neck.png`,
    iqf: false,
  },
  {
    slug: 'giant-squid-wing',
    name: 'Giant Squid Wing',
    category: 'squid',
    image: `${IMG}giant-squid-wing.png`,
    iqf: false,
  },
  {
    slug: 'giant-squid-rings',
    name: 'Giant Squid Rings',
    category: 'squid',
    image: `${IMG}giant-squid-rings.png`,
    iqf: false,
  },
  {
    slug: 'giant-squid-bp',
    name: 'Giant Squid BP',
    category: 'squid',
    image: `${IMG}giant-squid-bp.png`,
    iqf: false,
  },
  {
    slug: 'giant-squid-sexual-organ',
    name: 'Giant Squid Sexual Organ',
    category: 'squid',
    image: `${IMG}giant-squid-sexual-organ.png`,
    iqf: false,
  },
  {
    slug: 'giant-squid-tentacles',
    name: 'Giant Squid Tentacles',
    category: 'squid',
    image: `${IMG}giant-squid-tentacles.png`,
    iqf: false,
  },

  // ─── TILAPIA ─────────────────────────────────────────────────────
  {
    slug: 'tilapia-fillet-ivp',
    name: 'Tilapia Fillet IVP',
    category: 'tilapia',
    image: `${IMG}tilapia-fillet-ivp.png`,
    iqf: true,
  },
  {
    slug: 'tilapia-whole-round',
    name: 'Tilapia WR',
    category: 'tilapia',
    image: `${IMG}tilapia-whole-round.png`,
    iqf: true,
  },
  {
    slug: 'tilapia-gs',
    name: 'Tilapia G/S',
    category: 'tilapia',
    image: `${IMG}tilapia-gs.png`,
    iqf: true,
  },
  {
    slug: 'tilapia-breaded-raw',
    name: 'Raw Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-raw.png`,
    iqf: true,
  },
  {
    slug: 'tilapia-breaded-prefried',
    name: 'Pre-fried Breaded Tilapia Fillet',
    category: 'tilapia',
    image: `${IMG}tilapia-breaded-prefried.png`,
    iqf: true,
  },

  // ─── SHRIMP (Litopenaeus vannamei) ───────────────────────────────
  {
    slug: 'shrimp-vannamei-hoso',
    name: 'Vannamei Shrimp HOSO',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-hoso.png`,
    // Entero con cabeza: se despacha en bloque, no en IQF individual
    iqf: false,
  },
  {
    slug: 'shrimp-vannamei-pd',
    name: 'Vannamei Shrimp PD',
    category: 'shrimp',
    image: `${IMG}shrimp-vannamei-pd.png`,
    iqf: true,
  },
  {
    slug: 'shrimp-cooked-pd',
    name: 'Cooked, Peeled & Deveined Shrimp',
    category: 'shrimp',
    image: `${IMG}shrimp-cooked-pd.png`,
    iqf: true,
  },
  {
    slug: 'shrimp-paste',
    name: 'Shrimp Paste',
    category: 'shrimp',
    image: `${IMG}shrimp-paste.png`,
    iqf: true,
  },

  // ─── PANGA / PANGASIUS ───────────────────────────────────────────
  {
    slug: 'rose-panga-fillet',
    name: 'Rose Panga Fillet',
    category: 'panga',
    image: `${IMG}rose-panga-fillet.png`,
    iqf: true,
  },
  {
    slug: 'panga-steaks',
    name: 'Panga Steaks',
    category: 'panga',
    image: `${IMG}panga-steaks.png`,
    iqf: true,
  },
  {
    slug: 'panga-breaded-fillet',
    name: 'Breaded Panga Fillet',
    category: 'panga',
    image: `${IMG}panga-breaded-fillet.png`,
    iqf: true,
  },

  // ─── TUNA ────────────────────────────────────────────────────────
  {
    slug: 'tuna-steaks',
    name: 'Tuna Steaks',
    category: 'tuna',
    image: `${IMG}tuna-steaks.png`,
    iqf: true,
  },
  {
    slug: 'tuna-cubes',
    name: 'Tuna Cubes',
    category: 'tuna',
    image: `${IMG}tuna-cubes.png`,
    iqf: true,
  },
];
