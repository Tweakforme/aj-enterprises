import Link from 'next/link';
import { blogPosts } from './data';
import { generateMetadata as genMeta } from '@/app/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = genMeta({
  title: 'Blog — Web Development & Shopify Tips for Canadian Businesses',
  description:
    'Practical guides on Shopify development, web design, and growing your business online. Written by the team at ORCA Enterprises Inc.',
  path: '/blog',
  keywords: [
    'web development blog Canada',
    'Shopify tips Canada',
    'Canadian small business website tips',
    'web developer Canada blog',
  ],
});

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 pt-32 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-primary-light/30 dark:border-primary/20 bg-primary-light/10 dark:bg-primary/5 rounded-full mb-6">
            <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide">
              Resources & Insights
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ocean-900 dark:text-white mb-4">
            Web Dev Blog
          </h1>
          <p className="text-lg text-ocean-600 dark:text-white/60 max-w-2xl mx-auto">
            Practical guides on Shopify, web design, and growing your business online across Canada.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {sorted.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="bg-white dark:bg-dark-200/50 border border-ocean-200 dark:border-white/10 p-8 hover:border-primary-light/40 dark:hover:border-primary/40 transition-all duration-300 hover:shadow-lg dark:shadow-none">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-primary-light dark:text-primary uppercase tracking-wide px-3 py-1 bg-primary-light/10 dark:bg-primary/10 border border-primary-light/20 dark:border-primary/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-ocean-500 dark:text-white/40">
                    {new Date(post.date).toLocaleDateString('en-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-ocean-500 dark:text-white/40">{post.readTime}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-ocean-900 dark:text-white mb-3 group-hover:text-primary-light dark:group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h2>

                <p className="text-ocean-600 dark:text-white/60 leading-relaxed mb-6">
                  {post.description}
                </p>

                <div className="flex items-center gap-2 text-primary-light dark:text-primary font-semibold text-sm">
                  Read Article
                  <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t border-ocean-200 dark:border-white/10 pt-16">
          <p className="text-ocean-600 dark:text-white/60 mb-4">
            Ready to grow your Calgary business online?
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-primary-light dark:bg-primary text-white dark:text-dark-100 font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_30px_rgba(0,107,125,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300">
              Get a Free Quote
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
