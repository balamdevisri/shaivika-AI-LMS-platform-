import React, { useEffect, useRef, useState } from 'react';

interface CinematicKaizenQLogoProps {
  width?: number;
  height?: number;
  className?: string;
  autoPlay?: boolean;
  onAnimationComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  baseColor: string;
  alpha: number;
  targetX: number;
  targetY: number;
  symbolX: number;
  symbolY: number;
  textX: number;
  textY: number;
  isText: boolean;
  letterIndex: number;
  trail: { x: number; y: number }[];
  easeSpeed: number;
  depth: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export const CinematicKaizenQLogo: React.FC<CinematicKaizenQLogoProps> = ({
  width = 960,
  height = 440,
  className = '',
  onAnimationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let particles: Particle[] = [];
    let sparks: Spark[] = [];
    let animationFrameId: number;
    let startTime = Date.now();

    // Mouse interactive physics
    const mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000, radius: 140 };

    // Symbol node layout relative to central anchor
    // Center at (220, 220), Text at (520, 220)
    const symCenterX = 210;
    const symCenterY = height / 2;

    const nodes = [
      { x: symCenterX - 70, y: symCenterY, radius: 22, color: '#0072FF' },        // Left node (Vivid Blue)
      { x: symCenterX - 20, y: symCenterY - 70, radius: 22, color: '#00C6FF' },   // Top node (Cyan)
      { x: symCenterX - 20, y: symCenterY + 70, radius: 22, color: '#8E2DE2' },   // Bottom node (Purple)
      { x: symCenterX + 30, y: symCenterY, radius: 22, color: '#0072FF' },        // Right node (Vivid Blue)
    ];

    // Colors
    const palette = ['#00C6FF', '#0072FF', '#8E2DE2', '#38BDF8', '#C084FC'];

    const getTargetData = () => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const oCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!oCtx) return { symbolTargets: [], textTargets: [] };

      // 1. Render Symbol to Offscreen matching metaball layout
      const gradTopLeft = oCtx.createLinearGradient(nodes[1].x, nodes[1].y, nodes[0].x, nodes[0].y);
      gradTopLeft.addColorStop(0, '#00C6FF');
      gradTopLeft.addColorStop(1, '#0072FF');

      const gradLeftBottom = oCtx.createLinearGradient(nodes[0].x, nodes[0].y, nodes[2].x, nodes[2].y);
      gradLeftBottom.addColorStop(0, '#0072FF');
      gradLeftBottom.addColorStop(1, '#8E2DE2');

      const gradLeftRight = oCtx.createLinearGradient(nodes[0].x, nodes[0].y, nodes[3].x, nodes[3].y);
      gradLeftRight.addColorStop(0, '#0072FF');
      gradLeftRight.addColorStop(1, '#0072FF');

      // Thick organic connection bridges
      oCtx.fillStyle = gradTopLeft;
      oCtx.beginPath();
      oCtx.arc(nodes[1].x, nodes[1].y, nodes[1].radius, 0, Math.PI * 2);
      oCtx.arc(nodes[0].x, nodes[0].y, nodes[0].radius, 0, Math.PI * 2);
      oCtx.fill();
      oCtx.lineWidth = 26;
      oCtx.strokeStyle = gradTopLeft;
      oCtx.beginPath(); oCtx.moveTo(nodes[1].x, nodes[1].y); oCtx.lineTo(nodes[0].x, nodes[0].y); oCtx.stroke();

      oCtx.fillStyle = gradLeftBottom;
      oCtx.strokeStyle = gradLeftBottom;
      oCtx.beginPath(); oCtx.moveTo(nodes[0].x, nodes[0].y); oCtx.lineTo(nodes[2].x, nodes[2].y); oCtx.stroke();

      oCtx.fillStyle = gradLeftRight;
      oCtx.strokeStyle = gradLeftRight;
      oCtx.beginPath(); oCtx.moveTo(nodes[0].x, nodes[0].y); oCtx.lineTo(nodes[3].x, nodes[3].y); oCtx.stroke();

      nodes.forEach(n => {
        oCtx.fillStyle = n.color;
        oCtx.beginPath();
        oCtx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        oCtx.fill();
      });

      const symImgData = oCtx.getImageData(0, 0, width, height).data;
      const symbolTargets: { x: number; y: number; color: string }[] = [];
      const step = 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (symImgData[idx + 3] > 100) {
            symbolTargets.push({
              x,
              y,
              color: `rgba(${symImgData[idx]}, ${symImgData[idx + 1]}, ${symImgData[idx + 2]}, 1)`,
            });
          }
        }
      }

      // 2. Render Text "KaizenQ" to Offscreen
      oCtx.clearRect(0, 0, width, height);
      oCtx.font = "900 115px 'Space Grotesk', sans-serif";
      oCtx.textAlign = 'left';
      oCtx.textBaseline = 'middle';
      oCtx.fillStyle = '#FFFFFF';
      const textStartX = 330;
      const textStartY = height / 2 + 5;
      oCtx.fillText('KaizenQ', textStartX, textStartY);

      const txtImgData = oCtx.getImageData(0, 0, width, height).data;
      const textTargets: { x: number; y: number; letterIndex: number; color: string }[] = [];

      // Determine letter index boundaries based on X position roughly
      // 'K' ~ 330-410, 'a' ~ 410-465, 'i' ~ 465-495, 'z' ~ 495-550, 'e' ~ 550-605, 'n' ~ 605-670, 'Q' ~ 670+
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (txtImgData[idx + 3] > 120) {
            let lIdx = 0;
            if (x < 415) lIdx = 0;        // K
            else if (x < 475) lIdx = 1;   // a
            else if (x < 505) lIdx = 2;   // i
            else if (x < 565) lIdx = 3;   // z
            else if (x < 620) lIdx = 4;   // e
            else if (x < 685) lIdx = 5;   // n
            else lIdx = 6;                // Q

            // Color gradient for letters
            const ratio = (x - textStartX) / 420;
            let c = '#3B82F6';
            if (ratio < 0.3) c = '#06B6D4';
            else if (ratio < 0.7) c = '#3B82F6';
            else c = '#7C3AED';

            textTargets.push({ x, y, letterIndex: lIdx, color: c });
          }
        }
      }

      return { symbolTargets, textTargets };
    };

    const initSystem = () => {
      const { symbolTargets, textTargets } = getTargetData();
      const totalParticles = 650;
      particles = [];

      for (let i = 0; i < totalParticles; i++) {
        // Random initial ambient positions across full screen
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const baseC = palette[Math.floor(Math.random() * palette.length)];

        // Assign target
        const sTarget = symbolTargets[i % Math.max(1, symbolTargets.length)] || { x: symCenterX, y: symCenterY, color: baseC };
        const tTarget = textTargets[i % Math.max(1, textTargets.length)] || { x: width / 2, y: height / 2, letterIndex: 0, color: baseC };

        particles.push({
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2.2 + 1.0,
          color: baseC,
          baseColor: baseC,
          alpha: Math.random() * 0.6 + 0.4,
          targetX: startX,
          targetY: startY,
          symbolX: sTarget.x,
          symbolY: sTarget.y,
          textX: tTarget.x,
          textY: tTarget.y,
          isText: i % 2 === 0, // Half go to text, half to symbol
          letterIndex: tTarget.letterIndex,
          trail: [],
          easeSpeed: Math.random() * 0.04 + 0.03,
          depth: Math.random() * 0.8 + 0.4,
        });
      }
    };

    const emitSparks = (x: number, y: number, count = 8) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: Math.random() * 30 + 20,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 2 + 1,
        });
      }
    };

    let sparkTriggered = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const elapsed = (now - startTime) / 1000; // seconds

      // Timeline configuration:
      // 0s - 1.2s: Ambient Floating Chaos
      // 1.2s - 3.2s: Intelligent Particle Assembly
      // 3.2s - 4.5s: Symbol Connection Energy Pulse & Node Spark Bursts
      // 4.5s - 6.5s: Typography Blur-to-Sharp & Masked Gradient Reveal
      // 6.5s+: Idle Floating, Breathing Motion & Interactive Mouse Response

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Global subtle breathing float (starts after 6.5s)
      const floatY = elapsed > 6.5 ? Math.sin(now * 0.0018) * 3 : 0;
      const breatheScale = elapsed > 6.5 ? 1 + Math.sin(now * 0.0012) * 0.012 : 1;

      // Draw background ambient bloom flares
      const bgGrad1 = ctx.createRadialGradient(symCenterX, height / 2, 10, symCenterX, height / 2, 240);
      bgGrad1.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
      bgGrad1.addColorStop(0.5, 'rgba(59, 130, 246, 0.06)');
      bgGrad1.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = bgGrad1;
      ctx.fillRect(0, 0, width, height);

      const bgGrad2 = ctx.createRadialGradient(580, height / 2, 10, 580, height / 2, 320);
      bgGrad2.addColorStop(0, 'rgba(124, 58, 237, 0.1)');
      bgGrad2.addColorStop(0.6, 'rgba(59, 130, 246, 0.04)');
      bgGrad2.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = bgGrad2;
      ctx.fillRect(0, 0, width, height);

      // --- PHASE 1 & 2: PARTICLES UPDATE ---
      particles.forEach((p, idx) => {
        let destX = p.x;
        let destY = p.y;

        if (elapsed < 1.2) {
          // Phase 0: Ambient natural floating
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        } else if (elapsed < 3.2) {
          // Phase 1: Intelligent Assembly towards Symbol or Text
          const progress = (elapsed - 1.2) / 2.0; // 0 to 1
          const easeProgress = Math.pow(progress, 3); // Cubic acceleration

          destX = p.isText ? p.textX : p.symbolX;
          destY = p.isText ? p.textY : p.symbolY;

          p.x += (destX - p.x) * p.easeSpeed * (1 + easeProgress * 2);
          p.y += (destY - p.y) * p.easeSpeed * (1 + easeProgress * 2);

          // Add trail positions
          if (idx % 3 === 0) {
            p.trail.unshift({ x: p.x, y: p.y });
            if (p.trail.length > 5) p.trail.pop();
          }
        } else if (elapsed < 4.5) {
          // Phase 2: Lock into Symbol positions
          destX = p.isText ? p.textX : p.symbolX;
          destY = p.isText ? p.textY : p.symbolY;

          p.x += (destX - p.x) * 0.15;
          p.y += (destY - p.y) * 0.15;
          p.trail = [];
        } else {
          // Phase 3 & 4: Text + Symbol target tracking with Mouse Repulsion & Idle Float
          const letterDelay = p.isText ? 4.5 + p.letterIndex * 0.15 : 4.5;
          const isRevealed = elapsed >= letterDelay;

          if (isRevealed) {
            destX = p.isText ? p.textX : p.symbolX;
            destY = p.isText ? p.textY + floatY : p.symbolY + floatY;

            // Idle jitter/drift
            const idleOffset = Math.sin(now * 0.003 + idx) * 1.2;

            // Mouse Repulsion Physics
            let forceX = 0;
            let forceY = 0;
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const power = (1 - dist / mouse.radius) * 18;
              forceX = -(dx / dist) * power;
              forceY = -(dy / dist) * power;
            }

            p.vx = (destX + idleOffset - p.x + forceX) * 0.1;
            p.vy = (destY + idleOffset - p.y + forceY) * 0.1;

            p.x += p.vx;
            p.y += p.vy;
          }
        }

        // Draw Trails during Phase 1
        if (p.trail.length > 1 && elapsed >= 1.2 && elapsed < 3.2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.5;
          ctx.globalAlpha = 0.35;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }

        // Draw Particle
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = elapsed > 3.0 ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.depth * breatheScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // --- PHASE 2: SYMBOL CONNECTING LINES & ENERGY PULSE ---
      if (elapsed >= 3.2) {
        ctx.save();
        ctx.translate(0, floatY);

        // Symbol bridges in Phase 2
        const pulseSegs = [
          { p1: nodes[1], p2: nodes[0] }, // Top to Left
          { p1: nodes[0], p2: nodes[2] }, // Left to Bottom
          { p1: nodes[0], p2: nodes[3] }, // Left to Right
        ];

        ctx.lineWidth = 14;
        pulseSegs.forEach(seg => {
          const lGrad = ctx.createLinearGradient(seg.p1.x, seg.p1.y, seg.p2.x, seg.p2.y);
          lGrad.addColorStop(0, seg.p1.color || '#00C6FF');
          lGrad.addColorStop(1, seg.p2.color || '#0072FF');
          ctx.strokeStyle = lGrad;
          ctx.shadowColor = seg.p1.color || '#0072FF';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(seg.p1.x, seg.p1.y);
          ctx.lineTo(seg.p2.x, seg.p2.y);
          ctx.stroke();
        });

        // Energy pulses traveling across connections
        const pulseCycle = ((now * 0.0012) % 1); // 0 to 1

        pulseSegs.forEach(seg => {
          const px = seg.p1.x + (seg.p2.x - seg.p1.x) * pulseCycle;
          const py = seg.p1.y + (seg.p2.y - seg.p1.y) * pulseCycle;

          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#00C6FF';
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Glowing Circular Nodes
        nodes.forEach((n, i) => {
          // Node Outer Glow Ring
          ctx.fillStyle = i % 2 === 0 ? '#06B6D4' : '#7C3AED';
          ctx.shadowColor = '#3B82F6';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
          ctx.fill();

          // Core bright white center
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();

        // Emit node sparks once at 3.3s
        if (!sparkTriggered && elapsed >= 3.3) {
          nodes.forEach(n => emitSparks(n.x, n.y, 12));
          sparkTriggered = true;
        }
      }

      // --- UPDATE & RENDER SPARKS ---
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.05; // gravity
        s.life += 1;
        const alpha = 1 - s.life / s.maxLife;

        if (alpha > 0) {
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 6;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });
      sparks = sparks.filter(s => s.life < s.maxLife);

      // --- PHASE 3: TYPOGRAPHY BLUR-TO-SHARP & GRADIENT MASK REVEAL ---
      if (elapsed >= 4.4) {
        ctx.save();
        ctx.translate(0, floatY);

        const textStartX = 330;
        const textStartY = height / 2 + 5;

        // Mask & Blur Calculation
        const revealProgress = Math.min((elapsed - 4.4) / 1.8, 1.0); // 0 to 1
        const currentMaskWidth = revealProgress * 440; // max text width ~440px
        const blurAmount = Math.max(0, 16 - revealProgress * 18);

        // Apply SVG blur or Canvas filter if supported
        if (blurAmount > 0.5) {
          ctx.filter = `blur(${blurAmount}px)`;
        }

        // Clip reveal region from left to right
        ctx.beginPath();
        ctx.rect(textStartX - 20, 0, currentMaskWidth + 20, height);
        ctx.clip();

        // Main Text Typography
        ctx.font = "900 115px 'Space Grotesk', sans-serif";
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        // Electric Gradient fill
        const textGrad = ctx.createLinearGradient(textStartX, 0, textStartX + 420, 0);
        textGrad.addColorStop(0, '#FFFFFF');
        textGrad.addColorStop(0.45, '#E0F2FE');
        textGrad.addColorStop(0.75, '#60A5FA');
        textGrad.addColorStop(1, '#C084FC');

        ctx.fillStyle = textGrad;
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 15;
        ctx.fillText('KaizenQ', textStartX, textStartY);

        ctx.filter = 'none'; // reset filter

        // Signature Glowing "Q" Emphasis
        if (revealProgress > 0.85) {
          ctx.font = "900 115px 'Space Grotesk', sans-serif";
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#7C3AED';
          ctx.shadowBlur = 30;

          // Draw signature Q with cyan/violet highlights
          const qStartX = textStartX + 348;
          ctx.fillText('Q', qStartX, textStartY);

          // Extra radial lens flare bloom over 'Q'
          const qFlare = ctx.createRadialGradient(qStartX + 35, textStartY, 5, qStartX + 35, textStartY, 60);
          qFlare.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
          qFlare.addColorStop(0.5, 'rgba(6, 182, 212, 0.2)');
          qFlare.addColorStop(1, 'rgba(2, 6, 23, 0)');
          ctx.fillStyle = qFlare;
          ctx.fillRect(qStartX - 30, textStartY - 70, 140, 140);
        }

        // Luminous Light Gradient Sweep Bar across text
        if (elapsed >= 4.8 && elapsed <= 6.8) {
          const sweepX = textStartX + ((elapsed - 4.8) / 2.0) * 440;
          const sweepGrad = ctx.createLinearGradient(sweepX - 50, 0, sweepX + 50, 0);
          sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          sweepGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
          sweepGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = sweepGrad;
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillRect(sweepX - 50, textStartY - 60, 100, 120);
          ctx.globalCompositeOperation = 'source-over';
        }

        ctx.restore();
      }

      // Notify completion once at 7.0s
      if (elapsed > 7.0 && !isInteractive) {
        setIsInteractive(true);
        if (onAnimationComplete) onAnimationComplete();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = (width * dpr) / dpr / rect.width;
      const scaleY = (height * dpr) / dpr / rect.height;
      mouse.targetX = (e.clientX - rect.left) * scaleX;
      mouse.targetY = (e.clientY - rect.top) * scaleY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    // Ensure Space Grotesk font is ready before sampling targets
    document.fonts.ready.then(() => {
      initSystem();
      render();
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [width, height, onAnimationComplete]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-transparent ${className}`}>
      <canvas
        ref={canvasRef}
        className="block cursor-pointer max-w-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};
