"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

const SUN_RAYS = Array.from({ length: 8 }, (_, i) => ({
  angle: (i / 8) * Math.PI * 2,
  delay: i * 0.12,
}));

const STARS = [
  { angle: 28,  dist: 24, r: 1.8, delay: 0.0, dur: 2.2 },
  { angle: 100, dist: 21, r: 1.3, delay: 0.4, dur: 1.8 },
  { angle: 175, dist: 26, r: 2.2, delay: 0.8, dur: 2.6 },
  { angle: 248, dist: 22, r: 1.5, delay: 0.2, dur: 2.0 },
  { angle: 318, dist: 25, r: 1.9, delay: 0.6, dur: 2.4 },
];

export default function ThemeToggle({ size = "md" }: { size?: "md" | "sm" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // btn: 44px (sm) | 48px (md)
  const btnPx = size === "sm" ? 44 : 48;
  const iconPx = size === "sm" ? 17 : 19;
  // SVG canvas is larger to fit decorations
  const svgPx = btnPx + 28; // 72 or 76
  const cx = svgPx / 2;
  const cy = svgPx / 2;
  const innerR = btnPx / 2 + 3;  // just outside button edge
  const outerR = innerR + 9;      // ray tip

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: svgPx, height: svgPx }}
    >
      {/* Decoration SVG — sits behind/around the button, overflow visible */}
      <svg
        width={svgPx}
        height={svgPx}
        className="absolute inset-0 pointer-events-none"
        style={{ overflow: "visible" }}
      >
        <AnimatePresence>
          {/* ── SUN RAYS (light mode) ── */}
          {!isDark && SUN_RAYS.map((ray, i) => {
            const x1 = cx + Math.cos(ray.angle) * innerR;
            const y1 = cy + Math.sin(ray.angle) * innerR;
            const x2 = cx + Math.cos(ray.angle) * outerR;
            const y2 = cy + Math.sin(ray.angle) * outerR;
            return (
              <motion.line
                key={`ray-${i}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#ffcc00"
                strokeWidth="2.2"
                strokeLinecap="round"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.6, repeat: Infinity, delay: ray.delay, ease: "easeInOut" },
                  default: { duration: 0.35, delay: ray.delay * 0.5 },
                }}
              />
            );
          })}

          {/* ── STARS (dark mode) ── */}
          {isDark && STARS.map((star, i) => {
            const rad = (star.angle * Math.PI) / 180;
            const sx = cx + Math.cos(rad) * star.dist;
            const sy = cy + Math.sin(rad) * star.dist;
            return (
              <motion.circle
                key={`star-${i}`}
                cx={sx} cy={sy} r={star.r}
                fill="white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.9, 0.3, 0.9, 0], scale: [0, 1, 0.7, 1, 0] }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: star.dur,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </AnimatePresence>
      </svg>

      {/* Glow ring */}
      <AnimatePresence>
        <motion.div
          key={isDark ? "glow-dark" : "glow-light"}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: btnPx + 12,
            height: btnPx + 12,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              boxShadow: isDark
                ? "0 0 18px 4px rgba(120,180,255,0.25)"
                : "0 0 18px 4px rgba(255,200,30,0.35)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Button */}
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.18 }}
        aria-label="Toggle theme"
        className="relative z-10 rounded-full flex items-center justify-center transition-colors duration-500"
        style={{
          width: btnPx,
          height: btnPx,
          background: isDark
            ? "linear-gradient(145deg, #0d1f48, #1c3068)"
            : "linear-gradient(145deg, #ffe550, #ffaa00)",
          border: isDark
            ? "1.5px solid rgba(120,170,255,0.25)"
            : "1.5px solid rgba(255,230,80,0.5)",
          boxShadow: isDark
            ? "inset 0 1px 0 rgba(255,255,255,0.08)"
            : "inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
      >
        <AnimatePresence mode="wait">
          {!isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <Sun size={iconPx} color="#fff" strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <Moon size={iconPx} color="#a8c8ff" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
