import { useEffect, useRef } from "react";

const SYMBOLS = [
  "0", "1", "2", "3", "5", "7", "8", "9",
  "π", "∑", "∫", "√", "∞", "θ", "λ", "Δ",
  "x²", "f(x)", "sin", "cos", "≈", "+", "−", "÷",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  symbol: string;
  size: number;
  color: string;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hide on touch devices / reduced motion
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    let dpr = window.devicePixelRatio || 1;
    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastEmit = 0;

    const colors = [
      "oklch(0.78 0.13 80)", // gold
      "oklch(0.78 0.12 180)", // teal
      "oklch(0.96 0.01 250)", // foreground
    ];

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.hypot(dx, dy);
      lastX = e.clientX;
      lastY = e.clientY;

      // Emit based on movement + time
      if (now - lastEmit < 35 && dist < 8) return;
      lastEmit = now;

      const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 6,
        y: e.clientY + (Math.random() - 0.5) * 6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.3 - Math.random() * 0.5,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        symbol,
        size: 12 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });

      // Cap particles
      if (particles.length > 80) particles.splice(0, particles.length - 80);
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005; // gentle upward acceleration
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = 1 - t;
        ctx.globalAlpha = alpha * 0.85;
        ctx.fillStyle = p.color;
        ctx.font = `${p.size}px "Cormorant Garamond", Georgia, serif`;
        ctx.fillText(p.symbol, p.x, p.y);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}
