import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Snowflake, Package, ChevronDown, X, ArrowRight,
  Globe2, Mail, MapPin, AlertTriangle, Menu,
  Award, TrendingUp, FileCheck
} from 'lucide-react';
import WaveCursor from './components/WaveCursor';
import { products, categories, type Product, type CategoryId } from './data/products';
import { useI18n, LANGUAGES, AVAILABLE, type Lang } from './i18n';
import type { ProductKey } from './i18n/es';
import { RevealText, useParallax, TiltCard, Magnetic, ScrollProgress } from './components/motion-primitives';
import { useScrollLock } from './lib/smooth-scroll';

// three.js + globe.gl son ~1.8 MB y solo se usan en la seccion Operaciones,
// a mitad de pagina. Cargarlos aparte libera el hilo principal en el hero.
const GlobeMap = lazy(() => import('./components/GlobeMap'));

/* ═══════════════════════════════════════════════════════════════
   BASE PATH & ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */
const BASE = import.meta.env.BASE_URL;

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardItem: any = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

/* ═══════════════════════════════════════════════════════════════
   DATA neutra al idioma (los textos viven en src/i18n)
   ═══════════════════════════════════════════════════════════════ */
const marketCodes = ['mx', 'cr', 'co', 'pe', 'cn', 'vn'] as const;
const marketNames: Record<string, string> = {
  mx: 'México', cr: 'Costa Rica', co: 'Colombia',
  pe: 'Perú', cn: 'China', vn: 'Vietnam',
};

const certKeys = ['haccp', 'fda', 'bap', 'iso', 'senasa'] as const;
const certNames: Record<string, string> = {
  haccp: 'HACCP Certified', fda: 'FDA Registered', bap: 'BAP 4-Star',
  iso: 'ISO 22000', senasa: 'DIPOA / SENASA',
};

const advantageIcons = { cold: Snowflake, trace: FileCheck, weight: Package };

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const { t, lang, setLang } = useI18n();
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
    { href: '#inicio', label: t.nav.inicio },
    { href: '#operaciones', label: t.nav.operaciones },
    { href: '#productos', label: t.nav.productos },
    { href: '#ventajas', label: t.nav.ventajas },
  ];

  const actual = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2.5 sm:py-3.5 bg-[#0e1726]/95 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'py-4 sm:py-6 bg-gradient-to-b from-[#090e17]/90 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#inicio" className="block shrink-0">
          <img
            src={`${BASE}images/logo.png`}
            alt="Golden Seafood"
            style={{
              height: scrolled ? '36px' : '44px',
              maxHeight: '52px',
              width: 'auto',
              maxWidth: '170px',
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
              {t.nav.cta}
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer py-1 px-2.5 rounded bg-white/5 border border-white/10"
            >
              🌐 {actual.short} <ChevronDown size={14} className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  role="listbox"
                  className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden min-w-[150px] shadow-2xl border border-[var(--gold)]/20"
                >
                  {LANGUAGES.map(l => {
                    const disponible = AVAILABLE.includes(l.code);
                    const activo = l.code === lang;
                    return (
                      <button
                        key={l.code}
                        role="option"
                        aria-selected={activo}
                        disabled={!disponible}
                        onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                          activo
                            ? 'text-[var(--gold-bright)] font-semibold bg-white/10 cursor-default'
                            : disponible
                              ? 'text-white/70 hover:text-white hover:bg-white/10 cursor-pointer'
                              : 'text-white/25 cursor-not-allowed'
                        }`}
                      >
                        {l.label}{!disponible && ' · pronto'}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 shrink-0" aria-label="Menu">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-white/90 hover:text-[var(--gold-bright)] text-xs uppercase tracking-widest border-b border-white/5 font-medium">
                {l.label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMobileOpen(false)}
              className="block px-6 py-4 text-[var(--gold-bright)] font-bold text-xs uppercase tracking-widest text-center bg-white/5">
              {t.nav.cta}
            </a>
            <div className="flex border-t border-white/10">
              {LANGUAGES.filter(l => AVAILABLE.includes(l.code)).map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code as Lang); setMobileOpen(false); }}
                  className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    l.code === lang ? 'text-[var(--gold-bright)] bg-white/10' : 'text-white/60'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
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
  const { t } = useI18n();
  // El video se aleja y crece mientras el contenido sube mas rapido:
  // ese diferencial de velocidad es lo que produce la profundidad.
  const { ref, y, escala, opacidad } = useParallax(140);

  const kpis = [
    { icon: TrendingUp, value: '+50,000 MT', label: t.hero.kpiVolume },
    { icon: Snowflake, value: '-18°C', label: t.hero.kpiCold },
    { icon: FileCheck, value: '100%', label: t.hero.kpiTrace },
  ];

  return (
    <section ref={ref} id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Background Video Container */}
      <motion.div
        style={{ y, scale: escala }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover object-center"
        >
          <source src={`${BASE}videos/basa-boomerang.mp4`} type="video/mp4" />
        </video>
      </motion.div>

      {/* Brighter Oceanic Blue Dual Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0b1424]/65 via-[#0b1424]/60 to-[#090e17] sm:bg-gradient-to-r sm:from-[#0b1424]/90 sm:via-[#0b1424]/70 sm:to-[#0b1424]/30 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#090e17] via-transparent to-[#0b1424]/40 pointer-events-none" />

      {/* Content Container */}
      <motion.div style={{ opacity: opacidad }} className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Hero Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-8 space-y-5 sm:space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/35 max-w-full">
              <span className="w-2 h-2 rounded-full bg-[var(--gold-bright)] animate-pulse shrink-0" />
              <span className="text-[var(--gold-bright)] text-[0.68rem] sm:text-xs font-bold tracking-[1.2px] sm:tracking-[2px] uppercase truncate">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* El degradado va en wordClassName, no en className: si se queda
                en el <h1>, las palabras heredan el relleno transparente sin el
                degradado detras y el titular se vuelve invisible. */}
            <RevealText
              text={t.hero.title}
              delay={0.15}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.12] sm:leading-[1.06]"
              wordClassName="text-gradient-white"
            />

            <motion.p
              variants={fadeInUp}
              className="text-white/95 text-base sm:text-xl md:text-2xl lg:text-[1.35rem] max-w-3xl leading-relaxed font-medium"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Magnetic>
                <a href="#productos" className="btn-gold text-xs px-6 py-3.5">
                  {t.hero.ctaPrimary} <ArrowRight size={16} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contacto" className="btn-outline text-xs px-6 py-3.5">
                  {t.hero.ctaSecondary}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Column: Floating KPI Glass Badges */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4"
          >
            {kpis.map(k => (
              <motion.div key={k.label} variants={cardItem} className="glass p-4 sm:p-5 rounded-2xl border border-white/15 hover:border-[var(--gold)]/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/35 flex items-center justify-center text-[var(--gold-bright)] shrink-0">
                    <k.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">{k.value}</h4>
                    <p className="text-white/60 text-[0.65rem] sm:text-xs font-medium uppercase tracking-wider">{k.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TRUST & CERTIFICATIONS BAR
   ═══════════════════════════════════════════════════════════════ */
function CertificationsBar() {
  const { t } = useI18n();
  return (
    <section className="py-6 sm:py-8 bg-[#0d1624] border-y border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6"
        >
          <div className="text-white/50 text-[0.7rem] sm:text-xs uppercase tracking-[2px] sm:tracking-[3px] font-semibold text-center sm:text-left">
            {t.certifications.label}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {certKeys.map(k => (
              <div key={k} className="flex items-center gap-1.5 text-white/80 hover:text-[var(--gold-bright)] transition-colors" title={t.certifications.items[k]}>
                <Award size={16} className="text-[var(--gold-bright)] shrink-0" />
                <span className="text-[0.65rem] sm:text-xs font-semibold tracking-wider uppercase">{certNames[k]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OPERATIONS / GLOBE
   ═══════════════════════════════════════════════════════════════ */
function Operations() {
  const { t } = useI18n();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <section id="operaciones" className="relative py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeInUp} className="text-[var(--gold-bright)] text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-3 font-semibold">
            {t.operations.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {t.operations.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-6 sm:mb-8">
            {t.operations.body}
          </motion.p>
        </motion.div>

        {/* Real Country Flags Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
        >
          {marketCodes.map(code => {
            const isSelected = selectedCountry === code;
            return (
              <motion.button
                key={code}
                variants={cardItem}
                onClick={() => setSelectedCountry(code)}
                className={`glass p-2.5 sm:p-3 rounded-xl border text-left cursor-pointer transition-all hover:scale-[1.04] ${
                  isSelected
                    ? 'border-[var(--gold-bright)] bg-[var(--gold)]/20 shadow-[0_0_20px_rgba(212,168,83,0.35)]'
                    : 'border-white/15 hover:border-[var(--gold)]/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={`https://flagcdn.com/w40/${code}.png`}
                    alt={marketNames[code]}
                    className="w-4 h-3 rounded object-cover shadow border border-white/20"
                  />
                  <span className="text-white font-bold text-[0.75rem] sm:text-xs">{marketNames[code]}</span>
                </div>
                <p className="text-white/60 text-[0.65rem] sm:text-[0.7rem] line-clamp-1">{t.operations.markets[code].hub}</p>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Globe */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="relative max-w-4xl mx-auto px-2 sm:px-4"
      >
        {/* El placeholder replica la altura real del globo — min(ancho, 550px) —
            para que la pagina no salte cuando termina de cargar el chunk. */}
        <Suspense
          fallback={
            <div
              className="w-full h-[min(90vw,550px)] flex items-center justify-center"
              aria-label={t.operations.loading}
            >
              <div className="w-16 h-16 rounded-full border-2 border-[var(--gold)]/25 border-t-[var(--gold-bright)] animate-spin" />
            </div>
          }
        >
          <GlobeMap
            selectedCode={selectedCountry}
            onSelectCountry={(code) => setSelectedCountry(code)}
            descriptions={t.operations.globe}
          />
        </Suspense>

        <p className="text-center text-white/70 text-xs sm:text-sm uppercase tracking-widest mt-6 mb-4 font-semibold">
          {t.operations.hint}
        </p>

        <div className="text-center">
          <a href="#productos" className="btn-gold text-xs px-6 py-3">
            {t.operations.cta} <ChevronDown size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT CATALOG
   ═══════════════════════════════════════════════════════════════ */
function ProductDetail({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useI18n();
  const copy = t.products[product.slug as ProductKey];
  // Congela el scroll de fondo: sin esto el modal flota sobre una pagina
  // que sigue moviendose detras. Era un bug preexistente.
  useScrollLock(true);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        onClick={e => e.stopPropagation()}
        className="relative glass rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[var(--gold)]/35 max-h-[90vh] overflow-y-auto"
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute top-4 right-4 z-10 text-white/60 hover:text-white transition-colors cursor-pointer p-1">
          <X size={24} />
        </button>

        <div className="h-48 sm:h-64 relative bg-gradient-to-b from-[#162236] to-[#0e1726] flex items-center justify-center p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[var(--gold)]/15 via-transparent to-transparent pointer-events-none" />
          <img
            src={`${BASE}${product.image}`}
            alt={product.name}
            style={{ maxHeight: '180px', maxWidth: '90%', objectFit: 'contain' }}
            className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative z-1"
          />
        </div>

        <div className="p-5 sm:p-8">
          <div className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/25 mb-3">
            <span className="text-[var(--gold-bright)] text-[0.7rem] font-semibold tracking-[1.5px] uppercase">{copy.tag}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">{product.name}</h3>
          <p className="text-white/80 leading-relaxed mb-5 font-light text-xs sm:text-sm">{copy.desc}</p>

          <div className="border border-white/15 rounded-xl p-4 sm:p-5 bg-white/5 space-y-2.5">
            <h4 className="text-[var(--gold-bright)] text-[0.7rem] font-semibold tracking-[1.8px] uppercase mb-2">{t.catalog.specsTitle}</h4>
            {copy.specs.map((s, i) => (
              <div key={i} className={`flex justify-between items-center gap-4 py-1.5 ${i < copy.specs.length - 1 ? 'border-b border-white/10' : ''}`}>
                <span className="text-white/60 text-xs font-medium shrink-0">{s[0]}</span>
                <span className="text-white font-semibold text-xs text-right">{s[1]}</span>
              </div>
            ))}
          </div>

          <a href="#contacto" className="btn-gold w-full justify-center mt-5 text-xs py-3.5" onClick={onClose}>
            {t.catalog.quote} <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Catalog() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<CategoryId | 'all'>('all');
  const [selected, setSelected] = useState<Product | null>(null);

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category === activeTab);

  const tabs: { id: CategoryId | 'all'; label: string }[] = [
    { id: 'all', label: t.catalog.all },
    ...categories.map(c => ({ id: c, label: t.catalog.categories[c] })),
  ];

  return (
    <section id="productos" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="text-center mb-10 sm:mb-12"
        >
          <motion.p variants={fadeInUp} className="text-[var(--gold-bright)] text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-3 font-semibold">
            {t.catalog.eyebrow}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t.catalog.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/70 max-w-xl mx-auto font-light text-xs sm:text-base mb-6 sm:mb-8">
            {t.catalog.body}
          </motion.p>

          {/* Category Filter Tabs */}
          <motion.div variants={fadeInUp} className="inline-flex flex-wrap justify-center p-1 sm:p-1.5 rounded-2xl glass border border-white/15 gap-1.5 sm:gap-2 max-w-full">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[0.7rem] sm:text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[var(--gold)] text-black shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map(p => {
            const copy = t.products[p.slug as ProductKey];
            return (
              <motion.div key={p.slug} variants={cardItem}>
              <TiltCard
                onClick={() => setSelected(p)}
                className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer flex flex-col group border border-white/15 relative h-full"
              >
                {/* Top Quality Badge — solo en productos realmente IQF */}
                {p.iqf && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 border border-[var(--gold)]/40 text-[var(--gold-bright)] text-[0.6rem] font-bold uppercase tracking-widest backdrop-blur-md">
                      {t.catalog.badge}
                    </span>
                  </div>
                )}

                {/* Product Image Container */}
                <div className="h-52 sm:h-60 relative bg-gradient-to-b from-[#162236] to-[#0e1726] flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-[var(--gold)]/15 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={`${BASE}${p.image}`}
                    alt={p.name}
                    loading="lazy"
                    style={{ maxHeight: '160px', maxWidth: '85%', objectFit: 'contain' }}
                    className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)] group-hover:scale-105 transition-transform duration-300 relative z-1"
                  />
                </div>

                {/* Info Area */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                  <span className="text-[var(--gold-bright)] text-[0.65rem] sm:text-[0.7rem] font-semibold tracking-[1.5px] uppercase mb-1">
                    {copy.tag}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-[var(--gold-bright)] transition-colors">
                    {p.name}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4 font-light flex-grow line-clamp-2">
                    {copy.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[0.75rem] text-white/60 group-hover:text-[var(--gold-bright)] transition-colors">
                    <span className="font-medium">{t.catalog.seeSpecs}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ADVANTAGES
   ═══════════════════════════════════════════════════════════════ */
function Advantages() {
  const { t } = useI18n();
  const keys = ['cold', 'trace', 'weight'] as const;

  return (
    <section id="ventajas" className="relative py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[var(--gold-bright)] text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-3 font-semibold">
            {t.advantages.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t.advantages.title}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto font-light text-xs sm:text-base">
            {t.advantages.body}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {keys.map(k => {
            const a = t.advantages.items[k];
            const Icon = advantageIcons[k];
            return (
              <motion.div key={k} variants={cardItem} className="advantage-card glass relative overflow-hidden p-6 sm:p-8">
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold-bright)] text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-wider">
                  {a.kpi}
                </div>

                <div className="icon-ring">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2.5 text-white">
                  {a.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-xs sm:text-sm font-light">{a.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    nombre: '', empresa: '', pais: '', email: '', producto: '', detalles: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t.contact.success);
  };

  return (
    <section id="contacto" className="relative py-20 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-[var(--gold-bright)] text-xs tracking-[3px] sm:tracking-[4px] uppercase mb-3 font-semibold">
            {t.contact.eyebrow}
          </p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t.contact.title}
          </h2>
          <p className="text-white/70 max-w-lg mx-auto font-light text-xs sm:text-base">
            {t.contact.body}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
          className="glass rounded-3xl p-6 sm:p-12 border border-[var(--gold)]/30"
        >
          {/* Volume Notice */}
          <div className="flex items-start gap-3 bg-[var(--gold)]/15 border border-[var(--gold)]/35 rounded-xl p-3.5 sm:p-4 mb-6 sm:mb-8">
            <AlertTriangle size={18} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
            <p className="text-xs text-white/90 leading-relaxed">
              <strong className="text-[var(--gold-bright)]">{t.contact.noticeLabel}</strong> {t.contact.notice}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="f-nombre" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.name}</label>
                <input id="f-nombre" type="text" required placeholder={t.contact.namePh} className="form-input text-xs sm:text-sm"
                  value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div>
                <label htmlFor="f-empresa" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.company}</label>
                <input id="f-empresa" type="text" required placeholder={t.contact.companyPh} className="form-input text-xs sm:text-sm"
                  value={formData.empresa} onChange={e => setFormData({...formData, empresa: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label htmlFor="f-pais" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.country}</label>
                <input id="f-pais" type="text" required placeholder={t.contact.countryPh} className="form-input text-xs sm:text-sm"
                  value={formData.pais} onChange={e => setFormData({...formData, pais: e.target.value})} />
              </div>
              <div>
                <label htmlFor="f-email" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.email}</label>
                <input id="f-email" type="email" required placeholder={t.contact.emailPh} className="form-input text-xs sm:text-sm"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div>
              <label htmlFor="f-producto" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.product}</label>
              <select id="f-producto" required className="form-input text-xs sm:text-sm" value={formData.producto}
                onChange={e => setFormData({...formData, producto: e.target.value})}>
                <option value="">{t.contact.productPh}</option>
                {categories.map(cat => (
                  <optgroup key={cat} label={t.catalog.categories[cat]}>
                    {products.filter(p => p.category === cat).map(p => (
                      <option key={p.slug} value={p.name}>{p.name}</option>
                    ))}
                  </optgroup>
                ))}
                <option value="mixed">{t.contact.productMixed}</option>
              </select>
            </div>

            <div>
              <label htmlFor="f-detalles" className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">{t.contact.details}</label>
              <textarea id="f-detalles" rows={4} placeholder={t.contact.detailsPh} className="form-input text-xs sm:text-sm resize-y"
                value={formData.detalles} onChange={e => setFormData({...formData, detalles: e.target.value})} />
            </div>

            <button type="submit" className="btn-gold w-full justify-center text-xs sm:text-sm py-3.5 sm:py-4 mt-2">
              {t.contact.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const { t } = useI18n();

  const links = [
    { label: t.nav.inicio, href: '#inicio' },
    { label: t.nav.operaciones, href: '#operaciones' },
    { label: t.nav.productos, href: '#productos' },
    { label: t.nav.ventajas, href: '#ventajas' },
    { label: t.footer.quote, href: '#contacto' },
  ];

  return (
    <footer className="border-t border-white/15 pt-16 sm:pt-20 pb-10 bg-[#080d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <img
              src={`${BASE}images/logo.png`}
              alt="Golden Seafood"
              style={{ height: '40px', width: 'auto', maxHeight: '44px', objectFit: 'contain' }}
              className="mb-5 brightness-0 invert opacity-95 block"
            />
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {t.footer.about}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[var(--gold-bright)] hover:border-[var(--gold-bright)] transition-all text-xs font-semibold">
                in
              </a>
              <a href="mailto:sales@gldseafood.com" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[var(--gold-bright)] hover:border-[var(--gold-bright)] transition-all">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase mb-4 sm:mb-6 pb-3 border-b border-[var(--gold)]/25">
              {t.footer.linksTitle}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {links.map((item, i) => (
                <li key={i}>
                  <a href={item.href} className="text-white/70 hover:text-[var(--gold-bright)] text-xs sm:text-sm transition-colors hover:pl-1 inline-block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--gold-bright)] text-xs font-semibold tracking-[2px] uppercase mb-4 sm:mb-6 pb-3 border-b border-[var(--gold)]/25">
              {t.footer.contactTitle}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <Mail size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/70"><strong className="text-[var(--gold-bright)] font-semibold">{t.footer.sales}</strong> <a href="mailto:sales@gldseafood.com" className="hover:text-[var(--gold-bright)] transition-colors">sales@gldseafood.com</a></span>
              </li>
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <MapPin size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/70"><strong className="text-[var(--gold-bright)] font-semibold">{t.footer.latam}</strong> {t.footer.latamValue}</span>
              </li>
              <li className="flex gap-3 items-start text-xs sm:text-sm">
                <Globe2 size={16} className="text-[var(--gold-bright)] mt-0.5 shrink-0" />
                <span className="text-white/70"><strong className="text-[var(--gold-bright)] font-semibold">{t.footer.modality}</strong> {t.footer.modalityValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/50 text-[0.7rem] sm:text-xs">{t.footer.rights}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[t.footer.terms, t.footer.privacy, t.footer.safety].map(label => (
              <a key={label} href="#" className="text-white/50 hover:text-white/80 text-[0.7rem] sm:text-xs transition-colors">{label}</a>
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
      {/* Barra de progreso de lectura */}
      <ScrollProgress />

      {/* Liquid Ocean Wave Mouse Cursor */}
      <WaveCursor />

      {/* GPU Aurora Background */}
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
        <Advantages />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
