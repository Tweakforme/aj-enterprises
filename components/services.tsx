"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Websites",
    description: "Professional 4-5 page websites perfect for small businesses, portfolios, and local services. Get online fast with a stunning, mobile-friendly site.",
    features: [
      "4-5 Custom Pages",
      "Mobile Responsive Design",
      "Contact Forms & Maps",
      "Basic SEO Setup",
      "Fast Loading Speed",
      "1 Year Free Maintenance"
    ],
    startingPrice: "$500",
    priceRange: "$500 - $1,500",
    highlight: "Most Popular",
  },
  {
    number: "02",
    title: "Commerce Stores",
    description: "Complete online stores on Shopify, WooCommerce, or custom platforms. Product pages, shopping cart, payment processing — everything to start selling.",
    features: [
      "Platform Setup (Shopify/WordPress)",
      "Product Page Design",
      "Payment Integration",
      "Inventory Management",
      "Mobile Shopping Experience",
      "1 Year Free Maintenance"
    ],
    startingPrice: "$800",
    priceRange: "$800 - $2,500",
    highlight: "Best Value",
  },
  {
    number: "03",
    title: "Solutions",
    description: "Custom web applications, multi-page sites, advanced features, and complex integrations. Built for businesses ready to scale.",
    features: [
      "Custom Development",
      "API Integrations",
      "Database Systems",
      "User Dashboards",
      "Advanced Functionality",
      "1 Year Free Maintenance"
    ],
    startingPrice: "$1,200",
    priceRange: "$1,200+",
    highlight: "Enterprise",
  },
];

const platforms = [
  "Shopify",
  "WordPress",
  "Wix",
  "Squarespace",
  "Custom Next.js",
  "WooCommerce",
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
      className="group relative border border-white/10 bg-dark-200/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {service.highlight && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-primary/20 border border-primary/40 rounded-full z-10">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {service.highlight}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 lg:p-10 flex flex-col h-full">
        <div className="font-display text-7xl font-bold text-white/5 mb-6 group-hover:text-primary/10 transition-colors duration-500">
          {service.number}
        </div>

        <h3 className="font-display text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-white/60 text-base leading-relaxed mb-8">
          {service.description}
        </p>

        <ul className="space-y-3 mb-8 flex-grow">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-4 pt-6 border-t border-white/10 mt-auto">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs text-white/50 uppercase tracking-wide">Starting at</span>
            </div>
            <div className="font-display text-4xl font-bold text-primary mb-1">
              {service.startingPrice}
            </div>
            <div className="text-xs text-white/50">
              Full range: {service.priceRange}
            </div>
          </div>

          <button className="w-full group/btn relative px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-primary hover:border-primary hover:text-dark-100 transition-all duration-300 flex items-center justify-center gap-2">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-primary/10 transition-all duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full mb-6">
            <span className="text-xs font-bold text-primary uppercase tracking-wide">Services & Pricing</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Transparent Pricing,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
              Real Value
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            From simple business sites to complex e-commerce stores — professional web development 
            with no hidden fees. Every package includes 1 full year of free maintenance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative bg-dark-200/50 border border-white/10 p-8 sm:p-10 lg:p-12 text-center mb-16 sm:mb-20"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            We Work With All Major Platforms
          </h3>
          <p className="text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you prefer Shopify, WordPress, Wix, Squarespace, or need a fully custom solution — we've got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-dark-300/50 border border-white/10 hover:border-primary/30 transition-all duration-300 text-sm sm:text-base"
              >
                {platform}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Every Package Includes
            </h3>
            <p className="text-white/60 text-sm sm:text-base">
              No surprises. No hidden fees. Just honest, transparent pricing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: "Free 1 Year Maintenance", desc: "Updates, security, and support included" },
              { title: "Mobile-First Design", desc: "Looks perfect on every device" },
              { title: "Performance Optimized", desc: "Lightning-fast load times" },
              { title: "SEO Foundation", desc: "Built to rank on Google" },
              { title: "Secure & Reliable", desc: "SSL certificates and backups" },
              { title: "Easy Updates", desc: "Simple content management" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}
                className="bg-dark-200/50 border border-white/10 p-5 sm:p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-white/60">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-white/60 mb-6 text-sm sm:text-base">
            Need something custom or have questions about pricing?
          </p>
          <button className="magnetic-btn relative px-8 sm:px-10 py-3 sm:py-4 bg-primary text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
            <span className="relative z-10">Let's Talk About Your Project</span>
            <div className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
          
          <p className="text-xs sm:text-sm text-white/40 mt-6">
            Free consultation • No obligation • Fast response
          </p>
        </motion.div>
      </div>
    </section>
  );
}