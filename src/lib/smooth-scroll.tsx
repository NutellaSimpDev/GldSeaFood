import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

/**
 * Scroll suave inercial. Es la pieza que mas cambia la sensacion del sitio:
 * el scroll deja de ser un salto por linea y pasa a tener peso.
 *
 * Convive con los anclas del navbar interceptando los clics en href="#..."
 * y delegandolos a lenis.scrollTo. Por eso index.css ya no lleva
 * `scroll-behavior: smooth`: los dos juntos producen un doble easing.
 */

interface SmoothScrollValue {
  lenis: Lenis | null;
  /** Congela el scroll de fondo (para modales). */
  stop: () => void;
  start: () => void;
}

const Ctx = createContext<SmoothScrollValue>({ lenis: null, stop: () => {}, start: () => {} });

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<Lenis | null>(null);
  const [, forzarRender] = useState(0);

  useEffect(() => {
    // Si el usuario pide movimiento reducido, no se instala nada:
    // el navegador scrollea de forma nativa.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      // easeOutExpo: arranque rapido y frenada larga, el perfil "premium"
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    ref.current = lenis;
    forzarRender(n => n + 1);

    let id = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    // Anclas del navbar y del footer
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      const destino = document.querySelector(hash);
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(id);
      lenis.destroy();
      ref.current = null;
    };
  }, []);

  const value: SmoothScrollValue = {
    lenis: ref.current,
    stop: () => ref.current?.stop(),
    start: () => ref.current?.start(),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSmoothScroll() {
  return useContext(Ctx);
}

/** Congela el scroll de fondo mientras el componente este montado. */
export function useScrollLock(activo: boolean) {
  const { stop, start } = useSmoothScroll();
  useEffect(() => {
    if (!activo) return;
    stop();
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      start();
      document.body.style.overflow = previo;
    };
  }, [activo, stop, start]);
}
