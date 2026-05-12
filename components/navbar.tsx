"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import ThemeToggle from "@/components/theme-toggle";

const navLinks = [
  { name: "Work",       href: "/work" },
  { name: "Services",   href: "/services" },
  { name: "Blog",       href: "/blog" },
  { name: "Calculator", href: "/calculator" },
  { name: "About",      href: "/about" },
  { name: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setMobileMenu]   = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/88 dark:bg-[#080e1c]/90 backdrop-blur-2xl border-b border-black/8 dark:border-white/8 shadow-sm"
            : "bg-transparent"
        }`}
        style={{
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)",
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px] lg:h-[88px]">

            {/* ── Logo ── */}
            <Link href="/" className="relative z-50 group shrink-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <div className="font-display font-bold tracking-tight leading-none">
                  <span className="block text-[19px] sm:text-xl lg:text-2xl xl:text-3xl">
                    <span className="text-primary-light dark:text-primary relative">
                      ORCA
                      <motion.span
                        className="absolute -inset-1 bg-primary/20 blur-xl -z-10 opacity-0 dark:opacity-100"
                        animate={{ opacity: [0.4, 0.75, 0.4] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                      />
                    </span>
                  </span>
                  <span className="block text-[8px] sm:text-[9px] lg:text-[10px] xl:text-xs tracking-[0.28em] text-gray-400 dark:text-white/35 mt-[3px] font-light uppercase">
                    Enterprises Inc.
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* ── Desktop nav links (centred) ── */}
            <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-9 xl:gap-11">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm font-medium text-gray-600 dark:text-white/55 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group/link"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-light to-accent-light dark:from-primary dark:to-accent group-hover/link:w-full transition-all duration-500 ease-out" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Desktop right: toggle + CTA ── */}
            <div className="hidden lg:flex items-center gap-3 relative z-50 shrink-0">
              <ThemeToggle size="md" />
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="relative px-7 py-3 font-semibold text-sm text-white dark:text-dark-100 overflow-hidden group/btn"
                  style={{ background: "linear-gradient(135deg, #006B7D, #00C5D1)" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let&apos;s Talk
                    <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>→</motion.span>
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(135deg, #FF6B35, #FFE500)" }} />
                </motion.button>
              </Link>
            </div>

            {/* ── Mobile right: toggle + hamburger ── */}
            <div className="lg:hidden flex items-center gap-2 relative z-50 shrink-0">
              <ThemeToggle size="sm" />

              {/* Hamburger — premium lines */}
              <motion.button
                onClick={() => setMobileMenu(!isMobileMenuOpen)}
                whileTap={{ scale: 0.93 }}
                className="w-10 h-10 sm:w-11 sm:h-11 flex flex-col items-center justify-center gap-[5px] rounded-full bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/10"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[18px] h-[1.5px] bg-gray-800 dark:bg-white/80 rounded-full origin-center"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.22 }}
                  className="block w-[14px] h-[1.5px] bg-gray-800 dark:bg-white/80 rounded-full"
                  style={{ alignSelf: "flex-end", marginRight: "2px" }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[18px] h-[1.5px] bg-gray-800 dark:bg-white/80 rounded-full origin-center"
                />
              </motion.button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenu(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 34, stiffness: 280, mass: 0.7 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[380px] lg:hidden flex flex-col"
              style={{
                background: theme === "dark"
                  ? "linear-gradient(160deg, #080e1c 0%, #0d1830 60%, #060c18 100%)"
                  : "linear-gradient(160deg, #f8faff 0%, #edf4ff 60%, #f0f8ff 100%)",
                borderLeft: theme === "dark" ? "1px solid rgba(0,240,255,0.08)" : "1px solid rgba(0,107,125,0.12)",
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/6 dark:border-white/6">
                <div className="font-display font-bold">
                  <span className="block text-lg text-primary-light dark:text-primary">ORCA</span>
                  <span className="block text-[8px] tracking-[0.3em] text-gray-400 dark:text-white/35 mt-0.5 font-light uppercase">
                    Enterprises Inc.
                  </span>
                </div>
                <motion.button
                  onClick={() => setMobileMenu(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 rounded-full bg-black/6 dark:bg-white/8 border border-black/8 dark:border-white/10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-gray-700 dark:text-white/70" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center px-8 py-6">
                <nav className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.42, delay: i * 0.065, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenu(false)}
                        className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0"
                      >
                        <span className="font-display text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white/80 group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-250">
                          {link.name}
                        </span>
                        <motion.span
                          className="text-gray-300 dark:text-white/20 group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-250"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>

              {/* Bottom CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-black/6 dark:border-white/6">
                <Link href="/contact" onClick={() => setMobileMenu(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 font-bold text-sm uppercase tracking-widest text-white dark:text-dark-100 mb-4"
                    style={{ background: "linear-gradient(135deg, #006B7D, #00C5D1)" }}
                  >
                    Start a Project →
                  </motion.button>
                </Link>
                <p className="text-center text-[11px] text-gray-400 dark:text-white/25 tracking-wide">
                  © 2025 Orca Enterprises Inc.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
