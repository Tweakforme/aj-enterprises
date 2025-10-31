"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    number: "01",
    title: "Shopify Development",
    description: "Custom theme development, store setup, and optimization. From concept to conversion-focused implementation.",
    features: ["Custom Theme Build", "Speed Optimization", "Third-party Integrations", "Mobile-First Design"],
    price: "$2,500 - $8,000",
  },
  {
    number: "02",
    title: "Web Applications",
    description: "High-performance web apps built with Next.js. Scalable, fast, and designed for growth.",
    features: ["Next.js Development", "API Integration", "Database Design", "Cloud Deployment"],
    price: "$4,000 - $15,000",
  },
  {
    number: "03",
    title: "Automation & Optimization",
    description: "Streamline operations and boost performance. Workflow automation, CRO, and technical audits.",
    features: ["Workflow Automation", "Conversion Rate Optimization", "Technical SEO", "Performance Audits"],
    price: "$1,000 - $5,000",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.33, 1, 0.68, 1] }}
      className="group relative border border-white/10 bg-dark-200/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 md:p-10">
        {/* Number */}
        <div className="font-display text-6xl md:text-7xl font-bold text-white/5 mb-6 group-hover:text-primary/10 transition-colors duration-500">
          {service.number}
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-base leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-white/70">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <span className="font-display text-xl font-bold text-primary">
            {service.price}
          </span>
          <button className="text-sm font-semibold text-white/70 hover:text-white group-hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
            Learn More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-primary/10 transition-all duration-500" />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/2 to-transparent" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full mb-6">
            <span className="text-xs font-medium text-primary">SERVICES</span>
          </div>
          
          <h2 className="font-display text-display-md font-bold mb-6">
            What I Do
          </h2>
          
          <p className="text-lg text-white/60 leading-relaxed">
            Specialized services designed to transform your digital presence 
            and drive measurable results. From stunning storefronts to high-performance 
            applications.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-6">
            Need something custom? Let's build it together.
          </p>
          <button className="magnetic-btn px-10 py-4 border-2 border-primary/30 text-white font-semibold hover:bg-primary hover:text-dark-100 hover:border-primary transition-all duration-300">
            Discuss Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}