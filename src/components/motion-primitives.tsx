import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

/* ═══════════════════════════════════════════════════════════════
   TEXTO QUE SE REVELA PALABRA POR PALABRA
   Cada palabra sube desde detras de una mascara. Es el recurso
   tipografico que usa Apple en sus titulares de producto.
   ═══════════════════════════════════════════════════════════════ */
export function RevealText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  as: Tag = 'h1',
}: {
  text: string;
  className?: string;
  /**
   * Clases que deben ir en CADA palabra, no en el contenedor.
   * Imprescindible para degradados de texto: background-clip:text pinta
   * sobre la caja del elemento que lo declara, y -webkit-text-fill-color
   * transparent SI se hereda. Si el degradado se queda en el <h1> y las
   * palabras van en spans anidados, los hijos heredan el relleno
   * transparente sin el degradado detras y el texto desaparece.
   */
  wordClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'p';
}) {
  const reducido = useReducedMotion();
  const palabras = text.split(' ');

  if (reducido) return <Tag className={`${className} ${wordClassName}`}>{text}</Tag>;

  const MotionTag = Tag === 'h1' ? motion.h1 : Tag === 'h2' ? motion.h2 : motion.p;

  return (
    <MotionTag
      className={className}
      initial="oculto"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={text}
    >
      {palabras.map((palabra, i) => (
        <span
          key={i}
          aria-hidden
          // overflow-hidden crea la mascara; inline-block permite el transform
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            className={wordClassName}
            style={{ display: 'inline-block', willChange: 'transform' }}
            variants={{
              oculto: { y: '110%' },
              visible: { y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {palabra}
            {i < palabras.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARALLAX LIGADO AL SCROLL
   ═══════════════════════════════════════════════════════════════ */
export function useParallax(distancia = 120) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const yBruto = useTransform(scrollYProgress, [0, 1], [0, reducido ? 0 : distancia]);
  const escalaBruta = useTransform(scrollYProgress, [0, 1], [1, reducido ? 1 : 1.12]);
  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, reducido ? 1 : 0]);

  // El muelle quita el "escalonado" que deja el scroll ligado directo
  const y = useSpring(yBruto, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const escala = useSpring(escalaBruta, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return { ref, y, escala, opacidad, scrollYProgress };
}

/* ═══════════════════════════════════════════════════════════════
   TARJETA CON INCLINACION 3D SEGUN EL PUNTERO
   ═══════════════════════════════════════════════════════════════ */
export function TiltCard({
  children,
  className = '',
  onClick,
  intensidad = 7,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  intensidad?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 260, damping: 22, mass: 0.4 };
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [intensidad, -intensidad]), config);
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-intensidad, intensidad]), config);

  const onMove = (e: React.MouseEvent) => {
    if (reducido || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: reducido ? 0 : rotX,
        rotateY: reducido ? 0 : rotY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BOTON MAGNETICO
   Version corregida del componente huerfano que estaba en
   components/ui: aquel escuchaba mousemove en document de forma
   permanente, hubiera o no hover, y se resuscribia en cada cambio.
   Este solo escucha mientras el puntero esta encima.
   ═══════════════════════════════════════════════════════════════ */
export function Magnetic({
  children,
  fuerza = 0.35,
  className = '',
}: {
  children: React.ReactNode;
  fuerza?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducido = useReducedMotion();
  const [dentro, setDentro] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const config = { stiffness: 200, damping: 16, mass: 0.3 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);

  const onMove = (e: React.MouseEvent) => {
    if (reducido || !dentro || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
    y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseEnter={() => setDentro(true)}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setDentro(false);
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BARRA DE PROGRESO DE LECTURA
   ═══════════════════════════════════════════════════════════════ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, { stiffness: 380, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX: escala }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-[var(--gold-dim)] via-[var(--gold-bright)] to-[var(--gold)]"
      aria-hidden
    />
  );
}
