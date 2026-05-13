import { useState, useEffect } from 'react';
import { Shield, Globe, Paintbrush, Zap, ArrowRight, CheckCircle, ChevronRight, MessageCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteForm from '../components/QuoteForm';
import { SkeletonHero, SkeletonCard } from '../components/Skeleton';
import heroMain from '../assets/hero_main.webp';
import catTeamwear from '../assets/cat_teamwear.webp';
import catTraining from '../assets/cat_training.webp';
import catSchool from '../assets/cat_school.png';
import catPrivate from '../assets/cat_private.png';

const FAQAccordian = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    { q: "What is your Minimum Order Quantity (MOQ)?", a: "We are optimized for clubs and startups, offering MOQs as low as 10 units per design for custom apparel." },
    { q: "How long does global shipping take?", a: "Typically 5-8 business days for air freight delivery to the USA, UK, and Europe once production and quality control are complete." },
    { q: "Can we get a physical sample first?", a: "Yes. We always recommend a tech-sample phase to confirm sizing, fabric feel, and print quality before committing to bulk production." },
    { q: "Do you offer private label services?", a: "Absolutely. We specialize in custom neck labels, hang tags, and high-quality bespoke branding solutions for growing sports apparel brands." }
  ];

  return (
    <div className="space-y-6">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`glass-apple rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 ${activeIndex === i ? 'bg-white/[0.05] border-primary/20' : 'hover:bg-white/[0.03]'}`}
        >
          <button
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
            className="w-full p-10 md:p-12 text-left flex items-center justify-between"
          >
            <h4 className="text-white font-black uppercase tracking-tight text-lg md:text-xl italic flex items-center">
              <span className="text-primary mr-6 md:mr-8 text-2xl">Q.</span>
              {faq.q}
            </h4>
            <motion.div
              animate={{ rotate: activeIndex === i ? 180 : 0 }}
              className="text-primary"
            >
              <ChevronDown size={28} />
            </motion.div>
          </button>

          <AnimatePresence>
            {activeIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-10 md:px-12 pb-12">
                  <p className="text-white/40 text-lg leading-relaxed font-medium italic pl-10 border-l border-primary/20">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const appleEase = [0.22, 1, 0.36, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: appleEase }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    },
    viewport: { once: true, margin: "-100px" }
  };

  if (loading) {
    return (
      <div className="bg-background-dark pt-24 min-h-screen">
        <SkeletonHero />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-20 mt-12">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden section-elite flex items-center min-h-[95vh]">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-full h-full bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-32 z-0"
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-primary text-[10px] font-black tracking-[0.4em] mb-10"
            >
              <Zap size={14} className="fill-primary" />
              <div className="flex divide-x divide-white/10">
                <span className="px-4">LOW MOQ</span>
                <span className="px-4">FAST PRODUCTION</span>
                <span className="px-4">EXPORT QUALITY</span>
                <span className="px-4">WORLDWIDE SHIPPING</span>
              </div>
            </motion.div>
            
            <h1 className="text-[clamp(3rem,6vw,5rem)] font-black text-white leading-[0.85] mb-10 uppercase tracking-tighter max-w-2xl">
              <span className="block italic text-white/90">TEAMWEAR WITHOUT</span>
              <span className="text-primary italic text-glow">COMPROMISE</span>
            </h1>
            
            <p className="text-xl text-white/40 mb-14 max-w-xl leading-relaxed font-medium italic">
              Custom sportswear manufacturing for <span className="text-white">clubs, schools, and brands</span> — built for performance, delivered worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <a 
                  href="#quote" 
                  className="btn-primary group flex items-center justify-center space-x-4 px-12 py-5"
                >
                  <span className="tracking-[0.4em]">GET QUOTE NOW</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <a 
                  href="https://wa.me/923425744310?text=Hi, I want to get a quote for sportswear." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-4 px-12 py-5 border-white/10"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="tracking-[0.3em]">CHAT ON WHATSAPP</span>
                </a>
              </motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic"
            >
               We respond within 24 hours
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, ease: appleEase }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] p-2.5 bg-white/[0.02] group">
               <img src={heroMain} alt="SMI Sportswear Hero" loading="eager" decoding="async" className="w-full h-auto rounded-[3.8rem] grayscale hover:grayscale-0 transition-all duration-[2s] ease-apple" />
               <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-60"></div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 glass-apple p-8 rounded-[2.5rem] z-20 shadow-2xl border-white/10"
            >
              <p className="text-primary font-black text-4xl leading-none italic uppercase tracking-tighter">ELITE</p>
              <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mt-2">Get Sample in Days</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="section-elite bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-2 lg:grid-cols-4 gap-16"
          >
            {[
              { icon: <Shield size={36} />, title: "Low Minimum Order Quantity", desc: "Start from 10 units" },
              { icon: <Globe size={36} />, title: "Worldwide Shipping", desc: "Reliable global shipping" },
              { icon: <Paintbrush size={36} />, title: "Custom Design Support", desc: "Sample to door in days" },
              { icon: <Zap size={36} />, title: "Premium Performance Fabric", desc: "Beat middleman costs" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight text-xl mb-1">{item.title}</h4>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-elite relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="mb-24 text-center"
          >
            <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">Master Collections</h2>
            <h3 className="text-6xl md:text-8xl font-black text-white uppercase italic leading-none">Sportswear Built for <br /><span className="text-white/10">Every Team</span></h3>
            <p className="text-xl text-white/40 mt-10 max-w-3xl mx-auto leading-relaxed font-medium italic">
              From local clubs to international brands — we manufacture high-performance apparel tailored to your needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Teamwear", img: catTeamwear, count: "50+ Products" },
              { title: "Training Wear", img: catTraining, count: "30+ Items" },
              { title: "School Sports Uniform", img: catSchool, count: "20+ Styles" },
              { title: "Private Label Production", img: catPrivate, count: "Custom Orders" }
            ].map((cat, i) => (
              <motion.a 
                href="/products" 
                key={i} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 1, ease: appleEase }}
                className="group relative h-[600px] rounded-[3.5rem] overflow-hidden border border-white/5 block hover-card-elite"
                whileHover={{ y: -15, scale: 1.02 }}
              >
                <img src={cat.img} alt={cat.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-apple opacity-30 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-[3.5rem] transition-all duration-700" />
                
                <div className="absolute inset-x-0 bottom-0 p-12 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-apple">
                  <p className="text-[10px] font-black text-primary tracking-[0.4em] uppercase mb-4 opacity-70 transition-all duration-700">{cat.count}</p>
                  <h4 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-8 tracking-tighter">{cat.title}</h4>
                  <div className="flex items-center text-white text-[10px] font-black tracking-[0.4em] transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <span>EXPLORE NOW</span>
                    <ArrowRight size={16} className="ml-3 text-primary animate-pulse" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capability */}
      <section className="section-elite bg-white/[0.01] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="order-2 lg:order-1 grid grid-cols-2 gap-8"
            >
              {[
                { title: "Sublimation Printing", desc: "No-fade permanent HD graphics" },
                { title: "Cut & Sew Production", desc: "Pro-athletic tailoring" },
                { title: "Embroidery & Custom Logos", desc: "Premium textured branding" },
                { title: "Advanced Printing Techniques", desc: "High-volume industrial prints" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="glass-apple rounded-[2.5rem] p-10 group hover:bg-white/[0.05] transition-all duration-700"
                >
                  <h4 className="text-primary font-black uppercase text-sm mb-4 tracking-[0.2em]">{item.title}</h4>
                  <p className="text-white/30 text-[10px] uppercase font-black tracking-widest leading-relaxed italic">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="order-1 lg:order-2"
            >
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">Vertical Integration</h2>
              <h3 className="text-6xl md:text-7xl font-black text-white mb-12 leading-[0.9] uppercase">Full-Service Manufacturing <br /><span className="text-white/10 italic">Under One Roof</span></h3>
              <p className="text-xl text-white/30 mb-14 leading-relaxed font-medium italic">
                We control every step — ensuring consistent quality, speed, and precision.
              </p>
              <div className="space-y-8 mb-16">
                {[
                  "In-house pattern engineering",
                  "ISO-certified quality inspection",
                  "Italian eco-friendly inks"
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="flex items-center space-x-5"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-glow">
                      <CheckCircle size={22} />
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-white/70 italic">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                whileHover={{ x: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <a 
                  href="/manufacturing" 
                  className="btn-secondary inline-flex items-center space-x-5 border-white/5 py-5 px-10"
                >
                  <span className="tracking-[0.3em]">LEARN OUR PROCESS</span>
                  <ChevronRight size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose SMI Sections (Trust Building) */}
      <section className="section-elite relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">THE SMI ADVANTAGE</h2>
            <h3 className="text-6xl md:text-7xl font-black text-white italic uppercase tracking-tighter">Why Clients Choose <br /><span className="text-white/10 uppercase">SMI Sportswear</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Direct Factory Pricing", desc: "(No Middleman). We manufacture everything in-house in Sialkot, passing the savings directly to you.", icon: <Zap /> },
              { title: "Fast Turnaround Production", desc: "Sample to door in days, with streamlined bulk manufacturing cycles.", icon: <Zap /> },
              { title: "Strict Quality Control", desc: "Every garment undergoes ISO-certified multi-stage inspection before dispatch.", icon: <Shield /> },
              { title: "Experience in Export Orders", desc: "Proven track record serving clubs and brands across USA, Europe, and UAE.", icon: <Shield /> }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ delay: i * 0.1 }}
                className="glass-apple p-12 rounded-[3.5rem] border-white/5 hover:bg-white/[0.04] transition-all duration-700"
              >
                <div className="text-primary mb-8 bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center border border-primary/20 shadow-glow">
                  {item.icon}
                </div>
                <h4 className="text-white font-black uppercase tracking-tight text-2xl mb-6 italic">{item.title}</h4>
                <p className="text-white/30 text-sm leading-relaxed font-medium italic mb-8">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Friction Removal) */}
      <section className="section-elite bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">SEAMLESS WORKFLOW</h2>
            <h3 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter">Simple & <span className="text-white/10 uppercase">Transparent Process</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            
            {[
              { step: "01", title: "Send Your Requirements", desc: "Contact us with your concepts & quantity" },
              { step: "02", title: "Confirm Sample & Approve Design", desc: "Confirm fabric & fit within days" },
              { step: "03", title: "Production Begins", desc: "Pro-quality mass production" },
              { step: "04", title: "Delivery to Your Location", desc: "Global shipping with tracking" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ delay: i * 0.15 }}
                className="relative z-10 text-center flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-full glass-apple mb-8 flex items-center justify-center text-4xl font-black text-primary border border-primary/20 shadow-premium">
                  {item.step}
                </div>
                <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-4">{item.title}</h4>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-24 flex flex-col items-center">
             <a href="#quote" className="btn-primary px-16 py-6 group flex items-center space-x-6">
                <span className="tracking-[0.4em]">START YOUR ORDER</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
             </a>
             <p className="mt-8 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">GET YOUR SAMPLE PROCESS STARTED IN 24 HOURS</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section (Buyer Psychology) */}
      <section className="section-elite relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">BUYER'S GUIDE</h2>
            <h3 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter">COMMON <span className="text-white/10 uppercase">QUESTIONS</span></h3>
          </motion.div>

          <FAQAccordian />

          <div className="mt-20 glass-apple p-12 rounded-[3.5rem] border border-primary/10 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[100px]" />
             <h4 className="text-white font-black uppercase tracking-tighter text-3xl mb-8 italic">STILL HAVE <span className="text-primary italic">DOUBTS?</span></h4>
             <a href="https://wa.me/923425744310" className="inline-flex items-center space-x-6 text-white hover:text-primary transition-colors duration-500 font-black tracking-[0.3em] text-[10px] uppercase italic">
                <span>TALK TO A PRODUCTION EXPERT</span>
                <MessageCircle size={22} className="text-[#25D366]" />
             </a>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="section-elite relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">Direct Factory Access</h2>
              <h2 className="text-6xl md:text-8xl font-black text-white mb-12 uppercase italic leading-[0.85] tracking-tighter">Get Your <br /><span className="text-primary text-glow">Custom Quote</span></h2>
              <p className="text-2xl text-white/30 mb-20 max-w-lg leading-relaxed font-medium italic">
                Tell us what you need — we’ll handle the rest. <span className="text-white">Quality starts with a conversation.</span>
              </p>
              
              <div className="space-y-16">
                {[
                  { num: "01", title: "Submit Brief", desc: "Share your requirements and concept." },
                  { num: "02", title: "Sample Order", desc: "Verify quality with a physical prototype." },
                  { num: "03", title: "Batch Run", desc: "Full scale production in our factory." }
                ].map((step, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 1, ease: appleEase }}
                    className="flex items-start space-x-10 group"
                  >
                    <div className="text-6xl font-black text-white/[0.03] transition-colors duration-700 group-hover:text-primary/20 leading-none">{step.num}</div>
                    <div className="pt-3">
                      <h4 className="text-white font-black uppercase tracking-[0.3em] text-sm mb-3">{step.title}</h4>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: appleEase }}
              viewport={{ once: true }}
              className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[4.5rem] shadow-premium"
            >
              <div className="bg-background-dark rounded-[4.4rem] p-1 overflow-hidden">
                <QuoteForm />
              </div>
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-[100px] z-0" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/10 blur-[100px] z-0" />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
