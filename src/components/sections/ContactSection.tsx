"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";

export const ContactSection = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side: Contact Information */}
          <div>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[2px] bg-brand-primary" />
               <div className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">Contact Engineering</div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
               Talk to our <br />
               <span className="text-brand-primary">Technical Team_</span>
            </h2>
            <p className="text-lg text-slate-500 font-semibold leading-relaxed mb-12 max-w-lg">
               Connect with eDrift for feasibility reviews, system-level discussions, custom specifications, and RFQ planning for production or pilot programs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
               {[
                 { icon: Mail, label: "Technical Support", val: "eng@edriftelectric.com" },
                 { icon: Phone, label: "Business Development", val: "+91 97902 74709" },
                 { icon: MapPin, label: "Engineering Base", val: "Hosur, Tamil Nadu / IIT Palakkad" }
               ].map((item, i) => (
                 <div key={i} className={`p-8 bg-white rounded-3xl border border-slate-100 shadow-sm ${i === 2 ? "sm:col-span-2" : ""}`}>
                    <item.icon className="w-6 h-6 text-brand-primary mb-6" />
                    <div>
                       <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">{item.label}</p>
                       <p className="text-sm font-black text-slate-900">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-3">
              <Clock className="w-4 h-4 text-brand-primary" />
              Initial response within 1 business day for qualified inquiries
            </p>
          </div>

          {/* Right Side: Progressive RFQ Form */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 lg:p-12 rounded-[40px] border border-slate-100 shadow-2xl"
            >
              <div className="mb-10 text-center">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Submit an RFQ Request</h3>
                 <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                   {step === 1 ? "Step 1: Product & Volume" : "Step 2: Project Details"}
                 </p>
                 <div className="flex gap-2 mt-6 justify-center">
                   <div className={`h-1 rounded-full transition-all duration-300 ${step === 1 ? "w-12 bg-brand-primary" : "w-6 bg-slate-100"}`} />
                   <div className={`h-1 rounded-full transition-all duration-300 ${step === 2 ? "w-12 bg-brand-primary" : "w-6 bg-slate-100"}`} />
                 </div>
              </div>

              {submitted ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-primary/20">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Transmission Successful</h3>
                  <p className="text-slate-500 font-semibold mb-8">Our engineering lead will contact you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-outline w-full">Initiate New Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Company Name</label>
                        <input required className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="OEM / Industrial Partner" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Work Email</label>
                        <input required type="email" className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="engineering-lead@company.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Product Interest</label>
                        <div className="relative">
                          <select className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900 appearance-none">
                            <option>3.3kW On-Board Charger</option>
                            <option>Portable Fleet Charger</option>
                            <option>Custom PSU Solution</option>
                            <option>DC Fast Charging Systems</option>
                          </select>
                          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Estimated Annual Volume</label>
                        <input required className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="e.g. 5,000 units/year" />
                      </div>
                      <button type="button" onClick={nextStep} className="btn-primary w-full h-16 shadow-xl shadow-brand-primary/20 mt-4 group">
                        Next: Project Details
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Full Name</label>
                          <input required className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Professional Role</label>
                          <input required className="w-full bg-slate-50 border border-slate-100 h-14 rounded-xl px-6 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900" placeholder="Engineering Lead" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-500">Requirement Summary</label>
                        <textarea required rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all font-semibold text-slate-900 resize-none" placeholder="Share your application, power requirement, and deployment timeline..." />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={prevStep} className="btn-outline flex-1 h-16">Back</button>
                        <button type="submit" className="btn-primary flex-[2] h-16 shadow-xl shadow-brand-primary/20 group" disabled={isSubmitting}>
                          {isSubmitting ? "Routing to Engineering..." : "Submit RFQ Request"}
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">
                     NDA-friendly discussions and encrypted data handling
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
