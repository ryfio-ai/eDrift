"use client";

import React, { useState } from "react";
import { Phone, Clock, Mail, ChevronDown, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    businessType: "",
    product: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > 250) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.phone,
          product: { name: formData.product || "General Inquiry", sku: formData.businessType || "N/A" },
          description: `Name: ${formData.name}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-4 pb-24 bg-white overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-4 flex flex-col gap-10 pt-8">
            <div>
              <h3 className="text-[13px] font-bold text-text-main mb-6 uppercase tracking-wider">Customer Service</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                  <span className="text-text-muted font-medium text-[15px]">+91 97902 74709</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-brand-primary shrink-0" />
                  <span className="text-text-muted font-medium text-[15px]">24*7 (Mon-Sun)</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                  <span className="text-text-muted font-medium text-[15px]">support@edriftelectric.com</span>
                </div>
              </div>
            </div>

            {/* Map Section - Now integrated into sidebar */}
            <div className="w-full aspect-square lg:aspect-[4/5] bg-slate-100 relative rounded-xl overflow-hidden shadow-sm border border-slate-200" data-animate>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.818267384132!2d77.85720227022637!3d12.72527579278043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae772f630ebaa3%3A0x582a98a4412b5169!2sFORT.Hosur!5e0!3m2!1sen!2sin!4v1777785953434!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Google Map"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-8 bg-slate-50/70 p-8 lg:p-12 rounded-xl">
            <h2 className="text-3xl font-bold text-text-main mb-8">
              How Can We <span className="text-brand-primary">Assist You Today?</span>
            </h2>

            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center" style={{ animation: "heroFadeIn 0.4s ease both" }}>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-3">Request Received!</h3>
                <p className="text-text-muted">Our team will get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitStatus("idle"); setFormData({ name: "", email: "", phone: "", company: "", businessType: "", product: "", message: "" }); }}
                  className="mt-8 text-brand-primary font-bold hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {submitStatus === "error" && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3 border border-red-100">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>There was an error sending your request. Please try again.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm placeholder:text-text-faint" />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm placeholder:text-text-faint" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm placeholder:text-text-faint" />
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name (Optional)" className="w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm placeholder:text-text-faint" />
                </div>

                <div className="relative">
                  <select required name="businessType" value={formData.businessType} onChange={handleChange} className={cn("w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm appearance-none cursor-pointer", formData.businessType ? "text-text-main" : "text-text-faint")}>
                    <option value="" disabled hidden>Type of Business</option>
                    <option value="Residential Welfare Associations">Residential Welfare Associations/Community Charging</option>
                    <option value="Builders/Developers">Builders/Developers/New Construction</option>
                    <option value="Hotels/Resorts">Hotels/Resorts/Hospitality</option>
                    <option value="Retail Business/Garages">Retail Business/Garages</option>
                    <option value="Highway/Pitstop Charging">Highway/Pitstop Charging</option>
                    <option value="Distribution/Channel Partnership">Distribution/Channel Partnership</option>
                    <option value="OEM Partnership">OEM Partnership</option>
                    <option value="Fleet Partnerships">Fleet Partnerships</option>
                    <option value="Workplaces/Corporate Parks">Workplaces/Corporate Parks</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
                </div>

                <div className="relative">
                  <select required name="product" value={formData.product} onChange={handleChange} className={cn("w-full bg-white border border-border-strong h-[46px] rounded-md px-4 outline-none focus:border-brand-primary transition-all text-sm appearance-none cursor-pointer", formData.product ? "text-text-main" : "text-text-faint")}>
                    <option value="" disabled hidden>What products are you interested in?</option>
                    <option value="Portable EV Charger">Portable EV Charger</option>
                    <option value="On Board Charger">On Board Charger</option>
                    <option value="On Board DC-DC">On Board DC-DC</option>
                    <option value="2-in-1 Integrated OBC">2-in-1 Integrated OBC</option>
                    <option value="Bi-Directional Charger (V2L)">Bi-Directional Charger (V2L)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
                </div>

                <div>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows={4}
                    className="w-full bg-white border border-border-strong rounded-md px-4 py-3 outline-none focus:border-brand-primary transition-all text-sm resize-none placeholder:text-text-faint"
                  />
                  <div className="flex justify-end mt-1.5">
                    <span className="text-[11px] text-text-muted font-medium">{formData.message.length} / 250</span>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button type="submit" disabled={isSubmitting} className="w-full md:w-[140px] bg-brand-primary hover:bg-brand-primary/90 text-white h-[42px] rounded-full font-bold text-sm flex items-center justify-center transition-colors shadow-sm">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit"}
                  </button>
                </div>

                <p className="text-[9px] text-text-muted mt-6 leading-relaxed text-justify opacity-80">
                  By filling out this form, you consent to your personal data being processed by eDrift Electric. This data will be communicated to the respective departments of the organization depending on the nature of the inquiry. This data will be kept in the organization for a period of 10 years. If you wish to withdraw your consent or wish to access more information on how your data is being processed, <a href="#" className="text-brand-primary hover:underline">please review our Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
