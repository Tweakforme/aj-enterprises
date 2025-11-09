"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  TrendingUp,
  Shield,
  Cpu,
  Target,
  Rocket,
  Clock,
  Search,
  DollarSign,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <div ref={containerRef} className="relative bg-dark-100 text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen lg:min-h-[85vh] flex items-center overflow-hidden pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* LEFT — Text Content */}
            <motion.div
              style={{ y: contentY }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Badge */}
              <div className="inline-block px-4 py-2 border-l-2 border-primary bg-dark-200/50">
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                  About
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-white block mb-2">Building high-performance</span>
                <span className="text-white block mb-2">websites that drive</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                  real business growth
                </span>
              </h1>

              {/* Description */}
              <div className="space-y-4 sm:space-y-5 text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl">
                <p className="text-white text-lg sm:text-xl font-medium">
                  Fast delivery. Quality code. Measurable results.
                </p>
                <p>
                  Hey! I am AJ (on the right). We're a team of four developers delivering enterprise-grade
                  web solutions with startup agility. Specializing in Shopify,
                  Next.js, and AI-powered development — we build sites that
                  convert visitors into customers.
                </p>
                <p>
                  Every project includes technical SEO, performance
                  optimization, and conversion-focused design. We don't just
                  code — we architect digital experiences that generate revenue.
                </p>
                <p>
                  <span className="text-white font-semibold">
                    Starting at $500
                  </span>{" "}
                  with one full year of maintenance included. No hidden fees, no
                  surprises.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                {/* Primary Button */}
                <Link href="#contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300">
                    <span className="relative z-10">Start Your Project</span>
                    <div className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>

                {/* Outline Button */}
                <Link href="#work" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 text-white font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <span className="relative z-10">View Our Work</span>
                    <div className="absolute inset-0 bg-primary/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT — Image */}
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 mt-8 lg:mt-0"
            >
              <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px] xl:h-[600px]">
                {/* Glow Effect */}
                <div
                  className="absolute -inset-1"
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(255,255,255,0.08), rgba(0,0,0,0) 60%)",
                  }}
                />
                {/* Image Container */}
                <div className="relative h-full w-full overflow-hidden bg-dark-200 ring-1 ring-white/10">
                  <Image
                    src="/aj-photo.jpeg"
                    alt="AJ — Founder"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/70 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-12 sm:py-16 lg:py-20 border-y border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { k: "48hr", d: "Average turnaround for standard builds" },
              { k: "$500", d: "Start price • 12 months maintenance" },
              { k: "100%", d: "Focus on conversion & performance" },
            ].map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-dark-200 border border-white/10 px-6 sm:px-8 py-8 sm:py-10"
              >
                {/* Corner Sheen */}
                <div className="pointer-events-none absolute -top-1 -right-1 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 blur-3xl rounded-full" />
                
                {/* Stat Number */}
                <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-none mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                  {item.k}
                </div>
                
                {/* Divider */}
                <div className="h-[2px] w-12 bg-gradient-to-r from-primary/60 via-emerald-300/60 to-yellow-300/60 mb-3" />
                
                {/* Description */}
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
        {/* Background Glows */}
        <div className="pointer-events-none absolute -top-20 left-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[35rem] sm:w-[45rem] h-[35rem] sm:h-[45rem] bg-yellow-300/5 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Our Approach to{" "}
              <span className="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                Web Development
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Technical precision meets business growth. We build systems that scale, perform,
              and deliver measurable impact.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: Rocket,
                title: "Rapid Development",
                desc: "Production-ready websites in 48 hours for standard projects. Fast delivery without compromising quality.",
              },
              {
                icon: Target,
                title: "Conversion-Focused Design",
                desc: "Every pixel is crafted to drive action. We merge design psychology with performance data.",
              },
              {
                icon: Search,
                title: "Technical SEO",
                desc: "Schema markup, Core Web Vitals, and optimized site structures for higher organic visibility.",
              },
              {
                icon: Cpu,
                title: "AI-Enhanced Workflows",
                desc: "We integrate AI for automation, predictive insights, and smarter development pipelines.",
              },
              {
                icon: Shield,
                title: "Enterprise Reliability",
                desc: "99.9% uptime, auto backups, and secure infrastructure — enterprise-grade peace of mind.",
              },
              {
                icon: TrendingUp,
                title: "Performance Optimization",
                desc: "Minimal payloads, blazing load speeds, and Lighthouse-perfect scores across all devices.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="relative group bg-gradient-to-br from-dark-200 to-dark-300 border border-white/10 hover:border-primary/40 p-6 sm:p-8 lg:p-10 transition-all duration-500"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-yellow-300/5 blur-xl transition-opacity duration-700" />

                <div className="relative">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 border border-white/10 bg-dark-300 group-hover:border-primary/50 transition-all duration-300">
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Animated Underline */}
                  <div className="mt-3 sm:mt-4 h-[2px] w-0 bg-gradient-to-r from-primary via-emerald-300 to-yellow-300 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-dark-200 to-dark-300 border border-white/10 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                  backgroundSize: "22px 22px",
                }}
              />
            </div>

            <div className="relative max-w-3xl mx-auto">
              {/* Heading */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Ready to{" "}
                <span className="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                  Get Started?
                </span>
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 leading-relaxed">
                Professional web development starting at{" "}
                <span className="text-white font-bold text-lg sm:text-xl">$500</span> — including
                one full year of maintenance, support, and optimization.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                {/* Primary Button */}
                <Link href="#contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300">
                    <span className="relative z-10">Start Your Project</span>
                    <div className="absolute inset-0 bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>

                {/* Outline Button */}
                <Link href="#work" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 text-white font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:border-primary/50 transition-all duration-300">
                    <span className="relative z-10">View Our Work</span>
                    <div className="absolute inset-0 bg-primary/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>
              </div>

              {/* Location Text */}
              <p className="text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10">
                Based in Calgary, Alberta • Serving clients worldwide
              </p>
            </div>

            {/* Gradient Accents */}
            <div className="pointer-events-none absolute top-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-300/10 blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
}