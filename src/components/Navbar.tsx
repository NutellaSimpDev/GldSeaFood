import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Alcance B2B', href: '#' },
    { name: 'Productos', href: '#' },
    { name: 'Ventajas', href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-[rgba(0,11,20,0.06)] ${
        scrolled 
          ? 'bg-[rgba(0,8,15,0.85)] backdrop-blur-[16px] shadow-lg py-2' 
          : 'bg-[rgba(0,11,20,0.6)] backdrop-blur-[16px] py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex-shrink-0 transition-all duration-300">
          <img 
            src="/images/logo.png" 
            alt="Gold Seafood Logo" 
            className={`object-contain transition-all duration-300 ${scrolled ? 'h-[58px]' : 'h-[76px]'}`} 
          />
        </a>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-white uppercase font-semibold text-[0.95rem] tracking-[1px] transition-colors duration-300 hover:text-yellow-700 group"
            >
              {link.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-yellow-700 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="bg-white/10 border border-white/20 rounded px-2 py-1 flex items-center gap-1 text-[0.85rem] text-white hover:bg-white/20 transition-colors"
            >
              ES
              <svg className={`w-4 h-4 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown */}
            <div 
              className={`absolute right-0 mt-2 w-36 bg-[rgba(0,11,20,0.95)] backdrop-blur-[12px] border border-[#d4af37]/30 rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right ${
                langOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
            >
              <div className="flex flex-col py-1">
                <button className="px-4 py-2 text-sm text-left text-white bg-[#d4af37]/20 hover:bg-[#d4af37]/30 transition-colors">Español (ES)</button>
                <button className="px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 hover:text-white transition-colors">English (EN)</button>
                <button className="px-4 py-2 text-sm text-left text-gray-300 hover:bg-white/10 hover:text-white transition-colors">简体中文 (ZH)</button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="hidden sm:block bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-gray-900 px-5 py-2.5 rounded font-bold border border-[#faeebd] shadow-[0_0_10px_rgba(255,215,0,0.3)] hover:shadow-[0_0_15px_rgba(255,215,0,0.6)] hover:-translate-y-[2px] transition-all duration-300">
            Cotizar Ahora
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
