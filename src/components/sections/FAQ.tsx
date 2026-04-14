"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { staggerContainer, fadeIn, motionTokens } from "@/lib/motion";

const faqs = [
  {
    q: "What is the typical engagement flow?",
    a: "Most programs begin with a technical feasibility discussion, followed by architecture alignment, rapid prototyping, and validation planning."
  },
  {
    q: "Do you support NDA-based engineering discussions?",
    a: "Yes. For OEM and product-development engagements, eDrift can begin with confidential technical discussions before commercial scoping."
  },
  {
    q: "Can your systems be customized for thermal and packaging constraints?",
    a: "Yes. eDrift supports application-specific requirements including thermal envelopes, voltage ranges, control strategy, and physical packaging needs."
  },
  {
    q: "What types of organizations do you work with?",
    a: "eDrift works with EV OEMs, fleet operators, industrial platform developers, and partners building charging or power conversion infrastructure."
  },
  {
    q: "What volumes can you support?",
    a: "Programs can begin at pilot scale and expand toward larger annual production volumes based on technical fit and deployment scope."
  },
  {
    q: "How quickly can your team respond?",
    a: "Initial engineering and commercial responses are typically provided within one business day for qualified inquiries."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 px-6 bg-white overflow-hidden reveal-fade">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-border-subtle" />
            <p className="label-uppercase">Inquiry / Support</p>
            <div className="w-12 h-[1px] bg-border-subtle" />
          </div>
          <h2 className="text-center text-text-main">
            Engineering & Procurement <br />
            <span className="text-brand-primary">Support FAQ</span>
          </h2>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn}
              className={`border transition-all duration-300 rounded-lg ${openIndex === i ? "border-brand-primary/20 bg-bg-main" : "border-border-subtle hover:border-stronger-border"}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                <span className={`text-base font-bold tracking-tight transition-colors ${openIndex === i ? "text-text-main" : "text-text-muted group-hover:text-text-main"}`}>
                  {faq.q}
                </span>
                <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${openIndex === i ? "bg-brand-primary text-white rotate-180" : "bg-bg-subtle text-text-faint group-hover:bg-slate-200"}`}>
                  {openIndex === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: motionTokens.easeEnter }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <div className="h-px bg-border-subtle mb-6" />
                      <p className="text-[13px] font-medium text-text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
