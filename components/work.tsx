"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Rentals Kamloops",
    url: "rentalskamloops.ca",
    fullUrl: "https://rentalskamloops.ca",
    description:
      "Property rental platform for Kamloops real estate. Browse, search, and discover available rental properties with advanced filtering.",
    category: "Real Estate Platform",
    tags: ["Next.js", "Property Search", "Responsive Design"],
    image: "/rentals.png",
  },
  {
    title: "The EV Store",
    url: "theevstore.ca",
    fullUrl: "https://theevstore.ca",
    description:
      "E-commerce platform for Tesla products and EV accessories. Full shopping cart, payment processing, and inventory management.",
    category: "E-Commerce",
    tags: ["Shopify", "E-Commerce", "Payment Integration"],
    image: "/theevstore.png",
  },
  {
    title: "Hodder Construction",
    url: "hodder.ca",
    fullUrl: "https://hodder.ca",
    description:
      "Professional construction company website showcasing services, projects, and company expertise in the construction industry.",
    category: "Business Website",
    tags: ["WordPress", "SEO", "Mobile-First"],
    image: "/hodder.png",
  },
  {
    title: "EV Cars Marketplace",
    url: "cars.theevstore.ca",
    fullUrl: "https://cars.theevstore.ca",
    description:
      "Car listing platform for electric vehicles. Browse inventory, compare specs, and find your perfect EV with advanced search.",
    category: "Marketplace",
    tags: ["Next.js", "Database", "Search & Filter"],
    image: "/cars.png",
  },
  {
    title: "Advanced Plumbing",
    url: "advancedplumbingkamloops.ca",
    fullUrl: "https://advancedplumbingkamloops.ca",
    description:
      "Local plumbing service website with online booking, service areas, and emergency contact features for Kamloops residents.",
    category: "Service Business",
    tags: ["WordPress", "Contact Forms", "Local SEO"],
    image: "/plumbing.png",
  },
  {
    title: "Hodder Employee Portal",
    url: "employee.hodder.ca",
    fullUrl: "https://employee.hodder.ca",
    description:
      "Full-stack employee management system with authentication, time tracking, project management, and internal communications.",
    category: "Web Application",
    tags: ["Node.js", "Authentication", "Dashboard"],
    image: "/employee.png",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      className="group relative bg-white dark:bg-dark-200/50 border border-ocean-300 dark:border-white/10 hover:border-primary-light dark:hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full shadow-lg dark:shadow-none"
    >
      {/* Image Container with Browser Frame */}
      <div className="relative w-full bg-light-300 dark:bg-dark-300 overflow-hidden">
        {/* Browser Top Bar */}
        <div className="relative bg-light-300 dark:bg-dark-300 border-b border-ocean-300 dark:border-white/10 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4 h-6 bg-light-200 dark:bg-dark-100/50 rounded flex items-center px-3">
            <span className="text-[10px] text-ocean-500 dark:text-white/40 truncate">
              {project.url}
            </span>
          </div>
        </div>

        {/* Screenshot Container */}
        <div className="relative w-full aspect-[16/10] bg-light-200 dark:bg-dark-100 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 dark:from-dark-100/90 dark:via-dark-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Visit Site Button */}
          <Link
            href={project.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="px-6 py-3 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-sm uppercase tracking-wide flex items-center gap-2 hover:bg-accent-light dark:hover:bg-accent transition-colors duration-300 shadow-lg">
              <span>Visit Site</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Category Badge */}
        <div className="absolute top-16 left-4 px-3 py-1.5 bg-primary-light/95 dark:bg-primary/90 backdrop-blur-sm border border-primary-light dark:border-primary">
          <span className="text-xs font-bold text-white dark:text-dark-100 uppercase tracking-wide">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-2 text-ocean-900 dark:text-white group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <Link
            href={project.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-ocean-500 dark:text-white/50 hover:text-primary-light dark:hover:text-primary mb-4 transition-colors"
          >
            {project.url}
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <p className="text-ocean-600 dark:text-white/60 text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-700 dark:text-white/70 hover:border-primary-light dark:hover:border-primary/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary-light/5 dark:from-primary/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className="relative py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden bg-light-100 dark:bg-dark-100 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/3 dark:via-primary/2 to-transparent" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-primary-light/5 dark:bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/20 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6">
            <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
              Our Work
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-ocean-900 dark:text-white">
            Projects We&apos;ve{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-ocean-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-yellow-300">
              Brought to Life
            </span>
          </h2>

          <p className="text-base sm:text-lg text-ocean-600 dark:text-white/60 leading-relaxed">
            Real websites for real businesses. From e-commerce platforms to custom
            web applications, see how we turn ideas into high-performance digital
            solutions.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-ocean-600 dark:text-white/60 mb-6 text-sm sm:text-base">
            Ready to see your project come to life?
          </p>
          <button className="magnetic-btn relative px-8 sm:px-10 py-3 sm:py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold text-sm uppercase tracking-wide overflow-hidden group hover:shadow-[0_0_30px_rgba(0,107,125,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-accent-light dark:bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
