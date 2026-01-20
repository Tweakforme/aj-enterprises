"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Check,
  ArrowRight,
  Globe,
  ShoppingCart,
  Cpu,
  Sparkles,
  AlertCircle,
  Calendar,
  DollarSign,
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
    timeline: "5-10 days",
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
    timeline: "10-20 days",
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
    timeline: "2-6 weeks",
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

// Add-ons with pricing
const addOns = [
  { id: "blog", name: "Blog Setup & CMS", price: 250 },
  { id: "member-portal", name: "Member Portal / Login System", price: 500 },
  { id: "booking", name: "Booking/Scheduling System", price: 400 },
  { id: "live-chat", name: "Live Chat Integration", price: 200 },
  { id: "email-marketing", name: "Email Marketing Setup", price: 250 },
  { id: "social-media", name: "Social Media Integration", price: 200 },
  { id: "multi-language", name: "Multi-Language Support", price: 500 },
  { id: "analytics", name: "Advanced Analytics Dashboard", price: 400 },
  { id: "email-templates", name: "Custom Email Templates", price: 250 },
  { id: "ssl-security", name: "SSL & Security Hardening", price: 200 },
];

// Additional services
const additionalServices = [
  { id: "speed-optimization", name: "Speed Optimization", price: 400 },
  { id: "seo-audit", name: "SEO & Technical Audit", price: 400 },
  { id: "cro", name: "Conversion Rate Optimization", price: 600 },
];

export default function CalculatorPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(5);
  const [maintenanceMonths, setMaintenanceMonths] = useState<number>(0);

  // Calculate costs
  const getProjectType = () => projectTypes.find((p) => p.id === selectedProject);
  const projectType = getProjectType();

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
      const addon = addOns.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
  };

  const calculateServicesCost = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = additionalServices.find((s) => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateMaintenanceCost = () => {
    if (!projectType || maintenanceMonths === 0) return 0;
    return maintenanceMonths * 59;
  };

  const totalProjectCost = calculateBaseCost() + calculateAddOnsCost() + calculateServicesCost();
  const totalMaintenanceCost = calculateMaintenanceCost();
  const grandTotal = totalProjectCost + totalMaintenanceCost;

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
              Get an instant estimate for your project. Select your project type, add features, and see transparent pricing with no hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-12 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {projectTypes.map((project) => {
                    const Icon = project.icon;
                    const isSelected = selectedProject === project.id;

                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
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

              {/* Number of Pages */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-200 dark:border-white/10 p-4 sm:p-6"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-ocean-900 dark:text-white">
                    Number of Pages
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
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-ocean-900 dark:text-white">
                    2. Select Add-Ons (Optional)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addOns.map((addon) => {
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

              {/* Additional Services */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-ocean-900 dark:text-white">
                    3. Additional Services (Optional)
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {additionalServices.map((service) => {
                      const isSelected = selectedServices.includes(service.id);

                      return (
                        <button
                          key={service.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedServices(selectedServices.filter((id) => id !== service.id));
                            } else {
                              setSelectedServices([...selectedServices, service.id]);
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
                              {service.name}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-ocean-900 dark:text-white">
                            ${service.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Maintenance Extension */}
              {selectedProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-200 dark:border-white/10 p-4 sm:p-6"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-ocean-900 dark:text-white">
                    4. Extended Maintenance (Optional)
                  </h3>
                  <div className="bg-primary-light/10 dark:bg-primary/10 border border-primary-light/30 dark:border-primary/30 p-4 rounded mb-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-ocean-700 dark:text-white/80">
                        <strong>Included Free:</strong> {projectType?.maintenanceFree} months of maintenance
                        ({projectType?.type === "static" ? "Static Site" : "Dynamic Site"})
                      </div>
                    </div>
                  </div>
                  <label className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-3">
                    Additional Maintenance Months (after free period)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={0}
                      max={12}
                      value={maintenanceMonths}
                      onChange={(e) => setMaintenanceMonths(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-ocean-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-light dark:accent-primary"
                    />
                    <span className="text-2xl font-bold text-primary-light dark:text-primary min-w-[3rem] text-right">
                      {maintenanceMonths}
                    </span>
                  </div>
                  <p className="text-sm text-ocean-600 dark:text-white/60 mt-2">
                    $59/month after the free {projectType?.maintenanceFree}-month period
                    {maintenanceMonths > 0 && ` = $${maintenanceMonths * 59}`}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Right Column - Cost Summary (Sticky on desktop, normal on mobile) */}
            <div className="lg:col-span-1 order-first lg:order-last">
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
                    Cost Estimate
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
                          const addon = addOns.find((a) => a.id === addonId);
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

                    {/* Additional Services */}
                    {selectedServices.length > 0 && (
                      <div className="pb-4 border-b border-ocean-200 dark:border-white/10">
                        <div className="text-xs font-semibold text-ocean-500 dark:text-white/50 uppercase tracking-wide mb-2">
                          Additional Services
                        </div>
                        {selectedServices.map((serviceId) => {
                          const service = additionalServices.find((s) => s.id === serviceId);
                          return (
                            <div key={serviceId} className="flex items-start justify-between mb-1 text-sm">
                              <span className="text-ocean-600 dark:text-white/60">{service?.name}</span>
                              <span className="font-semibold text-ocean-900 dark:text-white">
                                +${service?.price.toLocaleString()}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Project Subtotal */}
                    <div className="pb-4 border-b-2 border-ocean-300 dark:border-white/20">
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-ocean-700 dark:text-white/80">
                          Project Total
                        </span>
                        <span className="text-xl font-bold text-ocean-900 dark:text-white">
                          ${totalProjectCost.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Maintenance */}
                    <div className="pb-4 border-b-2 border-ocean-300 dark:border-white/20">
                      <div className="flex items-start gap-2 mb-3 bg-primary-light/10 dark:bg-primary/10 p-3 rounded">
                        <Calendar className="w-4 h-4 text-primary-light dark:text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-ocean-700 dark:text-white/80">
                          <strong>{projectType?.maintenanceFree} months FREE</strong> maintenance included
                        </div>
                      </div>
                      {maintenanceMonths > 0 && (
                        <div className="flex items-start justify-between text-sm">
                          <span className="text-ocean-600 dark:text-white/60">
                            Extended Maintenance ({maintenanceMonths} months @ $59/mo)
                          </span>
                          <span className="font-semibold text-ocean-900 dark:text-white">
                            +${totalMaintenanceCost.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Grand Total */}
                    <div className="bg-gradient-to-br from-primary-light to-accent-light dark:from-primary dark:to-accent p-4 sm:p-6 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 mt-6">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-0">
                        <span className="font-display text-base sm:text-lg font-bold text-white dark:text-dark-100">
                          Total Investment
                        </span>
                        <div className="text-left sm:text-right">
                          <div className="font-display text-3xl sm:text-4xl font-bold text-white dark:text-dark-100">
                            ${grandTotal.toLocaleString()}
                          </div>
                          {projectType && (
                            <div className="text-xs text-white/80 dark:text-dark-100/80 mt-1">
                              Timeline: {projectType.timeline}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4 sm:pt-6">
                      <Link href="/contact">
                        <button className="w-full py-3 sm:py-4 bg-ocean-900 dark:bg-white text-white dark:text-dark-100 font-bold text-xs sm:text-sm uppercase tracking-wide hover:bg-ocean-800 dark:hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 group">
                          <span>Get Started</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                      <p className="text-[10px] sm:text-xs text-ocean-500 dark:text-white/50 text-center mt-2 sm:mt-3">
                        Free consultation • No obligation
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
