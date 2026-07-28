import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactFooter: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    product: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <section id="contacto" className="bg-[rgba(0,11,20,0.4)] backdrop-blur-[10px] py-32 relative">
        <div className="max-w-[900px] mx-auto pt-16 px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent" style={{
                backgroundImage: 'linear-gradient(110deg, #FBBF24 0%, white 35%, #F59E0B 50%, white 70%, #FBBF24 100%)',
                backgroundSize: '200% auto'
              }}>
                Inicie su Cotización Corporativa
              </h2>
              <p className="text-[#FBBF24] text-lg font-medium">
                Soluciones de abastecimiento a escala global.
              </p>
              <p className="text-white/95 text-base leading-relaxed">
                Nuestro equipo comercial está listo para estructurar una propuesta adaptada a sus requerimientos de volumen, frecuencia y logística internacional.
              </p>

              <div className="mt-8 bg-[rgba(0,11,20,0.4)] border border-[#FBBF24]/30 backdrop-blur-md rounded-lg p-5">
                <p className="text-sm text-white/90 leading-relaxed">
                  <span className="mr-2">⚠️</span>
                  <strong>NOTA DE VOLUMEN:</strong> Solo procesamos solicitudes para compras al por mayor. Pedido mínimo: 1 contenedor (20ft). Para envíos aéreos consolidados, aplican términos específicos por región.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[rgba(0,11,20,0.6)] border border-[#FBBF24]/20 backdrop-blur-[10px] rounded-lg p-8 md:p-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs uppercase tracking-wider text-white/70">Nombre</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                        placeholder="Ej. Juan Pérez"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs uppercase tracking-wider text-white/70">Empresa</label>
                      <input 
                        type="text" 
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                        placeholder="Nombre de su empresa"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="country" className="text-xs uppercase tracking-wider text-white/70">País</label>
                      <select 
                        id="country"
                        name="country"
                        value={formState.country}
                        onChange={handleChange}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)] appearance-none"
                        required
                      >
                        <option value="" className="text-black">Seleccione su país</option>
                        <option value="US" className="text-black">Estados Unidos</option>
                        <option value="ES" className="text-black">España</option>
                        <option value="MX" className="text-black">México</option>
                        <option value="OTHER" className="text-black">Otro</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs uppercase tracking-wider text-white/70">Email Corporativo</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                        placeholder="correo@empresa.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="product" className="text-xs uppercase tracking-wider text-white/70">Producto de Interés</label>
                    <select 
                      id="product"
                      name="product"
                      value={formState.product}
                      onChange={handleChange}
                      className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)] appearance-none"
                      required
                    >
                      <option value="" className="text-black">Seleccione un producto</option>
                      <option value="tuna" className="text-black">Atún</option>
                      <option value="shrimp" className="text-black">Camarón</option>
                      <option value="salmon" className="text-black">Salmón</option>
                      <option value="other" className="text-black">Múltiples / Otros</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="text-xs uppercase tracking-wider text-white/70">Detalles de la Solicitud</label>
                    <textarea 
                      id="details"
                      name="details"
                      value={formState.details}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-[rgba(255,255,255,0.06)] border border-white/15 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#FBBF24] focus:bg-[rgba(255,255,255,0.08)] focus:-translate-y-[2px] transition-all duration-300 focus:shadow-[0_0_10px_rgba(251,191,36,0.2)] resize-none"
                      placeholder="Especifique volúmenes, calibres, puerto de destino, etc."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="mt-4 w-full bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-transparent text-white uppercase tracking-[0.15em] font-semibold py-4 rounded transition-all duration-300 hover:border-[#FBBF24] hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                  >
                    Solicitar Cotización
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C0A09] border-t border-[#FBBF24]/25 pt-24 pb-12 relative z-10 text-white/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.5fr] gap-12 mb-16">
            
            {/* Brand */}
            <div className="flex flex-col items-start">
              <img src="/images/logo.png" alt="GLD Seafood Logo" className="h-16 mb-6 object-contain" />
              <p className="text-sm leading-relaxed mb-6 max-w-sm">
                Líderes en importación y exportación de productos del mar a nivel mundial, garantizando calidad premium, trazabilidad y logística de cadena de frío impecable.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FBBF24]/20 hover:text-[#FBBF24] transition-colors border border-white/10 hover:border-[#FBBF24]/50">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-lg uppercase tracking-wider mb-6 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#FBBF24] after:mt-3">
                Enlaces Rápidos
              </h4>
              <ul className="flex flex-col gap-3">
                <li><a href="#nosotros" className="hover:text-[#FBBF24] transition-colors">Nuestra Empresa</a></li>
                <li><a href="#productos" className="hover:text-[#FBBF24] transition-colors">Catálogo de Productos</a></li>
                <li><a href="#calidad" className="hover:text-[#FBBF24] transition-colors">Control de Calidad</a></li>
                <li><a href="#logistica" className="hover:text-[#FBBF24] transition-colors">Logística y Exportación</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-lg uppercase tracking-wider mb-6 relative after:content-[''] after:block after:w-12 after:h-0.5 after:bg-[#FBBF24] after:mt-3">
                Información de Contacto
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <span>Latinoamérica Central<br/>Oficinas de representación comercial y logística portuaria.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">📧</span>
                  <a href="mailto:info@gldseafood.com" className="hover:text-[#FBBF24] transition-colors">info@gldseafood.com</a>
                </li>
                <li className="flex items-start gap-3 mt-2 text-[#FBBF24]/80 p-3 bg-[#FBBF24]/5 border border-[#FBBF24]/20 rounded">
                  <span className="text-lg">⚠️</span>
                  <span><strong>Aviso Comercial:</strong> Todas las transacciones están sujetas a verificación corporativa.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} GLD Seafood. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a>
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;
