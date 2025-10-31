"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Luxe Beauty Co.",
    category: "Shopify E-commerce",
    description: "Complete store redesign with 300% increase in conversion rate",
    image: "/projects/project-1.jpg", // Placeholder
    tags: ["Shopify", "Custom Theme", "CRO"],
    stats: { metric: "CVR", value: "+300%" },
  },
  {
    title: "TechFlow SaaS",
    category: "Web Application",
    description: "Next.js dashboard with real-time analytics and AI features",
    image: "/projects/project-2.jpg", // Placeholder
    tags: ["Next.js", "TypeScript", "API Integration"],
    stats: { metric: "Load Time", value: "0.8s" },
  },
  {
    title: "Urban Threads",
    category: "Shopify Plus",
    description: "High-volume fashion store handling 50K+ monthly visitors",
    image: "/projects/project-3.jpg", // Placeholder
    tags: ["Shopify Plus", "Headless", "Performance"],
    stats: { metric: "Speed", value: "95/100" },
  },
  {
    title: "FitnessPro App",
    category: "Mobile Web App",
    description: "Progressive web app for fitness tracking and coaching",
    image: "/projects/project-4.jpg", // Placeholder
    tags: ["PWA", "React", "Firebase"],
    stats: { metric: "Users", value: "10K+" },
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-dark-300 overflow-hidden">
        {/* Placeholder gradient (replace with actual images) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-dark-100/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button className="px-8 py-3 border-2 border-white text-white font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white hover:text-dark-100">
            View Case Study
          </button>
        </div>

        {/* Stats Badge */}
        <div className="absolute top-6 right-6 bg-dark-100/90 backdrop-blur-sm px-4 py-2 border border-primary/20">
          <div className="text-xs text-white/60 mb-1">{project.stats.metric}</div>
          <div className="font-display text-xl font-bold text-primary">{project.stats.value}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-dark-200 border-x border-b border-white/10 group-hover:border-primary/20 transition-colors duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs text-primary font-medium mb-2 block">
              {project.category}
            </span>
            <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <svg 
            className="w-6 h-6 text-white/40 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span 
              key={i} 
              className="text-xs px-3 py-1 bg-white/5 text-white/60 border border-white/10 group-hover:border-primary/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding relative bg-dark-200/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-full mb-6">
            <span className="text-xs font-medium text-primary">SELECTED WORK</span>
          </div>
          
          <h2 className="font-display text-display-md font-bold mb-6">
            Featured Projects
          </h2>
          
          <p className="text-lg text-white/60 leading-relaxed">
            A showcase of recent projects that drove real business results. 
            From increased conversions to lightning-fast performance.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center pt-12 border-t border-white/10"
        >
          <p className="text-white/60 mb-6">
            Want to see the full case studies and results?
          </p>
          <button className="magnetic-btn px-10 py-4 bg-primary text-dark-100 font-bold hover:bg-accent transition-all duration-300">
            View All Work
          </button>
        </motion.div>
      </div>
    </section>
  );
}