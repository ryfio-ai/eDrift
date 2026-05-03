import React from "react";
import Link from "next/link";
import { ArrowRight, Newspaper, Mail, CheckCircle2 } from "lucide-react";
import { newsletters } from "@/data/newsletters";

export default function NewsletterIndexPage() {
  return (
    <main className="pt-32 pb-48 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-brand-primary" />
            <p className="text-[10px] tracking-[0.15em] font-semibold text-brand-primary uppercase">Intelligence_</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-8 tracking-tight">
            Monthly Power Electronics <br />
            <span className="text-brand-primary">Intelligence_</span>
          </h1>
          <p className="text-base md:text-lg text-text-muted font-medium max-w-2xl leading-relaxed">
            Engineering insights, technical deep-dives, product updates, 
            and EV charging industry analysis — delivered to your inbox 
            every month.
          </p>
        </div>

        {/* Latest Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {newsletters.map((issue) => (
            <div 
              key={issue.slug}
              className="group p-10 bg-bg-main border border-border-subtle rounded-[32px] hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {issue.featuredImage && (
                  <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-2xl border border-border-subtle">
                    <img 
                      src={issue.featuredImage} 
                      alt={issue.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  </div>
                )}
                <div className="flex items-center justify-between mb-8">
                  <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-faint border border-border-subtle">
                    Issue #{issue.issueNumber} • {issue.date}
                  </span>
                  <Newspaper className="w-5 h-5 text-text-faint group-hover:text-brand-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-6 group-hover:text-brand-primary transition-colors leading-tight">
                  {issue.title}
                </h3>
                <p className="text-sm text-text-muted font-medium leading-relaxed mb-8">
                  {issue.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {issue.topics.map((topic) => (
                    <span key={topic} className="text-[9px] font-semibold uppercase tracking-widest text-text-faint bg-white px-2 py-1 rounded-md border border-border-subtle">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border-subtle flex items-center justify-between">
                <Link 
                  href={`/newsletter/${issue.slug}`}
                  className="flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:gap-4 transition-all"
                >
                  Read Newsletter <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="text-[10px] font-bold uppercase tracking-widest text-text-faint hover:text-text-main transition-colors">
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe Section */}
        <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-8">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
                Get Monthly Power Electronics <br /> Intelligence in your inbox
              </h2>
              <div className="space-y-4">
                {[
                  "Technical content — not marketing",
                  "1 email per month — no spam",
                  "Unsubscribe anytime"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/60 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <form className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Email Address_</label>
                  <input 
                    type="email" 
                    placeholder="engineer@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary transition-colors font-medium"
                  />
                </div>
                <button className="w-full py-5 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 group">
                  Subscribe Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-center text-white/30 font-medium pt-2">
                  By subscribing, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
        </div>

        {/* Benefits Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-border-subtle pt-20">
          <Link href="/case-studies" className="group block p-6 rounded-2xl hover:bg-bg-main transition-colors">
            <h4 className="text-lg font-bold text-text-main mb-3 group-hover:text-brand-primary transition-colors">Case Studies</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">New case studies with measured field data from recent deployments.</p>
          </Link>
          <div className="p-6">
            <h4 className="text-lg font-bold text-text-main mb-3">Design Tools</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">Engineering tool launches and updates for power electronics design.</p>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-bold text-text-main mb-3">Technical Deep-Dives</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">In-depth analysis of topologies, semiconductors, and control systems.</p>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-bold text-text-main mb-3">Standards & Policy</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">India-specific EV policy and AIS standards updates.</p>
          </div>
          <div className="p-6">
            <h4 className="text-lg font-bold text-text-main mb-3">Product Roadmap</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">Previews of upcoming Edrift power conversion platforms.</p>
          </div>
          <Link href="/careers" className="group block p-6 rounded-2xl hover:bg-bg-main transition-colors">
            <h4 className="text-lg font-bold text-text-main mb-3 group-hover:text-brand-primary transition-colors">Engineering Jobs</h4>
            <p className="text-sm text-text-muted font-medium leading-relaxed">Open engineering positions at our Bangalore design center.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
