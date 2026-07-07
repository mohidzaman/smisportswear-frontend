'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ChevronDown, HelpCircle, Shield, Truck, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className={`glass-apple rounded-[1.5rem] border border-white/5 overflow-hidden transition-all duration-500 ${openIndex === index ? 'bg-white/[0.04] border-primary/20' : 'hover:bg-white/[0.02]'}`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            className="w-full p-6 text-left flex items-center justify-between gap-4"
          >
            <h4 className="text-white font-black uppercase tracking-tight text-sm md:text-lg italic flex items-center pr-4">
              <span className="text-primary mr-3 text-lg">Q.</span>
              {faq.q}
            </h4>
            <ChevronDown 
              size={18} 
              className={`text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-6 pb-6 pt-2 border-t border-white/5">
                  <p className="text-white/40 text-xs md:text-sm leading-relaxed font-medium pl-6 border-l border-primary/20">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default function SeoServicePage({ 
  title, 
  subtitle, 
  keyword,
  introText, 
  specs, 
  processText, 
  fabricsText, 
  faqs,
  imageSrc,
  imageAlt
}) {
  const appleEase = [0.22, 1, 0.36, 1];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark min-h-screen pt-24 md:pt-32 overflow-x-hidden"
    >
      {/* Hero Header */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/5 blur-[100px] md:blur-[150px] rounded-full -mr-48 -mt-48 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-primary text-[8px] md:text-[10px] font-black tracking-[0.3em] uppercase mb-8">
              <Sparkles size={12} className="fill-primary text-primary" />
              <span>B2B Industrial Catalog</span>
            </span>
            
            <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-white leading-[0.9] mb-8 uppercase tracking-tighter">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-white/40 max-w-2xl leading-relaxed font-medium italic mb-10 mx-auto lg:mx-0">
              {subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/contact" className="btn-primary group flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4">
                <span className="tracking-[0.2em] text-[10px]">INQUIRE ABOUT BULK ORDERS</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <a 
                href="https://wa.me/923425744310" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary flex items-center justify-center space-x-2 w-full sm:w-auto px-8 py-4 border-white/10"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                <span className="tracking-[0.2em] text-[10px]">WHATSAPP SALES</span>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.02] p-1.5 shadow-premium group">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                loading="eager" 
                className="w-full h-auto object-cover rounded-[1.8rem] md:rounded-[2.8rem] grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-40 group-hover:opacity-60" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-apple p-4 rounded-2xl border-white/10 text-center">
              <p className="text-primary font-black text-xl leading-none italic uppercase tracking-tighter">SMI PRO</p>
              <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mt-1">Sialkot Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Content (1,500 - 2,500 words target breakdown) */}
      <section className="py-16 md:py-24 border-y border-white/[0.03] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Long Form Content */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Section 1: Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight italic">
                1. Custom {keyword} Manufacturing & Supply
              </h2>
              <div className="text-white/40 text-xs md:text-sm leading-relaxed font-medium space-y-4">
                {introText.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 2: Manufacturing Details */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight italic">
                2. Enterprise Production & Quality Process
              </h2>
              <div className="text-white/40 text-xs md:text-sm leading-relaxed font-medium space-y-4">
                {processText.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Section 3: Fabrics and Materials */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight italic">
                3. Technical Fabrics & Custom Sourcing
              </h2>
              <div className="text-white/40 text-xs md:text-sm leading-relaxed font-medium space-y-4">
                {fabricsText.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Internal Links for Siloing & Authority */}
            <div className="p-6 rounded-2xl glass-apple border border-white/5 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary">Related Service Hubs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-wider italic text-white/40">
                <Link href="/custom-sportswear" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>Custom Sportswear</span>
                </Link>
                <Link href="/oem-sportswear" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>OEM Manufacturing</span>
                </Link>
                <Link href="/private-label-sportswear" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>Private Label Apparel</span>
                </Link>
                <Link href="/manufacturing-process" className="hover:text-primary transition-colors flex items-center gap-1">
                  <span>Our Factory Process</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: B2B Specifications Table & Quick Details */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Specs Card */}
            <div className="p-8 rounded-3xl glass-apple border border-primary/10 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] pointer-events-none" />
              
              <h3 className="text-sm font-black uppercase text-white tracking-[0.2em] mb-6 italic pb-3 border-b border-white/5">
                B2B SPECIFICATIONS
              </h3>

              <ul className="space-y-5">
                {[
                  { label: "Minimum Order Quantity (MOQ)", value: specs.moq || "50 units per design" },
                  { label: "Lead Production Time", value: specs.leadTime || "15 to 20 business days" },
                  { label: "Shipping Logistics", value: specs.shipping || "Worldwide Air Cargo via DHL / FedEx" },
                  { label: "Customization Printing Options", value: specs.customization || "Sublimation, Screen Print, 3D Badges, Custom Embroidery" },
                  { label: "Fabric Sourcing Weight", value: specs.weight || "140 GSM to 280 GSM performance blends" },
                  { label: "Color Match standard", value: specs.colors || "Pantone Solid Coated Matching system" },
                  { label: "Eco-Ink Standard", value: "Italian eco-friendly water-soluble sublimation ink" }
                ].map((spec, idx) => (
                  <li key={idx} className="flex flex-col space-y-1">
                    <span className="text-[8px] font-black uppercase text-white/30 tracking-widest">{spec.label}</span>
                    <span className="text-xs font-bold text-white uppercase tracking-tight italic">{spec.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Benefit Icons */}
            <div className="space-y-4">
              {[
                { icon: <Shield size={20} className="text-primary" />, title: "ISO 9001 quality audit", desc: "Garments audited before packing." },
                { icon: <Truck size={20} className="text-primary" />, title: "Duties & logistics assistance", desc: "Custom clearance guidance." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl glass-apple border border-white/5 items-center">
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 shadow-glow shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-white italic">{benefit.title}</h4>
                    <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-background-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6">Frequently Asked Questions</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter">B2B Manufacturing <span className="text-white/10 uppercase">FAQs</span></h3>
          </div>

          <FAQSection faqs={faqs} />
        </div>
      </section>

      {/* Quote Request Form Redirect Block */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-white/[0.01] border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-apple p-10 md:p-16 lg:p-24 rounded-[3rem] border border-primary/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 uppercase italic leading-[0.9] tracking-tighter">
                Transform Concepts into <br /><span className="text-primary text-glow">Performance Gear</span>
              </h2>
              <p className="text-base md:text-lg text-white/30 mb-12 max-w-xl mx-auto leading-relaxed font-medium italic">
                SMI Sportswear provides complete OEM, ODM, and Private Label sportswear design services for growing global sports brands.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact" className="btn-primary w-full sm:w-auto px-12 py-5 group flex items-center justify-center space-x-3">
                  <span className="tracking-[0.3em] text-[10px]">REQUEST FREE DIGITAL MOCKUP</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
