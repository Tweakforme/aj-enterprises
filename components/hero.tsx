"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = (duration / steps);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return value;
}

const stats = [
  { target: 7,   suffix: "",   label: "Projects Delivered" },
  { target: 40,  suffix: "%",  label: "Avg. Speed Boost" },
  { target: 100, suffix: "%",  label: "Client Satisfaction" },
];

function StatItem({ stat, trigger }: { stat: typeof stats[0]; trigger: boolean }) {
  const count = useCountUp(stat.target, 1800, trigger);
  return (
    <motion.div className="text-center group" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <div className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-light dark:text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300 tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-ocean-500 dark:text-white/50 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light-100 dark:bg-dark-100 transition-colors duration-300">

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="orb-1 absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary-light/20 dark:bg-primary/15 blur-[120px]" />
        <div className="orb-2 absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-light/15 dark:bg-accent/10 blur-[140px]" />
        <div className="orb-3 absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-teal-400/10 dark:bg-emerald-400/8 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 107, 125, 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 107, 125, 0.15) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
        <div className="absolute inset-0 dark:block hidden" style={{
          backgroundImage: `linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-28 md:py-32">
        <div className="max-w-7xl">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-primary-light/30 dark:border-primary/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm bg-ocean-50/50 dark:bg-primary/5"
          >
            <div className="w-2 h-2 bg-primary-light dark:bg-primary rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-ocean-700 dark:text-white/70 font-medium">
              Available for Projects
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-12 md:mb-16">
            {/* Left side */}
            <div className="lg:col-span-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display font-bold mb-6 sm:mb-8 leading-[1.05] tracking-tight"
              >
                {["Building", "Exceptional", "Digital", "Experiences"].map((word, i) => (
                  <div key={word} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.33, 1, 0.68, 1] }}
                      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${i === 1 ? "gradient-text" : "text-ocean-900 dark:text-white"}`}
                    >
                      {word}
                    </motion.div>
                  </div>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-ocean-600 dark:text-white/60 leading-relaxed"
              >
                Premium Shopify development and high-performance web applications
                for ambitious brands ready to scale. Based in Calgary, serving globally.
              </motion.p>
            </div>

            {/* Right side — Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="lg:col-span-4 flex flex-col gap-3 sm:gap-4 lg:pt-4"
            >
              <Link href="/contact" className="w-full">
                <button className="w-full magnetic-btn relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-sm md:text-base uppercase tracking-wide overflow-hidden group hover:shadow-[0_0_40px_rgba(0,107,125,0.5)] dark:hover:shadow-[0_0_40px_rgba(0,240,255,0.35)] transition-all duration-300">
                  <span className="relative z-10">Start a Project</span>
                  <div className="absolute inset-0 bg-accent-light dark:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </Link>

              <Link href="/work" className="w-full">
                <button className="w-full magnetic-btn px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 border-2 border-ocean-300 dark:border-white/20 text-ocean-800 dark:text-white font-bold text-sm md:text-base uppercase tracking-wide hover:border-primary-light dark:hover:border-primary/50 hover:bg-primary-light/10 dark:hover:bg-primary/5 transition-all duration-300">
                  View Work
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-8 sm:pt-10 md:pt-12 border-t border-ocean-300 dark:border-white/10"
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} trigger={statsInView} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-ocean-400 dark:text-white/40 font-medium tracking-wider">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary-light/50 dark:from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
