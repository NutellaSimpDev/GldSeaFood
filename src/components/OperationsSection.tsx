import React from 'react';
import { motion } from 'framer-motion';
import GlobeMap from './GlobeMap';

export default function OperationsSection() {
  return (
    <section 
      id="operaciones" 
      className="w-full bg-[rgba(0,11,20,0.4)] backdrop-blur-[10px]"
    >
      <div className="max-w-[900px] mx-auto pt-16 pb-8 text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif font-bold text-white mb-10"
        >
          Presencia estratégica y alcance regional
        </motion.h2>
        
        <div className="space-y-6 text-white/80 font-sans text-lg md:text-xl font-light">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Infraestructura logística sólida en mercados clave de América Latina para garantizar entregas en tiempo récord.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En <strong>Golden Seafood</strong>, entendemos que la constancia y la frescura son la base del éxito de su negocio. Consolidamos una red de abastecimiento y distribución regional de primer nivel, operando con los más altos estándares internacionales de inocuidad y control de calidad.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Nuestra presencia activa en origen y destino nos permite gestionar eficientemente las barreras aduaneras y las complejidades de importación, asegurando un suministro constante de proteínas marinas premium sin fluctuaciones de stock.
          </motion.p>
        </div>
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <GlobeMap />
        
        <div className="absolute bottom-10 left-0 right-0 text-center z-10 pointer-events-none px-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/60 text-sm md:text-base mb-6"
          >
            Gire la esfera y toque un punto para conocer más sobre nuestro alcance.
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            href="#productos" 
            className="pointer-events-auto inline-block px-8 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-black rounded-full text-sm font-bold uppercase transition-all shadow-lg hover:shadow-yellow-500/30"
          >
            Continuar al catálogo ↓
          </motion.a>
        </div>
      </div>
    </section>
  );
}
