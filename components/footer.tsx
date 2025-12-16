"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-light-200 dark:bg-dark-200 border-t border-ocean-300 dark:border-white/10 transition-colors duration-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="font-display text-3xl font-bold">
                <span className="text-ocean-700 dark:text-white">ORCA</span>
                <span className="text-primary-light dark:text-primary">.</span>
              </div>
            </Link>
            <p className="text-ocean-600 dark:text-white/60 max-w-md mb-6 leading-relaxed">
              Building exceptional digital experiences for ambitious brands. 
              Shopify development and high-performance web applications.
            </p>
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", href: "#", icon: "in" },
                { name: "GitHub", href: "#", icon: "gh" },
                { name: "Twitter", href: "#", icon: "tw" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 border border-ocean-300 dark:border-white/20 flex items-center justify-center hover:border-primary-light dark:hover:border-primary hover:bg-primary-light/10 dark:hover:bg-primary/10 transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <span className="text-xs font-semibold text-ocean-600 dark:text-white/70 group-hover:text-primary-light dark:group-hover:text-primary transition-colors">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-ocean-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/#services" },
                { name: "Work", href: "/work" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-ocean-600 dark:text-white/60 hover:text-primary-light dark:hover:text-primary transition-colors duration-300 text-sm inline-block relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary-light dark:bg-primary group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-ocean-800 dark:text-white">Services</h3>
            <ul className="space-y-3">
              {[
                "Shopify Development",
                "Web Applications",
                "Speed Optimization",
                "CRO & Analytics",
                "Technical Support",
              ].map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary-light dark:bg-primary rounded-full" />
                  <span className="text-ocean-600 dark:text-white/60 text-sm">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ocean-300 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ocean-500 dark:text-white/40 text-sm">
            © {currentYear} Orca Enterprises Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link 
              href="#" 
              className="text-ocean-500 dark:text-white/40 hover:text-primary-light dark:hover:text-primary text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              className="text-ocean-500 dark:text-white/40 hover:text-primary-light dark:hover:text-primary text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary-light dark:via-primary to-transparent" />
    </footer>
  );
}