"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle2 } from "lucide-react";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left: Info */}
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="relative w-40 h-10 mb-8 overflow-hidden grayscale opacity-20">
             <Image 
               src="/images/edrift logo.png" 
               alt="eDrift" 
               fill 
               className="object-contain object-left"
             />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-8 tracking-tight leading-tight">
            Consult with Our <br />
            <span className="text-brand-primary">Engineering Team</span>
          </h2>
          
          <p className="text-slate-600 text-lg mb-12 font-medium leading-relaxed">
             From custom power specifications to site-wide charging infrastructure, our technical experts are ready to assist with your next project.
          </p>

          <div className="space-y-8 mb-12">
            {[
              { icon: Mail, label: "Technical Support", val: "info@edriftelectric.com" },
              { icon: Phone, label: "Sales Inquiry", val: "+91 97902 74709" },
              { icon: MapPin, label: "Global Headquarters", val: "Hosur, Tamil Nadu, India" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group">
                 <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-slate-900 font-bold text-lg leading-tight">{item.val}</p>
                 </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <div className="p-10 border border-slate-100 bg-slate-50/50 rounded-[32px] shadow-sm">
            {submitted ? (
              <div className="text-center py-16">
                 <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-semibold text-slate-900 mb-2">Request Received</h3>
                 <p className="text-slate-500 font-medium mb-8">A technical advisor will contact you within 1 business day.</p>
                 <button onClick={() => setSubmitted(false)} className="btn-outline py-2.5">Send Another Request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Full Name</label>
                    <input required className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:border-brand-primary outline-none transition-all font-medium" placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Corporate Email</label>
                    <input required type="email" className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:border-brand-primary outline-none transition-all font-medium" placeholder="email@company.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Interest Area</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:border-brand-primary outline-none transition-all font-medium appearance-none">
                    <option>On-Board Charger (OEM)</option>
                    <option>DC Fast Charging Systems</option>
                    <option>Fleet Infrastructure</option>
                    <option>Custom R&D Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-sans">Project Details</label>
                  <textarea required rows={4} className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-slate-900 focus:border-brand-primary outline-none transition-all font-medium resize-none" placeholder="Briefly describe your technical requirements..." />
                </div>

                <button type="submit" className="btn-primary w-full h-14" disabled={isSubmitting}>
                   {isSubmitting ? "Transmitting..." : "Submit Inquiry"}
                   <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
