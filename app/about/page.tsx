"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Code2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Shield,
  Cpu,
  Globe,
  ArrowRight 
} from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <div ref={containerRef} className="relative bg-dark-100">
      {/* Hero Section - Split Universe */}
      <section className="relative min-h-screen flex items-center section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Photo with Premium Effects */}
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl animate-pulse" 
                     style={{ padding: "2px" }}>
                  <div className="relative w-full h-full bg-dark-200 rounded-2xl overflow-hidden">
                    <Image
                      src="/aj-photo.jpeg"
                      alt="AJ - Founder"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 via-transparent to-transparent" />
                  </div>
                </div>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-6 -right-6 bg-dark-200 border-2 border-primary/30 rounded-xl p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary blur-md animate-pulse" />
                      <Sparkles className="relative w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-display font-bold text-white">Self-Taught</div>
                      <div className="text-xs text-gray-400">Developer</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              style={{ y: contentY }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                  <span className="text-sm font-medium text-primary">About Us</span>
                </div>
                
                <h1 className="font-display text-display-lg font-bold mb-6">
                  <span className="gradient-text">Modern Web.</span>
                  <br />
                  <span className="text-white">Real Results.</span>
                </h1>
                
                <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                  <p>
                    Hey, I'm <span className="text-primary font-semibold">AJ</span> — a self-taught developer 
                    who turned curiosity into a career. What started as building simple websites evolved into 
                    creating next-gen, AI-powered digital experiences.
                  </p>
                  <p>
                    I currently work as a freelance developer helping <span className="text-accent font-semibold">Shopify store owners</span> boost 
                    their revenue and build high-performing websites that actually convert.
                  </p>
                  <p>
                    Our team of <span className="text-white font-semibold">four developers</span> runs this agency 
                    with one mission: create websites that evolve with the world. We're trendy, smart, and 
                    we give 100% to every project.
                  </p>
                </div>
              </motion.div>

              {/* Tech Stack Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {["Shopify", "Next.js", "Node.js", "WordPress", "AI-Powered"].map((tech, i) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: "4", label: "Developers", icon: Code2 },
              { number: "100+", label: "Projects", icon: Zap },
              { number: "$500", label: "Starting From", icon: TrendingUp },
              { number: "1 Year", label: "Free Maintenance", icon: Shield },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-dark-300 border border-gray-700 group-hover:border-primary/50 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="font-display text-display-md font-bold mb-6">
              What Makes Us <span className="gradient-text">Different</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're not just building websites — we're creating digital experiences 
              that drive real business results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "AI-Powered",
                description: "We integrate cutting-edge AI tools because we believe it's the future of web development. Smart automation, better results.",
              },
              {
                icon: Globe,
                title: "Conversion-Focused",
                description: "Every site we build is designed to generate leads and drive sales. SEO-optimized and marketing-ready from day one.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Modern tech stack delivering blazing-fast performance. Your customers won't wait, and neither should your website.",
              },
              {
                icon: TrendingUp,
                title: "Results-Driven",
                description: "We measure success by your revenue growth. Our goal is to boost your online presence and bottom line.",
              },
              {
                icon: Shield,
                title: "Hassle-Free",
                description: "One year of free maintenance included. We've got your back long after launch with regular updates and support.",
              },
              {
                icon: Code2,
                title: "Modern Stack",
                description: "Shopify Hydrogen, Liquid, Next.js, Node.js, WordPress — we use the best tools for the job, every time.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-dark-200 border border-gray-800 rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-xl bg-dark-300 border border-gray-700 group-hover:border-primary/50 group-hover:glow transition-all duration-500">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* CTA Section */}
      <section className="section-padding relative">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-dark-200 to-dark-300 border border-gray-800 rounded-3xl p-12 lg:p-16 overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300F0FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            <div className="relative text-center max-w-3xl mx-auto">
              <h2 className="font-display text-display-md font-bold mb-6">
                Ready to Build Something <span className="gradient-text">Amazing?</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get a fully functional, conversion-optimized website starting at just <span className="text-accent font-bold">$500</span> with 
                one year of <span className="text-primary font-semibold">free maintenance</span> included.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/#contact"
                  className="group relative px-8 py-4 bg-primary text-dark-100 font-semibold rounded-xl hover:bg-primary-dark transition-all duration-300 flex items-center gap-2"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-xl bg-primary blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
                </Link>
                
                <Link
                  href="/#work"
                  className="px-8 py-4 bg-dark-400 text-white font-semibold rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300"
                >
                  View Our Work
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-8">
                Based in Calgary, serving clients globally
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}