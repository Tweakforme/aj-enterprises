"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight, Code2, Zap, Shield, TrendingUp, Users, Award, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Rentals Kamloops",
    url: "rentalskamloops.ca",
    fullUrl: "https://rentalskamloops.ca",
    description: "Property rental platform for Kamloops real estate. Browse, search, and discover available rental properties with advanced filtering.",
    category: "Real Estate Platform",
    tags: ["Next.js", "Property Search", "Responsive Design"],
    image: "/rentals.png",
    results: ["20+ active listings", "50% faster load time", "Mobile-first design"],
  },
  {
    title: "The EV Store",
    url: "theevstore.ca",
    fullUrl: "https://theevstore.ca",
    description: "E-commerce platform for Tesla products and EV accessories. Full shopping cart, payment processing, and inventory management.",
    category: "E-Commerce",
    tags: ["Shopify", "E-Commerce", "Payment Integration"],
    image: "/theevstore.png",
    results: ["Secure checkout", "Real-time inventory", "Multi-currency support"],
  },
  {
    title: "Hodder Construction",
    url: "hodder.ca",
    fullUrl: "https://hodder.ca",
    description: "Professional construction company website showcasing services, projects, and company expertise in the construction industry.",
    category: "Business Website",
    tags: ["WordPress", "SEO", "Mobile-First"],
    image: "/hodder.png",
    results: ["#1 Google ranking locally", "45% increase in leads", "modern design"],
  },
  {
    title: "EV Cars Marketplace",
    url: "cars.theevstore.ca",
    fullUrl: "https://cars.theevstore.ca",
    description: "Car listing platform for electric vehicles. Browse inventory, compare specs, and find your perfect EV with advanced search.",
    category: "Marketplace",
    tags: ["Next.js", "Database", "Search & Filter"],
    image: "/cars.png",
    results: ["Advanced filters", "Real-time updates", "Interactive comparison"],
  },
  {
    title: "Advanced Plumbing",
    url: "advancedplumbingkamloops.ca",
    fullUrl: "https://advancedplumbingkamloops.ca",
    description: "Local plumbing service website with online booking, service areas, and emergency contact features for Kamloops residents.",
    category: "Service Business",
    tags: ["WordPress", "Contact Forms", "Local SEO"],
    image: "/plumbing.png",
    results: ["Online booking", "Emergency hotline", "Service area maps"],
  },
  {
    title: "Hodder Employee Portal",
    url: "employee.hodder.ca",
    fullUrl: "https://employee.hodder.ca",
    description: "Full-stack employee management system with authentication, time tracking, project management, and internal communications.",
    category: "Web Application",
    tags: ["Node.js", "Authentication", "Dashboard"],
    image: "/employee.png",
    results: ["Secure authentication", "Real-time updates", "Role-based access"],
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Custom Development",
    description: "Tailored solutions built from the ground up using modern frameworks and best practices.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with sub-second load times and perfect Lighthouse scores.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security, SSL encryption, and 99.9% uptime guaranteed.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Focused",
    description: "Every design decision is driven by data to maximize your business growth.",
  },
];

const stats = [
  { number: "6+", label: "Projects Delivered", description: "Across multiple industries" },
  { number: "100%", label: "Client Satisfaction", description: "5-star reviews & referrals" },
  { number: "40%", label: "Avg Speed Boost", description: "Performance optimization" },
  { number: "48hr", label: "Quick Turnaround", description: "For standard projects" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

 return (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 60 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
    transition={{
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.33, 1, 0.68, 1],
    }}
    className="group relative bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 hover:border-primary-light/40 dark:hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-lg dark:shadow-none"
  >
    <div className="relative w-full bg-light-200 dark:bg-dark-300 overflow-hidden transition-colors duration-300">
      <div className="relative bg-light-200 dark:bg-dark-300 border-b border-ocean-200 dark:border-white/10 px-4 py-3 flex items-center gap-2 transition-colors duration-300">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <div className="flex-1 mx-4 h-6 bg-light-100 dark:bg-dark-100/50 rounded flex items-center px-3 transition-colors duration-300">
          <span className="text-[10px] text-ocean-500 dark:text-white/40 truncate transition-colors duration-300">
            {project.url}
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-[16/10] bg-light-100 dark:bg-dark-100 overflow-hidden transition-colors duration-300">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent dark:from-dark-100/90 dark:via-dark-100/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <a
          href={project.fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="px-6 py-3 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-accent-light dark:hover:bg-accent transition-colors duration-300">
            <span>Visit Site</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>
      </div>

      <div className="absolute top-16 left-4 px-3 py-1.5 bg-primary-light/90 dark:bg-primary/90 backdrop-blur-sm border border-primary-light dark:border-primary transition-colors duration-300">
        <span className="text-xs font-bold text-white dark:text-dark-100 uppercase tracking-wide transition-colors duration-300">
          {project.category}
        </span>
      </div>
    </div>

    <div className="p-6 sm:p-8 flex-grow flex flex-col">
      <div className="flex-grow">
        <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-ocean-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <a
          href={project.fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs sm:text-sm text-ocean-500 dark:text-white/50 hover:text-primary-light dark:hover:text-primary mb-4 transition-colors"
        >
          {project.url}
          <ArrowUpRight className="w-3 h-3" />
        </a>

        <p className="text-ocean-600 dark:text-white/60 text-sm leading-relaxed mb-6 transition-colors duration-300">
          {project.description}
        </p>

        <div className="space-y-2 mb-6">
          {project.results.map((result, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-primary-light dark:text-primary transition-colors duration-300"
            >
              <div className="w-1 h-1 bg-primary-light dark:bg-primary rounded-full transition-colors duration-300" />
              {result}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-light-200 dark:bg-dark-300/50 border border-ocean-200 dark:border-white/10 text-ocean-700 dark:text-white/70 hover:border-primary-light/30 dark:hover:border-primary/30 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary-light/5 dark:from-primary/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500" />
  </motion.div>
);

}
export default function WorkPage() {
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const statsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="relative bg-white dark:bg-dark-100 text-ocean-900 dark:text-white transition-colors duration-300">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary-light/10 dark:from-primary/5 via-transparent to-transparent opacity-30" />
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
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/30 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6 sm:mb-8 transition-colors duration-300">
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide transition-colors duration-300">Portfolio</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              <span className="text-ocean-900 dark:text-white block mb-2 transition-colors duration-300">Exceptional Work</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
                Built for Growth
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-ocean-600 dark:text-white/60 max-w-3xl mx-auto leading-relaxed mb-10 sm:mb-12 transition-colors duration-300">
              From small business websites to complex web applications — every project is crafted
              with precision, optimized for performance, and designed to drive real business results.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
              <Link href="#projects" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300">
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-accent-light dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </button>
              </Link>

              <Link href="#contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-ocean-200 dark:border-white/20 text-ocean-900 dark:text-white font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:border-primary-light/50 dark:hover:border-primary/50 transition-all duration-300 shadow-md dark:shadow-none">
                  <span className="relative z-10">Start Your Project</span>
                  <div className="absolute inset-0 bg-primary-light/10 dark:bg-primary/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="relative py-12 sm:py-16 lg:py-20 border-y border-ocean-200 dark:border-white/10 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-light dark:text-primary mb-2 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base font-semibold text-ocean-900 dark:text-white mb-1 transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-xs text-ocean-500 dark:text-white/50 transition-colors duration-300">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/2 dark:via-primary/2 to-transparent transition-colors duration-300" />
        <div className="pointer-events-none absolute top-1/4 right-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-primary-light/5 dark:bg-primary/5 blur-3xl transition-colors duration-300" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-ocean-900 dark:text-white transition-colors duration-300">
              Featured{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
                Projects
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-ocean-600 dark:text-white/60 leading-relaxed transition-colors duration-300">
              Real websites for real businesses. Each project showcases our commitment to quality,
              performance, and business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES SECTION */}
      <section ref={capabilitiesRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-light-100 dark:bg-dark-200/30 transition-colors duration-300">
        <div className="pointer-events-none absolute top-0 left-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-accent-light/5 dark:bg-yellow-300/5 blur-3xl transition-colors duration-300" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-ocean-900 dark:text-white transition-colors duration-300">
              Why Choose{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
                Orca Enterprises Inc.
              </span>
            </h2>
            
            <p className="text-base sm:text-lg text-ocean-600 dark:text-white/60 leading-relaxed transition-colors duration-300">
              We combine technical excellence with business acumen to deliver websites
              that don't just look good — they drive real results.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {capabilities.map((capability, i) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={capabilitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 hover:border-primary-light/40 dark:hover:border-primary/40 p-6 sm:p-8 transition-all duration-500 shadow-lg dark:shadow-none"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary-light/5 dark:from-primary/5 via-transparent to-transparent transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mb-4 sm:mb-6 border border-ocean-200 dark:border-white/10 bg-light-200 dark:bg-dark-300 group-hover:border-primary-light/50 dark:group-hover:border-primary/50 transition-all duration-300">
                    <capability.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-light dark:text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-ocean-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-300">
                    {capability.title}
                  </h3>

                  <p className="text-ocean-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                    {capability.description}
                  </p>

                  <div className="mt-3 sm:mt-4 h-[2px] w-0 bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300 group-hover:w-12 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-white to-light-200 dark:from-dark-200 dark:to-dark-300 border border-ocean-200 dark:border-white/10 p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-xl dark:shadow-none transition-all duration-300">
            <div className="absolute inset-0 opacity-[0.06]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,107,125,0.8) 1px, transparent 1px)`,
                  backgroundSize: "22px 22px",
                }}
              />
              <div
                className="absolute inset-0 hidden dark:block"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                  backgroundSize: "22px 22px",
                }}
              />
            </div>

            <div className="relative max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light/10 dark:bg-primary/10 border border-primary-light/30 dark:border-primary/30 rounded-full mb-6 transition-colors duration-300">
                <Award className="w-4 h-4 text-primary-light dark:text-primary transition-colors duration-300" />
                <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide transition-colors duration-300">
                  Let's Build Something Amazing
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-ocean-900 dark:text-white transition-colors duration-300">
                Ready to Start{" "}
                <span className="block sm:inline bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
                  Your Project?
                </span>
              </h2>

              <p className="text-base sm:text-lg text-ocean-600 dark:text-gray-400 mb-8 sm:mb-10 leading-relaxed transition-colors duration-300">
                Professional web development starting at{" "}
                <span className="text-ocean-900 dark:text-white font-bold text-lg sm:text-xl transition-colors duration-300">$500</span> — including
                one full year of maintenance, support, and optimization. No hidden fees.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <Link href="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group transition-all duration-300">
                    <span className="relative z-10">Get Started Today</span>
                    <div className="absolute inset-0 bg-accent-light dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>

                <Link href="/about" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto magnetic-btn relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-ocean-200 dark:border-white/20 text-ocean-900 dark:text-white font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:border-primary-light/50 dark:hover:border-primary/50 transition-all duration-300 shadow-md dark:shadow-none">
                    <span className="relative z-10">Learn More About Us</span>
                    <div className="absolute inset-0 bg-primary-light/10 dark:bg-primary/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </button>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-ocean-500 dark:text-gray-500 mt-8 sm:mt-10 transition-colors duration-300">
                Free consultation • Fast turnaround • 100% satisfaction guaranteed
              </p>
            </div>

            <div className="pointer-events-none absolute top-0 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-primary-light/10 dark:bg-primary/10 blur-3xl transition-colors duration-300" />
            <div className="pointer-events-none absolute bottom-0 right-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-accent-light/10 dark:bg-yellow-300/10 blur-3xl transition-colors duration-300" />
          </div>
        </div>
      </section>
    </div>
  );
}