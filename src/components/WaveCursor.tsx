import React, { useEffect, useRef } from 'react';

export default function WaveCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
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

        // Draw glowing wave trail segment
        if (i > 0) {
          const alpha = 1 - i / POINT_COUNT;
          const radius = (POINT_COUNT - i) * 0.8;

          ctx.beginPath();
          ctx.moveTo(points[i - 1].x + offsetX, points[i - 1].y + offsetY);
          ctx.lineTo(p.x + offsetX, p.y + offsetY);
          ctx.strokeStyle = `rgba(245, 200, 107, ${alpha * 0.35})`;
          ctx.lineWidth = radius;
          ctx.lineCap = 'round';
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(212, 168, 83, 0.4)';
          ctx.stroke();
        }
      }

      // Draw cursor core golden drop glow
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 200, 107, 0.9)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#f5c86b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
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
