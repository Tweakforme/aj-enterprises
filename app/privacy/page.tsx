"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Shield, Mail, Lock, Eye, FileText, AlertCircle } from "lucide-react";

export default function PrivacyPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const sections = [
    {
      icon: Eye,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services, contact us, or request a quote, we may collect personal information including but not limited to: name, email address, phone number, company name, billing address, and payment information.",
        },
        {
          subtitle: "Automatically Collected Information",
          text: "We automatically collect certain information when you visit our website, including IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of visits. This information is collected through cookies, web beacons, and similar technologies.",
        },
        {
          subtitle: "Project Information",
          text: "Information you provide related to your project requirements, business objectives, technical specifications, and any content or materials you share with us during the engagement.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our web development and consulting services, communicate with you about projects, process payments, and deliver contracted work.",
        },
        {
          subtitle: "Business Operations",
          text: "To manage our business operations, including billing, accounting, record-keeping, and quality assurance. We may use your information to send administrative communications about your account or services.",
        },
        {
          subtitle: "Marketing & Communications",
          text: "With your consent, we may send you promotional materials, newsletters, or updates about our services. You can opt-out of marketing communications at any time.",
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with applicable laws, regulations, legal processes, or enforceable governmental requests, and to protect our rights, privacy, safety, or property.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Information Sharing & Disclosure",
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with third-party service providers who assist us in delivering our services, such as payment processors, hosting providers, email services, and analytics tools. These providers are contractually obligated to protect your information and use it only for the purposes we specify.",
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred to the successor entity. We will notify you of any such change and provide you with choices regarding your information.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, comply with legal obligations, or respond to emergencies.",
        },
        {
          subtitle: "With Your Consent",
          text: "We will share your information with third parties when you explicitly consent to such sharing.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, access controls, and regular security audits.",
        },
        {
          subtitle: "Limitation of Liability",
          text: "While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security and are not liable for unauthorized access, hacking, data loss, or other breaches outside our reasonable control.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Project files and communications may be retained for up to 7 years for legal and business purposes.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Your Rights & Choices",
      content: [
        {
          subtitle: "Access & Correction",
          text: "You have the right to access, update, or correct your personal information. You may request a copy of the personal information we hold about you by contacting us.",
        },
        {
          subtitle: "Data Portability",
          text: "You may request that we provide your personal information in a structured, commonly used, and machine-readable format, where technically feasible.",
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your personal information, subject to legal and contractual obligations. Note that we may retain certain information as required by law or for legitimate business purposes.",
        },
        {
          subtitle: "Opt-Out",
          text: "You can opt-out of marketing communications by following the unsubscribe link in our emails or by contacting us directly. You may also disable cookies through your browser settings, though this may affect website functionality.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Cookies & Tracking Technologies",
      content: [
        {
          subtitle: "Cookie Usage",
          text: "We use cookies and similar tracking technologies to enhance your experience, analyze website traffic, and understand user behavior. Cookies are small data files stored on your device.",
        },
        {
          subtitle: "Types of Cookies",
          text: "Essential cookies (necessary for website functionality), analytics cookies (to understand usage patterns), and functional cookies (to remember your preferences). We do not use advertising cookies without your consent.",
        },
        {
          subtitle: "Third-Party Services",
          text: "We may use third-party analytics services (such as Google Analytics) that use cookies to collect information about your use of our website. These services have their own privacy policies.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white dark:bg-dark-100">
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
              <Shield className="w-4 h-4 text-primary-light dark:text-primary" />
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
                Privacy Policy
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-ocean-900 dark:text-white">
              Privacy{" "}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-accent">
                Policy
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-ocean-600 dark:text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how Orca Enterprises Inc., based in Calgary, Alberta, Canada, collects, uses, and protects your information.
            </p>

            <p className="text-sm text-ocean-500 dark:text-white/50">
              <strong>Last Updated:</strong> January 20, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative py-12 sm:py-20 lg:py-28 bg-light-100 dark:bg-dark-200/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-6 sm:p-8 shadow-lg dark:shadow-none"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-light/10 dark:bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-light dark:text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="pl-0 sm:pl-16">
                        <h3 className="font-display text-lg font-bold text-ocean-800 dark:text-white/90 mb-2">
                          {item.subtitle}
                        </h3>
                        <p className="text-ocean-600 dark:text-white/70 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-light to-accent-light dark:from-primary dark:to-accent p-8 sm:p-10"
            >
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-white dark:text-dark-100 flex-shrink-0" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-white dark:text-dark-100 mb-3">
                    Questions About Your Privacy?
                  </h2>
                  <p className="text-white/90 dark:text-dark-100/90 mb-4 leading-relaxed">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-white dark:text-dark-100">
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href="mailto:aj@orcaenterprises.ca" className="underline hover:no-underline">
                        aj@orcaenterprises.ca
                      </a>
                    </p>
                    <p>
                      <strong>Mail:</strong> Orca Enterprises Inc., Calgary, Alberta, Canada
                    </p>
                  </div>
                  <p className="text-sm text-white/80 dark:text-dark-100/80 mt-4">
                    We will respond to your inquiry within 30 days of receipt.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-bold text-ocean-900 dark:text-white mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-ocean-600 dark:text-white/70 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy on this page with a new "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
