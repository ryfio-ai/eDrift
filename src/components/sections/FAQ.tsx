"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center" data-animate>
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-border-subtle" />
            <p className="label-uppercase">Inquiry / Support</p>
            <div className="w-12 h-[1px] bg-border-subtle" />
          </div>
          <h2 className="text-center text-text-main">
            Engineering & Procurement <br />
            <span className="text-brand-primary">Support FAQ</span>
          </h2>
        </div>

        <div className="space-y-3" data-animate>
          {faqs.map((faq, i) => (
            <div
              key={i}
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

              {/* CSS-only accordion — height collapses via grid trick */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: openIndex === i ? "1fr" : "0fr",
                  transition: "grid-template-rows 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-8">
                    <div className="h-px bg-border-subtle mb-6" />
                    <p className="text-[13px] font-medium text-text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
