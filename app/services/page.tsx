"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Code2,
  ShoppingCart,
  Zap,
  Database,
  Globe,
  Palette,
  TrendingUp,
  Lock,
  Smartphone,
  Search,
  ArrowRight,
  Check,
  Sparkles,
  Gauge,
  Cpu,
  BarChart3,
  Workflow,
  Shield,
  Rocket,
  CheckCircle2,
} from "lucide-react";

// Core Service Packages
const coreServices = [
  {
    number: "01",
    tier: "Starter",
    name: "Websites",
    tagline: "Get online. Get noticed.",
    description: "Professional 4-5 page websites perfect for small businesses, portfolios, and local services. Get online fast with a stunning, mobile-friendly site.",
    startingPrice: "$500",
    priceRange: "$500 - $1,500",
    timeline: "5-10 days",
    icon: Globe,
    highlight: "Most Popular",
    features: [
      "4-5 Custom Pages",
      "Mobile Responsive Design",
      "Contact Forms & Maps",
      "Basic SEO Setup",
      "Fast Loading Speed",
      "1 Year Free Maintenance",
      "2 Rounds of Revisions",
      "Analytics Setup",
    ],
    ideal: ["Local Businesses", "Professionals", "Service Providers", "Portfolios"],
  },
  {
    number: "02",
    tier: "Growth",
    name: "Commerce Stores",
    tagline: "Start selling. Start scaling.",
    description: "Complete online stores on Shopify, WooCommerce, or custom platforms. Product pages, shopping cart, payment processing — everything to start selling.",
    startingPrice: "$800",
    priceRange: "$800 - $2,500",
    timeline: "10-20 days",
    icon: ShoppingCart,
    highlight: "Best Value",
    features: [
      "Platform Setup (Shopify/WordPress)",
      "Product Page Design",
      "Payment Integration",
      "Inventory Management",
      "Mobile Shopping Experience",
      "Email Notifications",
      "Shipping Integration",
      "Advanced SEO",
      "1 Year Free Maintenance",
      "3 Rounds of Revisions",
    ],
    ideal: ["Product Sellers", "Dropshippers", "Retailers", "Brand Owners"],
  },
  {
    number: "03",
    tier: "Enterprise",
    name: "Solutions",
    tagline: "Build anything. Scale everything.",
    description: "Custom web applications, multi-page sites, advanced features, and complex integrations. Built for businesses ready to scale.",
    startingPrice: "$1,200",
    priceRange: "$1,200+",
    timeline: "2-6 weeks",
    icon: Cpu,
    highlight: "Enterprise",
    features: [
      "Custom Development",
      "API Integrations",
      "Database Systems",
      "User Dashboards",
      "Advanced Functionality",
      "Multi-User Systems",
      "Real-Time Features",
      "Cloud Infrastructure",
      "1 Year Free Maintenance",
      "Unlimited Dev Revisions",
    ],
    ideal: ["SaaS Companies", "Startups", "Enterprises", "Complex Projects"],
  },
];

// Specialized Services
const specializedServices = [
  {
    name: "Shopify Development",
    description: "Custom themes, app integrations, migration, and optimization for Shopify stores.",
    icon: ShoppingCart,
    capabilities: [
      "Custom Shopify Theme Development",
      "Shopify App Integration",
      "Platform Migration",
      "Shopify Plus Solutions",
      "Performance Optimization",
    ],
    starting: "$800",
  },
  {
    name: "Speed Optimization",
    description: "Make your site blazing fast. Better UX, better SEO, better conversions.",
    icon: Zap,
    capabilities: [
      "Core Web Vitals Optimization",
      "Image & Asset Optimization",
      "Code Splitting & Lazy Loading",
      "CDN Configuration",
      "Caching Strategy",
    ],
    starting: "$400",
  },
  {
    name: "Conversion Rate Optimization",
    description: "Turn more visitors into customers with data-driven design improvements.",
    icon: TrendingUp,
    capabilities: [
      "A/B Testing Implementation",
      "Heatmap & Analytics Setup",
      "Funnel Analysis",
      "Checkout Flow Improvements",
      "Landing Page Optimization",
    ],
    starting: "$600",
  },
  {
    name: "SEO & Technical Audits",
    description: "Comprehensive site analysis and optimization for search engines.",
    icon: Search,
    capabilities: [
      "Technical SEO Audit",
      "Schema Markup Implementation",
      "Site Structure Optimization",
      "Meta Tags & Content",
      "Search Console Setup",
    ],
    starting: "$400",
  },
  {
    name: "API Integrations",
    description: "Connect your site to any service, CRM, or database.",
    icon: Workflow,
    capabilities: [
      "Payment Gateway Integration",
      "CRM & Email Platforms",
      "Social Media APIs",
      "Shipping & Fulfillment",
      "Custom Webhooks",
    ],
    starting: "$500",
  },
  {
    name: "Maintenance & Support",
    description: "Keep your site running smoothly with ongoing technical support.",
    icon: Shield,
    capabilities: [
      "Monthly Security Updates",
      "Performance Monitoring",
      "Bug Fixes & Troubleshooting",
      "Content Updates",
      "Backup & Recovery",
    ],
    starting: "$150/mo",
  },
];

// Platform Expertise
const platforms = [
  { name: "Shopify", experience: "Expert", projects: "25+" },
  { name: "Next.js", experience: "Expert", projects: "20+" },
  { name: "WordPress", experience: "Advanced", projects: "30+" },
  { name: "React", experience: "Expert", projects: "35+" },
  { name: "WooCommerce", experience: "Advanced", projects: "15+" },
  { name: "Wix", experience: "Advanced", projects: "10+" },
  { name: "Squarespace", experience: "Intermediate", projects: "8+" },
  { name: "Webflow", experience: "Intermediate", projects: "5+" },
];

// Add-ons
const addOns = [
  { name: "Blog Setup & CMS", price: "$250" },
  { name: "Member Portal / Login System", price: "$500" },
  { name: "Booking/Scheduling System", price: "$400" },
  { name: "Live Chat Integration", price: "$200" },
  { name: "Email Marketing Setup", price: "$250" },
  { name: "Social Media Integration", price: "$200" },
  { name: "Multi-Language Support", price: "$500" },
  { name: "Advanced Analytics Dashboard", price: "$400" },
  { name: "Custom Email Templates", price: "$250" },
  { name: "SSL & Security Hardening", price: "$200" },
];

// Process Steps
const processSteps = [
  {
    number: "01",
    title: "Discovery Call",
    description: "We dive deep into your business goals, target audience, and technical requirements.",
    duration: "30-60 min",
  },
  {
    number: "02",
    title: "Proposal & Planning",
    description: "Detailed scope, timeline, and pricing. No hidden fees, no surprises.",
    duration: "1-2 days",
  },
  {
    number: "03",
    title: "Design & Development",
    description: "We build your site with regular check-ins and progress updates.",
    duration: "5-30 days",
  },
  {
    number: "04",
    title: "Review & Revisions",
    description: "You review, we refine. We don't stop until it's perfect.",
    duration: "2-5 days",
  },
  {
    number: "05",
    title: "Launch & Support",
    description: "We handle deployment, testing, and provide 1 year of free maintenance.",
    duration: "1-2 days",
  },
];

function ServiceCard({ service, index }: { service: typeof coreServices[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
      className="group relative border border-ocean-300 dark:border-white/10 bg-white dark:bg-dark-200/50 backdrop-blur-sm hover:border-primary-light dark:hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-lg dark:shadow-none"
    >
      {service.highlight && (
        <div className="absolute top-6 right-6 px-3 py-1 bg-primary-light/20 dark:bg-primary/20 border border-primary-light/40 dark:border-primary/40 rounded-full z-10">
          <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
            {service.highlight}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 dark:from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-8 lg:p-10 flex flex-col h-full">
        <div className="font-display text-7xl font-bold text-ocean-200 dark:text-white/5 mb-6 group-hover:text-primary-light/20 dark:group-hover:text-primary/10 transition-colors duration-500">
          {service.number}
        </div>

        <h3 className="font-display text-4xl font-bold mb-4 text-ocean-800 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-300">
          {service.name}
        </h3>

        <p className="text-ocean-600 dark:text-white/60 text-base leading-relaxed mb-8">
          {service.description}
        </p>

        <ul className="space-y-3 mb-8 flex-grow">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-ocean-700 dark:text-white/70">
              <Check className="w-5 h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="space-y-4 pt-6 border-t border-ocean-300 dark:border-white/10 mt-auto">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xs text-ocean-500 dark:text-white/50 uppercase tracking-wide">Starting at</span>
            </div>
            <div className="font-display text-4xl font-bold text-primary-light dark:text-primary mb-1">
              {service.startingPrice}
            </div>
            <div className="text-xs text-ocean-500 dark:text-white/50">
              Full range: {service.priceRange}
            </div>
          </div>

          <Link href="/contact">
            <button className="w-full group/btn relative px-6 py-3 bg-ocean-100 dark:bg-white/5 border border-ocean-300 dark:border-white/10 text-ocean-800 dark:text-white font-semibold text-sm hover:bg-primary-light dark:hover:bg-primary hover:border-primary-light dark:hover:border-primary hover:text-white dark:hover:text-dark-100 transition-all duration-300 flex items-center justify-center gap-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/5 dark:bg-primary/5 blur-3xl rounded-full transform translate-x-16 -translate-y-16 group-hover:bg-primary-light/10 dark:group-hover:bg-primary/10 transition-all duration-500" />
    </motion.div>
  );
}

function SpecializedServiceCard({ service, index }: { service: typeof specializedServices[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative h-full bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-300 dark:border-white/10 p-6 transition-all duration-300 hover:border-primary-light dark:hover:border-primary hover:shadow-lg dark:shadow-none overflow-hidden">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-light/5 dark:bg-primary/5 blur-2xl rounded-full transition-all duration-300 group-hover:scale-150" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-primary-light/10 dark:bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-light dark:text-primary" />
            </div>
            <div className="text-sm font-bold text-ocean-900 dark:text-white">
              {service.starting}
            </div>
          </div>

          <h3 className="font-display text-xl font-bold mb-2 text-ocean-900 dark:text-white">
            {service.name}
          </h3>

          <p className="text-sm text-ocean-600 dark:text-white/60 mb-4">
            {service.description}
          </p>

          <div className="space-y-2">
            {service.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                <span className="text-xs text-ocean-700 dark:text-white/70">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-light-100 dark:bg-dark-100">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light/5 via-transparent to-transparent dark:from-primary/5" />
        <div className="pointer-events-none absolute top-0 left-1/4 w-[50rem] h-[50rem] bg-primary-light/10 dark:bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-[45rem] h-[45rem] bg-accent-light/10 dark:bg-accent/10 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/20 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-primary-light dark:text-primary" />
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
                Services & Solutions
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-ocean-900 dark:text-white">
              We Build{" "}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-ocean-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-accent">
                Everything Digital
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-ocean-600 dark:text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto">
              From simple websites to complex web applications — professional development with 
              transparent pricing, no hidden fees, and <span className="text-ocean-900 dark:text-white font-bold">1 year of free maintenance</span> included.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <button className="magnetic-btn relative px-8 py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-accent-light dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </button>
              </Link>

              <a href="#process">
                <button className="magnetic-btn relative px-8 py-4 border-2 border-ocean-200 dark:border-white/20 text-ocean-900 dark:text-white font-semibold text-sm uppercase tracking-wide hover:border-primary-light/50 dark:hover:border-primary/50 hover:bg-primary-light/10 dark:hover:bg-primary/10 transition-all duration-300 shadow-md dark:shadow-none">
                  See How It Works
                </button>
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-light dark:text-primary" />
                <span className="text-ocean-600 dark:text-white/60">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-light dark:text-primary" />
                <span className="text-ocean-600 dark:text-white/60">No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-light dark:text-primary" />
                <span className="text-ocean-600 dark:text-white/60">1 Year Free Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-dark-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ocean-900 dark:text-white">
              Core Service Packages
            </h2>
            <p className="text-lg text-ocean-600 dark:text-white/60">
              Complete solutions designed for every stage of business growth
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {coreServices.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="relative py-20 lg:py-28 bg-light-100 dark:bg-dark-200">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/3 dark:via-primary/2 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ocean-900 dark:text-white">
              Specialized Services
            </h2>
            <p className="text-lg text-ocean-600 dark:text-white/60">
              Expert solutions for specific needs and technical challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {specializedServices.map((service, index) => (
              <SpecializedServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Expertise */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-dark-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ocean-900 dark:text-white">
              Platform Expertise
            </h2>
            <p className="text-lg text-ocean-600 dark:text-white/60">
              We work with the tools you need, at the level you demand
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-light-100 dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-300 dark:border-white/10 p-6 text-center hover:border-primary-light dark:hover:border-primary transition-all duration-300 hover:shadow-lg dark:shadow-none"
              >
                <div className="text-2xl font-bold text-ocean-900 dark:text-white mb-2">
                  {platform.name}
                </div>
                <div className="text-sm text-primary-light dark:text-primary font-semibold mb-1">
                  {platform.experience}
                </div>
                <div className="text-xs text-ocean-600 dark:text-white/60">
                  {platform.projects} Projects
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="relative py-20 lg:py-28 bg-light-100 dark:bg-dark-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ocean-900 dark:text-white">
              Add-Ons & Extensions
            </h2>
            <p className="text-lg text-ocean-600 dark:text-white/60">
              Enhance any package with additional features and functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="flex items-center justify-between bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-300 dark:border-white/10 px-6 py-4 hover:border-primary-light dark:hover:border-primary transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <span className="text-sm font-medium text-ocean-700 dark:text-white/80">
                  {addon.name}
                </span>
                <span className="text-lg font-bold text-ocean-900 dark:text-white">
                  {addon.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="relative py-20 lg:py-28 bg-white dark:bg-dark-100">
        <div className="pointer-events-none absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-primary-light/5 dark:bg-primary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-ocean-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-lg text-ocean-600 dark:text-white/60">
              Simple, transparent process from first contact to launch day
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-light to-primary-light/20 dark:from-primary dark:to-primary/20" />
                )}

                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-accent-light dark:from-primary dark:to-accent flex items-center justify-center">
                      <span className="text-2xl font-bold text-white dark:text-dark-100">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-300 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display text-xl font-bold text-ocean-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-sm text-ocean-600 dark:text-white/60 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-ocean-600 dark:text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-light via-ocean-400 to-accent-light dark:from-primary dark:via-emerald-400 dark:to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white dark:text-dark-100">
                Ready to Start Building?
              </h2>
              
              <p className="text-xl text-white/90 dark:text-dark-100/90 mb-10 max-w-2xl mx-auto">
                Let's turn your vision into reality. Fast delivery, transparent pricing, and results that matter.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <button className="magnetic-btn relative px-10 py-5 bg-white dark:bg-dark-100 text-primary-light dark:text-primary font-bold text-base uppercase tracking-wide overflow-hidden group transition-all duration-300 shadow-2xl">
                    <span className="relative z-10">Get Your Free Quote</span>
                  </button>
                </Link>

                <Link href="/work">
                  <button className="magnetic-btn relative px-10 py-5 border-2 border-white/30 text-white dark:text-dark-100 font-semibold text-base uppercase tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300">
                    View Our Work
                  </button>
                </Link>
              </div>

              <p className="text-white/80 dark:text-dark-100/80 text-sm mt-8">
                📞 Free 30-minute consultation • ⚡ Response within 24 hours • 🎯 No obligation
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}