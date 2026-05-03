"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import { newsletters } from "@/data/newsletters";
import { ArrowLeft, Share2, Mail, Linkedin, Download, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

export default function NewsletterDetailPage() {
  const { slug } = useParams();
  const issue = newsletters.find((n) => n.slug === slug);

  if (!issue) {
    notFound();
  }

  return (
    <article className="pt-32 bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-6">
        {/* Email-style Branded Header */}
        <div className="mb-12 bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative z-10">
            <img src="/images/edrift logo.png" alt="Edrift Electric" className="h-8 invert brightness-0 mb-6 mx-auto" />
            <div className="h-px w-24 bg-brand-primary/30 mx-auto mb-6" />
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Monthly Power Electronics Intelligence</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full" />
        </div>

        {/* Navigation */}
        <Link 
          href="/newsletter" 
          className="inline-flex items-center gap-2 text-text-faint hover:text-brand-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-widest">Back to Intelligence_</span>
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-3 py-1 bg-brand-primary/5 text-brand-primary rounded-md text-[10px] font-bold uppercase tracking-widest border border-brand-primary/10">
              Issue #{issue.issueNumber}
            </span>
            <div className="flex items-center gap-2 text-text-faint">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-widest">{issue.date}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-8 leading-[1.1] tracking-tight">
            {issue.title}
          </h1>

          <p className="text-xl text-text-muted font-medium leading-relaxed mb-10 border-l-4 border-brand-primary/20 pl-8">
            {issue.subject.replace('⚡ Edrift Electric | ', '')}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-border-subtle">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold">
                ED
              </div>
              <div>
                <p className="text-[11px] font-bold text-text-main uppercase tracking-widest">Edrift Engineering Team</p>
                <p className="text-[10px] text-text-faint font-semibold uppercase tracking-widest">Power Electronics Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-lg border border-border-subtle text-text-faint hover:text-brand-primary hover:border-brand-primary/20 transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-lg border border-border-subtle text-text-faint hover:text-brand-primary hover:border-brand-primary/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-lg border border-border-subtle text-text-faint hover:text-brand-primary hover:border-brand-primary/20 transition-all">
                <Mail className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-bg-main border border-border-subtle rounded-lg text-[11px] font-bold text-text-main uppercase tracking-widest hover:bg-white transition-all ml-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>

          {issue.featuredImage && (
            <div className="mt-16 relative aspect-[21/9] overflow-hidden rounded-[32px] border border-border-subtle shadow-lg">
              <img 
                src={issue.featuredImage} 
                alt={issue.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
          )}
        </header>

        {/* Content Render */}
        <div className="newsletter-content">
          <MarkdownRenderer content={issue.content} />
        </div>

        {/* Footer CTA */}
        <footer className="mt-32 pb-48 border-t border-border-subtle pt-20">
          <div className="bg-bg-main rounded-[40px] p-12 border border-border-subtle flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <h3 className="text-2xl font-bold text-text-main mb-4">Want more intelligence?</h3>
              <p className="text-text-muted font-medium max-w-md">
                Subscribe to receive our monthly engineering deep-dives, tool launches, and industry updates directly in your inbox.
              </p>
            </div>
            <Link 
              href="/newsletter"
              className="px-10 py-5 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/10 shrink-0"
            >
              Subscribe Now
            </Link>
          </div>

          <div className="mt-20 flex flex-wrap gap-4">
             {issue.topics.map((topic) => (
               <div key={topic} className="flex items-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-full text-[10px] font-bold text-text-faint uppercase tracking-widest">
                 <Tag className="w-3 h-3" />
                 {topic}
               </div>
             ))}
          </div>
        </footer>
      </div>

      <style jsx global>{`
        .newsletter-content h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0D1117;
          margin-top: 4rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #F3F4F6;
          padding-bottom: 1rem;
        }
        .newsletter-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0D1117;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }
        .newsletter-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #4B5563;
          margin-bottom: 2rem;
          font-weight: 500;
        }
        .newsletter-content hr {
          margin: 4rem 0;
          border: 0;
          border-top: 2px dashed #E5E7EB;
        }
        .newsletter-content strong {
          color: #0D1117;
          font-weight: 700;
        }
        .newsletter-content ul {
          margin-bottom: 2rem;
        }
        .newsletter-content li {
          font-size: 1.125rem;
          color: #4B5563;
          margin-bottom: 1rem;
          font-weight: 500;
          padding-left: 1.5rem;
          position: relative;
        }
        .newsletter-content li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: #0A4FCC;
          font-weight: 800;
        }
      `}</style>
    </article>
  );
}
