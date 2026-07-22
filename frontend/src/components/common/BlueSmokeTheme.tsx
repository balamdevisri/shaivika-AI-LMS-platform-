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

    // Create 35 volumetric electric sky blue smoke plumes
    const particles: SmokeParticle[] = [];
    const colorPairs = [
      { c1: 'rgba(2, 132, 199, 0.24)', c2: 'rgba(56, 189, 248, 0.08)' },  // Sky 600 -> Sky 400
      { c1: 'rgba(14, 165, 233, 0.22)', c2: 'rgba(186, 230, 253, 0.10)' }, // Sky 500 -> Sky 200
      { c1: 'rgba(56, 189, 248, 0.20)', c2: 'rgba(2, 132, 199, 0.06)' },  // Sky 400 -> Sky 600
      { c1: 'rgba(3, 105, 161, 0.18)', c2: 'rgba(14, 165, 233, 0.08)' },  // Sky 700 -> Sky 500
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

      // Pure White Canvas Background
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Render drifting sky blue smoke plumes
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
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative w-full min-h-screen bg-white ${className}`}>
      {/* Background 60 FPS Sky Blue Volumetric Smoke Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
