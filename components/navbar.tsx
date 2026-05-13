"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();
  const isHome = pathname === "/";
  // "atTop" = we're over the ocean hero — use white text. On any other page, always use solid bg colors.
  const atTop = !isScrolled && isHome;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const logoColor    = atTop ? "#ffffff" : (isDark ? "#00F0FF" : "#006B7D");
  const subColor     = atTop ? "rgba(255,255,255,0.82)" : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)");
  const linkColor    = atTop ? "rgba(255,255,255,0.85)" : (isDark ? "rgba(255,255,255,0.75)" : "rgba(30,30,30,0.85)");
  const linkHover    = atTop ? "#ffffff" : (isDark ? "#ffffff" : "#006B7D");
  const hamburgerBar = atTop ? "rgba(255,255,255,0.9)" : (isDark ? "rgba(255,255,255,0.85)" : "rgba(20,20,20,0.9)");

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          WebkitTransform: "translate3d(0,0,0)",
          transform: "translate3d(0,0,0)",
          // paddingTop pushes nav content below the notch/Dynamic Island
          // backgroundColor covers that padding area — must be inline (not Tailwind) so iOS applies it
          paddingTop: "env(safe-area-inset-top)",
          backgroundColor: atTop
            ? "transparent"
            : isDark ? "rgba(8,14,28,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: atTop ? "none" : "blur(20px) saturate(180%)",
          WebkitBackdropFilter: atTop ? "none" : "blur(20px) saturate(180%)",
          borderBottom: atTop ? "none" : isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
          boxShadow: atTop ? "none" : isDark ? "0 1px 20px rgba(0,0,0,0.5)" : "0 1px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[62px] sm:h-[70px] lg:h-[84px]">

            {/* ── Logo ── */}
            <Link href="/" className="relative z-50 group shrink-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <div className="font-display font-bold tracking-tight leading-none">
                  <span
                    className="block text-[20px] sm:text-xl lg:text-2xl xl:text-[26px] transition-colors duration-400"
                    style={{ color: logoColor, textShadow: !isScrolled ? "0 1px 8px rgba(0,0,0,0.3)" : "none" }}
                  >
                    ORCA
                  </span>
                  <span
                    className="block text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.3em] mt-[3px] font-light uppercase transition-colors duration-400"
                    style={{ color: subColor }}
                  >
                    Enterprises Inc.
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-9 xl:gap-11">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm font-medium transition-colors duration-300 group/link"
                      style={{ color: linkColor }}
                      onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
                      onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span
                        className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover/link:w-full transition-all duration-400 ease-out rounded-full"
                        style={{ background: atTop ? "rgba(255,255,255,0.8)" : (isDark ? "#00F0FF" : "#006B7D") }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Desktop right ── */}
            <div className="hidden lg:flex items-center gap-3 relative z-50 shrink-0">
              <ThemeToggle size="md" />
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="relative px-7 py-3 font-semibold text-sm text-white overflow-hidden group/btn rounded-sm"
                  style={{ background: "linear-gradient(135deg, #006B7D, #00C5D1)" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let&apos;s Talk
                    <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>→</motion.span>
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(135deg, #00C5D1, #006B7D)" }} />
                </motion.button>
              </Link>
            </div>

            {/* ── Mobile right ── */}
            <div className="lg:hidden flex items-center gap-3 relative z-50 shrink-0">
              <ThemeToggle size="sm" />

              {/* Hamburger — no circle */}
              <motion.button
                onClick={() => setMobileMenu(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[22px] h-[1.5px] rounded-full"
                  style={{ background: hamburgerBar }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-[16px] h-[1.5px] rounded-full self-end"
                  style={{ background: hamburgerBar }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[22px] h-[1.5px] rounded-full"
                  style={{ background: hamburgerBar }}
                />
              </motion.button>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 260, mass: 0.75 }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[360px] lg:hidden flex flex-col"
              style={{
                background: isDark
                  ? "linear-gradient(155deg,#080e1c 0%,#0d1830 70%,#060c18 100%)"
                  : "linear-gradient(155deg,#f4f8ff 0%,#eaf2ff 70%,#f0f6ff 100%)",
                borderLeft: isDark ? "1px solid rgba(0,240,255,0.07)" : "1px solid rgba(0,107,125,0.1)",
                paddingTop: "env(safe-area-inset-top)",
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/6 dark:border-white/6">
                <span className="font-display font-bold text-lg text-primary-light dark:text-primary">ORCA</span>
                <motion.button
                  onClick={() => setMobileMenu(false)}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/8"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-white/60" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center px-7 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.38, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenu(false)}
                      className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 last:border-0"
                    >
                      <span className="font-display text-2xl font-bold text-gray-800 dark:text-white/85 group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-200">
                        {link.name}
                      </span>
                      <span className="text-gray-300 dark:text-white/20 group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-200 text-lg">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-6 pb-8 pt-2" style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom))" }}>
                <Link href="/contact" onClick={() => setMobileMenu(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 font-bold text-sm uppercase tracking-widest text-white mb-4 rounded-sm"
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
