"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Span = { a: Pt; c: Pt; b: Pt; k: number };
type Chain = { spans: Span[] };
type Pulse = { chain: number; u: number; speed: number; dir: 1 | -1 };
type Mote = { x: number; y: number; r: number; vy: number; a: number };

const CYAN = "69,225,255";
const TOWERS = 13;

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

function quad(s: Span, t: number): Pt {
  const m = 1 - t;
  return {
    x: m * m * s.a.x + 2 * m * t * s.c.x + t * t * s.b.x,
    y: m * m * s.a.y + 2 * m * t * s.c.y + t * t * s.b.y,
  };
}

/**
 * Cinematic transmission corridor: two lattice-tower lines receding to a
 * substation glow on the horizon, with current pulses running the conductors.
 * Static geometry is painted once per resize; each frame only draws pulses.
 */
export default function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d")!;
    const glow = document.createElement("canvas");
    glow.width = glow.height = 64;
    const g = glow.getContext("2d")!;
    const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.18, `rgba(${CYAN},0.9)`);
    rg.addColorStop(0.5, `rgba(${CYAN},0.18)`);
    rg.addColorStop(1, `rgba(${CYAN},0)`);
    g.fillStyle = rg;
    g.fillRect(0, 0, 64, 64);

    let w = 0;
    let h = 0;
    let dpr = 1;
    let vp: Pt = { x: 0, y: 0 };
    let chains: Chain[] = [];
    let pulses: Pulse[] = [];
    let motes: Mote[] = [];
    let raf = 0;
    let last = 0;
    let onScreen = true;

    function tower(c: CanvasRenderingContext2D, b: Pt, H: number, alpha: number): Pt[] {
      const W = H * 0.3;
      const waistY = b.y - H * 0.6;
      const topY = b.y - H;
      const halfAt = (y: number) => {
        if (y >= waistY) return W / 2 - ((b.y - y) / (b.y - waistY)) * (W / 2 - W * 0.13);
        return W * 0.13 - ((waistY - y) / (waistY - topY)) * (W * 0.13 - W * 0.04);
      };
      c.strokeStyle = `rgba(${CYAN},${alpha})`;
      c.lineWidth = Math.max(0.5, H / 420);
      c.beginPath();
      // legs and body
      for (const s of [-1, 1]) {
        c.moveTo(b.x + s * (W / 2), b.y);
        c.lineTo(b.x + s * W * 0.13, waistY);
        c.lineTo(b.x + s * W * 0.04, topY + H * 0.04);
        c.lineTo(b.x, topY);
      }
      // cross bracing
      const levels = 6;
      for (let i = 0; i < levels; i++) {
        const y0 = b.y - ((b.y - topY) * i) / levels;
        const y1 = b.y - ((b.y - topY) * (i + 1)) / levels;
        const h0 = halfAt(y0);
        const h1 = halfAt(y1);
        c.moveTo(b.x - h0, y0);
        c.lineTo(b.x + h1, y1);
        c.moveTo(b.x + h0, y0);
        c.lineTo(b.x - h1, y1);
        c.moveTo(b.x - h1, y1);
        c.lineTo(b.x + h1, y1);
      }
      // crossarms with struts and insulator strings
      const attach: Pt[] = [];
      const arms = [
        { y: b.y - H * 0.66, half: W * 1.05 },
        { y: b.y - H * 0.84, half: W * 0.72 },
      ];
      for (const arm of arms) {
        c.moveTo(b.x - arm.half, arm.y);
        c.lineTo(b.x + arm.half, arm.y);
        for (const s of [-1, 1]) {
          // lattice arm: horizontal bottom chord, top chord rising back to the body
          const body = halfAt(arm.y - H * 0.05);
          c.moveTo(b.x + s * arm.half, arm.y);
          c.lineTo(b.x + s * body, arm.y - H * 0.05);
          c.moveTo(b.x + s * arm.half, arm.y);
          c.lineTo(b.x + s * arm.half, arm.y + H * 0.045);
          attach.push({ x: b.x + s * arm.half, y: arm.y + H * 0.045 });
        }
      }
      attach.push({ x: b.x, y: topY });
      c.stroke();
      return attach;
    }

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const cv of [canvas!, layer]) {
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(h * dpr);
      }
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = w < 768;
      const horizon = h * (narrow ? 0.62 : 0.66);
      vp = { x: w * (narrow ? 0.62 : 0.56), y: horizon };

      // sky
      const sky = lctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "#040917");
      sky.addColorStop(0.55, "#081536");
      sky.addColorStop(0.66, "#0d2150");
      sky.addColorStop(1, "#040917");
      lctx.fillStyle = sky;
      lctx.fillRect(0, 0, w, h);

      const haze = lctx.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, w * 0.55);
      haze.addColorStop(0, `rgba(${CYAN},0.32)`);
      haze.addColorStop(0.25, "rgba(141,125,255,0.12)");
      haze.addColorStop(1, "rgba(141,125,255,0)");
      lctx.fillStyle = haze;
      lctx.fillRect(0, 0, w, h);

      // ground perspective grid
      lctx.lineWidth = 1;
      for (let i = -24; i <= 24; i++) {
        const x = vp.x + i * w * 0.09;
        const a = 0.09 * (1 - Math.abs(i) / 26);
        lctx.strokeStyle = `rgba(${CYAN},${a})`;
        lctx.beginPath();
        lctx.moveTo(vp.x, vp.y);
        lctx.lineTo(x + (x - vp.x) * 3, h * 2);
        lctx.stroke();
      }
      for (let j = 1; j < 18; j++) {
        const y = horizon + (h - horizon) / (1 + (18 - j) * 0.55);
        lctx.strokeStyle = `rgba(${CYAN},${0.02 + 0.06 * (j / 18)})`;
        lctx.beginPath();
        lctx.moveTo(0, y);
        lctx.lineTo(w, y);
        lctx.stroke();
      }

      // city lights on the horizon
      const r = rng(7);
      for (let i = 0; i < (narrow ? 90 : 220); i++) {
        const spread = (r() - 0.5) * w * 0.9;
        const x = vp.x + spread;
        const y = horizon - 1 + r() * 5 * (1 - Math.abs(spread) / (w * 0.45));
        lctx.fillStyle = r() > 0.75 ? "rgba(232,242,58,0.7)" : `rgba(${CYAN},${0.35 + r() * 0.5})`;
        lctx.fillRect(x, y, r() * 1.6 + 0.4, r() * 1.2 + 0.4);
      }

      // tower lines
      const lines = narrow
        ? [{ p0: { x: w * 1.15, y: h * 1.02 }, end: { x: vp.x + 6, y: vp.y }, h0: h * 0.62 }]
        : [
            { p0: { x: w * 1.06, y: h * 1.04 }, end: { x: vp.x + 10, y: vp.y }, h0: h * 0.7 },
            { p0: { x: w * 0.34, y: h * 1.12 }, end: { x: vp.x - 12, y: vp.y }, h0: h * 0.56 },
          ];

      chains = [];
      for (const ln of lines) {
        const attachAll: Pt[][] = [];
        const ks: number[] = [];
        for (let i = TOWERS - 1; i >= 0; i--) {
          const k = 1 / (1 + i * 0.5);
          const base = {
            x: ln.end.x + (ln.p0.x - ln.end.x) * k,
            y: ln.end.y + (ln.p0.y - ln.end.y) * k,
          };
          const alpha = 0.08 + 0.5 * Math.pow(k, 0.7);
          attachAll[i] = tower(lctx, base, ln.h0 * k, alpha);
          ks[i] = k;
        }
        for (let c = 0; c < 5; c++) {
          const spans: Span[] = [];
          for (let i = 0; i < TOWERS - 1; i++) {
            const a = attachAll[i][c];
            const b = attachAll[i + 1][c];
            const k = (ks[i] + ks[i + 1]) / 2;
            const sag = Math.hypot(b.x - a.x, b.y - a.y) * 0.1 + ln.h0 * k * 0.03;
            spans.push({ a, b, c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + sag }, k });
          }
          lctx.lineWidth = 1;
          for (const s of spans) {
            lctx.strokeStyle = `rgba(${CYAN},${0.08 + 0.3 * s.k})`;
            lctx.beginPath();
            lctx.moveTo(s.a.x, s.a.y);
            lctx.quadraticCurveTo(s.c.x, s.c.y, s.b.x, s.b.y);
            lctx.stroke();
          }
          chains.push({ spans });
        }
      }

      const pr = rng(11);
      pulses = chains.flatMap((ch, i) =>
        Array.from({ length: i % 5 === 4 ? 1 : 2 }, () => ({
          chain: i,
          u: pr() * ch.spans.length,
          speed: 0.35 + pr() * 0.35,
          dir: (i < 5 ? 1 : -1) as 1 | -1,
        })),
      );
      const mr = rng(3);
      motes = Array.from({ length: narrow ? 28 : 64 }, () => ({
        x: mr() * w,
        y: mr() * h,
        r: mr() * 1.4 + 0.3,
        vy: 4 + mr() * 10,
        a: 0.15 + mr() * 0.4,
      }));
    }

    function point(ch: Chain, u: number) {
      const n = ch.spans.length;
      const uu = Math.min(Math.max(u, 0), n - 1e-4);
      const i = Math.floor(uu);
      return { p: quad(ch.spans[i], uu - i), k: ch.spans[i].k };
    }

    function frame(t: number) {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      ctx!.clearRect(0, 0, w, h);
      ctx!.drawImage(layer, 0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";

      for (const p of pulses) {
        const ch = chains[p.chain];
        const n = ch.spans.length;
        if (!reduce) {
          p.u += p.dir * p.speed * dt;
          if (p.u > n) p.u -= n;
          if (p.u < 0) p.u += n;
        }
        // trail
        let prev = point(ch, p.u).p;
        for (let s = 1; s <= 14; s++) {
          const q = point(ch, p.u - p.dir * s * 0.035);
          ctx!.strokeStyle = `rgba(${CYAN},${0.55 * (1 - s / 14)})`;
          ctx!.lineWidth = 0.6 + 2.2 * q.k;
          ctx!.beginPath();
          ctx!.moveTo(prev.x, prev.y);
          ctx!.lineTo(q.p.x, q.p.y);
          ctx!.stroke();
          prev = q.p;
        }
        const head = point(ch, p.u);
        const size = 10 + 34 * head.k;
        ctx!.drawImage(glow, head.p.x - size / 2, head.p.y - size / 2, size, size);
      }

      // substation beacon
      const beat = reduce ? 0.6 : (Math.sin(t / 600) + 1) / 2;
      const bs = 70 + 50 * beat;
      ctx!.globalAlpha = 0.5 + 0.4 * beat;
      ctx!.drawImage(glow, vp.x - bs / 2, vp.y - bs / 2, bs, bs);
      ctx!.globalAlpha = 1;

      for (const m of motes) {
        if (!reduce) {
          m.y -= m.vy * dt;
          if (m.y < -4) {
            m.y = h + 4;
            m.x = Math.random() * w;
          }
        }
        ctx!.fillStyle = `rgba(${CYAN},${m.a})`;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = "source-over";

      if (!reduce && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    build();
    start();

    const ro = new ResizeObserver(() => {
      build();
      start();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) start();
    });
    io.observe(canvas);
    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
