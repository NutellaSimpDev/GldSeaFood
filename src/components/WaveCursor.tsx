import { useEffect, useRef } from 'react';

export default function WaveCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    // Respetar la preferencia de accesibilidad del sistema
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // El canvas se dibuja a resolucion de dispositivo y se escala por CSS,
    // si no el trazo se ve borroso en pantallas retina.
    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      // Reset + escala: a partir de aqui se dibuja en px CSS
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setupCanvas();

    const onResize = () => setupCanvas();
    window.addEventListener('resize', onResize, { passive: true });

    // Pointer state
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    // Wave points trail
    const POINT_COUNT = 18;
    const points = Array.from({ length: POINT_COUNT }, () => ({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp pointer
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Update trail points
      let prevX = mouse.x;
      let prevY = mouse.y;

      ctx.lineCap = 'round';

      for (let i = 0; i < POINT_COUNT; i++) {
        const p = points[i];

        // Fluid spring movement towards previous point
        p.x += (prevX - p.x) * 0.3;
        p.y += (prevY - p.y) * 0.3;

        // Add subtle wave oscillation
        const waveOffset = Math.sin(time + i * 0.4) * (i * 0.8);
        const perpX = - (prevY - p.y);
        const perpY = (prevX - p.x);
        const len = Math.hypot(perpX, perpY) || 1;

        const offsetX = (perpX / len) * waveOffset;
        const offsetY = (perpY / len) * waveOffset;

        prevX = p.x;
        prevY = p.y;

        // Draw wave trail segment.
        // El resplandor sale de dos trazos superpuestos (uno ancho y muy
        // translucido, otro fino y brillante) en lugar de un desenfoque.
        // ctx.shadowBlur costaba un pase de blur por segmento, y un
        // filter CSS sobre el canvas obliga a componer una capa del tamano
        // de la pantalla: ambos salen mucho mas caros que trazar dos veces.
        if (i > 0) {
          const alpha = 1 - i / POINT_COUNT;
          const radius = (POINT_COUNT - i) * 0.8;
          const x0 = points[i - 1].x + offsetX;
          const y0 = points[i - 1].y + offsetY;
          const x1 = p.x + offsetX;
          const y1 = p.y + offsetY;

          // halo
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = `rgba(212, 168, 83, ${alpha * 0.12})`;
          ctx.lineWidth = radius * 2.4;
          ctx.stroke();

          // nucleo
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.strokeStyle = `rgba(245, 200, 107, ${alpha * 0.38})`;
          ctx.lineWidth = radius;
          ctx.stroke();
        }
      }

      // Draw cursor core golden drop: el halo es un gradiente radial,
      // barato porque solo cubre ~18px, no la pantalla entera.
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 18);
      glow.addColorStop(0, 'rgba(245, 200, 107, 0.55)');
      glow.addColorStop(1, 'rgba(245, 200, 107, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 200, 107, 0.95)';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    // Pausar cuando la pestana no esta visible: antes seguia quemando
    // bateria a 60 fps en segundo plano.
    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
        animId = 0;
      } else if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
    />
  );
}
