import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0C0A09] pt-[100px]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover z-[1] pointer-events-none"
      >
        <source src="/videos/basa-boomerang.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 11, 20, 0.60) 0%, rgba(0, 11, 20, 0.50) 50%, rgba(0, 11, 20, 0.90) 100%)'
        }}
      />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0C0A09] to-transparent z-[3] pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-[4] w-full max-w-[1200px]">
        <motion.div
          className="text-left w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-bold tracking-tight text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] mb-6 text-transparent bg-clip-text max-w-4xl"
            style={{
              fontFamily: '"Bodoni Moda", serif',
              backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.45), rgba(255,255,255,0.8))'
            }}
          >
            Su socio global en importación y suministro de Premium Seafood
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-white/85 font-light text-lg md:text-xl max-w-[650px] mb-14 leading-relaxed"
          >
            Garantizamos el abastecimiento continuo de Premium Seafood de alta calidad para distribuidores y pescaderías. Logística de cadena de frío impecable y certificada, directamente desde el origen hasta sus almacenes.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a href="#productos" className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-medium tracking-[1.5px] uppercase bg-gradient-to-r from-[#1C1917] to-[#292524] text-white border border-white/20 shadow-[0_4px_20px_rgba(0,45,78,0.4)] hover:shadow-[0_8px_30px_rgba(0,45,78,0.6)] hover:-translate-y-1 transition-all duration-400">
              Ver catálogo
            </a>
            <a href="#contacto" className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-medium tracking-[1.5px] uppercase bg-gradient-to-br from-[#B45309] to-[#F59E0B] text-[#0C0A09] border border-[#FBBF24] shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.35)] hover:-translate-y-1 transition-all duration-400">
              Contáctenos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
