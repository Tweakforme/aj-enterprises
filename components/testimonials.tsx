"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rentals Kamloops",
    role: "Real Estate Platform",
    url: "rentalskamloops.ca",
    review:
      "ORCA built our property rental platform from scratch. Fast, clean, and exactly what we needed. The site has been running flawlessly since launch.",
    rating: 5,
    initial: "RK",
  },
  {
    name: "Chilly Moose",
    role: "Shopify Store",
    url: "chillymoose.ca",
    review:
      "Our Shopify store has never looked or performed better. ORCA understood our brand and delivered a high-converting store that perfectly reflects who we are.",
    rating: 5,
    initial: "CM",
  },
  {
    name: "Furtraits",
    role: "Shopify Store",
    url: "furtraits.com",
    review:
      "ORCA transformed our Shopify store into a conversion machine. Sales went up immediately after launch. Incredibly professional and responsive team.",
    rating: 5,
    initial: "FT",
  },
  {
    name: "Hodder Construction",
    role: "Business Website",
    url: "hodder.ca",
    review:
      "Professional, fast, and responsive. Our new website has brought in significantly more leads than before. Highly recommend ORCA for any business.",
    rating: 5,
    initial: "HC",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent-light dark:fill-accent text-accent-light dark:text-accent" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden bg-white/75 dark:bg-black/65 backdrop-blur-md transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/3 dark:via-primary/2 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-accent-light/5 dark:bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/20 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6">
            <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
              Client Reviews
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-ocean-900 dark:text-white">
            What Our{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-ocean-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
              Clients Say
            </span>
          </h2>

          <p className="text-base sm:text-lg text-ocean-600 dark:text-white/60 leading-relaxed">
            Real feedback from real businesses we've worked with across Canada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.33, 1, 0.68, 1] }}
              className="relative bg-white dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 hover:border-primary-light/40 dark:hover:border-primary/30 p-7 sm:p-8 transition-all duration-500 group shadow-lg dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 dark:from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <Stars count={t.rating} />

                <p className="mt-4 mb-6 text-ocean-700 dark:text-white/70 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{t.review}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-ocean-200 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary-light/20 dark:bg-primary/20 border border-primary-light/30 dark:border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-light dark:text-primary">{t.initial}</span>
                  </div>
                  <div>
                    <div className="font-display font-bold text-ocean-900 dark:text-white text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-ocean-500 dark:text-white/40">{t.role} · {t.url}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate rating display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 shadow-sm dark:shadow-none">
            <Stars count={5} />
            <span className="text-sm font-semibold text-ocean-800 dark:text-white">5.0</span>
            <span className="text-sm text-ocean-500 dark:text-white/50">· 7 projects · 100% satisfaction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
