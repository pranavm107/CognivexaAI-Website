import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build a project?",
    a: "Most projects range from 2–8 weeks depending on complexity. A simple landing page or chatbot takes 1–2 weeks. A full SaaS platform or AI system typically takes 4–8 weeks. We always share a clear timeline before we begin."
  },
  {
    q: "What technologies do you use?",
    a: "We work with React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, AWS, Vercel, OpenAI, LangChain, Flutter, React Native, Figma, and more. We pick the right stack for your specific use case — not just what's trendy."
  },
  {
    q: "Do you provide ongoing support after launch?",
    a: "Yes. Every project includes a post-launch support window. We also offer dedicated maintenance plans covering bug fixes, feature additions, performance monitoring, and infrastructure scaling."
  },
  {
    q: "Can you build MVPs for startups?",
    a: "Absolutely — that's one of our specialties. We help founders go from idea to a working, investor-ready MVP as fast as possible, with clean architecture that scales when you grow."
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We work remotely with clients across the US, UK, Europe, Middle East, and Southeast Asia. We adapt to your timezone and communicate async or via scheduled calls — whatever works best for you."
  },
  {
    q: "How do you handle pricing and payments?",
    a: "We offer project-based pricing and monthly retainers. Typically we take 50% upfront and 50% on delivery. For larger projects, we offer milestone-based payment schedules. We accept bank transfer, UPI, PayPal, and Stripe."
  },
  {
    q: "Can you integrate AI into existing systems?",
    a: "Yes. We specialize in AI integration — adding LLM-powered features, chatbots, automation workflows, and intelligent decision systems into your existing product without rebuilding from scratch."
  },
  {
    q: "What makes CognivexaAI different?",
    a: "We're engineers first, not just developers. Every solution we build is production-ready, scalable, and designed for real business impact. You get senior-level attention on every project — no outsourcing, no juniors handed your work, no surprises."
  }
];

export default function FAQSection({ variant = "full", customFaqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  const items = customFaqs ? customFaqs : (variant === "short" ? faqs.slice(0, 4) : faqs);

  return (
    <section className="faq-section px-4 relative overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        {variant !== "mini" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-purple-500 mb-4">
              FAQ
            </span>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to know before we start working together.
            </p>
          </motion.div>
        )}

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
              viewport={{ once: true }}
            >
              <div
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`
                  faq-item group cursor-pointer rounded-2xl border transition-all duration-300
                  ${openIndex === i
                    ? "border-purple-300 bg-gradient-to-br from-purple-50/80 to-blue-50/40 shadow-lg shadow-purple-100/50"
                    : "border-gray-100 bg-white"
                  }
                `}
                role="button"
                tabIndex={0}
                aria-expanded={openIndex === i}
                onKeyDown={(e) => e.key === "Enter" && setOpenIndex(openIndex === i ? null : i)}
              >
                {/* Question row */}
                <div className="flex items-center justify-between p-6">
                  <span className={`font-semibold text-[15px] pr-8 leading-snug transition-colors duration-200 ${openIndex === i ? "text-purple-700" : "text-gray-900 group-hover:text-purple-600"}`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${openIndex === i ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-purple-100 group-hover:text-purple-600"}`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gradient-to-r from-purple-200 via-blue-200 to-transparent mb-4" />
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below FAQ */}
        {variant !== "mini" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
            
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-200 hover:scale-105 transition-all duration-300"
            >
              Talk to Us →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
