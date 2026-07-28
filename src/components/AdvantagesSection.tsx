import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, FileText, Package } from 'lucide-react';

const advantages = [
  {
    icon: Snowflake,
    title: 'Cadena de Frío Ininterrumpida',
    description: 'Monitoreamos la temperatura en cada etapa del trayecto para garantizar que el producto mantenga su frescura y propiedades intactas desde el origen hasta su destino.'
  },
  {
    icon: FileText,
    title: 'Importación y Aduanas sin Fricciones',
    description: 'Gestionamos de extremo a extremo todos los trámites aduanales y sanitarios, asegurando que su mercancía ingrese al país sin demoras ni sobrecostos.'
  },
  {
    icon: Package,
    title: 'Especificaciones y Pesos Exactos',
    description: 'Cumplimos rigurosamente con los porcentajes de glaseo y los calibres acordados, para que usted reciba exactamente lo que compró, protegiendo sus márgenes.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function AdvantagesSection() {
  return (
    <section 
      id="ventajas" 
      className="py-32 bg-[rgba(0,11,20,0.4)] backdrop-blur-[10px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">
            El Aliado Estratégico de Pescaderías y Distribuidores
          </h2>
          <p className="text-lg md:text-xl text-[#D6D3D1] max-w-3xl mx-auto">
            Diseñamos soluciones de suministro continuo que reducen sus costos de adquisición y aseguran la calidad de su stock.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {advantages.map((adv, index) => {
            const Icon = adv.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group relative bg-[rgba(0,11,20,0.6)] border border-[#C5A880]/15 rounded-xl p-12 text-center backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-[10px] hover:shadow-[0_0_30px_rgba(197,168,128,0.15)] hover:border-[#C5A880] hover:bg-[rgba(0,11,20,0.8)]"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#C5A880]/10 to-transparent border border-[#C5A880]/30 flex items-center justify-center transition-all duration-500 group-hover:bg-[#C5A880]/20 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(197,168,128,0.3)_inset,0_0_20px_rgba(197,168,128,0.3)]">
                  <Icon className="w-9 h-9 text-[#C5A880] stroke-[1.5]" />
                </div>
                <h3 className="text-white text-xl font-serif mb-4">
                  {adv.title}
                </h3>
                <p className="text-[#D6D3D1] leading-relaxed">
                  {adv.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
