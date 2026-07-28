import React from 'react';
import { motion } from 'framer-motion';

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  specs: ProductSpec[];
}

const products: Product[] = [
  {
    id: 1,
    title: 'Tilapia (IQF/Sin Piel)',
    category: 'Premium Quality',
    description: 'Filetes de tilapia de calidad premium, procesados bajo estrictos estándares de calidad. Carne firme y sabor suave, ideal para diversas preparaciones culinarias.',
    image: '/images/tilapia_fillet.png',
    specs: [
      { label: 'Presentación', value: 'Caja 10lb' },
      { label: 'Congelación', value: 'IQF' },
      { label: 'Características', value: 'Glaseado' },
    ]
  },
  {
    id: 2,
    title: 'Calamar Gigante (Dosidicus gigas)',
    category: 'Premium Quality',
    description: 'Calamar gigante del Pacífico, capturado y procesado rápidamente para mantener su frescura y textura tierna característica.',
    image: '/images/giant_squid.png',
    specs: [
      { label: 'Presentación', value: 'Sacos 20/22.5KG' },
      { label: 'Cortes', value: 'Tubos/aletas' },
      { label: 'Origen', value: 'Perú' },
    ]
  },
  {
    id: 3,
    title: 'Camarón Cocido (Listo para Consumo)',
    category: 'Premium Quality',
    description: 'Camarón premium cocido, pelado y desvenado. Listo para consumir, perfecto para cócteles, ensaladas y platillos rápidos.',
    image: '/images/cooked_shrimp.png',
    specs: [
      { label: 'Presentación', value: 'Bolsas 10kg' },
      { label: 'Calibre', value: 'U15-70/90' },
      { label: 'Mercado', value: 'Horeca' },
    ]
  },
  {
    id: 4,
    title: 'Filete de Basa (Premium White)',
    category: 'Premium Quality',
    description: 'Filetes de basa blanca de alta calidad. Sin aditivos químicos, conservando su textura natural y sabor neutro.',
    image: '/images/tilapia_fillet.png',
    specs: [
      { label: 'Presentación', value: 'Cajas 15KG' },
      { label: 'Características', value: 'Sin químicos' },
      { label: 'Glaseado', value: 'IQF 10-20%' },
    ]
  },
  {
    id: 5,
    title: 'Tilapia Entera (GGS)',
    category: 'Premium Quality',
    description: 'Tilapia entera eviscerada, descamada y sin agallas (GGS). Congelada individualmente para máxima preservación de calidad.',
    image: '/images/product_4_1_transparent.png',
    specs: [
      { label: 'Presentación', value: 'Caja 40lb' },
      { label: 'Corte', value: 'GGS' },
      { label: 'Congelación', value: 'IQF' },
    ]
  }
];

const slideUpFade = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  })
};

const ProductCatalog: React.FC = () => {
  return (
    <section id="productos" className="py-32 bg-[rgba(0,11,20,0.4)] backdrop-blur-[10px]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-white mb-4"
            style={{ fontFamily: '"Bodoni Moda", serif' }}
          >
            Catálogo de Productos
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-[#D4AF37] mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14 mb-16">
          {products.map((product, index) => {
            const isFifth = index === 4;
            return (
              <motion.div
                key={product.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideUpFade}
                className={`glass-panel p-10 relative overflow-hidden group perspective-[1200px] transform-style-preserve-3d transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] hover:border-[#D4AF37] ${isFifth ? 'lg:col-span-2 max-w-[600px] mx-auto' : ''}`}
              >
                {/* Gradient gold line at top (simulating ::before) */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="h-[260px] flex items-center justify-center mb-6 relative z-10">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="max-h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] brightness-110 contrast-115 transition-transform duration-500 group-hover:scale-108 group-hover:drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)]"
                  />
                </div>

                <div className="relative z-10 space-y-4">
                  <span className="inline-block text-[#D4AF37] bg-[#D4AF37]/10 rounded-full uppercase text-xs tracking-wide px-3 py-1 font-semibold">
                    {product.category}
                  </span>
                  
                  <h3 
                    className="text-2xl text-white font-serif"
                    style={{ fontFamily: '"Bodoni Moda", serif' }}
                  >
                    {product.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="border border-[#D4AF37]/15 rounded-md p-5 mt-6 bg-black/20">
                    <h4 className="text-[#F1E5AC] uppercase tracking-wide text-xs font-semibold mb-4 text-center">
                      Especificaciones de Empaque
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <span className="text-white/60">{spec.label}</span>
                          <span className="text-white font-medium">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#000B14] to-[#0A1A2F] border border-[#D4AF37]/30 rounded-lg p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
          <h3 
            className="text-3xl md:text-4xl text-white font-serif mb-6 relative z-10"
            style={{ fontFamily: '"Bodoni Moda", serif' }}
          >
            Compromiso con la Excelencia
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed relative z-10">
            Nuestros productos provienen de fuentes certificadas y pasan por los más rigurosos controles de calidad. Ofrecemos soluciones a medida para la industria alimentaria global, garantizando frescura y sabor incomparables.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCatalog;
