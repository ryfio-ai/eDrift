"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <section id="contact" className="py-32 px-6 bg-bg-subtle overflow-hidden relative border-t border-border-subtle">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side: Contact Information */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[2px] bg-brand-primary" />
               <div className="label-uppercase">Contact Engineering</div>
            </div>
            <h2 className="mb-8">
               Talk to our <br />
               <span className="text-brand-primary">Technical Team_</span>
            </h2>
            <p className="text-lg text-text-muted font-medium leading-relaxed mb-12 max-w-lg">
               Connect with eDrift for feasibility reviews, system-level discussions, custom specifications, and RFQ planning for production programs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
               {[
                 { icon: Mail, label: "Technical Support", val: "eng@edriftelectric.com" },
                 { icon: Phone, label: "Business Development", val: "+91 97902 74709" },
                 { icon: MapPin, label: "Engineering Base", val: "Hosur, Tamil Nadu / IIT Palakkad Ecosystem" }
               ].map((item, i) => (
                 <div key={i} className={cn(
                   "p-8 bg-white rounded-[24px] border border-border-subtle shadow-sm transition-all hover:border-brand-primary/10",
                   i === 2 ? "sm:col-span-2" : ""
                 )}>
                    <item.icon className="w-6 h-6 text-brand-primary mb-6" />
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-text-faint font-bold mb-2">{item.label}</p>
                        <p className="text-sm font-bold text-text-main">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest flex items-center gap-3 mt-auto">
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
              className="bg-white p-10 lg:p-14 rounded-[40px] border border-border-subtle shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
            >
              <div className="mb-10 text-center">
                 <h3 className="text-2xl font-bold text-text-main mb-3">Submit an RFQ Request</h3>
                 <p className="text-xs font-bold text-text-faint uppercase tracking-widest">
                   {step === 1 ? "Step 1: Application & Requirements" : "Step 2: Project Details"}
                 </p>
                 <div className="flex gap-2 mt-6 justify-center">
                   <div className={cn("h-1 rounded-full transition-all duration-500", step === 1 ? "w-12 bg-brand-primary" : "w-6 bg-bg-subtle")} />
                   <div className={cn("h-1 rounded-full transition-all duration-500", step === 2 ? "w-12 bg-brand-primary" : "w-6 bg-bg-subtle")} />
                 </div>
              </div>

              {submitted ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-primary/20">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-4">Transmission Successful</h3>
                  <p className="text-text-muted font-medium mb-8">Our engineering lead will contact you within 24 hours.</p>
                  <button onClick={() => { setSubmitted(false); setStep(1); }} className="btn-outline w-full">Initiate New Inquiry</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 ? (
                    <motion.div 
                      key="step-1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-main">Company name</label>
                        <input required className="w-full bg-bg-subtle border border-border-subtle h-12 rounded-input px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main" placeholder="OEM / Industrial Partner" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-main">Work email address</label>
                        <input required type="email" className="w-full bg-bg-subtle border border-border-subtle h-12 rounded-input px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main" placeholder="engineering-lead@company.com" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-main">Product interest</label>
                        <div className="relative">
                          <select className="w-full bg-bg-subtle border border-border-subtle h-12 rounded-input px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main appearance-none">
                            <option>3.3kW On-Board Charger</option>
                            <option>Portable Fleet Charger</option>
                            <option>Custom PSU Solution</option>
                            <option>DC Fast Charging Systems</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-main">Estimated annual volume</label>
                        <input required className="w-full bg-bg-subtle border border-border-strong h-12 rounded-xl px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main" placeholder="e.g. 5,000 units / year" />
                      </div>
                      <button type="button" onClick={nextStep} className="btn-primary w-full shadow-lg shadow-brand-primary/10 mt-4 group">
                        Next: Project Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="step-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-text-main">Full name</label>
                          <input required className="w-full bg-bg-subtle border border-border-subtle h-12 rounded-input px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main" placeholder="John Doe" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-text-main">Professional role</label>
                          <input required className="w-full bg-bg-subtle border border-border-subtle h-12 rounded-input px-5 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main" placeholder="Engineering Lead" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-text-main">Requirement summary</label>
                        <textarea required rows={4} className="w-full bg-bg-subtle border border-border-subtle rounded-input px-5 py-4 outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-text-main resize-none" placeholder="Share your application, power requirement, and deployment timeline..." />
                      </div>
                      <div className="flex gap-4">
                        <button type="button" onClick={prevStep} className="btn-outline flex-1">Back</button>
                        <button type="submit" className="btn-primary flex-[2] group" disabled={isSubmitting}>
                          {isSubmitting ? "Routing to Engineering..." : "Submit RFQ"}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <p className="text-[9px] text-center text-text-faint font-bold uppercase tracking-widest pt-4">
                     NDA-friendly discussions • Encrypted data handling
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
