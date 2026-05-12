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

  // ── Bot / AI disclosure ──
  if (/are you (a bot|real|human|ai|a person|automated)|am i (talking to|chatting with) (a bot|ai|real|human|a person)|is this (a bot|ai|automated|real)/.test(t)) {
    return {
      reply: `Yeah, I'm an automated assistant for ORCA Enterprises, not a real human. That said, I can answer most things about our services. If you want to talk to an actual person, hit up orcaenterprises.ca/contact and Adhvait will get back to you personally, usually the same day.`,
      nextCtx: next,
    };
  }

  // ── Who does the work ──
  if (/who (does|would|handles|will do|works on|builds|codes|makes|is doing)|who('s| is) (doing|responsible|in charge|handling|building|making|behind)|is it (you|one person|a team|just you|just one)|how many people|is this (one person|a team)|who.s (behind|running|doing)/.test(t)) {
    return {
      reply: `${hey}Adhvait Jadav owns and runs ORCA Enterprises and handles the builds personally. It's not a big agency where your project gets passed off to a junior. You work directly with the person doing the actual work, which means faster communication and nothing gets lost. Depending on the scope, he brings in specialists for things like copywriting or photography if the project needs it.`,
      nextCtx: next,
    };
  }

  // ── Process / how it works ──
  if (/how does (it|this) work|what.s the process|what are the steps|how do (i|we) get started|where do (i|we) start|what happens (after|next|when)|walk me through|what.s (involved|next)/.test(t)) {
    return {
      reply: `${hey}Pretty straightforward. You reach out through the contact page, there's a quick call to talk about your goals and scope, then you get a proposal with a fixed price and timeline. No hourly billing, no surprises. Once you approve it, work starts and you get updates throughout. There's a review stage before anything goes live so you can give feedback. After launch, free maintenance is included.`,
      nextCtx: next,
    };
  }

  // ── Location ──
  if (/where (are you|is orca|do you (operate|work)|are you based)|calgary|alberta|canada|local (business|agency|dev)|are you (local|remote|in canada)/.test(t)) {
    return {
      reply: `${hey}Based in Calgary, Alberta. Clients are all over Canada and the US and we handle everything remotely, so location is never an issue. If you're in Calgary and want to meet in person though, that's always an option.`,
      nextCtx: next,
    };
  }

  // ── Just browsing / uncertain ──
  if (/just (browsing|looking|exploring|checking)|idk|i don.?t know|not sure|no idea|just here|just curious|just checking/.test(t)) {
    return {
      reply: `No worries at all, totally fine to just look around. If anything catches your eye or you want to know what something costs or how long it takes, just ask. No pressure.`,
      nextCtx: next,
    };
  }

  // ── Services overview ──
  if (/what (do you|can you) (build|make|do|offer|create|develop)|what('s| is) (your )?(service|specialt)|what do you (specialize|focus)|capabilities|what (kinds?|types?) of (sites?|stores?|apps?|web|projects?)/.test(t)) {
    return {
      reply: `${hey}Three main things. Business websites for service companies and brands, e-commerce stores on Shopify or WooCommerce that are built to actually convert, and custom web apps like dashboards, booking systems, and marketplaces. We work with clients across Canada and the US. Which of those is closest to what you're after?`,
      nextCtx: next,
    };
  }

  // ── Build intent ──
  if (/(build|create|make|develop|need|want|get|launch|start).*(site|website|store|shop|app|web|online)|(site|website|store|shop|app|web|online).*(build|create|made|developed|built|launched|started)/.test(t)) {
    return {
      reply: `${hey}Good, that's exactly what we do. Quick question to point you in the right direction: are you thinking e-commerce (selling products), a service or business site, or something more custom like a portal or web app? The answer changes the approach and price quite a bit.`,
      nextCtx: next,
    };
  }

  // ── Greetings ──
  if (/^(hi|hey|hello|sup|yo|howdy|good morning|good afternoon|good evening)/.test(t)) {
    return {
      reply: ctx.messageCount === 0
        ? "Hey! Welcome to ORCA Enterprises. I'm here to help figure out what kind of web project makes sense for your business. What are you working on?"
        : `Hey ${hey}what's on your mind?`,
      nextCtx: next,
    };
  }

  // ── Pricing ──
  if (/price|cost|how much|budget|quote|rate|charge|fee|afford|expensive|cheap/.test(t)) {
    next.askedPrice = true;
    if (ctx.askedPrice) {
      return {
        reply: `${hey}Fair to dig deeper. Business websites run $500 to $1,500. A Shopify or WooCommerce store is typically $800 to $2,500 depending on product count and custom features. Custom web apps start at $1,200 and go up from there. Every package has 3 months of free maintenance after launch built in. What type of project are you thinking? I can give you a tighter number.`,
        nextCtx: next,
      };
    }
    return {
      reply: `${hey}Straight answer. Packages start at $500 for a clean business site, $800 for e-commerce, and $1,200 and up for custom builds. Not the cheapest out there, but clients see real results. Furtraits went from zero to consistent daily sales within weeks of launch. What kind of project are you thinking?`,
      nextCtx: next,
    };
  }

  // ── Shopify / e-commerce ──
  if (/shopify|woocommerce|ecommerce|e-commerce|online store|sell online|product|inventory/.test(t)) {
    next.askedShopify = true;
    return {
      reply: `${hey}Shopify is one of our strongest areas. We've built stores for brands like Chilly Moose (Calgary Flames partnership) and Furtraits. The thing most agencies miss is conversion. A beautiful store that doesn't sell is just expensive art. We focus on product page structure, checkout flow, and mobile experience because that's where most stores bleed money. Starting from scratch or moving from somewhere else?`,
      nextCtx: next,
    };
  }

  // ── Timeline ──
  if (/how long|timeline|deadline|when (can|will|do)|fast|quick|rush|turnaround|\bdays\b|\bweeks\b/.test(t)) {
    next.askedTimeline = true;
    return {
      reply: `${hey}Most agencies quote 6 to 8 weeks and deliver in 3 months. We're different. A standard business website takes 7 to 14 days. A Shopify store is 10 to 20 days. Custom apps depend on complexity but we scope it precisely upfront so there are no surprises. Some clients have gone from first call to live in under 10 days. Do you have a specific deadline you're working toward?`,
      nextCtx: next,
    };
  }

  // ── SEO ──
  if (/seo|google|rank|search engine|traffic|keyword|visibility|organic|found online/.test(t)) {
    next.askedSEO = true;
    return {
      reply: `${hey}Every site we build has solid SEO foundations baked in: fast load times, structured data, proper meta tags, semantic HTML. Real talk though, SEO is a long game. You won't rank on page one overnight unless you're going after very local or niche terms. Where we do really well is local SEO for Canadian businesses. What market are you targeting?`,
      nextCtx: next,
    };
  }

  // ── Maintenance ──
  if (/maintain|maintenance|support|update|bug|fix|after launch|ongoing|breaks|breaking/.test(t)) {
    next.askedMaintenance = true;
    return {
      reply: `${hey}Every project ships with 3 months of free maintenance included: security updates, content changes, bug fixes. Larger projects get up to 6 months. After that there are retainer options if you want ongoing coverage. We build things properly the first time so maintenance needs tend to be minimal. Are you worried about something specific after launch?`,
      nextCtx: next,
    };
  }

  // ── Portfolio / examples (specific patterns only, NOT standalone "work") ──
  if (/portfolio|your (past |previous |recent )?(work|projects?|sites?|clients?)|show me (what|some|examples)|examples of|what (have you|did you) (built|made|created|done)|past (clients?|projects?)|previous (clients?|projects?)|clients? (you.ve|you have)/.test(t)) {
    return {
      reply: `${hey}Check out orcaenterprises.ca/work for the full portfolio. Some highlights: Rentals Kamloops (a full property search platform), Chilly Moose (Shopify store with Calgary Flames partnership branding), Furtraits (custom pet portrait store with strong conversion rates), and Hodder Construction's employee management portal. What industry are you in? I can point you to the most relevant one.`,
      nextCtx: next,
    };
  }

  // ── Platform choice ──
  if (/wordpress|wp|elementor|wix|squarespace|webflow/.test(t)) {
    return {
      reply: `${hey}We work across all the main platforms. WordPress for content-heavy sites and blogs, Shopify for serious e-commerce, custom Next.js for anything needing real performance or complex functionality. We don't push you toward a platform because we happen to prefer it. What does your site actually need to do? That's what determines the right tool.`,
      nextCtx: next,
    };
  }

  // ── Mobile ──
  if (/mobile|phone|responsive|tablet|ios|android/.test(t)) {
    return {
      reply: `${hey}Mobile-first is the baseline for us, not an add-on. Over 60% of web traffic is mobile now. We design and test on real devices, not just browser emulators. Touch targets, load speed on LTE, font sizing on small screens: these are things most templates get wrong. Every site is solid on mobile before we sign off.`,
      nextCtx: next,
    };
  }

  // ── Advice ──
  if (/advice|tip|should i|what do you recommend|what.s better|what.s best|what do you think|your opinion/.test(t)) {
    return {
      reply: `${hey}Biggest mistake small businesses make: treating their website like a brochure instead of a sales tool. Your site should be working 24/7. Clear calls to action, fast load times, trust signals like real reviews and photos, and a simple way to contact you. Do you have a site already or starting from scratch?`,
      nextCtx: next,
    };
  }

  // ── Contact / reach a human ──
  if (/contact|email|call|phone|speak to|talk to|reach (out|a|the)|human|real person|adhvait|the owner|the team/.test(t)) {
    return {
      reply: `${hey}Best way to get a real conversation going is orcaenterprises.ca/contact. Usually hear back within a few hours, same day at most. If you want, tell me a bit about your project here first and I can make sure the conversation starts in the right place.`,
      nextCtx: next,
    };
  }

  // ── Thanks ──
  if (/thank|thanks|appreciate|that('s| was) helpful|great|awesome|perfect/.test(t)) {
    return {
      reply: `${hey}Of course, happy to help. Any other questions, just ask. If you're ready to move forward on something, head to the contact page and we'll get things going quickly.`,
      nextCtx: next,
    };
  }

  // ── Negative ──
  if (/bad|terrible|useless|hate|stupid|annoying|waste/.test(t)) {
    return {
      reply: "Fair enough. I'm a simple assistant and I have limits. For anything specific, just message the team directly at orcaenterprises.ca/contact. Adhvait responds personally and you'll get a much better conversation.",
      nextCtx: next,
    };
  }

  // ── Fallback — never repeats the same message twice in a row ──
  const fallbacks = [
    `${hey}What's the goal here? Are you looking to get a new site built, improve an existing one, or just exploring options? I can give you much more useful info once I know what you're working with.`,
    `${hey}Can you tell me a bit more about your business and what you're trying to accomplish online? The more specific you are, the better I can point you in the right direction.`,
    `${hey}What industry is your business in? That changes a lot about what I'd recommend in terms of platform, features, and budget.`,
    `${hey}Honestly the best next step is a quick conversation with the team. Drop a message at orcaenterprises.ca/contact and Adhvait will give you a real answer fast.`,
  ];
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
