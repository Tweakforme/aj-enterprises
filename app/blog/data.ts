export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  content: BlogSection[];
  faq: { question: string; answer: string }[];
}

export interface BlogSection {
  type: 'paragraph' | 'h2' | 'h3' | 'ul' | 'ol' | 'cta';
  text?: string;
  items?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'shopify-for-canadian-small-businesses',
    title: 'Why Canadian Small Businesses Are Choosing Shopify in 2025',
    description:
      'Thinking about selling online? Here is why thousands of Canadian small businesses are launching on Shopify, what it actually costs, and what a professional developer brings that a template never will.',
    date: '2025-05-08',
    readTime: '7 min read',
    category: 'Shopify Development',
    keywords: [
      'Shopify developer Canada',
      'Shopify store Canada',
      'Canadian small business online store',
      'hire Shopify developer Canada',
      'Shopify expert Canada',
      'e-commerce Canada',
      'web developer Canada',
    ],
    content: [
      {
        type: 'paragraph',
        text: "If you run a small business in Canada and you are not selling online yet, you are leaving money on the table. Consumers across the country now expect to find you on Google, browse your products on their phone, and complete a purchase without calling anyone. Shopify makes all of that possible, and when it is built properly, it works hard for your business 24 hours a day.",
      },
      {
        type: 'paragraph',
        text: "Canada has over 1.2 million small businesses, and the e-commerce market keeps growing year over year. Whether you are a product brand, a local retailer, or a service provider who ships across the country, a well-built Shopify store is one of the highest-return investments you can make right now.",
      },
      {
        type: 'h2',
        text: "What Makes Shopify the Right Choice for Canadian Businesses",
      },
      {
        type: 'paragraph',
        text: "Shopify is a Canadian company, built in Ottawa. It handles your hosting, payments, inventory, and shipping in one place. For business owners who want to sell online without managing servers or hiring a full-time developer, it is the clear choice.",
      },
      {
        type: 'ul',
        items: [
          'No server maintenance required since Shopify handles all hosting and uptime for you',
          'Built-in payment processing that accepts Interac, Visa, Mastercard, and PayPal',
          'Mobile-first design out of the box since over 65% of Canadian shoppers browse on their phones',
          'Direct integration with Canada Post, Purolator, and UPS for real-time shipping rates',
          'Scales from 1 product to 10,000 without ever needing to switch platforms',
        ],
      },
      {
        type: 'h2',
        text: "Do You Need a Professional Developer or Can You Build It Yourself?",
      },
      {
        type: 'paragraph',
        text: "Shopify does have drag-and-drop tools, and you can technically set up a basic store yourself. But there is a real gap between a DIY store and a professionally built one, and that gap shows up in your sales numbers.",
      },
      {
        type: 'paragraph',
        text: "A professional Shopify developer brings three things a template cannot give you: a custom design that actually matches your brand, a checkout flow built to convert, and technical SEO setup that gets you found on Google. Here is what that looks like in practice:",
      },
      {
        type: 'ul',
        items: [
          'Custom theme development so your store looks nothing like the default templates',
          'Page speed optimization since Google ranks fast stores higher and customers abandon slow ones',
          'SEO setup targeting product and category searches relevant to your business',
          'Checkout flow improvements that reduce abandoned carts and increase completed purchases',
          'App integrations for loyalty programs, reviews, upsells, and automated email flows',
          'Analytics and tracking so you know exactly where your customers are coming from',
        ],
      },
      {
        type: 'h2',
        text: "What Does a Shopify Store Cost in Canada?",
      },
      {
        type: 'paragraph',
        text: "The honest answer is that it depends on what you need. At ORCA Enterprises, our Shopify packages start at $800 for a fully functional commerce store. That includes product pages, payment integration, mobile design, shipping setup, and basic SEO. More complex stores with custom apps or large catalogues cost more.",
      },
      {
        type: 'ul',
        items: [
          'Basic Shopify store with up to 15 products: $800 to $1,500',
          'Mid-size store with a custom theme and up to 100 products: $1,500 to $2,500',
          'Enterprise Shopify Plus with custom apps and automation: $2,500 and up',
          'Shopify monthly subscription paid directly to Shopify: $39 to $399 per month CAD',
        ],
      },
      {
        type: 'paragraph',
        text: "Compare that to losing even one order a week because your store looks untrustworthy or loads too slowly. The return on a professionally built store pays for itself quickly.",
      },
      {
        type: 'h2',
        text: "How SEO Gets Your Shopify Store Found on Google",
      },
      {
        type: 'paragraph',
        text: "Building the store is only half the job. The other half is making sure people can actually find it. When someone searches for your product on Google, you want your store on the first page. That requires SEO to be built into the store from day one, not added as an afterthought.",
      },
      {
        type: 'ul',
        items: [
          'Meta titles and descriptions written for the searches your customers actually use',
          'Schema markup that tells Google what your products are and where your business is located',
          'Page speed optimization since Core Web Vitals directly affect your Google ranking',
          'Product structured data so your items can appear with star ratings in search results',
          'Google Search Console and Analytics setup so you can track performance from launch day',
        ],
      },
      {
        type: 'h2',
        text: "What to Look for When Hiring a Shopify Developer",
      },
      {
        type: 'paragraph',
        text: "Not every web developer knows Shopify well. Before hiring anyone, ask these questions:",
      },
      {
        type: 'ol',
        items: [
          'Can I see live Shopify stores you have built, not mockups but real URLs I can visit?',
          'Do you optimize for Core Web Vitals and page speed as part of the build?',
          'Is SEO setup included or is it an extra?',
          'What happens after launch and do you offer maintenance?',
          'Have you worked with Shopify apps like Klaviyo, Judge.me, or ReConvert?',
          'Can you migrate my existing store if I am switching from another platform?',
        ],
      },
      {
        type: 'paragraph',
        text: "At ORCA Enterprises, the answer to all of those is yes. We build Shopify stores for Canadian businesses that look great, load fast, and show up on Google.",
      },
      {
        type: 'cta',
        text: 'Get a Free Quote for Your Shopify Store',
      },
    ],
    faq: [
      {
        question: 'How much does a professional Shopify store cost in Canada?',
        answer:
          'A professionally built Shopify store in Canada typically costs between $800 and $2,500 depending on the number of products, custom features, and integrations. At ORCA Enterprises, stores start at $800 and include mobile design, payment setup, shipping configuration, and basic SEO.',
      },
      {
        question: 'How long does it take to build a Shopify store?',
        answer:
          'A standard Shopify store takes 10 to 20 business days from start to launch. Larger stores with custom apps or big product catalogues may take 3 to 6 weeks. Rush delivery is available.',
      },
      {
        question: 'Will my Shopify store show up on Google?',
        answer:
          'It can if SEO is set up properly from the start. A good developer will configure meta tags, page speed, schema markup, and submit your sitemap to Google Search Console. At ORCA Enterprises, basic SEO is included with every Shopify build.',
      },
      {
        question: 'Do most Canadian small businesses need Shopify Plus?',
        answer:
          'No. The standard Shopify plan at $39 to $105 per month CAD is enough for most small and medium businesses in Canada. Shopify Plus starts at around $2,300 per month and is built for high-volume enterprise retailers.',
      },
      {
        question: 'What is the difference between Shopify and a custom website?',
        answer:
          'Shopify is purpose-built for selling products online. A custom website gives more flexibility for service businesses, portfolios, and non-e-commerce needs. Many Canadian businesses benefit from both: a Shopify store for products and a custom marketing site for brand content.',
      },
    ],
  },
  {
    slug: 'how-to-choose-a-web-developer-in-canada',
    title: 'How to Choose the Right Web Developer in Canada: A Practical Guide',
    description:
      'There are thousands of web developers in Canada. This guide gives you a straightforward way to evaluate them, understand what things should cost, and avoid the mistakes most business owners make when hiring.',
    date: '2025-05-01',
    readTime: '6 min read',
    category: 'Web Development',
    keywords: [
      'web developer Canada',
      'web development agency Canada',
      'hire web developer Canada',
      'Canada website design',
      'best web developer Canada',
      'Canadian web design company',
      'website developer Canada',
    ],
    content: [
      {
        type: 'paragraph',
        text: "Canada has no shortage of web developers. From solo freelancers to agencies with 50-person teams, the options can feel overwhelming. So how do you pick the right one? This guide gives you a practical framework for evaluating developers before you spend anything.",
      },
      {
        type: 'h2',
        text: 'Start by Getting Clear on What You Actually Need',
      },
      {
        type: 'paragraph',
        text: "Before you talk to anyone, be specific about the type of site you need. Different projects need different skills, and a developer who is great at brochure sites might not be the right fit for a complex Shopify build.",
      },
      {
        type: 'ul',
        items: [
          'Brochure or service website that showcases your business and drives calls and leads',
          'Online store that sells products, handles payments, and manages shipping',
          'Web application with interactive tools, dashboards, booking systems, or member portals',
          'Landing page for a specific campaign, promotion, or ad',
          'Shopify store specifically for product-based businesses who want a dedicated platform',
        ],
      },
      {
        type: 'paragraph',
        text: "Knowing your project type up front saves you hours of back-and-forth and helps you filter candidates fast.",
      },
      {
        type: 'h2',
        text: 'How to Review a Portfolio the Right Way',
      },
      {
        type: 'paragraph',
        text: "Every developer shows you their best work. Your job is to look past the screenshots and test the actual sites they have built.",
      },
      {
        type: 'ul',
        items: [
          'Load speed matters: open their portfolio sites and see how fast they actually load',
          'Check mobile experience: view their work on your phone since most Canadian traffic is mobile',
          'Look for real live sites not just mockups or designs that were never built',
          'Check if the sites rank on Google by searching for the client businesses',
          'See if they have experience in your industry or with a similar type of business',
        ],
      },
      {
        type: 'h2',
        text: '7 Questions to Ask Before You Hire Anyone',
      },
      {
        type: 'paragraph',
        text: "These questions separate experienced developers from people who just know how to use a page builder:",
      },
      {
        type: 'ol',
        items: [
          'What tech stack do you use and why? Look for modern answers like Next.js, React, Shopify, or well-maintained WordPress.',
          'How do you handle SEO? Is it included in the project or an add-on?',
          'Walk me through your process from kickoff to launch.',
          'Who owns the code, domain, and hosting after the project is done? You should own everything.',
          'Do you offer post-launch support and what does it cost?',
          'What happens if I need changes six months after the project ends?',
          'Can I speak with a previous client as a reference?',
        ],
      },
      {
        type: 'h2',
        text: 'Web Development Pricing in Canada: What to Expect in 2025',
      },
      {
        type: 'paragraph',
        text: "Pricing varies a lot. Here is a realistic range based on project type so you know what is reasonable:",
      },
      {
        type: 'ul',
        items: [
          'Simple 4 to 5 page business website: $500 to $1,500',
          'E-commerce or Shopify store: $800 to $2,500',
          'Custom web application: $1,200 to $5,000 and up',
          'Monthly maintenance and updates: $150 to $300 per month',
          'Standalone SEO or speed optimization: $400 to $800',
        ],
      },
      {
        type: 'paragraph',
        text: "Be cautious of quotes under $400 for a full website. These usually result in templated, slow-loading sites with no real SEO value. At the same time, a large agency retainer is rarely necessary for a small or medium business.",
      },
      {
        type: 'h2',
        text: 'Red Flags That Should Make You Walk Away',
      },
      {
        type: 'ul',
        items: [
          'No portfolio or only mockups since it means they have not built real sites',
          'Vague timelines with no written scope of work',
          'They want to own your domain, hosting, or code after the project',
          'No mention of SEO, mobile optimization, or page speed',
          'Promises of instant Google rankings since no one can guarantee that',
          'No support plan or maintenance offer after launch',
        ],
      },
      {
        type: 'h2',
        text: 'The Bottom Line',
      },
      {
        type: 'paragraph',
        text: "The right web developer for your Canadian business is one who has built sites like yours before, communicates clearly, delivers on time, and hands over full ownership of everything you paid for. Do not rush the decision. A poorly built site costs more to fix than it would have to build properly the first time.",
      },
      {
        type: 'cta',
        text: 'Talk to a Web Developer Today — Free Consultation',
      },
    ],
    faq: [
      {
        question: 'How much does a website cost in Canada?',
        answer:
          'A professional business website in Canada costs between $500 and $2,500 depending on the number of pages, features, and complexity. Simple 4 to 5 page sites start at $500. E-commerce stores start at $800. Custom web applications start at $1,200.',
      },
      {
        question: 'How long does it take to build a website?',
        answer:
          'A standard business website takes 5 to 10 business days. An e-commerce store takes 10 to 20 days. Custom web applications take 2 to 6 weeks. Timelines depend on how quickly the client provides content and feedback.',
      },
      {
        question: 'Should I hire a freelancer or an agency for my website?',
        answer:
          'For most Canadian small businesses, a boutique agency or experienced freelancer offers the best balance of quality and cost. Large agencies charge significantly more for similar output. The key is checking their portfolio, asking for references, and confirming they handle SEO and mobile optimization.',
      },
      {
        question: 'What platform should I build my Canadian business website on?',
        answer:
          'For service businesses, Next.js or WordPress works well. For product sellers, Shopify is the best option. For complex applications, Next.js with a custom backend is the right choice. Avoid basic website builders for anything beyond a very simple presence since they have real SEO and performance limitations.',
      },
      {
        question: 'Do web developers in Canada include SEO?',
        answer:
          'Some do and some do not, so always ask upfront. At ORCA Enterprises, basic SEO including meta tags, schema markup, Google Search Console setup, and page speed optimization is included in every project.',
      },
    ],
  },
  {
    slug: 'signs-your-canadian-business-website-is-hurting-sales',
    title: '5 Signs Your Canadian Business Website is Costing You Sales',
    description:
      'Most business owners do not realize their website is turning customers away until they look at the numbers. Here are five clear signs your site is hurting your business and what to do about each one.',
    date: '2025-04-22',
    readTime: '5 min read',
    category: 'Web Development',
    keywords: [
      'business website Canada',
      'website conversion Canada',
      'slow website Canada',
      'improve website Canada',
      'website redesign Canada',
      'web developer Canada',
      'Canadian small business website',
    ],
    content: [
      {
        type: 'paragraph',
        text: "A bad website does not just fail to help your business. It actively works against it. Potential customers land on your site, something puts them off, and they go to a competitor instead. The frustrating part is that most business owners have no idea it is happening.",
      },
      {
        type: 'paragraph',
        text: "Here are five signs your website is costing you customers, plus what you can actually do about it.",
      },
      {
        type: 'h2',
        text: "1. Your Site Takes More Than 3 Seconds to Load",
      },
      {
        type: 'paragraph',
        text: "Google has published data showing that 53% of mobile users abandon a page that takes longer than 3 seconds to load. In Canada, where most people browse on phones, a slow site is a direct sales problem. And it is not just users who leave. Google also penalizes slow sites in search rankings, so fewer people find you in the first place.",
      },
      {
        type: 'paragraph',
        text: "The causes are usually the same: uncompressed images, bloated themes, unnecessary plugins, or cheap hosting. A proper speed audit and optimization pass can cut load times dramatically.",
      },
      {
        type: 'h2',
        text: "2. Your Site Does Not Look Right on a Phone",
      },
      {
        type: 'paragraph',
        text: "Over 60% of web traffic in Canada now comes from mobile devices. If someone has to pinch, zoom, or scroll sideways to use your site on their phone, they are leaving. Mobile responsiveness is not optional in 2025. It is the baseline.",
      },
      {
        type: 'paragraph',
        text: "Pull up your site on your phone right now. Are the buttons easy to tap? Does the text fit without horizontal scrolling? Is the menu usable? If the answer to any of those is no, you have a problem.",
      },
      {
        type: 'h2',
        text: "3. Nobody Can Find You on Google",
      },
      {
        type: 'paragraph',
        text: "If your site does not appear on the first page of Google for searches related to your business, you are invisible to most potential customers. People searching for your products or services are going to your competitors instead.",
      },
      {
        type: 'paragraph',
        text: "This comes down to SEO. A lot of older or template-built sites have no real SEO setup at all. No optimized page titles, no meta descriptions, no schema markup, and no sitemap submitted to Google. Fixing these things does not guarantee overnight rankings, but it gets you into the game.",
      },
      {
        type: 'h2',
        text: "4. Your Contact Form or Checkout Has Not Been Tested",
      },
      {
        type: 'paragraph',
        text: "This sounds obvious but it happens constantly. A contact form that throws an error, a checkout that gets stuck on mobile, or a phone number that is not clickable on a smartphone. These are small things that kill conversions at the final moment when someone has already decided to reach out or buy.",
      },
      {
        type: 'paragraph',
        text: "Test every form and purchase path on your site at least once a month. Send a test inquiry. Complete a test purchase. Fix whatever is broken.",
      },
      {
        type: 'h2',
        text: "5. Your Site Looks Like It Was Built in 2015",
      },
      {
        type: 'paragraph',
        text: "Design trends change and a site that looked fine a few years ago can make your business look outdated today. Customers make trust judgments about your business in less than one second based on how your site looks. If it looks old or low-quality, they assume your business is too.",
      },
      {
        type: 'paragraph',
        text: "You do not need to redesign every year. But if your site has not been updated in three or more years, it is worth a serious review.",
      },
      {
        type: 'h2',
        text: "What to Do Next",
      },
      {
        type: 'paragraph',
        text: "If any of these hit close to home, the good news is that all of them are fixable. A proper audit, a rebuild, or targeted improvements in the right areas can turn your website from a liability into your best sales tool. At ORCA Enterprises, we build websites that load fast, look sharp on every device, rank on Google, and turn visitors into customers.",
      },
      {
        type: 'cta',
        text: 'Get a Free Website Audit',
      },
    ],
    faq: [
      {
        question: 'How do I test my website speed?',
        answer:
          'You can use Google PageSpeed Insights at pagespeed.web.dev. Enter your URL and it will give you a score and specific recommendations. A score above 80 on mobile is a good target.',
      },
      {
        question: 'How long does a website redesign take?',
        answer:
          'A standard redesign for a small business website takes 5 to 15 business days depending on the number of pages and how much content needs to be updated. E-commerce redesigns take longer.',
      },
      {
        question: 'Can I improve my SEO without rebuilding the whole site?',
        answer:
          'Yes. Many SEO improvements can be made to an existing site without a full rebuild. These include updating page titles and descriptions, adding schema markup, submitting a sitemap to Google Search Console, and compressing images.',
      },
      {
        question: 'How much does a website redesign cost in Canada?',
        answer:
          'A professional website redesign in Canada costs between $500 and $2,500 for most small business sites. The price depends on how many pages need to be redesigned and whether new features are being added.',
      },
    ],
  },
  {
    slug: 'shopify-vs-woocommerce-canada',
    title: 'Shopify vs WooCommerce: Which Is Better for Canadian Businesses?',
    description:
      'Both Shopify and WooCommerce power millions of online stores. But they are built very differently and the right choice depends on your business. Here is a straight comparison with no fluff.',
    date: '2025-04-15',
    readTime: '6 min read',
    category: 'Shopify Development',
    keywords: [
      'Shopify vs WooCommerce Canada',
      'best e-commerce platform Canada',
      'Shopify Canada',
      'WooCommerce Canada',
      'online store platform Canada',
      'Shopify developer Canada',
      'e-commerce Canada',
    ],
    content: [
      {
        type: 'paragraph',
        text: "If you are setting up an online store in Canada and trying to choose between Shopify and WooCommerce, you are not alone. These are the two most popular e-commerce platforms in the country, and the debate comes up constantly. The honest answer is that neither one is universally better. The right choice depends on your business.",
      },
      {
        type: 'h2',
        text: "What Is Shopify?",
      },
      {
        type: 'paragraph',
        text: "Shopify is a hosted e-commerce platform built by a Canadian company in Ottawa. You pay a monthly subscription and Shopify handles the hosting, security, and infrastructure. Everything is managed for you. You focus on your products and customers while Shopify handles the technical side.",
      },
      {
        type: 'h2',
        text: "What Is WooCommerce?",
      },
      {
        type: 'paragraph',
        text: "WooCommerce is a free plugin that turns a WordPress website into an online store. Unlike Shopify, it is self-hosted, which means you are responsible for finding your own hosting, keeping the software updated, and managing security. It is open source and highly customizable, but it requires more hands-on management.",
      },
      {
        type: 'h2',
        text: "Cost Comparison for Canadian Businesses",
      },
      {
        type: 'paragraph',
        text: "This is where a lot of business owners get confused. WooCommerce looks free at first glance, but the real costs add up.",
      },
      {
        type: 'ul',
        items: [
          'Shopify Basic: $39 per month CAD plus transaction fees if not using Shopify Payments',
          'Shopify: $105 per month CAD with lower transaction fees',
          'Shopify Advanced: $399 per month CAD for high-volume businesses',
          'WooCommerce plugin: free, but hosting costs $10 to $50 per month',
          'WooCommerce paid extensions: many essential features cost $50 to $200 each',
          'WooCommerce development and maintenance: typically higher than Shopify over time',
        ],
      },
      {
        type: 'paragraph',
        text: "In practice, a well-configured Shopify store often costs less to run than a WooCommerce store when you factor in hosting, plugins, and maintenance time.",
      },
      {
        type: 'h2',
        text: "Ease of Use",
      },
      {
        type: 'paragraph',
        text: "Shopify wins here without much debate. It is designed for business owners who are not technical. You can add products, process orders, manage inventory, and run promotions without touching any code.",
      },
      {
        type: 'paragraph',
        text: "WooCommerce has a steeper learning curve. Updates can break things, plugin conflicts are common, and keeping the store secure requires ongoing attention. If you do not have someone technical managing it, problems can pile up quickly.",
      },
      {
        type: 'h2',
        text: "Flexibility and Customization",
      },
      {
        type: 'paragraph',
        text: "WooCommerce wins on pure flexibility. Because it is open source, a developer can build almost anything on top of it. If you need very specific custom functionality that no Shopify app provides, WooCommerce might be the better fit.",
      },
      {
        type: 'paragraph',
        text: "That said, Shopify has an extensive app store and a powerful API. The gap in customization has narrowed significantly in the last few years, and most Canadian small businesses never need the kind of customization that WooCommerce uniquely enables.",
      },
      {
        type: 'h2',
        text: "Canadian-Specific Features",
      },
      {
        type: 'paragraph',
        text: "Both platforms support Canadian taxes, currencies, and shipping carriers. But Shopify has some advantages for Canadian businesses specifically:",
      },
      {
        type: 'ul',
        items: [
          'Shopify Payments is available in Canada with no third-party transaction fees',
          'Built-in Canada Post integration with real-time shipping rates',
          'Shopify Markets for selling in multiple currencies and languages',
          'Canadian dollar as default currency with no configuration required',
        ],
      },
      {
        type: 'h2',
        text: "Which Should You Choose?",
      },
      {
        type: 'paragraph',
        text: "Choose Shopify if you want a reliable, easy-to-manage store, you are not technical, or you want to focus on running your business instead of maintaining software. It is the better choice for most Canadian small and medium businesses.",
      },
      {
        type: 'paragraph',
        text: "Choose WooCommerce if you already have a WordPress site you love, you need very specific customizations no Shopify app offers, or you have a developer on hand to manage it ongoing.",
      },
      {
        type: 'paragraph',
        text: "If you are still unsure, book a free consultation with ORCA Enterprises. We build on both platforms and we will tell you honestly which one makes more sense for your situation.",
      },
      {
        type: 'cta',
        text: 'Book a Free Platform Consultation',
      },
    ],
    faq: [
      {
        question: 'Is Shopify better than WooCommerce for Canadian businesses?',
        answer:
          'For most Canadian small businesses, Shopify is the better choice. It is easier to manage, includes Canadian-friendly features like Shopify Payments and Canada Post integration, and has more predictable costs over time. WooCommerce makes more sense if you have a WordPress site already or need highly specific customizations.',
      },
      {
        question: 'Does Shopify charge extra fees in Canada?',
        answer:
          'If you use Shopify Payments as your payment processor, there are no additional transaction fees beyond the standard credit card processing rates. If you use a third-party payment gateway, Shopify charges an additional 0.5% to 2% transaction fee depending on your plan.',
      },
      {
        question: 'Can WooCommerce handle Canadian taxes?',
        answer:
          'Yes. WooCommerce supports Canadian tax rules including GST, HST, and PST by province. However, the setup requires manual configuration or a paid tax plugin, while Shopify handles Canadian tax calculation more automatically.',
      },
      {
        question: 'How much does it cost to have a Shopify store built professionally in Canada?',
        answer:
          'A professionally built Shopify store in Canada costs between $800 and $2,500 depending on the number of products, custom design, and features needed. At ORCA Enterprises, stores start at $800 and include mobile design, payment setup, SEO, and shipping configuration.',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
