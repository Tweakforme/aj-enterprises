"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Check,
  Globe,
  ShoppingCart,
  Cpu,
  AlertCircle,
  Calendar,
  DollarSign,
  Clock,
  Info,
} from "lucide-react";

// Project types with base pricing
const projectTypes = [
  {
    id: "starter",
    name: "Starter Website",
    description: "Professional 4-5 page website for small businesses and portfolios",
    basePrice: 500,
    priceRange: "$500 - $1,500",
    icon: Globe,
    baseTimeline: 7, // days
    maintenanceFree: 6,
    type: "static",
    features: [
      "4-5 Custom Pages",
      "Mobile Responsive Design",
      "Contact Forms & Maps",
      "Basic SEO Setup",
      "6 months Free Maintenance",
    ],
  },
  {
    id: "commerce",
    name: "Commerce Store",
    description: "Complete online store with product pages and payment processing",
    basePrice: 800,
    priceRange: "$800 - $2,500",
    icon: ShoppingCart,
    baseTimeline: 15, // days
    maintenanceFree: 3,
    type: "dynamic",
    features: [
      "Platform Setup (Shopify/WordPress)",
      "Product Page Design",
      "Payment Integration",
      "Inventory Management",
      "3 months Free Maintenance",
    ],
  },
  {
    id: "enterprise",
    name: "Custom Solution",
    description: "Custom web applications with advanced features and integrations",
    basePrice: 1200,
    priceRange: "$1,200+",
    icon: Cpu,
    baseTimeline: 30, // days
    maintenanceFree: 3,
    type: "dynamic",
    features: [
      "Custom Development",
      "API Integrations",
      "Database Systems",
      "User Dashboards",
      "3 months Free Maintenance",
    ],
  },
];

// Add-ons organized by project type
const addOnsByType = {
  starter: [
    { id: "blog", name: "Blog Setup & CMS", price: 250, days: 2 },
    { id: "booking", name: "Booking/Scheduling System", price: 400, days: 4 },
    { id: "live-chat", name: "Live Chat Integration", price: 200, days: 1 },
    { id: "email-marketing", name: "Email Marketing Setup", price: 250, days: 2 },
    { id: "social-media", name: "Social Media Integration", price: 200, days: 1 },
    { id: "ssl-security", name: "SSL & Security Hardening", price: 200, days: 1 },
  ],
  commerce: [
    { id: "blog", name: "Blog Setup & CMS", price: 250, days: 2 },
    { id: "email-marketing", name: "Email Marketing Setup", price: 250, days: 2 },
    { id: "multi-language", name: "Multi-Language Support", price: 500, days: 4 },
    { id: "advanced-analytics", name: "Advanced Analytics Dashboard", price: 400, days: 3 },
    { id: "subscription", name: "Subscription Management", price: 600, days: 5 },
    { id: "live-chat", name: "Live Chat Integration", price: 200, days: 1 },
    { id: "abandoned-cart", name: "Abandoned Cart Recovery", price: 300, days: 2 },
    { id: "reviews", name: "Product Reviews System", price: 250, days: 2 },
  ],
  enterprise: [
    { id: "member-portal", name: "Member Portal / Login System", price: 500, days: 5 },
    { id: "api-integration", name: "Third-Party API Integration", price: 600, days: 5 },
    { id: "multi-language", name: "Multi-Language Support", price: 500, days: 4 },
    { id: "analytics", name: "Advanced Analytics Dashboard", price: 400, days: 3 },
    { id: "real-time", name: "Real-Time Data Processing", price: 800, days: 6 },
    { id: "payment-gateway", name: "Custom Payment Gateway", price: 700, days: 5 },
    { id: "admin-dashboard", name: "Advanced Admin Dashboard", price: 600, days: 5 },
    { id: "notification", name: "Push Notifications & Alerts", price: 400, days: 3 },
  ],
};

// Platform information for commerce stores
const platformInfo = {
  shopify: {
    name: "Shopify",
    monthlyPlan: "Starting at $39/month",
    notes: "Transaction fees apply unless using Shopify Payments. App costs may vary.",
  },
  woocommerce: {
    name: "WooCommerce (WordPress)",
    monthlyPlan: "Hosting from $15/month",
    notes: "Requires WordPress hosting. Payment gateway fees apply separately.",
  },
  custom: {
    name: "Custom E-commerce",
    monthlyPlan: "Hosting from $25/month",
    notes: "Full control over features. Stripe/PayPal integration included.",
  },
};

export default function CalculatorPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(5);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  // Calculate costs
  const getProjectType = () => projectTypes.find((p) => p.id === selectedProject);
  const projectType = getProjectType();

  // Get relevant add-ons for selected project type
  const relevantAddOns = selectedProject ? addOnsByType[selectedProject as keyof typeof addOnsByType] : [];

  const calculateBaseCost = () => {
    if (!projectType) return 0;

    let base = projectType.basePrice;

    // Add cost for additional pages (beyond base 5 pages for starter, 10 for others)
    if (selectedProject === "starter" && numberOfPages > 5) {
      base += (numberOfPages - 5) * 100;
    } else if (selectedProject !== "starter" && numberOfPages > 10) {
      base += (numberOfPages - 10) * 150;
    }

    return base;
  };

  const calculateAddOnsCost = () => {
    return selectedAddOns.reduce((total, addonId) => {
      const addon = relevantAddOns.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
  };

  // Calculate timeline based on complexity
  const calculateTimeline = () => {
    if (!projectType) return 0;

    let days = projectType.baseTimeline;

    // Add days for extra pages
    if (selectedProject === "starter" && numberOfPages > 5) {
      days += Math.ceil((numberOfPages - 5) * 0.5); // 0.5 days per extra page
    } else if (selectedProject !== "starter" && numberOfPages > 10) {
      days += Math.ceil((numberOfPages - 10) * 0.7); // 0.7 days per extra page
    }

    // Add days for add-ons
    selectedAddOns.forEach((addonId) => {
      const addon = relevantAddOns.find((a) => a.id === addonId);
      if (addon) days += addon.days;
    });

    return days;
  };

  const totalCost = calculateBaseCost() + calculateAddOnsCost();
  const estimatedTimeline = calculateTimeline();

  // Format timeline display
  const formatTimeline = (days: number) => {
    if (days <= 14) return `${days} days`;
    if (days <= 60) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  };

  // Reset add-ons and platform when project type changes
  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedAddOns([]);
    setSelectedPlatform("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,107,125,0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(0,107,125,0.08) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,240,255,0.08) 1px, transparent 1px),linear-gradient(90deg, rgba(0,240,255,0.08) 1px, transparent 1px)",
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/30 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6">
              <Calculator className="w-4 h-4 text-primary-light dark:text-primary" />
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
                Project Calculator
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-ocean-900 dark:text-white">
              Calculate Your{" "}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-accent">
                Project Cost
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-ocean-600 dark:text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto">
              Get an instant estimate for your project. Transparent pricing with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Single Column, Desktop: Two Columns */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-6 sm:lg:gap-8 space-y-6 sm:space-y-8 lg:space-y-0">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Project Type Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-ocean-900 dark:text-white">
                  1. Choose Your Project Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {projectTypes.map((project) => {
                    const Icon = project.icon;
                    const isSelected = selectedProject === project.id;

                    return (
                      <button
                        key={project.id}
                        onClick={() => handleProjectChange(project.id)}
                        className={`relative p-4 sm:p-6 border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? "border-primary-light dark:border-primary bg-primary-light/10 dark:bg-primary/10 shadow-lg dark:shadow-none"
                            : "border-ocean-200 dark:border-white/10 bg-white dark:bg-dark-200/50 hover:border-primary-light/40 dark:hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 flex items-center justify-center ${
                            isSelected ? "bg-primary-light/20 dark:bg-primary/20" : "bg-ocean-100 dark:bg-white/5"
                          }`}>
                            <Icon className={`w-6 h-6 ${
                              isSelected ? "text-primary-light dark:text-primary" : "text-ocean-600 dark:text-white/60"
                            }`} />
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-primary-light dark:bg-primary rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white dark:text-dark-100" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-display text-base sm:text-lg font-bold mb-2 text-ocean-900 dark:text-white">
                          {project.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="text-lg sm:text-xl font-bold text-primary-light dark:text-primary">
                          {project.priceRange}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Platform Selection (Commerce only) */}
              {selectedProject === "commerce" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-200 dark:border-white/10 p-4 sm:p-6"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-ocean-900 dark:text-white">
                    2. Select E-commerce Platform
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(platformInfo).map(([key, platform]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedPlatform(key)}
                        className={`p-4 border-2 transition-all duration-300 text-left ${
                          selectedPlatform === key
                            ? "border-primary-light dark:border-primary bg-primary-light/10 dark:bg-primary/10"
                            : "border-ocean-200 dark:border-white/10 bg-white dark:bg-dark-200/50 hover:border-primary-light/40 dark:hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-sm text-ocean-900 dark:text-white">{platform.name}</h4>
                          {selectedPlatform === key && (
                            <Check className="w-4 h-4 text-primary-light dark:text-primary" />
                          )}
                        </div>
                        <p className="text-xs text-primary-light dark:text-primary font-semibold mb-1">
                          {platform.monthlyPlan}
                        </p>
                        <p className="text-xs text-ocean-600 dark:text-white/60">
                          {platform.notes}
                        </p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Number of Pages */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: selectedProject === "commerce" ? 0.2 : 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-200 dark:border-white/10 p-4 sm:p-6"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-ocean-900 dark:text-white">
                    {selectedProject === "commerce" ? "3" : "2"}. Number of Pages
                  </h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={selectedProject === "starter" ? 4 : 5}
                      max={selectedProject === "starter" ? 15 : 30}
                      value={numberOfPages}
                      onChange={(e) => setNumberOfPages(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-ocean-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-light dark:accent-primary"
                    />
                    <span className="text-2xl font-bold text-primary-light dark:text-primary min-w-[3rem] text-right">
                      {numberOfPages}
                    </span>
                  </div>
                  <p className="text-sm text-ocean-600 dark:text-white/60 mt-2">
                    {selectedProject === "starter" && numberOfPages > 5 && (
                      <>Additional pages beyond 5: +${(numberOfPages - 5) * 100}</>
                    )}
                    {selectedProject !== "starter" && numberOfPages > 10 && (
                      <>Additional pages beyond 10: +${(numberOfPages - 10) * 150}</>
                    )}
                  </p>
                </motion.div>
              )}

              {/* Add-ons */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: selectedProject === "commerce" ? 0.3 : 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-ocean-900 dark:text-white">
                    {selectedProject === "commerce" ? "4" : "3"}. Select Add-Ons (Optional)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relevantAddOns.map((addon) => {
                      const isSelected = selectedAddOns.includes(addon.id);

                      return (
                        <button
                          key={addon.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedAddOns(selectedAddOns.filter((id) => id !== addon.id));
                            } else {
                              setSelectedAddOns([...selectedAddOns, addon.id]);
                            }
                          }}
                          className={`flex items-center justify-between p-4 border transition-all duration-300 ${
                            isSelected
                              ? "border-primary-light dark:border-primary bg-primary-light/10 dark:bg-primary/10"
                              : "border-ocean-200 dark:border-white/10 bg-white dark:bg-dark-200/50 hover:border-primary-light/40 dark:hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              isSelected
                                ? "border-primary-light dark:border-primary bg-primary-light dark:bg-primary"
                                : "border-ocean-300 dark:border-white/20"
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-white dark:text-dark-100" />}
                            </div>
                            <span className="text-sm font-medium text-ocean-700 dark:text-white/80">
                              {addon.name}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-ocean-900 dark:text-white">
                            ${addon.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Custom Requirements Note */}
              {selectedProject === "enterprise" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-accent-light/10 dark:bg-accent/10 border border-accent-light/30 dark:border-accent/30 p-4 sm:p-6 rounded"
                >
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-accent-light dark:text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-ocean-900 dark:text-white mb-2">Need Something Custom?</h4>
                      <p className="text-sm text-ocean-600 dark:text-white/70 mb-3">
                        For custom enterprise solutions, we recommend describing your specific requirements via email.
                        This allows us to provide the most accurate quote tailored to your needs.
                      </p>
                      <a
                        href="mailto:aj@orcaenterprises.ca?subject=Custom Enterprise Solution Inquiry"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light dark:text-primary hover:underline"
                      >
                        Email us your requirements →
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Cost Summary (Sticky on desktop, Inline on mobile after selections) */}
            <div className="lg:col-span-1 lg:order-last">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="lg:sticky lg:top-24 bg-white dark:bg-dark-200/50 backdrop-blur-sm border-2 border-primary-light/40 dark:border-primary/40 p-4 sm:p-6 shadow-xl dark:shadow-none"
              >
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary-light dark:text-primary" />
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ocean-900 dark:text-white">
                    Your Estimate
                  </h3>
                </div>

                {!selectedProject ? (
                  <div className="text-center py-8 sm:py-12">
                    <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-ocean-400 dark:text-white/40 mx-auto mb-3 sm:mb-4" />
                    <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                      Select a project type to see pricing
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Project Base Cost */}
                    <div className="pb-4 border-b border-ocean-200 dark:border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm text-ocean-600 dark:text-white/60">
                          {projectType?.name}
                        </span>
                        <span className="font-semibold text-ocean-900 dark:text-white">
                          ${projectType?.basePrice.toLocaleString()}
                        </span>
                      </div>
                      {((selectedProject === "starter" && numberOfPages > 5) ||
                        (selectedProject !== "starter" && numberOfPages > 10)) && (
                        <div className="flex items-start justify-between text-sm">
                          <span className="text-ocean-600 dark:text-white/60">
                            Additional pages ({numberOfPages - (selectedProject === "starter" ? 5 : 10)})
                          </span>
                          <span className="font-semibold text-ocean-900 dark:text-white">
                            +${(selectedProject === "starter" ? (numberOfPages - 5) * 100 : (numberOfPages - 10) * 150).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Add-ons */}
                    {selectedAddOns.length > 0 && (
                      <div className="pb-4 border-b border-ocean-200 dark:border-white/10">
                        <div className="text-xs font-semibold text-ocean-500 dark:text-white/50 uppercase tracking-wide mb-2">
                          Add-ons
                        </div>
                        {selectedAddOns.map((addonId) => {
                          const addon = relevantAddOns.find((a) => a.id === addonId);
                          return (
                            <div key={addonId} className="flex items-start justify-between mb-1 text-sm">
                              <span className="text-ocean-600 dark:text-white/60">{addon?.name}</span>
                              <span className="font-semibold text-ocean-900 dark:text-white">
                                +${addon?.price.toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Platform Info (Commerce only) */}
                    {selectedProject === "commerce" && selectedPlatform && (
                      <div className="pb-4 border-b border-ocean-200 dark:border-white/10">
                        <div className="text-xs font-semibold text-ocean-500 dark:text-white/50 uppercase tracking-wide mb-2">
                          Platform Costs
                        </div>
                        <div className="text-xs text-ocean-600 dark:text-white/60 mb-1">
                          <strong>{platformInfo[selectedPlatform as keyof typeof platformInfo].name}:</strong>
                        </div>
                        <div className="text-xs text-ocean-600 dark:text-white/60">
                          {platformInfo[selectedPlatform as keyof typeof platformInfo].monthlyPlan} (separate billing)
                        </div>
                      </div>
                    )}

                    {/* Total and Timeline */}
                    <div className="bg-gradient-to-br from-primary-light to-accent-light dark:from-primary dark:to-accent p-4 sm:p-6 -mx-4 sm:-mx-6 mt-6">
                      <div className="space-y-4">
                        {/* Total Cost */}
                        <div>
                          <div className="text-xs text-white/80 dark:text-dark-100/80 mb-1 font-semibold uppercase tracking-wide">
                            Development Cost
                          </div>
                          <div className="font-display text-3xl sm:text-4xl font-bold text-white dark:text-dark-100">
                            ${totalCost.toLocaleString()}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/20 dark:border-dark-100/20">
                          <Clock className="w-4 h-4 text-white/90 dark:text-dark-100/90" />
                          <div>
                            <div className="text-xs text-white/70 dark:text-dark-100/70">Estimated Timeline</div>
                            <div className="text-lg font-bold text-white dark:text-dark-100">
                              {formatTimeline(estimatedTimeline)}
                            </div>
                          </div>
                        </div>

                        {/* Maintenance Info */}
                        <div className="flex items-center gap-2 pt-3 border-t border-white/20 dark:border-dark-100/20">
                          <Calendar className="w-4 h-4 text-white/90 dark:text-dark-100/90" />
                          <div>
                            <div className="text-xs text-white/70 dark:text-dark-100/70">Free Maintenance</div>
                            <div className="text-sm font-semibold text-white dark:text-dark-100">
                              {projectType?.maintenanceFree} months included
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="pt-4 text-center">
                      <p className="text-xs text-ocean-600 dark:text-white/60 mb-3">
                        Ready to get started? Let's discuss your project.
                      </p>
                      <Link href="/contact">
                        <button className="w-full py-3 bg-ocean-900 dark:bg-white text-white dark:text-dark-100 font-bold text-sm uppercase tracking-wide hover:bg-ocean-800 dark:hover:bg-white/90 transition-all duration-300">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-light-100 dark:bg-dark-200/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-5 sm:p-6 lg:p-8 shadow-lg dark:shadow-none">
              <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-ocean-900 dark:text-white">
                What's Included in Maintenance?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Security Updates</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Monthly security patches and updates
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Performance Monitoring</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Regular performance checks and optimization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Bug Fixes</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Quick resolution of any technical issues
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Content Updates</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Minor content and text changes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Backup & Recovery</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Regular backups and disaster recovery
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base text-ocean-900 dark:text-white">Priority Support</div>
                      <p className="text-xs sm:text-sm text-ocean-600 dark:text-white/60">
                        Fast response times for any issues
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-ocean-200 dark:border-white/10">
                <p className="text-sm text-ocean-600 dark:text-white/60">
                  <strong>Note:</strong> After the free maintenance period, extended maintenance is available at $59/month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
