"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export const ContactSection = () => {
  const [formType, setFormType] = useState<"consultation" | "rfq">("rfq");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[100px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side: Authority & Information */}
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[3px] bg-brand-primary" />
               <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Direct Technical Line</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
               Consult with our <br />
               <span className="text-brand-primary">Engineering Team_</span>
            </h2>
            <p className="text-lg text-slate-500 font-semibold leading-relaxed mb-12 max-w-lg">
               Skip the generic sales queue. Connect directly with our power electronics 
               specialists to discuss your project requirements and technical integration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
               {[
                 { icon: Clock, label: "Efficiency", val: "Response < 24 Hours", color: "text-emerald-500" },
                 { icon: ShieldCheck, label: "Privacy", val: "Full NDA Protocol", color: "text-brand-primary" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <div>
                       <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{item.label}</p>
                       <p className="text-sm font-black text-slate-900">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Technical Queries", val: "info@edriftelectric.com" },
                { icon: Phone, label: "OEM Hotline", val: "+91 97902 74709" },
                { icon: MapPin, label: "HQ & Lab", val: "Dr A.P.J Abdul Kalam Block, IIT Palakkad, 678623" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                      <item.icon className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{item.label}</p>
                      <p className="text-base font-bold text-slate-900">{item.val}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Specialized B2B Form */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 lg:p-12"
            >
              <div className="p-1 gap-2 bg-slate-50 border border-slate-100 rounded-2xl flex mb-10">
                 <button 
                   onClick={() => setFormType("rfq")}
                   className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formType === "rfq" ? "bg-white text-brand-primary shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
                 >
                    Request Analysis
                 </button>
                 <button 
                   onClick={() => setFormType("consultation")}
                   className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formType === "consultation" ? "bg-white text-brand-primary shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"}`}
                 >
                    Technical Review
                 </button>
              </div>

              {submitted ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Transmission Successful</h3>
                  <p className="text-slate-500 font-semibold mb-8">Our engineering lead will contact you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline w-full">Initiate New Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Full Name</label>
                       <input required className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="Principal Lead / Engineering Manager" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Work Email</label>
                       <input required type="email" className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="engineering-lead@company.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Industry segment</label>
                     <select className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900 appearance-none">
                        <option>Automotive OEM</option>
                        <option>Fleet Operator</option>
                        <option>Energy Infrastructure</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Technical Requirements</label>
                     <textarea required rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900 resize-none" placeholder={formType === "rfq" ? "Specify your voltage, power levels, and target start-of-production date..." : "Describe the technical parameters you wish to discuss with our engineering lead..."} />
                  </div>

                  <button type="submit" className="btn-primary w-full h-16 shadow-xl shadow-brand-primary/20 mt-4 group" disabled={isSubmitting}>
                     {isSubmitting ? "Routing to Engineering..." : formType === "rfq" ? "Request Technical RFQ" : "Expert Consultation"}
                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                     🔒 Encrypted Connection & Secure Data Handling
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
