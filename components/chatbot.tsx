"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const QUICK = [
  "What are your prices?",
  "Do you build Shopify stores?",
  "How long does a project take?",
  "Can I see your work?",
];

const RESPONSES: Record<string, string> = {
  default:
    "Great question! For specific details, the best next step is a free consultation — no pressure, no commitment. Want to book one?",
  price:
    "Our packages start at $500 for business websites, $800 for e-commerce stores, and $1,200+ for custom web apps. Every package includes 3 months of free maintenance. Want a custom quote?",
  shopify:
    "Absolutely — Shopify development is one of our specialties. We build high-converting stores with custom themes, product pages, and checkout flows. Brands like Chilly Moose and Furtraits trust us.",
  time:
    "Most websites are delivered in 7–14 days. E-commerce stores take 10–20 days, and custom web apps vary by complexity. We'll give you a firm timeline before we start.",
  work:
    "You can see our full portfolio at orcaenterprises.ca/work — we've built platforms for Rentals Kamloops, Chilly Moose, Furtraits, Hodder Construction, and more.",
  contact:
    "You can reach us directly at the Contact page, or just reply here and we'll get back to you within 24 hours!",
  hello:
    "Hey! I'm ORCA's assistant. I can answer questions about our services, pricing, and timeline. What would you like to know?",
};

function getResponse(text: string): string {
  const t = text.toLowerCase();
  if (/hello|hi|hey|sup|yo/.test(t)) return RESPONSES.hello;
  if (/price|cost|how much|pricing|cheap|expensive|budget|quote/.test(t)) return RESPONSES.price;
  if (/shopify|ecommerce|e-commerce|store|shop/.test(t)) return RESPONSES.shopify;
  if (/long|time|days|week|deadline|timeline|fast|quick/.test(t)) return RESPONSES.time;
  if (/work|portfolio|project|example|past|previous|built/.test(t)) return RESPONSES.work;
  if (/contact|email|call|reach|talk|human|person/.test(t)) return RESPONSES.contact;
  return RESPONSES.default;
}

export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hey 👋 I'm ORCA's assistant. Ask me anything about our services, pricing, or timeline!" },
  ]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [open, messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = getResponse(text);
      setMessages(m => [...m, { from: "bot", text: reply }]);
      if (!open) setUnread(n => n + 1);
    }, 900 + Math.random() * 400);
  };

  return (
    <>
      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[88px] right-4 sm:right-6 z-[9000] w-[calc(100vw-32px)] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl flex flex-col dark:shadow-primary/20"
            style={{ maxHeight: "min(540px, calc(100dvh - 120px))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4"
              style={{ background: "linear-gradient(135deg, #006B7D, #00C5D1)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-display font-bold text-white text-sm">O</div>
                <div>
                  <p className="text-white font-semibold text-sm leading-none">ORCA Assistant</p>
                  <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" />
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors">
                <X className="w-4 h-4 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white dark:bg-[#0d1830]"
              style={{ scrollbarWidth: "none" }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl ${
                      m.from === "user"
                        ? "text-white rounded-br-sm"
                        : "text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/8 rounded-bl-sm"
                    }`}
                    style={m.from === "user" ? { background: "linear-gradient(135deg,#006B7D,#00C5D1)" } : {}}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 bg-gray-100 dark:bg-white/8 rounded-2xl rounded-bl-sm flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 bg-gray-400 dark:bg-white/40 rounded-full block"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3 pt-1 flex flex-wrap gap-2 bg-white dark:bg-[#0d1830]">
                {QUICK.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary-light/30 dark:border-primary/30 text-primary-light dark:text-primary hover:bg-primary-light/10 dark:hover:bg-primary/10 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-white/6 bg-white dark:bg-[#0d1830] flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-gray-100 dark:bg-white/8 rounded-full px-4 py-2.5 outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/30"
              />
              <button onClick={() => send(input)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-opacity disabled:opacity-40"
                style={{ background: "linear-gradient(135deg,#006B7D,#00C5D1)" }}
                disabled={!input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger bubble ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className="fixed bottom-5 right-4 sm:right-6 z-[9001] w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
        style={{ background: "linear-gradient(135deg,#006B7D,#00C5D1)" }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-5 h-5" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-5 h-5" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
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
