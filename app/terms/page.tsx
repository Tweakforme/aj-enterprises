"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  FileText,
  DollarSign,
  AlertTriangle,
  Shield,
  Scale,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";

export default function TermsPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const sections = [
    {
      icon: FileText,
      title: "1. Agreement to Terms",
      content: [
        {
          text: "By accessing our website, requesting a quote, or engaging our services, you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you may not use our services. These Terms constitute a legally binding agreement between you ('Client') and Orca Enterprises Inc. ('Company', 'we', 'us', or 'our').",
        },
        {
          text: "We reserve the right to modify these Terms at any time. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms. We will make reasonable efforts to notify you of material changes.",
        },
      ],
    },
    {
      icon: FileText,
      title: "2. Services & Scope of Work",
      content: [
        {
          subtitle: "Service Description",
          text: "We provide web development, e-commerce development, technical consulting, and related digital services as described in individual project proposals and statements of work ('SOW'). All services are provided on a project-by-project or contract basis.",
        },
        {
          subtitle: "Independent Contractor Relationship",
          text: "The Company is an independent contractor and not an employee, partner, or agent of the Client. Nothing in these Terms creates an employment relationship, partnership, joint venture, or agency relationship. The Company retains the right to control the manner and means by which services are performed.",
        },
        {
          subtitle: "Scope Changes",
          text: "Any changes to the agreed scope of work must be documented in writing and agreed upon by both parties. Additional work beyond the original scope will be billed separately at our standard rates or as otherwise agreed in writing.",
        },
      ],
    },
    {
      icon: DollarSign,
      title: "3. Payment Terms & Fees",
      content: [
        {
          subtitle: "Pricing & Invoicing",
          text: "All fees are as specified in the project proposal or SOW. Unless otherwise stated, prices are in Canadian Dollars (CAD). We reserve the right to change our pricing for future projects but will honor quoted prices for active engagements. GST/HST will be applied as required by Canadian tax law.",
        },
        {
          subtitle: "Payment Schedule",
          text: "Payment terms are specified in each project agreement. Typical terms include: (a) 50% deposit required before work begins, (b) milestone payments for larger projects, and (c) final payment due upon project completion. All invoices are due within 15 days unless otherwise specified.",
        },
        {
          subtitle: "Late Payments",
          text: "Late payments are subject to a service charge of 1.5% per month (18% per annum) or the maximum rate permitted by law, whichever is less. We reserve the right to suspend work on overdue accounts until payment is received in full.",
        },
        {
          subtitle: "Non-Refundable Deposits",
          text: "All deposits and advance payments are non-refundable once work has commenced. In the event of project cancellation, Client remains liable for all work completed to date, calculated on a pro-rata basis or as specified in the agreement.",
        },
        {
          subtitle: "Expenses",
          text: "Client agrees to reimburse reasonable expenses incurred in connection with the project, including but not limited to third-party services, software licenses, stock assets, or hosting fees, unless otherwise specified in the SOW.",
        },
      ],
    },
    {
      icon: Shield,
      title: "4. Intellectual Property Rights",
      content: [
        {
          subtitle: "Client-Owned Content",
          text: "Client retains all rights to content, materials, and intellectual property provided to us ('Client Content'). Client grants us a limited, non-exclusive license to use Client Content solely for the purpose of performing services under the agreement.",
        },
        {
          subtitle: "Work Product Ownership",
          text: "Upon full payment of all fees, Client receives ownership of the final deliverables specifically created for Client as outlined in the SOW ('Work Product'). Ownership transfer is contingent upon full payment and explicitly excludes pre-existing materials, third-party components, and our methodologies.",
        },
        {
          subtitle: "Company Retained Rights",
          text: "We retain all rights to: (a) pre-existing code, frameworks, libraries, and tools used in the project, (b) general knowledge, skills, and methodologies, (c) reusable code components and templates, and (d) the right to display the work in our portfolio unless expressly prohibited in writing.",
        },
        {
          subtitle: "Third-Party Components",
          text: "Work Product may incorporate third-party software, libraries, frameworks, or assets subject to their respective licenses. Client is responsible for compliance with such licenses. We make no warranties regarding third-party components.",
        },
      ],
    },
    {
      icon: Clock,
      title: "5. Project Timelines & Delivery",
      content: [
        {
          subtitle: "Estimated Timelines",
          text: "Project timelines provided in proposals are good-faith estimates, not guarantees. Actual delivery dates may vary based on project complexity, Client responsiveness, scope changes, and unforeseen circumstances.",
        },
        {
          subtitle: "Client Responsibilities",
          text: "Timely delivery depends on Client providing: (a) required content, materials, and access in a timely manner, (b) prompt feedback and approval at designated milestones, (c) clear decision-making and avoiding contradictory instructions, and (d) access to necessary systems, accounts, and resources.",
        },
        {
          subtitle: "Delays",
          text: "We are not liable for delays caused by Client, third-party providers, force majeure events, or circumstances beyond our reasonable control. Extended delays may result in project re-scoping or additional fees.",
        },
      ],
    },
    {
      icon: CheckCircle,
      title: "6. Client Obligations & Cooperation",
      content: [
        {
          subtitle: "Accurate Information",
          text: "Client warrants that all information, content, and materials provided to us are accurate, complete, and do not infringe third-party rights. Client is solely responsible for the accuracy and legality of Client Content.",
        },
        {
          subtitle: "Timely Feedback",
          text: "Client agrees to provide timely feedback, approvals, and decision-making as required for project progression. Failure to provide feedback within agreed timeframes may result in project delays and does not relieve Client of payment obligations.",
        },
        {
          subtitle: "Access & Cooperation",
          text: "Client will provide necessary access to systems, accounts, personnel, and resources required to complete the work. Client is responsible for maintaining backups of their data and systems.",
        },
      ],
    },
    {
      icon: XCircle,
      title: "7. Revisions & Change Requests",
      content: [
        {
          subtitle: "Included Revisions",
          text: "Each project includes a specified number of revision rounds as outlined in the SOW. Revisions must be requested within the scope of the original deliverables and provided in a consolidated manner.",
        },
        {
          subtitle: "Additional Revisions",
          text: "Requests for revisions beyond those included in the original scope, or requests made after project completion and final approval, will be billed at our standard hourly rate or as otherwise agreed.",
        },
        {
          subtitle: "Scope Creep",
          text: "Features, functionality, or deliverables not specified in the original SOW constitute scope changes and will be subject to additional fees. We will notify Client of scope changes and obtain written approval before proceeding with additional work.",
        },
      ],
    },
    {
      icon: AlertTriangle,
      title: "8. Warranties & Disclaimers",
      content: [
        {
          subtitle: "Limited Warranty",
          text: "We warrant that services will be performed in a professional and workmanlike manner consistent with industry standards. This warranty is limited to a period of 30 days from final delivery unless otherwise specified in a maintenance agreement.",
        },
        {
          subtitle: "Disclaimer of Warranties",
          text: "EXCEPT AS EXPRESSLY STATED ABOVE, ALL SERVICES AND DELIVERABLES ARE PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.",
        },
        {
          subtitle: "No Performance Guarantees",
          text: "We do not guarantee specific business results, search engine rankings, conversion rates, sales, traffic, or other performance metrics. Client acknowledges that such outcomes depend on numerous factors beyond our control.",
        },
        {
          subtitle: "Third-Party Services",
          text: "We make no warranties regarding third-party services, platforms, hosting providers, or payment processors. Client uses such services at their own risk and subject to third-party terms.",
        },
      ],
    },
    {
      icon: Shield,
      title: "9. Limitation of Liability",
      content: [
        {
          subtitle: "Maximum Liability",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR ANY SERVICES PROVIDED SHALL NOT EXCEED THE TOTAL FEES PAID BY CLIENT FOR THE SPECIFIC PROJECT OR SERVICE GIVING RISE TO THE CLAIM.",
        },
        {
          subtitle: "Excluded Damages",
          text: "IN NO EVENT SHALL WE BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
        },
        {
          subtitle: "Client Indemnification",
          text: "Client agrees to indemnify, defend, and hold harmless the Company, its officers, employees, and contractors from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from: (a) Client Content, (b) Client's breach of these Terms, (c) Client's use of deliverables, or (d) claims that Client Content infringes third-party rights.",
        },
      ],
    },
    {
      icon: XCircle,
      title: "10. Termination",
      content: [
        {
          subtitle: "Termination by Client",
          text: "Client may terminate a project at any time upon written notice. Upon termination, Client remains liable for: (a) all work completed to date, calculated on a pro-rata basis, (b) non-refundable deposits, (c) committed expenses and third-party costs, and (d) any cancellation fees specified in the agreement.",
        },
        {
          subtitle: "Termination by Company",
          text: "We may terminate the agreement immediately if: (a) Client fails to pay invoices when due, (b) Client breaches these Terms or the project agreement, (c) Client engages in abusive, threatening, or illegal conduct, or (d) project cannot proceed due to Client inaction or unresponsiveness.",
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination: (a) Client must immediately pay all outstanding invoices, (b) we may suspend access to work in progress until payment is received, (c) we retain all rights to work product until full payment, and (d) certain provisions (payment, IP, confidentiality, liability) survive termination.",
        },
      ],
    },
    {
      icon: Scale,
      title: "11. Dispute Resolution & Legal",
      content: [
        {
          subtitle: "Governing Law",
          text: "These Terms are governed by the laws of the Province of Alberta and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the courts of Calgary, Alberta, Canada.",
        },
        {
          subtitle: "Dispute Resolution",
          text: "In the event of a dispute, the parties agree to first attempt resolution through good-faith negotiation. If negotiation fails, the parties may pursue mediation before initiating litigation. Each party bears its own costs and attorney fees unless a court orders otherwise.",
        },
        {
          subtitle: "Limitation Period",
          text: "Any claim arising out of or related to these Terms must be filed within one (1) year after the claim arises, or it will be permanently barred.",
        },
        {
          subtitle: "Severability",
          text: "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
        },
      ],
    },
    {
      icon: FileText,
      title: "12. Confidentiality",
      content: [
        {
          subtitle: "Confidential Information",
          text: "Each party may have access to confidential information of the other party. Both parties agree to maintain confidentiality and not disclose such information to third parties without prior written consent, except as required by law.",
        },
        {
          subtitle: "Exceptions",
          text: "Confidentiality obligations do not apply to information that: (a) is publicly available through no fault of the receiving party, (b) was rightfully known prior to disclosure, (c) is independently developed, or (d) is required to be disclosed by law.",
        },
        {
          subtitle: "Portfolio Rights",
          text: "Unless expressly prohibited in writing, we retain the right to use project deliverables in our portfolio, case studies, and marketing materials. We will not disclose confidential business information in such materials.",
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
              <Scale className="w-4 h-4 text-primary-light dark:text-primary" />
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
                Terms of Service
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-ocean-900 dark:text-white">
              Terms of{" "}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-teal-400 to-accent-light dark:from-primary dark:via-emerald-300 dark:to-accent">
                Service
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-ocean-600 dark:text-white/60 leading-relaxed mb-8 max-w-3xl mx-auto">
              These terms govern your use of our services and establish the legal framework for our professional relationship with Orca Enterprises Inc., based in Calgary, Alberta, Canada.
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
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-6 sm:p-8 shadow-lg dark:shadow-none"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary-light/10 dark:bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-light dark:text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-ocean-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="pl-0 sm:pl-16">
                        {item.subtitle && (
                          <h3 className="font-display text-base font-bold text-ocean-800 dark:text-white/90 mb-2">
                            {item.subtitle}
                          </h3>
                        )}
                        <p className="text-sm sm:text-base text-ocean-600 dark:text-white/70 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-white flex-shrink-0" />
                <div>
                  <h2 className="font-display text-xl font-bold text-white mb-3">
                    Important Legal Notice
                  </h2>
                  <p className="text-white/95 leading-relaxed text-sm sm:text-base">
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms contain important provisions including limitation of liability, disclaimer of warranties, and dispute resolution procedures. If you do not agree to these terms, you may not use our services. For questions or concerns, please contact us before engaging our services.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-6 sm:p-8 text-center"
            >
              <h2 className="font-display text-xl font-bold text-ocean-900 dark:text-white mb-3">
                Questions About These Terms?
              </h2>
              <p className="text-ocean-600 dark:text-white/70 mb-4">
                If you have questions or need clarification about these Terms of Service, please contact us:
              </p>
              <a
                href="mailto:aj@orcaenterprises.ca"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold hover:bg-ocean-700 dark:hover:bg-primary/90 transition-colors"
              >
                aj@orcaenterprises.ca
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
