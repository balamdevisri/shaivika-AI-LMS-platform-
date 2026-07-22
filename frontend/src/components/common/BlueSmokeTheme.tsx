import React, { useEffect, useRef } from 'react';

interface BlueSmokeThemeProps {
  className?: string;
  children?: React.ReactNode;
}

interface SmokeParticle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  vRot: number;
  colorStop1: string;
  colorStop2: string;
}

export const BlueSmokeTheme: React.FC<BlueSmokeThemeProps> = ({ className = '', children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.getBoundingClientRect().width;
    const h = () => canvas.getBoundingClientRect().height;

    // Create 35 volumetric blue smoke plumes
    const particles: SmokeParticle[] = [];
    const colorPairs = [
      { c1: 'rgba(37, 99, 235, 0.22)', c2: 'rgba(34, 211, 238, 0.08)' },
      { c1: 'rgba(59, 130, 246, 0.18)', c2: 'rgba(96, 165, 250, 0.05)' },
      { c1: 'rgba(14, 165, 233, 0.20)', c2: 'rgba(37, 99, 235, 0.07)' },
      { c1: 'rgba(29, 78, 216, 0.16)', c2: 'rgba(56, 189, 248, 0.06)' },
    ];

    for (let i = 0; i < 35; i++) {
      const pair = colorPairs[i % colorPairs.length];
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        r: Math.random() * 180 + 120,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.15, // Slow upward drift
        alpha: Math.random() * 0.5 + 0.2,
        maxAlpha: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.003,
        colorStop1: pair.c1,
        colorStop2: pair.c2,
      });
    }

    const animate = () => {
      const width = w();
      const height = h();

      // White Canvas Background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Render drifting blue smoke plumes
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.005) * 0.2;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around boundaries smoothly
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
        grad.addColorStop(0, p.colorStop1);
        grad.addColorStop(0.5, p.colorStop2);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        // Slightly squished oval for organic smoke look
        ctx.ellipse(0, 0, p.r, p.r * 0.75, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
