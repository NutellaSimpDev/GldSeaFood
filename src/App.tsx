import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Snowflake, FileText, Package, ChevronDown, X, ArrowRight, 
  Globe2, Mail, MapPin, AlertTriangle, Menu, Sparkles, 
  ShieldCheck, Award, TrendingUp, Calculator, CheckCircle2, Box
} from 'lucide-react';
import GlobeMap from './components/GlobeMap';

/* ═══════════════════════════════════════════════════════════════
   BASE PATH FOR GITHUB PAGES / LOCAL DEV
   ═══════════════════════════════════════════════════════════════ */
const BASE = import.meta.env.BASE_URL;

const markets = [
  { name: 'México', code: 'mx', hub: 'Manzanillo / Veracruz', capacity: '18,000 MT/año' },
  { name: 'Costa Rica', code: 'cr', hub: 'Puerto Caldera', capacity: '8,500 MT/año' },
  { name: 'Colombia', code: 'co', hub: 'Buenaventura / Cartagena', capacity: '12,000 MT/año' },
  { name: 'Perú', code: 'pe', hub: 'Callao / Paita', capacity: '15,000 MT/año' },
  { name: 'China', code: 'cn', hub: 'Qingdao / Ningbo', capacity: 'Origen Primario' },
  { name: 'Vietnam', code: 'vn', hub: 'Ho Chi Minh', capacity: 'Origen Primario' },
];

const certifications = [
  { name: 'HACCP Certified', desc: 'Análisis de Peligros y Puntos Críticos' },
  { name: 'FDA Registered', desc: 'Registro Sanitario de Instalaciones EE.UU.' },
  { name: 'BAP 4-Star', desc: 'Mejores Prácticas de Acuicultura' },
  { name: 'ISO 22000', desc: 'Gestión de Inocuidad Alimentaria' },
  { name: 'DIPOA / SENASA', desc: 'Permisos Sanitarios de Importación' },
];

const products = [
  {
    id: 1,
    category: 'pescados',
    name: 'Filete de Tilapia Premium',
    tag: 'IQF · Sin Piel · Carne Blanca',
    image: `${BASE}images/products/tilapia_fillet.png`,
    desc: 'Filetes seleccionados de carne blanca y firme, sin espinas ni piel. Clasificados estrictamente por gramaje para distribución industrial y canal food-service.',
    boxWeightKg: 4.54,
    boxWeightLb: 10,
    specs: [
      { label: 'Presentación', value: 'Caja Máster 10 lb (4.54 kg)' },
      { label: 'Procesamiento', value: 'IQF (Congelación Rápida Individual)' },
      { label: 'Glaseado', value: '10% al 20% según especificación' },
      { label: 'Calibres', value: '3-5 oz, 5-7 oz, 7-9 oz' },
    ],
  },
  {
    id: 2,
    category: 'cefalopodos',
    name: 'Calamar Gigante',
    tag: 'Dosidicus gigas · Origen Perú',
    image: `${BASE}images/products/giant_squid.png`,
    desc: 'Extraído de las aguas frías del Pacífico Sur. Excelente blancura y consistencia. Disponible en tubos, aletas, tentáculos y tiras para reempaque.',
    boxWeightKg: 20,
    boxWeightLb: 44,
    specs: [
      { label: 'Presentación', value: 'Saco de Rafia 20 KG y 22.5 KG' },
      { label: 'Variantes', value: 'Tubo limpio, aleta, tentáculo' },
      { label: 'Origen', value: 'Perú (Plantas con habilitación sanitaria)' },
      { label: 'Textura', value: 'Firme, ideal para procesado secundario' },
    ],
  },
  {
    id: 3,
    category: 'mariscos',
    name: 'Camarón Cocido',
    tag: 'Listo para Consumo · Pelado & Desvenado',
    image: `${BASE}images/products/cooked_shrimp.png`,
    desc: 'Camarón de cultivo pelado y desvenado, cocido al vapor en origen. Mantiene un color naranja brillante, textura crujiente y cero mermas al descongelar.',
    boxWeightKg: 10,
    boxWeightLb: 22,
    specs: [
      { label: 'Presentación', value: 'Caja Máster 10 kg (Bolsas 1 kg)' },
      { label: 'Calibres', value: 'U15, 21/25, 31/40, 51/60, 70/90' },
      { label: 'Canal Principal', value: 'Supermercados, Hoteles y Restaurantes' },
      { label: 'Conservación', value: 'IQF a -18°C' },
    ],
  },
  {
    id: 4,
    category: 'pescados',
    name: 'Filete de Basa White',
    tag: 'Pangasius · Premium Trim',
    image: `${BASE}images/products/tilapia_fillet.png`,
    desc: 'Filetes bien recortados (well-trimmed), sin grasa, sin espinas y sin línea roja. Rendimiento 100% neto para comedores industriales y procesadores.',
    boxWeightKg: 15,
    boxWeightLb: 33,
    specs: [
      { label: 'Presentación', value: 'Caja Máster de 15 KG' },
      { label: 'Tratamiento', value: 'Libre de fosfatos o nivel especificado' },
      { label: 'Conservación', value: 'IQF congelado a bordo/origen' },
      { label: 'Calibres', value: '120-170g, 170-220g, 220g+' },
    ],
  },
  {
    id: 5,
    category: 'pescados',
    name: 'Tilapia Entera GGS',
    tag: 'Gilled, Gutted & Scaled',
    image: `${BASE}images/products/product_4_1_transparent.png`,
    desc: 'Tilapia entera limpia (sin agallas, sin vísceras y sin escamas). Procesada inmediatamente tras la cosecha para preservar sabor y estructura marinos.',
    boxWeightKg: 18.14,
    boxWeightLb: 40,
    specs: [
      { label: 'Presentación', value: 'Caja Máster de 40 lb (18.14 kg)' },
      { label: 'Especificación', value: 'Sin agallas, vísceras ni escamas (GGS)' },
      { label: 'Conservación', value: 'IQF bolsa individual' },
      { label: 'Tallas', value: '350-550g, 550-750g, 750g+' },
    ],
  },
];

const advantages = [
  {
    icon: Snowflake,
    title: 'Cadena de Frío Garantizada',
    kpi: '0% Interrupción',
    desc: 'Sensores térmicos continuos desde la planta de origen hasta su bodega final. Garantía de temperatura constante a -18°C.',
  },
  {
    icon: FileText,
    title: 'Importación & Aduanas 100% Llave en Mano',
    kpi: 'Nacionalizado',
    desc: 'Gestionamos permisos sanitarios (SENASA/DIPOA), licencias y trámites aduanales en México, Costa Rica, Colombia y Perú.',
  },
  {
    icon: Package,
    title: 'Pesos & Calibres Exactos',
    kpi: '±0% Desviación',
    desc: 'Auditorías de empaque en origen. Cumplimos rigurosamente los porcentajes de glaseado declarados para proteger sus márgenes.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#operaciones', label: 'Alcance Global' },
    { href: '#productos', label: 'Catálogo' },
    { href: '#calculadora', label: 'Calculadora B2B' },
    { href: '#ventajas', label: 'Ventajas' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3.5 bg-[#06080c]/95 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' : 'py-6 bg-gradient-to-b from-black/85 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="block shrink-0">
          <img
            src={`${BASE}images/logo.png`}
            alt="Golden Seafood"
            style={{
              height: scrolled ? '42px' : '52px',
              maxHeight: '56px',
              width: 'auto',
              maxWidth: '220px',
              objectFit: 'contain'
            }}
            className="transition-all duration-300 block"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white/80 hover:text-[var(--gold-bright)] text-[0.825rem] font-medium uppercase tracking-[1.8px] transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="btn-gold text-xs">
              Cotizar Contenedor
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer py-1 px-2.5 rounded bg-white/5 border border-white/10"
            >
              🌐 ES <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden min-w-[140px] shadow-2xl border border-[var(--gold)]/20"
                >
                  {['Español', 'English', '中文'].map((lang, i) => (
                    <button key={lang} className={`block w-full text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                      i === 0 ? 'text-[var(--gold-bright)] font-semibold bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}>
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mx-4 mt-2 rounded-xl overflow-hidden border border-white/10"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-white/80 hover:text-[var(--gold-bright)] text-xs uppercase tracking-widest border-b border-white/5">
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-[var(--gold-bright)] font-semibold text-xs uppercase tracking-widest text-center bg-white/5">
              Cotizar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={`${BASE}videos/basa-boomerang.mp4`} type="video/mp4" />
        </video>
      </div>

      {/* Luxury Dual Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#06080c] via-[#06080c]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#06080c] via-transparent to-black/60 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-[3] max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-bright)] animate-pulse" />
              <span className="text-[var(--gold-bright)] text-xs font-bold tracking-[2px] uppercase">
                Red de Suministro Internacional Activa
              </span>
            </div>

            <h1 className="text-gradient-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.06]"
              style={{ fontFamily: '"Bodoni Moda", serif' }}>
              Importación Directa & Logística Mayorista de Seafood
            </h1>

            <p className="text-white/80 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed font-light">
              Abastecemos a las principales cadenas de distribución, supermercados e industrias alimentarias de América Latina. 
              Garantía de origen, congelación rápida IQF y trámites sanitarios 100% integrados.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#productos" className="btn-gold">
                Explorar Catálogo <ArrowRight size={16} />
              </a>
              <a href="#contacto" className="btn-outline">
                Contáctenos
              </a>
            </div>
          </div>

          {/* Right Column: Floating KPI Glass Badges */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass p-6 rounded-2xl border border-white/10 hover:border-[var(--gold)]/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold-bright)]">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">+50,000 MT</h4>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Volumen Anual Consolidado</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 hover:border-[var(--gold)]/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold-bright)]">
                  <Snowflake size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">-18°C Constantes</h4>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Cadena de Frío Garantizada</p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 hover:border-[var(--gold)]/40 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold-bright)]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">100% Nacionalizado</h4>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider">Gestión Aduanal Completa</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRUST & CERTIFICATIONS BAR
   ═══════════════════════════════════════════════════════════════ */
function CertificationsBar() {
  return (
    <section className="py-8 bg-[#040609] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="text-white/40 text-xs uppercase tracking-[3px] font-semibold">
            Estándares & Certificaciones:
          </div>
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {certifications.map((c, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70 hover:text-[var(--gold-bright)] transition-colors">
                <Award size={18} className="text-[var(--gold-bright)] shrink-0" />
                <span className="text-xs font-semibold tracking-wider uppercase">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OPERATIONS / GLOBE
   ═══════════════════════════════════════════════════════════════ */
function Operations() {
  return (
    <section id="operaciones" className="relative py-28 md:py-36">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <p className="text-[var(--gold-bright)] text-xs tracking-[4px] uppercase mb-4 font-semibold">
          Alcance Internacional & Puertos Operativos
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Presencia Directa en Origen y Destino
        </h2>
        <p className="text-white/70 text-base md:text-lg leading-relaxed font-light mb-8">
          Operamos con oficinas y contratos de abastecimiento en los principales hubs pesqueros de Asia y América Latina. 
          Garantizamos tiempos de tránsito optimizados y cupos constantes en buques porta-contenedores reefer.
        </p>

        {/* Real Country Flags Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {markets.map(m => (
            <div key={m.code} className="glass p-3 rounded-xl border border-white/10 text-left hover:border-[var(--gold)]/40 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={`https://flagcdn.com/w40/${m.code}.png`}
                  alt={m.name}
                  className="w-5 h-3.5 rounded object-cover shadow border border-white/20"
                />
                <span className="text-white font-bold text-xs">{m.name}</span>
              </div>
              <p className="text-white/40 text-[0.7rem] line-clamp-1">{m.hub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Globe */}
      <div className="relative max-w-4xl mx-auto px-4">
        <GlobeMap />

        <p className="text-center text-white/50 text-xs uppercase tracking-widest mt-6 mb-4 font-medium">
          Haga clic en la esfera para interactuar con las ubicaciones clave
        </p>
        <div className="text-center">
          <a href="#productos" className="btn-gold text-xs">
            Ir al Catálogo de Productos <ChevronDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT CATALOG
   ═══════════════════════════════════════════════════════════════ */
function ProductDetail({ product, onClose }: { product: typeof products[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        onClick={e => e.stopPropagation()}
        className="relative glass rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[var(--gold)]/30"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <X size={24} />
        </button>

        <div className="h-64 relative bg-gradient-to-b from-[#0f141d] to-[#06080c] flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[var(--gold)]/15 via-transparent to-transparent pointer-events-none" />
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: '210px', maxWidth: '90%', objectFit: 'contain' }}
            className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative z-1"
          />
        </div>

        <div className="p-8">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 mb-3">
            <span className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase">{product.tag}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: '"Bodoni Moda", serif' }}>{product.name}</h3>
          <p className="text-white/70 leading-relaxed mb-6 font-light text-sm">{product.desc}</p>

          <div className="border border-white/10 rounded-xl p-5 bg-white/5 space-y-3">
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase mb-2">Especificaciones de Empaque B2B</h4>
            {product.specs.map((s, i) => (
              <div key={i} className={`flex justify-between items-center py-2 ${i < product.specs.length - 1 ? 'border-b border-white/5' : ''}`}>
                <span className="text-white/60 text-xs font-medium">{s.label}</span>
                <span className="text-white font-semibold text-xs sm:text-sm">{s.value}</span>
              </div>
            ))}
          </div>

          <a href="#contacto" className="btn-gold w-full justify-center mt-6" onClick={onClose}>
            Solicitar Cotización de Contenedor <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Catalog() {
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [selected, setSelected] = useState<typeof products[0] | null>(null);

  const filteredProducts = activeTab === 'todos' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="productos" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[var(--gold-bright)] text-xs tracking-[4px] uppercase mb-4 font-semibold">
            Catálogo de Abastecimiento B2B
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Especies & Productos Marinos Procesados
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-light text-base mb-8">
            Seleccione una categoría para consultar presentaciones comerciales, calibres y especificaciones de empaque industrial.
          </p>

          {/* Category Filter Tabs */}
          <div className="inline-flex flex-wrap justify-center p-1.5 rounded-2xl glass border border-white/10 gap-2">
            {[
              { id: 'todos', label: 'Todos los Productos' },
              { id: 'pescados', label: 'Pescados & Filetes' },
              { id: 'cefalopodos', label: 'Cefalópodos' },
              { id: 'mariscos', label: 'Camarones & Mariscos' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[var(--gold)] text-black shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col group border border-white/10 relative"
            >
              {/* Top Quality Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/70 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur-md">
                  100% IQF
                </span>
              </div>

              {/* Product Image Container */}
              <div className="h-60 relative bg-gradient-to-b from-[#0f141d] to-[#06080c] flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 bg-radial from-[var(--gold)]/10 via-transparent to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ maxHeight: '180px', maxWidth: '85%', objectFit: 'contain' }}
                  className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300 relative z-1"
                />
              </div>

              {/* Info Area */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[var(--gold-bright)] text-[0.7rem] font-semibold tracking-[2px] uppercase mb-1">
                  {p.tag}
                </span>

                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[var(--gold-bright)] transition-colors" style={{ fontFamily: '"Bodoni Moda", serif' }}>
                  {p.name}
                </h3>
                
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light flex-grow line-clamp-2">
                  {p.desc}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 group-hover:text-[var(--gold-bright)] transition-colors">
                  <span className="font-medium">Ver especificaciones de empaque</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   B2B CONTAINER VOLUME CALCULATOR
   ═══════════════════════════════════════════════════════════════ */
function ContainerCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [containerType, setContainerType] = useState<'20ft' | '40ft'>('40ft');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  const maxPayloadKg = containerType === '40ft' ? 26500 : 18000;
  const estimatedBoxes = Math.floor(maxPayloadKg / selectedProduct.boxWeightKg);
  const totalNetWeightKg = (estimatedBoxes * selectedProduct.boxWeightKg).toLocaleString('es-MX', { maximumFractionDigits: 1 });
  const totalNetWeightLb = (estimatedBoxes * selectedProduct.boxWeightLb).toLocaleString('es-MX', { maximumFractionDigits: 0 });

  return (
    <section id="calculadora" className="py-24 md:py-32 relative bg-gradient-to-b from-transparent via-[#0a0e17] to-transparent">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 mb-4">
            <Calculator size={14} className="text-[var(--gold-bright)]" />
            <span className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase">Herramienta B2B</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Calculadora de Capacidad por Contenedor
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-light text-sm sm:text-base">
            Estime la cantidad aproximada de cajas y peso neto utilizable por tipo de contenedor frigorífico (Reefer).
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 border border-[var(--gold)]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                1. Seleccione la Especie / Producto
              </label>
              <select
                className="form-input text-sm font-medium"
                value={selectedProductId}
                onChange={e => setSelectedProductId(Number(e.target.value))}
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.specs[0].value})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                2. Tipo de Contenedor Frigorífico (Reefer)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setContainerType('20ft')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    containerType === '20ft'
                      ? 'bg-[var(--gold)]/15 border-[var(--gold)] text-white'
                      : 'border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <Box size={20} className={containerType === '20ft' ? 'text-[var(--gold-bright)] mb-1' : 'mb-1'} />
                  <strong className="block text-sm font-bold">20ft Reefer</strong>
                  <span className="text-[0.7rem] text-white/50">Carga máx. ~18 Toneladas</span>
                </button>

                <button
                  onClick={() => setContainerType('40ft')}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    containerType === '40ft'
                      ? 'bg-[var(--gold)]/15 border-[var(--gold)] text-white'
                      : 'border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <Box size={20} className={containerType === '40ft' ? 'text-[var(--gold-bright)] mb-1' : 'mb-1'} />
                  <strong className="block text-sm font-bold">40ft High Cube Reefer</strong>
                  <span className="text-[0.7rem] text-white/50">Carga máx. ~26.5 Toneladas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Result Display Column */}
          <div className="lg:col-span-6 bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase pb-3 border-b border-white/10">
              Estimación de Capacidad de Embarque
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-white/40 text-xs font-medium uppercase tracking-wider block">Total de Cajas</span>
                <strong className="text-3xl font-bold text-white mt-1 block">{estimatedBoxes.toLocaleString('es-MX')}</strong>
                <span className="text-white/50 text-[0.75rem]">Cajas Máster</span>
              </div>

              <div>
                <span className="text-white/40 text-xs font-medium uppercase tracking-wider block">Peso Neto Estimado</span>
                <strong className="text-3xl font-bold text-[var(--gold-bright)] mt-1 block">{totalNetWeightKg} kg</strong>
                <span className="text-white/50 text-[0.75rem]">({totalNetWeightLb} lb)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-1.5 text-white/80 font-medium">
                <CheckCircle2 size={16} className="text-[var(--gold-bright)]" /> Estándar de Carga Optimizado
              </span>
              <a href="#contacto" className="btn-gold text-[0.75rem] py-2 px-4">
                Solicitar Cotización Directa
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADVANTAGES
   ═══════════════════════════════════════════════════════════════ */
function Advantages() {
  return (
    <section id="ventajas" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[var(--gold-bright)] text-xs tracking-[4px] uppercase mb-4 font-semibold">
            Ventajas Competitivas B2B
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Garantía Total en Cada Contenedor
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-light text-base">
            Diseñamos soluciones de abastecimiento continuo que optimizan sus costos operativos y protegen sus márgenes de ganancia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((a, i) => (
            <div key={i} className="advantage-card glass relative overflow-hidden">
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-[0.65rem] font-bold uppercase tracking-wider">
                {a.kpi}
              </div>

              <div className="icon-ring">
                <a.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: '"Bodoni Moda", serif' }}>
                {a.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm font-light">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const [formData, setFormData] = useState({
    nombre: '', empresa: '', pais: '', email: '', producto: '', detalles: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitud enviada con éxito. Un ejecutivo comercial se pondrá en contacto en menos de 24 horas hábiles.');
  };

  return (
    <section id="contacto" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[var(--gold-bright)] text-xs tracking-[4px] uppercase mb-3 font-semibold">
            Atención Comercial Especializada
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Inicie su Cotización Corporativa
          </h2>
          <p className="text-white/60 max-w-lg mx-auto font-light text-base">
            Estructure una propuesta adaptada a sus requerimientos de volumen, puerto de destino y frecuencia de embarque.
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 border border-[var(--gold)]/25">
          {/* Volume Notice */}
          <div className="flex items-start gap-3 bg-[var(--gold)]/10 border border-[var(--gold)]/30 rounded-xl p-4 mb-8">
            <AlertTriangle size={18} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              <strong className="text-[var(--gold-bright)]">NOTA DE VOLUMEN:</strong> Solo procesamos solicitudes 
              para compras al por mayor y contenedores consolidados (Reefer 20ft / 40ft). No realizamos ventas al menudeo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Nombre Completo</label>
                <input type="text" required placeholder="Carlos Mendoza" className="form-input"
                  value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Empresa / Razón Social</label>
                <input type="text" required placeholder="Distribuidora del Pacífico S.A." className="form-input"
                  value={formData.empresa} onChange={e => setFormData({...formData, empresa: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">País de Operación</label>
                <select required className="form-input" value={formData.pais}
                  onChange={e => setFormData({...formData, pais: e.target.value})}>
                  <option value="">Seleccione...</option>
                  <option>México</option>
                  <option>Costa Rica</option>
                  <option>Colombia</option>
                  <option>Perú</option>
                  <option>Otro Mercado Internacional</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Email Corporativo</label>
                <input type="email" required placeholder="carlos.mendoza@empresa.com" className="form-input"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Producto Requerido</label>
              <select required className="form-input" value={formData.producto}
                onChange={e => setFormData({...formData, producto: e.target.value})}>
                <option value="">Seleccione el producto...</option>
                <option>Filete de Tilapia Premium (Cajas 10 lb)</option>
                <option>Tilapia Entera GGS (Cajas 40 lb)</option>
                <option>Calamar Gigante Dosidicus gigas (Sacos 20/22.5 kg)</option>
                <option>Camarón Cocido Listo para Consumo</option>
                <option>Filete de Basa White (Cajas 15 kg)</option>
                <option>Contenedor Mixto / Múltiples Especies</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Puerto de Destino / Volumen Estimado</label>
              <textarea rows={4} placeholder="Indique puerto de destino (ej: Manzanillo, Buenaventura, Caldera), volumen estimado y frecuencia de compra..." className="form-input resize-y"
                value={formData.detalles} onChange={e => setFormData({...formData, detalles: e.target.value})} />
            </div>

            <button type="submit" className="btn-gold w-full justify-center text-sm py-4 mt-2">
              Enviar Solicitud de Cotización B2B
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/10 pt-20 pb-10 bg-[#040609]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={`${BASE}images/logo.png`}
              alt="Golden Seafood"
              style={{ height: '48px', width: 'auto', maxHeight: '48px', objectFit: 'contain' }}
              className="mb-6 brightness-0 invert opacity-90 block"
            />
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Líderes regionales en importación y logística de productos marinos congelados premium. 
              Abastecimiento constante en toda América Latina.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[var(--gold-bright)] hover:border-[var(--gold-bright)] transition-all text-xs font-semibold">
                in
              </a>
              <a href="mailto:info@gldseafood.com" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[var(--gold-bright)] hover:border-[var(--gold-bright)] transition-all">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase mb-6 pb-3 border-b border-[var(--gold)]/20">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Alcance Internacional', href: '#operaciones' },
                { label: 'Catálogo de Productos', href: '#productos' },
                { label: 'Calculadora B2B', href: '#calculadora' },
                { label: 'Ventajas Competitivas', href: '#ventajas' },
                { label: 'Solicitud de Cotización', href: '#contacto' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/60 hover:text-[var(--gold-bright)] text-xs sm:text-sm transition-colors hover:pl-1 inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase mb-6 pb-3 border-b border-[var(--gold)]/20">
              Contacto Regional
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <MapPin size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/60"><strong className="text-[var(--gold-bright)] font-semibold">Latam:</strong> México, Costa Rica, Colombia, Perú.</span>
              </li>
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <Mail size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/60"><strong className="text-[var(--gold-bright)] font-semibold">Comercial:</strong> <a href="mailto:info@gldseafood.com" className="hover:text-[var(--gold-bright)] transition-colors">info@gldseafood.com</a></span>
              </li>
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <Globe2 size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/60"><strong className="text-[var(--gold-bright)] font-semibold">Modalidad:</strong> FOB y CIF para volúmenes mayoristas.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© 2026 Golden Seafood. Todos los derechos reservados. Abastecimiento de Seafood Premium B2B.</p>
          <div className="flex gap-6">
            {['Términos y Condiciones', 'Política de Privacidad B2B', 'Normativas de Inocuidad'].map(label => (
              <a key={label} href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP MAIN
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      {/* 120 FPS High Performance GPU Aurora Background */}
      <div className="aurora-bg">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Main Content Flow */}
      <div className="relative z-[1]">
        <Navbar />
        <Hero />
        <CertificationsBar />
        <Operations />
        <Catalog />
        <ContainerCalculator />
        <Advantages />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
