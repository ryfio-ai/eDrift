"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from "lucide-react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formType, setFormType] = useState<"consultation" | "rfq">("rfq");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  const faqs = [
    { q: "What is the typical engagement flow?", a: "Most OEM partnerships start with a technical feasibility study followed by rapid prototyping (4-6 weeks) and automotive-grade validation." },
    { q: "Do you sign NDAs for R&D projects?", a: "Yes, we maintain strict IP confidentiality. NDAs are standard for all custom R&D, specialized OBC development, and proprietary PSU projects." },
    { q: "What are the response times for support?", a: "Enterprise partners receive a dedicated Technical Account Manager with 24-hour response SLAs for mission-critical engineering inquiries." },
    { q: "Can you customize thermal envelopes?", a: "Absolutely. Our engineering team specializes in custom heatsink design and liquid-cooling port orientations to fit specific vehicle chassis." }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left: Info & FAQ */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-primary mb-6">Contact Engineering</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
            Consult with Our <br />
            <span className="text-brand-primary">Technical Team</span>
          </h2>
          
          <p className="text-slate-600 text-lg mb-16 font-medium leading-relaxed max-w-xl">
             Our specialized power architecture team is ready to assist with custom specifications, 
             functional safety validation, and global fleet deployments.
          </p>

          <div className="space-y-8 mb-20">
            {[
              { icon: Mail, label: "Technical Support", val: "eng@edriftelectric.com" },
              { icon: Phone, label: "Business Development", val: "+91 97902 74709" },
              { icon: MapPin, label: "R&D Facility", val: "IIT Palakkad, Hosur Facility" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                 <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-900 font-bold text-base leading-tight">{item.val}</p>
                 </div>
              </div>
            ))}
          </div>

          <div className="pt-12 border-t border-slate-100">
             <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8">Industrial FAQ</h4>
             <div className="space-y-4">
                {faqs.map((faq, i) => (
                   <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full p-5 text-left flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                         <span className="text-sm font-bold text-slate-900">{faq.q}</span>
                         <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                      </button>
                      {openFaq === i && (
                         <div className="p-5 bg-white text-sm text-slate-500 font-medium leading-relaxed">
                            {faq.a}
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        </motion.div>

        {/* Right: Enterprise Form with Tab Switcher */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="p-1 gap-2 bg-slate-50 border border-slate-100 rounded-2xl flex mb-10">
             <button 
               onClick={() => setFormType("rfq")}
               className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formType === "rfq" ? "bg-white text-brand-primary shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
             >
                Request RFQ
             </button>
             <button 
               onClick={() => setFormType("consultation")}
               className={`flex-1 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formType === "consultation" ? "bg-white text-brand-primary shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
             >
                Eng Consultation
             </button>
          </div>

          <div className="p-10 border border-slate-100 bg-white rounded-[40px] shadow-2xl shadow-slate-100 min-h-[600px] flex flex-col">
            {submitted ? (
              <div className="text-center py-20 my-auto">
                 <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20"
                 >
                    <CheckCircle2 className="w-10 h-10" />
                 </motion.div>
                 <h3 className="text-2xl font-semibold text-slate-900 mb-3">Transmission Successful</h3>
                 <p className="text-slate-500 font-medium mb-10 max-w-xs mx-auto">
                    {formType === "rfq" 
                      ? "A quote specialist will reach out with a detailed proposal within 48 hours." 
                      : "An application engineer will contact you to schedule a technical review."}
                 </p>
                 <button onClick={() => setSubmitted(false)} className="btn-outline h-12">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    <input required className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Corporate Email</label>
                    <input required type="email" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm" placeholder="doe@company.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Company Name</label>
                    <input required className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm" placeholder="OEM / Fleet Operator" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Professional Role</label>
                    <input required className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm" placeholder="Principal Engineer / Procurement" />
                  </div>
                </div>

                {formType === "rfq" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Estimated Annual Volume</label>
                      <select className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm appearance-none cursor-pointer">
                        <option>100 - 500 units</option>
                        <option>500 - 2,000 units</option>
                        <option>2,000 - 5,000 units</option>
                        <option>5,000+ units</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Product Interest</label>
                      <select className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm appearance-none cursor-pointer">
                        <option>On-Board Chargers (SiC)</option>
                        <option>DC Fast Charging Systems</option>
                        <option>Custom PSU Solution</option>
                        <option>Portable B2B Charging</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Primary Engineering Challenge</label>
                    <select className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm appearance-none cursor-pointer">
                      <option>ASIL-D / ISO 26262 Compliance</option>
                      <option>High-Density Thermal Management</option>
                      <option>SiC/GaN Performance Benchmarking</option>
                      <option>Custom Communication (CAN/J1939)</option>
                      <option>Other Technical Inquiry</option>
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project Requirements & Timeline</label>
                  <textarea required rows={4} className="w-full bg-slate-50/50 border border-slate-100 rounded-xl px-5 py-4 text-slate-900 focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-sm resize-none" placeholder={formType === "rfq" ? "Specify your voltage, power levels, and target start-of-production date..." : "Describe the technical parameters you wish to discuss with our engineering lead..."} />
                </div>

                <button type="submit" className="btn-primary w-full h-14 shadow-xl shadow-brand-primary/20 mt-4 group" disabled={isSubmitting}>
                   {isSubmitting ? "Initiating Secure Handshake..." : formType === "rfq" ? "Request Official RFQ" : "Book Engineering Consultation"}
                   <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
