"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

interface Message {
  from: "bot" | "user";
  text: string;
}

/* ─── conversation context ─── */
interface Ctx {
  askedPrice: boolean;
  askedShopify: boolean;
  askedTimeline: boolean;
  askedSEO: boolean;
  askedMaintenance: boolean;
  userName: string;
  messageCount: number;
  lastFallback: number;
}

const DEFAULT_CTX: Ctx = {
  askedPrice: false,
  askedShopify: false,
  askedTimeline: false,
  askedSEO: false,
  askedMaintenance: false,
  userName: "",
  messageCount: 0,
  lastFallback: -1,
};

// Words that can't be a person's name
const NON_NAMES = new Set([
  "just","not","here","there","going","looking","ready","happy","good","fine",
  "trying","doing","also","only","new","old","really","very","pretty","quite",
  "sure","okay","cool","great","well","right","back","still","maybe","actually",
  "wondering","thinking","curious","browsing","exploring","checking","interested",
]);

/* ─── response engine ─── */
function respond(text: string, ctx: Ctx): { reply: string; nextCtx: Ctx } {
  const t = text.toLowerCase().trim();
  const next = { ...ctx, messageCount: ctx.messageCount + 1 };

  // Name detection — ignore common non-name words
  const nameMatch = t.match(/(?:i(?:'m| am)|my name(?:'s| is)|call me)\s+([a-z]+)/i);
  if (nameMatch && !NON_NAMES.has(nameMatch[1].toLowerCase())) {
    next.userName = nameMatch[1].charAt(0).toUpperCase() + nameMatch[1].slice(1);
  }
  const hey = next.userName ? `${next.userName}, ` : "";

  // ── Just browsing / uncertain ──
  if (/just (browsing|looking|exploring|checking)|idk|i don.?t know|not sure|no idea|just here|just curious|just checking/.test(t)) {
    return {
      reply: `No worries at all — totally fine to just look around. If anything catches your eye or you want to understand what something costs or how long it takes, I'm right here. No pressure.`,
      nextCtx: next,
    };
  }

  // ── Services overview ──
  if (/what (do you|can you) (build|make|do|offer|create|develop)|what('s| is) (your )?service|what do you (specialize|focus)|capabilities|what (kinds?|types?) of/.test(t)) {
    return {
      reply: `${hey}We build three main types of things. First, business websites — clean, fast, conversion-focused sites for service companies and brands. Second, e-commerce stores — Shopify and WooCommerce stores that are actually built to sell, not just look good. Third, custom web apps — dashboards, booking systems, marketplaces, portals. We're based in Calgary but work with clients across Canada and the US. Which of those sounds closest to what you need?`,
      nextCtx: next,
    };
  }

  // ── Build intent ──
  if (/(build|create|make|develop|need|want|get|launch|start).*(site|website|store|shop|app|web|online)|(site|website|store|shop|app|web|online).*(build|create|made|developed|built|launched|started)/.test(t)) {
    return {
      reply: `${hey}Good — that's exactly what we do. To point you in the right direction: are you thinking e-commerce (selling products), a service/business site, or something more custom like a portal or web app? That changes the approach and budget quite a bit.`,
      nextCtx: next,
    };
  }

  // ── Greetings ──
  if (/^(hi|hey|hello|sup|yo|howdy|good morning|good afternoon|good evening)/.test(t)) {
    return {
      reply: ctx.messageCount === 0
        ? "Hey! Welcome to ORCA Enterprises. I'm here to help you figure out what kind of web project makes sense for your business. What are you working on right now?"
        : `Hey ${hey}what's on your mind? I'm all ears.`,
      nextCtx: next,
    };
  }

  // ── Pricing ──
  if (/price|cost|how much|budget|quote|rate|charge|fee|afford|expensive|cheap/.test(t)) {
    next.askedPrice = true;
    if (ctx.askedPrice) {
      return {
        reply: `${hey}Totally fair to dig deeper. Quick breakdown — a solid business website runs $500-$1,500. A Shopify or WooCommerce store is typically $800-$2,500 depending on how many products and custom features you need. Custom web apps (dashboards, booking systems, marketplaces) start at $1,200 and scale up. Every single package includes 3 months of free maintenance so you're not left on your own after launch. What type of project are you thinking about? I can give you a much tighter number.`,
        nextCtx: next,
      };
    }
    return {
      reply: `Good question — and I'll give you a straight answer, no fluff. Our packages start at $500 for a clean 4-5 page business site, $800 for an e-commerce store, and $1,200+ for custom builds. We're not the cheapest option out there, but our clients see real ROI — Furtraits went from zero to consistent daily sales within weeks of launch. What kind of project do you have in mind? I can give you a ballpark right now.`,
      nextCtx: next,
    };
  }

  // ── Shopify ──
  if (/shopify|woocommerce|ecommerce|e-commerce|online store|sell online|product|inventory/.test(t)) {
    next.askedShopify = true;
    return {
      reply: `${hey}Shopify is honestly one of our strongest areas. We've built stores for brands like Chilly Moose (they partner with the Calgary Flames) and Furtraits. The thing most agencies miss is conversion optimization — a beautiful store that doesn't sell is just expensive art. We focus hard on product page psychology, checkout flow, and mobile experience because that's where most stores leak money. Are you starting from scratch or migrating from somewhere else?`,
      nextCtx: next,
    };
  }

  // ── Timeline ──
  if (/how long|timeline|deadline|when|fast|quick|rush|turnaround|days|weeks|time/.test(t)) {
    next.askedTimeline = true;
    return {
      reply: `${hey}Real talk — most agencies quote 6-8 weeks and deliver in 3 months. We're different. A standard business website is typically 7-14 days. A Shopify store is 10-20 days. Custom web apps depend on complexity but we scope it precisely upfront so there are no surprises. We've had clients go from first call to live site in under 10 days. Do you have a specific deadline you're working toward?`,
      nextCtx: next,
    };
  }

  // ── SEO ──
  if (/seo|google|rank|search|traffic|keyword|visibility|organic|found online/.test(t)) {
    next.askedSEO = true;
    return {
      reply: `${hey}SEO is one of those things everyone talks about but few do properly. Here's the honest truth — we build every site with solid SEO foundations (fast load times, structured data, proper meta tags, semantic HTML) but SEO is a long game. You won't rank on page one overnight unless you're targeting very local or niche keywords. What we do exceptionally well is local SEO for Canadian businesses — if you're in a specific city, we can own that. What's your market?`,
      nextCtx: next,
    };
  }

  // ── Maintenance ──
  if (/maintain|maintenance|support|update|bug|fix|after launch|ongoing/.test(t)) {
    next.askedMaintenance = true;
    return {
      reply: `${hey}Every project we ship includes 3 months of free maintenance — security updates, content changes, bug fixes, the works. For larger projects it can be up to 6 months. After that, we offer ongoing retainer plans. Honestly though, we build things properly the first time so maintenance needs are minimal. What's your concern — are you worried about something breaking after launch, or more about ongoing content updates?`,
      nextCtx: next,
    };
  }

  // ── Portfolio / work ──
  if (/portfolio|work|example|past|previous|built|project|client/.test(t)) {
    return {
      reply: `${hey}You can see everything at orcaenterprises.ca/work. Some highlights — Rentals Kamloops (a full property search platform), Chilly Moose (a Shopify store with Calgary Flames partnership branding), Furtraits (custom pet portrait store with killer conversion rates), and Hodder Construction's employee management portal. Each one had real business goals, not just "make it look nice." Which industry are you in? I can point you to the most relevant example.`,
      nextCtx: next,
    };
  }

  // ── WordPress ──
  if (/wordpress|wp|elementor|wix|squarespace|webflow/.test(t)) {
    return {
      reply: `${hey}We work across all major platforms. WordPress for content-heavy sites and blogs, Shopify for serious e-commerce, custom Next.js for anything that needs real performance or complex functionality. We don't push you toward a platform because we prefer it — we pick the right tool for your specific situation. What does your site need to actually do? That determines the platform.`,
      nextCtx: next,
    };
  }

  // ── Mobile ──
  if (/mobile|phone|responsive|tablet|ios|android/.test(t)) {
    return {
      reply: `${hey}Mobile-first is non-negotiable for us — it's not a feature, it's the baseline. Over 60% of web traffic is mobile. We design and test on real devices, not just browser emulators. Touch targets, load speed on LTE, and font sizing on small screens are things most templates get wrong. Every site we ship is pixel-perfect on mobile before we sign off.`,
      nextCtx: next,
    };
  }

  // ── Advice / general web ──
  if (/advice|tip|help|should i|recommend|better|best|what do you think|opinion/.test(t)) {
    return {
      reply: `${hey}Straight up advice — the biggest mistake small businesses make is treating their website like a brochure instead of a sales tool. Your site should be doing work 24/7. Think clear calls to action, fast load times, trust signals like reviews and real photos, and a dead-simple way to contact you. What's your current situation — do you have a site already or starting fresh?`,
      nextCtx: next,
    };
  }

  // ── Contact / human ──
  if (/contact|email|call|phone|speak|human|person|team|adhvait|owner/.test(t)) {
    return {
      reply: `${hey}Absolutely — the best way to get a real conversation going is through our contact page at orcaenterprises.ca/contact. You'll usually hear back within a few hours, same day at most. If you want, tell me a bit about your project here first and I can make sure the conversation starts in the right place when we connect.`,
      nextCtx: next,
    };
  }

  // ── Thanks ──
  if (/thank|thanks|appreciate|helpful|great|awesome|perfect|love it/.test(t)) {
    return {
      reply: `${hey}Of course! That's what I'm here for. Any other questions — don't hold back. If you're ready to actually move forward on something, hit the "Start a Project" button or head to the contact page. We turn projects around fast.`,
      nextCtx: next,
    };
  }

  // ── Negative / frustrated ──
  if (/bad|terrible|useless|hate|stupid|annoying|waste/.test(t)) {
    return {
      reply: "Fair — I'm a simple assistant and I have limits. For anything specific or complex, honestly just message the team directly at orcaenterprises.ca/contact. Adhvait responds personally and you'll get a much better conversation.",
      nextCtx: next,
    };
  }

  // ── Fallback — never repeats the same message twice in a row ──
  const fallbacks = [
    `${hey}What's the goal here? Are you looking to get a new site built, improve an existing one, or just exploring options? I can give you much more useful info once I know what you're working with.`,
    `${hey}Can you tell me a bit more about your business and what you're trying to accomplish online? The more specific you are, the better I can point you in the right direction.`,
    `${hey}What industry is your business in? That changes a lot about what I'd recommend in terms of platform, features, and budget.`,
    `${hey}Honestly the best next step is a quick conversation with the team. Drop a message at orcaenterprises.ca/contact — Adhvait responds personally and you'll get a real, specific answer fast.`,
  ];
  // Pick any index that isn't the one we just used
  const available = fallbacks.map((_, i) => i).filter(i => i !== ctx.lastFallback);
  const pick = available[next.messageCount % available.length];
  next.lastFallback = pick;
  return { reply: fallbacks[pick], nextCtx: next };
}

const QUICK = [
  "What do you build?",
  "How much does it cost?",
  "How fast can you deliver?",
  "Can I see examples?",
];

export default function Chatbot() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hey! I'm from the ORCA team. What are you working on? I can help you figure out the best approach for your project — no sales pitch, just straight answers." },
  ]);
  const [ctx, setCtx]           = useState<Ctx>(DEFAULT_CTX);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 60);
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim() || typing) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const delay = 700 + Math.min(text.length * 18, 1200);
    setTimeout(() => {
      const { reply, nextCtx } = respond(text, ctx);
      setCtx(nextCtx);
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: reply }]);
      if (!open) setUnread(n => n + 1);
    }, delay);
  };

  // Explicit colors — no opacity tricks that break in dark mode
  const bg       = isDark ? "#0d1830" : "#ffffff";
  const botBubBg = isDark ? "#1a2a4a" : "#f1f5f9";
  const botBubTx = isDark ? "#e8eeff" : "#1e293b";
  const inputBg  = isDark ? "#1a2a4a" : "#f1f5f9";
  const inputTx  = isDark ? "#e8eeff" : "#1e293b";
  const placeholder = isDark ? "#6b7faa" : "#94a3b8";
  const divider  = isDark ? "#1e2e50" : "#e9eef6";
  const headerBg = "linear-gradient(135deg,#006B7D,#00C5D1)";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-4 sm:right-6 z-[9000] w-[calc(100vw-32px)] sm:w-[370px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              maxHeight: "min(560px,calc(100dvh - 116px))",
              boxShadow: isDark
                ? "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,240,255,0.08)"
                : "0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,107,125,0.1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ background: headerBg }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white text-sm select-none">
                  O
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">ORCA Team</p>
                  <p className="text-white/70 text-xs mt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                    Online now
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <X className="w-4 h-4 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ background: bg, scrollbarWidth: "none" }}
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[84%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl"
                    style={
                      m.from === "user"
                        ? {
                            background: headerBg,
                            color: "#ffffff",
                            borderBottomRightRadius: 4,
                          }
                        : {
                            background: botBubBg,
                            color: botBubTx,
                            borderBottomLeftRadius: 4,
                          }
                    }
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing dots */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5" style={{ background: botBubBg }}>
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full block"
                        style={{ background: placeholder }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {messages.length <= 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3 pt-2 flex flex-wrap gap-2 flex-shrink-0"
                  style={{ background: bg, borderTop: `1px solid ${divider}` }}
                >
                  {QUICK.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                      style={{
                        borderColor: isDark ? "#2a3d6a" : "#cbd5e1",
                        color: isDark ? "#7eb8c9" : "#006B7D",
                        background: "transparent",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = isDark ? "#1a2a4a" : "#e8f4f6";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div
              className="px-4 py-3 flex gap-2 flex-shrink-0"
              style={{ background: bg, borderTop: `1px solid ${divider}` }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Ask anything..."
                className="flex-1 text-sm rounded-full px-4 py-2.5 outline-none border-0"
                style={{
                  background: inputBg,
                  color: inputTx,
                  caretColor: isDark ? "#00C5D1" : "#006B7D",
                }}
                onFocus={e => { (e.target as HTMLInputElement).style.boxShadow = isDark ? "0 0 0 2px rgba(0,197,209,0.35)" : "0 0 0 2px rgba(0,107,125,0.25)"; }}
                onBlur={e => { (e.target as HTMLInputElement).style.boxShadow = "none"; }}
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-opacity disabled:opacity-40"
                style={{ background: headerBg }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble trigger */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-4 sm:right-6 z-[9001] w-14 h-14 rounded-full flex items-center justify-center text-white"
        style={{
          background: headerBg,
          boxShadow: isDark
            ? "0 8px 32px rgba(0,197,209,0.35)"
            : "0 8px 28px rgba(0,107,125,0.35)",
        }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X className="w-5 h-5" strokeWidth={2.5} />
              </motion.span>
            : <motion.span key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <MessageCircle className="w-5 h-5" strokeWidth={2} />
              </motion.span>
          }
        </AnimatePresence>

        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
