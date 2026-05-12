"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── types ─── */
interface SplashParticle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; size: number;
}

interface Orca {
  x: number; y: number;
  phase: "submerged" | "swimming" | "breaching";
  swimDir: 1 | -1;
  swimVx: number;
  t: number;            // 0→1 across jump arc
  jumpOriginX: number;
  jumpOriginY: number;
  jumpHorizDist: number;
  jumpPeak: number;
  size: number;
  waitFrames: number;
  splash: SplashParticle[];
}

interface Cloud { x: number; y: number; w: number; speed: number; opacity: number; }
interface Star  { x: number; y: number; r: number; phase: number; }

/* ─── helpers ─── */
function mkSplash(arr: SplashParticle[], cx: number, cy: number, dir: number) {
  for (let i = 0; i < 22; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.85;
    const spd = 1.8 + Math.random() * 5.5;
    arr.push({
      x: cx + (Math.random() - 0.5) * 14,
      y: cy,
      vx: Math.cos(a) * spd * (0.5 + Math.random()) * dir,
      vy: Math.sin(a) * spd - 1,
      life: 1,
      size: 1.5 + Math.random() * 3.5,
    });
  }
}

function mkOrca(W: number, horizonY: number, index: number, delay: number): Orca {
  const dir: 1 | -1 = index % 2 === 0 ? 1 : -1;
  return {
    x: dir === 1 ? -160 : W + 160,
    y: horizonY + 28,
    phase: "submerged",
    swimDir: dir,
    swimVx: dir * (0.9 + Math.random() * 0.5),
    t: 0,
    jumpOriginX: 0, jumpOriginY: 0, jumpHorizDist: 0, jumpPeak: 0,
    size: 0.75 + Math.random() * 0.35,
    waitFrames: delay + index * 140,
    splash: [],
  };
}

/* ─── orca drawing — realistic bezier body ─── */
function drawOrcaShape(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  dir: 1 | -1,
  scale: number,
  bodyAngle: number,
  alpha: number,
  underwater: boolean,
  isDark: boolean,
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(cx, cy);
  ctx.rotate(bodyAngle * dir);
  ctx.scale(dir * scale, scale);

  /* Body */
  ctx.beginPath();
  ctx.moveTo(72, 2);
  ctx.bezierCurveTo(74, -12, 52, -24, 18, -23);
  ctx.bezierCurveTo(-4, -23, -38, -18, -60, -8);
  ctx.bezierCurveTo(-70, -3, -72, 0, -72, 0);
  ctx.bezierCurveTo(-72, 0, -70, 3, -60, 8);
  ctx.bezierCurveTo(-38, 18, -4, 23, 18, 23);
  ctx.bezierCurveTo(52, 24, 74, 12, 72, 2);
  ctx.closePath();
  ctx.fillStyle = underwater ? (isDark ? "#0a1a3a" : "#0d5a80") : "#111";
  ctx.fill();

  if (!underwater) {
    /* White belly */
    ctx.beginPath();
    ctx.moveTo(62, 2);
    ctx.bezierCurveTo(48, 10, 14, 20, -8, 18);
    ctx.bezierCurveTo(-32, 16, -52, 7, -56, 3);
    ctx.bezierCurveTo(-52, -7, -32, -16, -8, -18);
    ctx.bezierCurveTo(14, -20, 48, -10, 62, -2);
    ctx.closePath();
    ctx.fillStyle = "#f5f5f5";
    ctx.fill();

    /* Re-darken tail end of belly */
    ctx.beginPath();
    ctx.moveTo(-38, 7);
    ctx.bezierCurveTo(-48, 4, -60, 2, -64, 0);
    ctx.bezierCurveTo(-60, -2, -48, -4, -38, -7);
    ctx.bezierCurveTo(-33, -2, -33, 2, -38, 7);
    ctx.fillStyle = "#111";
    ctx.fill();

    /* Grey saddle patch behind dorsal */
    ctx.beginPath();
    ctx.ellipse(-14, -10, 20, 9, -0.1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,150,150,0.5)";
    ctx.fill();

    /* Eye patch */
    ctx.beginPath();
    ctx.ellipse(40, -12, 12, 7.5, -0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#f0f0f0";
    ctx.fill();

    /* Eye */
    ctx.beginPath();
    ctx.arc(41, -13, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = "#080808";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(42, -14, 1.1, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fill();
  }

  /* Dorsal fin */
  ctx.beginPath();
  ctx.moveTo(6, -22);
  ctx.bezierCurveTo(10, -38, 15, -56, 14, -65);
  ctx.bezierCurveTo(20, -52, 27, -34, 30, -22);
  ctx.bezierCurveTo(22, -22, 12, -22, 6, -22);
  ctx.fillStyle = underwater ? (isDark ? "#0a1a3a" : "#0d5a80") : "#111";
  ctx.fill();

  /* Pectoral fin */
  ctx.beginPath();
  ctx.moveTo(20, 16);
  ctx.bezierCurveTo(8, 26, -10, 38, -16, 40);
  ctx.bezierCurveTo(-12, 28, -2, 16, 20, 16);
  ctx.fillStyle = underwater ? (isDark ? "#0a1a3a" : "#0d5a80") : "#111";
  ctx.fill();

  /* Tail flukes */
  ctx.beginPath();
  ctx.moveTo(-68, 0);
  ctx.bezierCurveTo(-74, -9, -90, -20, -98, -26);
  ctx.bezierCurveTo(-92, -14, -80, -4, -72, 0);
  ctx.bezierCurveTo(-80, 4, -92, 14, -98, 26);
  ctx.bezierCurveTo(-90, 20, -74, 9, -68, 0);
  ctx.fillStyle = underwater ? (isDark ? "#0a1a3a" : "#0d5a80") : "#111";
  ctx.fill();

  /* Fluke notch */
  ctx.beginPath();
  ctx.moveTo(-84, -3);
  ctx.bezierCurveTo(-80, 0, -80, 0, -84, 3);
  ctx.bezierCurveTo(-82, 0, -82, 0, -84, -3);
  ctx.fillStyle = isDark ? "#050e2e" : "#1478a8";
  ctx.fill();

  ctx.restore();
}

/* ─── main component ─── */
export default function OceanCanvas({ isDark }: { isDark: boolean }) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const animRef    = useRef<number>(0);
  const isDarkRef  = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  const stateRef = useRef({
    orcas:       [] as Orca[],
    clouds:      [] as Cloud[],
    stars:       [] as Star[],
    wOff:  0, w2Off: 0, w3Off: 0,
    tick:  0,
    W: 0, H: 0,
  });

  const initScene = useCallback((W: number, H: number) => {
    const s = stateRef.current;
    s.W = W; s.H = H;
    const horizonY = H * 0.52;
    s.orcas = [
      mkOrca(W, horizonY, 0, 60),
      mkOrca(W, horizonY, 1, 220),
      mkOrca(W, horizonY, 2, 380),
    ];
    s.clouds = Array.from({ length: 8 }, (_, i) => ({
      x: (W / 8) * i + Math.random() * 80,
      y: 50 + Math.random() * 130,
      w: 110 + Math.random() * 200,
      speed: 0.12 + Math.random() * 0.22,
      opacity: 0.65 + Math.random() * 0.3,
    }));
    s.stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.48,
      r: 0.4 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      initScene(W, H);
    };
    resize();
    window.addEventListener("resize", resize);

    const s = stateRef.current;

    const frame = () => {
      const dark = isDarkRef.current;
      const W = s.W, H = s.H;
      const horizonY = H * 0.52;

      s.tick++;
      s.wOff  += dark ? 0.38 : 0.48;
      s.w2Off += dark ? 0.26 : 0.32;
      s.w3Off += dark ? 0.16 : 0.20;

      /* ── 1. SKY ── */
      const skyG = ctx.createLinearGradient(0, 0, 0, horizonY);
      if (dark) {
        skyG.addColorStop(0, "#010710");
        skyG.addColorStop(0.55, "#040d28");
        skyG.addColorStop(1, "#081838");
      } else {
        skyG.addColorStop(0, "#2196c8");
        skyG.addColorStop(0.55, "#70bfe0");
        skyG.addColorStop(1, "#a8d8f0");
      }
      ctx.fillStyle = skyG;
      ctx.fillRect(0, 0, W, horizonY);

      /* ── 2. STARS ── */
      if (dark) {
        s.stars.forEach((st) => {
          const tw = 0.4 + 0.6 * Math.abs(Math.sin(s.tick * 0.02 + st.phase));
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${tw * 0.9})`;
          ctx.fill();
        });
      }

      /* ── 3. CLOUDS ── */
      if (!dark) {
        s.clouds.forEach((c) => {
          c.x += c.speed;
          if (c.x > W + 300) c.x = -300;
          ctx.save();
          ctx.globalAlpha = c.opacity;
          const puffs: [number, number, number][] = [
            [0, 0, c.w * 0.27], [c.w * 0.2, -c.w * 0.13, c.w * 0.31],
            [c.w * 0.46, -c.w * 0.07, c.w * 0.25], [c.w * 0.7, 0, c.w * 0.22],
            [c.w * 0.92, c.w * 0.04, c.w * 0.18],
          ];
          puffs.forEach(([ox, oy, r]) => {
            const g = ctx.createRadialGradient(c.x + ox, c.y + oy, 0, c.x + ox, c.y + oy, r);
            g.addColorStop(0, "rgba(255,255,255,0.95)");
            g.addColorStop(1, "rgba(220,238,255,0)");
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(c.x + ox, c.y + oy, r, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.restore();
        });
      }

      /* ── 5. OCEAN BASE ── */
      const og = ctx.createLinearGradient(0, horizonY, 0, H);
      if (dark) {
        og.addColorStop(0, "#081530"); og.addColorStop(0.4, "#060e22"); og.addColorStop(1, "#02060f");
      } else {
        og.addColorStop(0, "#1888be"); og.addColorStop(0.35, "#126fa0"); og.addColorStop(1, "#0a4e72");
      }
      ctx.fillStyle = og; ctx.fillRect(0, horizonY, W, H - horizonY);

      /* ── 6. UPDATE ORCA PHYSICS ── */
      s.orcas.forEach((o) => {
        if (o.phase === "submerged") {
          o.waitFrames--;
          if (o.waitFrames <= 0) {
            o.phase = "swimming";
            o.swimDir = (Math.random() > 0.5 ? 1 : -1) as 1 | -1;
            o.swimVx = o.swimDir * (0.85 + Math.random() * 0.55);
            o.x = o.swimDir === 1 ? -160 : W + 160;
            o.y = horizonY + 38; // deep enough that only dorsal fin breaches surface
            o.waitFrames = 200 + Math.floor(Math.random() * 300);
          }
          return;
        }

        if (o.phase === "swimming") {
          o.x += o.swimVx;
          // Random jump trigger — only when within middle 60% of screen
          const inRange = o.x > W * 0.2 && o.x < W * 0.8;
          const jumpChance = 0.0025 + Math.random() * 0.001;
          if (inRange && Math.random() < jumpChance) {
            o.phase = "breaching";
            o.t = 0;
            o.jumpOriginX = o.x;
            o.jumpOriginY = horizonY + 20;
            o.jumpHorizDist = o.swimDir * (W * 0.12 + Math.random() * W * 0.08);
            o.jumpPeak = H * 0.22 + Math.random() * H * 0.1;
            mkSplash(o.splash, o.x, horizonY + 4, o.swimDir);
          }
          if (o.x < -200 || o.x > W + 200) {
            o.phase = "submerged";
            o.waitFrames = 180 + Math.floor(Math.random() * 200);
          }
        }

        if (o.phase === "breaching") {
          o.t += 0.017 + Math.random() * 0.002; // slight variability each frame
          o.x = o.jumpOriginX + o.jumpHorizDist * o.t;
          o.y = o.jumpOriginY - Math.sin(o.t * Math.PI) * o.jumpPeak;
          if (o.t >= 1) {
            o.phase = "submerged";
            o.waitFrames = 120 + Math.floor(Math.random() * 180);
            o.t = 0;
            mkSplash(o.splash, o.x, horizonY + 4, o.swimDir);
          }
        }

        // Tick splash particles
        o.splash = o.splash.filter((p) => p.life > 0);
        o.splash.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.vy += 0.16; p.life -= 0.032;
        });
      });

      /* ── 7. DRAW UNDERWATER ORCAS (before waves) ── */
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, W, H - horizonY);
      ctx.clip();
      s.orcas.forEach((o) => {
        if (o.phase === "submerged") return;
        const uy = o.phase === "swimming" ? o.y : horizonY + 50 + o.size * 18;
        const ualpha = dark ? 0.28 : 0.22;
        // Draw silhouette under water at a fixed swim depth
        drawOrcaShape(ctx, o.x, uy, o.swimDir, o.size * 0.85, 0, ualpha, true, dark);
      });
      ctx.restore();

      /* ── 8. WAVE LAYERS ── */
      const wave = (off: number, amp: number, yBase: number, len: number, color: string) => {
        ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, yBase);
        for (let px = 0; px <= W; px += 3) {
          const wy =
            Math.sin((px / len) * Math.PI * 2 + off * 0.014) * amp +
            Math.sin((px / (len * 0.58)) * Math.PI * 2 + off * 0.021) * amp * 0.38;
          ctx.lineTo(px, yBase + wy);
        }
        ctx.lineTo(W, H); ctx.closePath();
        ctx.fillStyle = color; ctx.fill();
      };

      if (dark) {
        wave(s.w3Off, 16, horizonY+32, 440, "rgba(6,20,65,0.92)");
        wave(s.w2Off, 11, horizonY+18, 320, "rgba(8,26,80,0.88)");
        wave(s.wOff,   7, horizonY+ 8, 220, "rgba(12,34,96,0.82)");
        // Foam line
        ctx.beginPath(); ctx.moveTo(0, horizonY+3);
        for (let px = 0; px <= W; px += 3) {
          ctx.lineTo(px, horizonY+3 + Math.sin((px/195)*Math.PI*2 + s.wOff*0.017)*4);
        }
        ctx.strokeStyle = "rgba(80,140,255,0.12)"; ctx.lineWidth = 2; ctx.stroke();
      } else {
        wave(s.w3Off, 18, horizonY+36, 470, "rgba(8,88,138,0.88)");
        wave(s.w2Off, 13, horizonY+20, 350, "rgba(12,108,162,0.83)");
        wave(s.wOff,   8, horizonY+ 9, 235, "rgba(18,136,196,0.78)");
        // Whitecaps
        for (let i = 0; i < 6; i++) {
          const fx = (W * i) / 6 + Math.sin(s.wOff * 0.011 + i * 1.4) * 38;
          const fy = horizonY + 9 + Math.sin(s.wOff * 0.014 + i * 1.2) * 5;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 22 + Math.sin(s.tick * 0.05 + i) * 7, 3.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.28)"; ctx.fill();
        }
      }

      /* ── 8b. SWIMMING FINS ABOVE WATERLINE ── */
      s.orcas.forEach((o) => {
        if (o.phase !== "swimming") return;

        // Gentle bob — fin rises and dips slightly with a sine wave
        const bob = Math.sin(s.tick * 0.025 + o.size * 10) * 4;
        const finY = o.y + bob;

        // Clip to above water so only the dorsal fin shows
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, horizonY + 5);
        ctx.clip();
        drawOrcaShape(ctx, o.x, finY, o.swimDir, o.size, 0, 1, false, dark);
        ctx.restore();

        // V-wake ripple trailing behind the fin
        const wakeOriginX = o.x - o.swimDir * 12 * o.size;
        const wy = horizonY + 2;
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = dark ? "rgba(100,160,255,0.9)" : "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.2;
        for (let i = 1; i <= 3; i++) {
          const spread = i * 14;
          const back   = i * 18;
          ctx.beginPath();
          ctx.moveTo(wakeOriginX, wy);
          ctx.lineTo(wakeOriginX - o.swimDir * back, wy + spread * 0.35);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(wakeOriginX, wy);
          ctx.lineTo(wakeOriginX - o.swimDir * back, wy - spread * 0.15);
          ctx.stroke();
        }
        ctx.restore();
      });

      /* ── 9. DRAW JUMPING ORCAS (above waves) ── */
      s.orcas.forEach((o) => {
        if (o.phase !== "breaching") return;

        // Angle from velocity tangent of parabola
        // y(t) = origin - sin(t*π)*peak  →  dy/dt = -cos(t*π)*peak*π
        // x(t) = origin + dist*t         →  dx/dt = dist (always same sign as dir)
        const dydt = -Math.cos(o.t * Math.PI) * o.jumpPeak * Math.PI;
        const dxdt = Math.abs(o.jumpHorizDist); // positive magnitude
        const rawAngle = Math.atan2(dydt, dxdt);
        const bodyAngle = rawAngle * o.swimDir; // mirror for left-facing

        // Only draw portion above water line using clip
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, horizonY + 14);
        ctx.clip();
        drawOrcaShape(ctx, o.x, o.y, o.swimDir, o.size, bodyAngle, 1, false, dark);
        ctx.restore();

        // Partial underwater silhouette during low parts of arc
        if (o.y > horizonY - 30) {
          ctx.save();
          ctx.beginPath(); ctx.rect(0, horizonY, W, H - horizonY); ctx.clip();
          const depthAlpha = Math.min(0.35, (o.y - horizonY + 30) / 80);
          drawOrcaShape(ctx, o.x, o.y, o.swimDir, o.size, bodyAngle, depthAlpha, true, dark);
          ctx.restore();
        }
      });

      /* ── 10. SPLASH PARTICLES ── */
      s.orcas.forEach((o) => {
        o.splash.forEach((p) => {
          const r = Math.max(0, p.size * p.life);
          if (r <= 0) return;
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = dark
            ? `rgba(90,160,255,${p.life * 0.65})`
            : `rgba(190,228,255,${p.life * 0.75})`;
          ctx.fill();
        });
      });

      /* ── 11. HORIZON HAZE ── */
      const hg = ctx.createLinearGradient(0, horizonY-18, 0, horizonY+20);
      hg.addColorStop(0, "rgba(0,0,0,0)");
      hg.addColorStop(0.45, dark ? "rgba(10,30,90,0.25)" : "rgba(120,200,235,0.3)");
      hg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hg; ctx.fillRect(0, horizonY-18, W, 38);

      animRef.current = requestAnimationFrame(frame);
    };

    animRef.current = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initScene]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
