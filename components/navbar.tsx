"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/90 dark:bg-dark-100/90 backdrop-blur-2xl border-b border-gray-200 dark:border-primary/10 shadow-lg dark:shadow-2xl dark:shadow-primary/5" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 md:h-24 lg:h-28">
            {/* Logo */}
            <Link href="/" className="relative z-50 group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="font-display font-bold tracking-tight leading-none">
                  <span className="block text-xl md:text-2xl lg:text-3xl">
                    <span className="text-primary-light dark:text-primary relative">
                      ORCA
                      <motion.span
                        className="absolute -inset-1 bg-primary/20 blur-xl -z-10 opacity-0 dark:opacity-100"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </span>
                  </span>
                  <span className="block text-[10px] md:text-xs lg:text-sm tracking-[0.3em] text-gray-400 dark:text-white/40 mt-0.5 md:mt-1 font-light uppercase">
                    Enterprises Inc.
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-10 xl:gap-12">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <Link
                      href={link.href}
                      className="relative text-sm font-medium text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 group/link"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-light to-accent-light dark:from-primary dark:to-accent group-hover/link:w-full transition-all duration-500 ease-out" />
                      <span className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Theme Toggle + CTA */}
            <div className="hidden lg:flex items-center gap-4 relative z-50">
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-full bg-gray-200 dark:bg-dark-300 border border-gray-300 dark:border-primary/20 flex items-center justify-center group overflow-hidden"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-5 h-5 text-accent-light dark:text-accent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-5 h-5 text-primary-light dark:text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link href="/contact">
                  <button className="relative px-8 py-3.5 bg-gradient-to-r from-primary-light to-primary-light dark:from-primary dark:to-primary/90 text-white dark:text-dark-100 font-semibold text-sm overflow-hidden group/btn transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,153,168,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,242,254,0.3)]">
                    <span className="relative z-10 flex items-center gap-2">
                      Let's Talk
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-light dark:from-accent dark:to-accent/90 transform translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile: Theme Toggle + Menu Button */}
            <div className="lg:hidden flex items-center gap-3 relative z-50">
              {/* Mobile Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-300 border border-gray-300 dark:border-primary/20 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-4 h-4 text-accent-light dark:text-accent" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-4 h-4 text-primary-light dark:text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="w-7 h-[2px] bg-gradient-to-r from-primary-light to-gray-900 dark:from-primary dark:to-white transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                  className="w-7 h-[2px] bg-gradient-to-r from-primary-light to-gray-900 dark:from-primary dark:to-white transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="w-7 h-[2px] bg-gradient-to-r from-primary-light to-gray-900 dark:from-primary dark:to-white transition-all"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-white/95 dark:bg-dark-100/95 backdrop-blur-2xl lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 40, 
                stiffness: 300,
                mass: 0.8
              }}
              className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-dark-100 dark:via-dark-100 dark:to-dark-200 lg:hidden border-l border-gray-200 dark:border-primary/10 shadow-2xl dark:shadow-primary/20"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-bold">
                      <span className="block text-xl text-primary-light dark:text-primary">ORCA</span>
                      <span className="block text-[9px] tracking-[0.3em] text-gray-400 dark:text-white/40 mt-0.5 font-light uppercase">
                        Enterprises Inc.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex-1 flex flex-col justify-center px-8 py-12">
                  <div className="space-y-8">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-3xl sm:text-4xl font-display font-bold text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:translate-x-2 group"
                        >
                          <span className="relative inline-block">
                            {link.name}
                            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-primary-light to-accent-light dark:from-primary dark:to-accent group-hover:w-full transition-all duration-500" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-12 pt-12 border-t border-gray-200 dark:border-white/5"
                  >
                    <Link 
                      href="/contact" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block"
                    >
                      <button className="w-full px-8 py-4 bg-gradient-to-r from-primary-light to-primary-light dark:from-primary dark:to-primary/90 text-white dark:text-dark-100 font-semibold text-base hover:shadow-[0_0_30px_rgba(0,153,168,0.5)] dark:hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] transition-all duration-300">
                        <span className="flex items-center justify-center gap-2">
                          Start a Project
                          <span>→</span>
                        </span>
                      </button>
                    </Link>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-white/5">
                  <p className="text-xs text-gray-400 dark:text-white/30 text-center">
                    © 2024 Orca Enterprises Inc.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}