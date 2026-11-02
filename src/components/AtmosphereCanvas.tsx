import React, { useEffect, useRef } from 'react';

interface Bat {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  scale: number;
  wingAngle: number;
  wingSpeed: number;
  opacity: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  isCrimson: boolean;
}

interface MistPuff {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  opacity: number;
}

interface AtmosphereCanvasProps {
  intensity?: 'cinematic' | 'ambient';
  showBats?: boolean;
}

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  intensity = 'cinematic',
  showBats = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Pre-render a cached mist puff texture once on an offscreen canvas
    // to avoid creating costly radial gradients on every frame!
    const mistOffscreen = document.createElement('canvas');
    mistOffscreen.width = 256;
    mistOffscreen.height = 256;
    const mistCtx = mistOffscreen.getContext('2d');
    if (mistCtx) {
      const grad = mistCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(180, 20, 36, 0.45)');
      grad.addColorStop(0.4, 'rgba(40, 15, 25, 0.3)');
      grad.addColorStop(0.8, 'rgba(15, 8, 14, 0.12)');
      grad.addColorStop(1, 'rgba(5, 3, 5, 0)');
      mistCtx.fillStyle = grad;
      mistCtx.beginPath();
      mistCtx.arc(128, 128, 120, 0, Math.PI * 2);
      mistCtx.fill();
    }

    // Initialize bats (optimized count)
    const batCount = showBats ? (intensity === 'cinematic' ? 8 : 4) : 0;
    const bats: Bat[] = [];
    for (let i = 0; i < batCount; i++) {
      bats.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.6),
        speedX: (Math.random() * 2.2 + 1.2) * (Math.random() > 0.4 ? 1 : -1),
        speedY: (Math.random() - 0.5) * 0.5,
        scale: Math.random() * 0.45 + 0.4,
        wingAngle: Math.random() * Math.PI,
        wingSpeed: Math.random() * 0.18 + 0.18,
        opacity: Math.random() * 0.35 + 0.55,
      });
    }

    // Floating embers
    const particleCount = intensity === 'cinematic' ? 36 : 20;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.0 + 0.8,
        speedY: -(Math.random() * 0.55 + 0.2),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.6 + 0.2,
        isCrimson: Math.random() > 0.3,
      });
    }

    // Rolling mist puffs
    const mistCount = intensity === 'cinematic' ? 7 : 4;
    const mists: MistPuff[] = [];
    for (let i = 0; i < mistCount; i++) {
      mists.push({
        x: Math.random() * width,
        y: height * 0.72 + Math.random() * (height * 0.25),
        radius: Math.random() * 140 + 120,
        speedX: Math.random() * 0.45 + 0.2,
        opacity: Math.random() * 0.25 + 0.15,
      });
    }

    const drawBat = (bat: Bat) => {
      ctx.save();
      ctx.translate(bat.x, bat.y);
      if (bat.speedX < 0) {
        ctx.scale(-bat.scale, bat.scale);
      } else {
        ctx.scale(bat.scale, bat.scale);
      }

      ctx.fillStyle = `rgba(14, 8, 12, ${bat.opacity})`;
      ctx.beginPath();

      const flap = Math.sin(bat.wingAngle);
      const wingTipY = -12 * flap;

      // Left wing
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(-14, wingTipY - 8, -28, wingTipY);
      ctx.quadraticCurveTo(-18, wingTipY + 8, -10, 2);
      ctx.quadraticCurveTo(-5, 5, 0, 3);

      // Right wing
      ctx.quadraticCurveTo(5, 5, 10, 2);
      ctx.quadraticCurveTo(18, wingTipY + 8, 28, wingTipY);
      ctx.quadraticCurveTo(14, wingTipY - 8, 0, 0);

      // Head
      ctx.arc(0, -2, 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw cached mist puffs with fast GPU drawImage
      for (let i = 0; i < mists.length; i++) {
        const m = mists[i];
        m.x += m.speedX;
        if (m.x - m.radius > width) {
          m.x = -m.radius;
        }
        ctx.globalAlpha = m.opacity;
        const size = m.radius * 2;
        ctx.drawImage(mistOffscreen, m.x - m.radius, m.y - m.radius, size, size);
      }
      ctx.globalAlpha = 1.0;

      // 2. Draw embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.isCrimson
          ? `rgba(235, 30, 52, ${p.opacity})`
          : `rgba(210, 215, 225, ${p.opacity * 0.7})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw bats
      for (let i = 0; i < bats.length; i++) {
        const bat = bats[i];
        bat.x += bat.speedX;
        bat.y += bat.speedY + Math.sin(tick * 0.05) * 0.5;
        bat.wingAngle += bat.wingSpeed;

        if (bat.speedX > 0 && bat.x > width + 40) {
          bat.x = -40;
          bat.y = Math.random() * (height * 0.6);
        } else if (bat.speedX < 0 && bat.x < -40) {
          bat.x = width + 40;
          bat.y = Math.random() * (height * 0.6);
        }

        drawBat(bat);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, showBats]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full will-change-transform"
      aria-hidden="true"
    />
  );
};
