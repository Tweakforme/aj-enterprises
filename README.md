# AJ Enterprises - Premium Tech Consultancy Website

A stunning, high-performance website for AJ Enterprises - specializing in Shopify development and web applications.

## 🎨 Features

- **Premium Design**: Bold typography, smooth animations, custom cursor
- **Performance Optimized**: Built with Next.js 14 for lightning-fast load times
- **Fully Responsive**: Beautiful on all devices
- **Modern Animations**: Framer Motion for smooth, professional interactions
- **SEO Ready**: Optimized metadata and semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Tweakforme/aj-enterprises.git
cd aj-enterprises
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Visit `http://localhost:3000`

## 📁 Project Structure

```
aj-enterprises/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── custom-cursor.tsx   # Custom cursor component
│   ├── navbar.tsx          # Navigation bar
│   ├── hero.tsx            # Hero section
│   ├── services.tsx        # Services section
│   ├── work.tsx            # Portfolio/work section
│   ├── contact.tsx         # Contact form
│   └── footer.tsx          # Footer
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## 🎯 Customization Guide

### 1. Update Content

**Services Section** (`components/services.tsx`):
- Edit the `services` array
- Update pricing, features, descriptions

**Portfolio Section** (`components/work.tsx`):
- Edit the `projects` array
- Add your actual project images to `/public/projects/`
- Update project details and metrics

**Contact Section** (`components/contact.tsx`):
- Update email address
- Add your social media links
- Configure form submission endpoint

### 2. Branding

**Colors** (`tailwind.config.ts`):
```typescript
primary: "#00F0FF",  // Electric cyan
accent: "#FFE500",   // Vibrant yellow
```

**Logo** (`components/navbar.tsx` & `components/footer.tsx`):
- Replace "AJ." with your brand name

### 3. Add Your Projects

1. Add images to `/public/projects/`
2. Update the `projects` array in `components/work.tsx`
3. Add actual case study pages if needed

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Deploy with default settings

3. **Add Custom Domain**
- Buy domain from Namecheap/GoDaddy
- Add to Vercel project settings
- Update DNS records

### Environment Variables

Create `.env.local` for sensitive data:
```
NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
RESEND_API_KEY=your-resend-key
```

## 📧 Contact Form Setup

### Option 1: Email Service (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Create API route:

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  await resend.emails.send({
    from: 'contact@yourdomain.com',
    to: 'your-email@example.com',
    subject: `New contact from ${name}`,
    html: `<p>${message}</p>`
  });

  return Response.json({ success: true });
}
```

### Option 2: Google Forms (Free)

1. Create Google Form
2. Get embed code
3. Replace contact form

## 🎨 Design Inspiration

Inspired by premium agency websites:
- Bold typography
- Dark, sophisticated color scheme
- Smooth animations
- High-quality imagery
- Professional polish

## 📱 Testing

**Desktop**: Chrome, Firefox, Safari
**Mobile**: iOS Safari, Chrome Mobile
**Performance**: Lighthouse score 90+

## 🔧 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: Inter, Space Grotesk
- **Deployment**: Vercel
- **Forms**: Resend/SendGrid

## 📈 Performance Optimization

- Image optimization with Next.js Image
- Code splitting and lazy loading
- Optimized fonts with next/font
- Minimal JavaScript bundle
- Efficient animations

## 🐛 Troubleshooting

**Animations not working?**
- Ensure framer-motion is installed
- Check browser supports animations

**Cursor not showing?**
- Only visible on desktop (md breakpoint+)
- Check CSS is loaded properly

**Form not submitting?**
- Configure API route
- Check environment variables

## 📝 Todo

- [ ] Add actual project images
- [ ] Set up contact form backend
- [ ] Add blog section
- [ ] Implement case study pages
- [ ] Add testimonials
- [ ] Set up analytics
- [ ] Configure SEO metadata
- [ ] Add sitemap

## 🤝 Support

Need help? Contact AJ:
- Email: hello@ajenterprises.com
- GitHub: [@Tweakforme](https://github.com/Tweakforme)

## 📄 License

© 2025 AJ Enterprises. All rights reserved.