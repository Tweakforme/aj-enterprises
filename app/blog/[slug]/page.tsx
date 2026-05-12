import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { blogPosts, getBlogPost } from '../data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | ORCA Enterprises Inc.`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: 'ORCA Enterprises Inc.' }],
    alternates: { canonical: `https://orcaenterprises.ca/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://orcaenterprises.ca/blog/${slug}`,
      siteName: 'ORCA Enterprises Inc.',
      locale: 'en_CA',
      images: [{ url: '/logo.jpg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/logo.jpg'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'ORCA Enterprises Inc.',
      url: 'https://orcaenterprises.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ORCA Enterprises Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://orcaenterprises.ca/logo.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://orcaenterprises.ca/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en-CA',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id={`blog-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Script
        id={`faq-schema-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-light-100 dark:bg-dark-100 pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-ocean-500 dark:text-white/40 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-light dark:hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary-light dark:hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-ocean-700 dark:text-white/60 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide px-3 py-1 bg-primary-light/10 dark:bg-primary/10 border border-primary-light/20 dark:border-primary/20">
                {post.category}
              </span>
              <time
                dateTime={post.date}
                className="text-xs text-ocean-500 dark:text-white/40"
              >
                {new Date(post.date).toLocaleDateString('en-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="text-xs text-ocean-500 dark:text-white/40">{post.readTime}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ocean-900 dark:text-white leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg text-ocean-600 dark:text-white/60 leading-relaxed border-l-4 border-primary-light dark:border-primary pl-5">
              {post.description}
            </p>
          </header>

          {/* Article Body */}
          <article className="prose-custom space-y-6 text-ocean-700 dark:text-white/70 leading-relaxed">
            {post.content.map((section, idx) => {
              if (section.type === 'paragraph') {
                return (
                  <p key={idx} className="text-base sm:text-lg leading-relaxed">
                    {section.text}
                  </p>
                );
              }
              if (section.type === 'h2') {
                return (
                  <h2
                    key={idx}
                    className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 dark:text-white mt-12 mb-4"
                  >
                    {section.text}
                  </h2>
                );
              }
              if (section.type === 'h3') {
                return (
                  <h3
                    key={idx}
                    className="font-display text-xl font-bold text-ocean-900 dark:text-white mt-8 mb-3"
                  >
                    {section.text}
                  </h3>
                );
              }
              if (section.type === 'ul') {
                return (
                  <ul key={idx} className="space-y-3 pl-2">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base sm:text-lg">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-primary-light dark:bg-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === 'ol') {
                return (
                  <ol key={idx} className="space-y-3 pl-2 counter-reset-none">
                    {section.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-base sm:text-lg">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-light/15 dark:bg-primary/15 text-primary-light dark:text-primary font-bold text-sm flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              if (section.type === 'cta') {
                return (
                  <div
                    key={idx}
                    className="my-10 p-8 bg-gradient-to-br from-primary-light/10 to-accent-light/10 dark:from-primary/10 dark:to-accent/10 border border-primary-light/20 dark:border-primary/20 text-center"
                  >
                    <p className="font-display text-xl font-bold text-ocean-900 dark:text-white mb-4">
                      {section.text}
                    </p>
                    <Link href="/contact">
                      <button className="px-8 py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_30px_rgba(0,107,125,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
                        Get a Free Quote →
                      </button>
                    </Link>
                    <p className="text-xs text-ocean-500 dark:text-white/40 mt-3">
                      Free 30-minute consultation • Response within 24 hours
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </article>

          {/* FAQ Section */}
          {post.faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-ocean-200 dark:border-white/10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 dark:text-white mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {post.faq.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-6"
                  >
                    <h3 className="font-display text-lg font-bold text-ocean-900 dark:text-white mb-2">
                      {item.question}
                    </h3>
                    <p className="text-ocean-600 dark:text-white/60 leading-relaxed text-sm sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author / CTA footer */}
          <div className="mt-16 pt-12 border-t border-ocean-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="font-bold text-ocean-900 dark:text-white mb-1">ORCA Enterprises Inc.</p>
              <p className="text-sm text-ocean-600 dark:text-white/60">
                Calgary-based Shopify developers & web design agency. Building fast, beautiful, SEO-optimized websites for Canadian businesses.
              </p>
            </div>
            <Link href="/contact" className="flex-shrink-0">
              <button className="px-6 py-3 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-semibold text-sm uppercase tracking-wide hover:shadow-[0_0_20px_rgba(0,107,125,0.4)] dark:hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300">
                Work With Us
              </button>
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-ocean-500 dark:text-white/40 hover:text-primary-light dark:hover:text-primary transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
