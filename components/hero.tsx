"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let current = 0;
    const steps = 60;
    const step = target / steps;
    const interval = duration / steps;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setValue(target); clearInterval(t); }
      else setValue(Math.floor(current));
    }, interval);
    return () => clearInterval(t);
  }, [trigger, target, duration]);
  return value;
}

const STATS = [
  { target: 7,   suffix: "",   label: "Projects Delivered" },
  { target: 40,  suffix: "%",  label: "Avg. Speed Boost"   },
  { target: 100, suffix: "%",  label: "Client Satisfaction" },
];

function StatItem({ stat, trigger }: { stat: typeof STATS[0]; trigger: boolean }) {
  const count = useCountUp(stat.target, 1800, trigger);
  return (
    <motion.div className="text-center group" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <div className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 sm:mb-2 tabular-nums group-hover:scale-110 transition-transform duration-300">
        {count}{stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-white/60 leading-tight tracking-wide">{stat.label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Transparent overlay so ocean canvas shows through */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 pointer-events-none" />

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-white/30 rounded-full mb-6 sm:mb-8 backdrop-blur-sm bg-white/10"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <span className="text-xs sm:text-sm text-white font-medium">Available for Projects</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-16">
            {/* Headline */}
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display font-bold mb-6 sm:mb-8 leading-[1.05] tracking-tight"
              >
                {["Building", "Exceptional", "Digital", "Experiences"].map((word, i) => (
                  <div key={word} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }} animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${
                        i === 1
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-400 drop-shadow-[0_0_30px_rgba(0,240,255,0.6)]"
                          : "text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
                      }`}
                    >
                      {word}
                    </motion.div>
                  </div>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/75 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
              >
                Premium Shopify development and high-performance web applications
                for ambitious brands ready to scale. Based in Calgary, serving globally.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="lg:col-span-4 flex flex-col gap-3 sm:gap-4 lg:pt-4"
            >
              <Link href="/contact" className="w-full">
                <button className="w-full relative px-6 sm:px-8 py-3 sm:py-4 md:py-5 font-bold text-sm md:text-base uppercase tracking-wide overflow-hidden group transition-all duration-300 text-dark-100"
                  style={{ background: "linear-gradient(135deg, #00F0FF, #00C5D1)" }}
                >
                  <span className="relative z-10">Start a Project</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #00C5D1, #006B7D)" }} />
                </button>
              </Link>

              <Link href="/work" className="w-full">
                <button className="w-full px-6 sm:px-8 py-3 sm:py-4 md:py-5 border border-white/30 text-white font-bold text-sm md:text-base uppercase tracking-wide hover:border-cyan-400/60 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  View Work
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 md:pt-12 border-t border-white/20"
          >
            {STATS.map((s) => <StatItem key={s.label} stat={s} trigger={statsInView} />)}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/40 font-medium tracking-widest">SCROLL</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
