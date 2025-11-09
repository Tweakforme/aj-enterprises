"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: Calendar,
    title: "Book a Meeting",
    description: "Schedule a free 30-minute consultation to discuss your project",
    action: "Schedule Now",
    highlight: true,
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+1 (250) 299-5013",
    action: "Call Now",
    href: "tel:+12502995013", // Replace with your actual phone number
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "contact@ajenterprises.com",
    action: "Send Email",
    href: "mailto:adhvait.jadav@gmail.com", // Replace with your actual email
  },
];

const workingHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM MST" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM MST" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const heroRef = useRef(null);
  const methodsRef = useRef(null);
  const calendarRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const methodsInView = useInView(methodsRef, { once: true, margin: "-100px" });
  const calendarInView = useInView(calendarRef, { once: true, margin: "-100px" });

  return (
    <div className="relative bg-dark-100 text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-20">
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
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary/20 bg-primary/5 rounded-full mb-6 sm:mb-8">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wide">Get In Touch</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              <span className="text-white block mb-2">Let's Build</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                Something Amazing
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Ready to start your project? Book a free consultation, give us a call, or send an email.
              We typically respond within 2 hours during business hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section ref={methodsRef} className="relative py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={methodsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group bg-dark-200/50 border ${
                  method.highlight ? 'border-primary/40 bg-primary/5' : 'border-white/10'
                } hover:border-primary/60 p-8 transition-all duration-500 text-center`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-6 border border-white/10 bg-dark-300 group-hover:border-primary/50 transition-all duration-300">
                    <method.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {method.title}
                  </h3>

                  <p className="text-white/60 text-sm mb-6 leading-relaxed">
                    {method.description}
                  </p>

                  {method.href ? (
                    <a
                      href={method.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-primary hover:border-primary hover:text-dark-100 transition-all duration-300"
                    >
                      <span>{method.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <a
                      href="https://calendar.app.google/mBxb3K9zxhFUdfvB7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-dark-100 text-sm font-semibold hover:bg-accent transition-all duration-300"
                    >
                      <span>{method.action}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {method.highlight && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 border border-primary/40 rounded-full">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">
                      Recommended
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE CALENDAR BOOKING SECTION */}
      <section id="calendar" ref={calendarRef} className="relative py-16 sm:py-20 lg:py-24 bg-dark-200/30">
        <div className="pointer-events-none absolute top-0 left-1/4 w-[30rem] sm:w-[40rem] h-[30rem] sm:h-[40rem] bg-primary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={calendarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Schedule Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-emerald-300 to-yellow-300">
                  Free Consultation
                </span>
              </h2>
              
              <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
                Pick a time that works best for you. We'll discuss your project, answer questions,
                and provide a clear roadmap to success.
              </p>
            </div>

            {/* Google Calendar Embed */}
            <div className="relative bg-dark-200 border border-white/10 p-4 sm:p-6 lg:p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: "22px 22px",
                  }}
                />
              </div>

              <div className="relative">
                <a
                  href="https://calendar.app.google/mBxb3K9zxhFUdfvB7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-dark-300 border-2 border-white/10 hover:border-primary/50 rounded-lg overflow-hidden transition-all duration-300 group"
                  style={{ minHeight: '600px' }}
                >
                  <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                    <Calendar className="w-20 h-20 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-display text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      Click to View Available Times
                    </h3>
                    <p className="text-white/60 text-lg mb-8 max-w-md">
                      Opens in a new window where you can select your preferred date and time for a free 30-minute consultation.
                    </p>
                    <div className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-dark-100 font-bold text-sm uppercase tracking-wide group-hover:bg-accent transition-all duration-300">
                      <span>Book Your Meeting Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-200/50 border border-white/10 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-white/10 bg-dark-300 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold">Working Hours</h3>
              </div>

              <div className="space-y-4">
                {workingHours.map((schedule, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0">
                    <span className="text-white/70 text-sm">{schedule.day}</span>
                    <span className="text-white font-semibold text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20">
                <p className="text-xs text-white/70 leading-relaxed">
                  <span className="text-primary font-semibold">After hours?</span> Send us an email
                  and we'll get back to you first thing the next business day.
                </p>
              </div>
            </motion.div>

            {/* Location & Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-dark-200/50 border border-white/10 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 border border-white/10 bg-dark-300 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold">Our Location</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-white/70 text-sm mb-2">Based in</p>
                  <p className="text-white font-semibold text-lg">Calgary, Alberta, Canada</p>
                </div>

                <div>
                  <p className="text-white/70 text-sm mb-2">Serving</p>
                  <p className="text-white font-semibold">Clients Worldwide 🌍</p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-white/70 text-sm mb-4">Quick Contact</p>
                  
                  <div className="space-y-3">
                    <a
                      href="tel:+12502995013"
                      className="flex items-center gap-3 text-white hover:text-primary transition-colors group"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm">+1 (250) 299-5013</span>
                    </a>
                    
                    <a
                      href="mailto:hello@ajenterprises.com"
                      className="flex items-center gap-3 text-white hover:text-primary transition-colors group"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm">contact@ajenterprises.ca</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Not Ready to Book Yet?
            </h2>
            <p className="text-white/60 mb-8">
              Check out our portfolio or learn more about our services and pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/work">
                <button className="magnetic-btn relative px-8 py-4 border-2 border-white/20 text-white font-semibold text-sm uppercase tracking-wide hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                  View Our Work
                </button>
              </Link>
              <Link href="/services">
                <button className="magnetic-btn relative px-8 py-4 border-2 border-white/20 text-white font-semibold text-sm uppercase tracking-wide hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
                  See Pricing
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}