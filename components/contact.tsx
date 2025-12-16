"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-light-100 dark:bg-dark-100 transition-colors duration-300">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-light/5 dark:via-primary/5 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/20 dark:border-primary/20 rounded-full mb-6 bg-ocean-50 dark:bg-primary/5">
              <span className="text-xs font-medium text-primary-light dark:text-primary">GET IN TOUCH</span>
            </div>

            <h2 className="font-display text-display-md font-bold mb-6 text-ocean-900 dark:text-white">
              Let's Build Something Great
            </h2>

            <p className="text-lg text-ocean-600 dark:text-white/60 leading-relaxed mb-12">
              Have a project in mind? Whether it's a complete store build, 
              performance optimization, or ongoing support — let's talk about 
              how we can work together.
            </p>

            {/* Contact Info */}
            <div className="space-y-8 mb-12">
              <div>
                <h3 className="text-sm font-semibold text-ocean-500 dark:text-white/40 mb-2">EMAIL</h3>
                <a 
                  href="mailto:hello@orcaenterprises.com" 
                  className="text-xl font-display font-bold text-ocean-800 dark:text-white hover:text-primary-light dark:hover:text-primary transition-colors duration-300"
                >
                  hello@orcaenterprises.com
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ocean-500 dark:text-white/40 mb-2">LOCATION</h3>
                <p className="text-xl font-display font-bold text-ocean-800 dark:text-white">
                  Calgary, Alberta, Canada
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ocean-500 dark:text-white/40 mb-2">RESPONSE TIME</h3>
                <p className="text-xl font-display font-bold text-ocean-800 dark:text-white">
                  Within 24 hours
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { name: "LinkedIn", href: "#" },
                { name: "GitHub", href: "#" },
                { name: "Twitter", href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-ocean-300 dark:border-white/20 text-ocean-700 dark:text-white/70 hover:border-primary-light dark:hover:border-primary hover:text-primary-light dark:hover:text-primary transition-all duration-300 text-sm font-medium"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 dark:from-primary/10 via-transparent to-accent-light/10 dark:to-accent/10 blur-3xl" />
            
            <form onSubmit={handleSubmit} className="relative bg-white dark:bg-dark-200/50 backdrop-blur-sm border border-ocean-300 dark:border-white/10 p-8 md:p-10 shadow-xl dark:shadow-none">
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-900 dark:text-white placeholder-ocean-400 dark:placeholder-white/30 focus:border-primary-light dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-900 dark:text-white placeholder-ocean-400 dark:placeholder-white/30 focus:border-primary-light dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary/20 transition-all duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-900 dark:text-white placeholder-ocean-400 dark:placeholder-white/30 focus:border-primary-light dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary/20 transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-2">
                    Project Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-900 dark:text-white focus:border-primary-light dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary/20 transition-all duration-300"
                  >
                    <option value="" className="bg-white dark:bg-dark-300">Select budget range</option>
                    <option value="<5k" className="bg-white dark:bg-dark-300">&lt; $5,000</option>
                    <option value="5k-10k" className="bg-white dark:bg-dark-300">$5,000 - $10,000</option>
                    <option value="10k-25k" className="bg-white dark:bg-dark-300">$10,000 - $25,000</option>
                    <option value="25k+" className="bg-white dark:bg-dark-300">$25,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ocean-700 dark:text-white/60 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-4 bg-light-200 dark:bg-dark-300/50 border border-ocean-300 dark:border-white/10 text-ocean-900 dark:text-white placeholder-ocean-400 dark:placeholder-white/30 focus:border-primary-light dark:focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-5 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-base hover:bg-accent-light dark:hover:bg-accent transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_30px_rgba(0,107,125,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-accent-light dark:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>

                <p className="text-xs text-ocean-500 dark:text-white/40 text-center">
                  I typically respond within 24 hours
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}