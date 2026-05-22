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
    { q: "What is your Minimum Order Quantity (MOQ)?", a: "We are optimized for clubs and startups, offering MOQs as low as 50 units per design for custom apparel." },
    { q: "How long does global shipping take?", a: "Typically 5-8 business days for air freight delivery to the USA, UK, and Europe once production and quality control are complete." },
    { q: "Can we get a physical sample first?", a: "Yes. We always recommend a tech-sample phase to confirm sizing, fabric feel, and print quality before committing to bulk production." },
    { q: "Do you offer private label services?", a: "Absolutely. We specialize in custom neck labels, hang tags, and high-quality bespoke branding solutions for growing sports apparel brands." }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`glass-apple rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-700 ${activeIndex === i ? 'bg-white/[0.05] border-primary/20' : 'hover:bg-white/[0.03]'}`}
        >
          <button
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
            className="w-full p-6 md:p-12 text-left flex items-center justify-between"
          >
            <h4 className="text-white font-black uppercase tracking-tight text-base md:text-xl italic flex items-center pr-4">
              <span className="text-primary mr-4 md:mr-8 text-xl md:text-2xl">Q.</span>
              {faq.q}
            </h4>
            <motion.div
              animate={{ rotate: activeIndex === i ? 180 : 0 }}
              className="text-primary flex-shrink-0"
            >
              <ChevronDown size={24} />
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
                <div className="px-6 md:px-12 pb-8 md:pb-12">
                  <p className="text-white/40 text-sm md:text-lg leading-relaxed font-medium italic pl-6 md:pl-10 border-l border-primary/20">
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
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 py-20 mt-12">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:py-32 lg:py-48 flex items-center min-h-[90vh] md:min-h-screen">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.12, 0.05]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-full h-full bg-primary/10 blur-[150px] rounded-full -mr-64 -mt-32 z-0"
        />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
            className="text-center lg:text-left relative z-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center space-x-3 px-4 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/10 text-primary text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] mb-8 md:mb-10 mx-auto lg:mx-0 max-w-full"
            >
              <Zap size={12} className="fill-primary" />
              <div className="flex divide-x divide-white/10 overflow-x-auto no-scrollbar">
                <span className="px-2 md:px-4 whitespace-nowrap">LOW MOQ</span>
                <span className="px-2 md:px-4 whitespace-nowrap">FAST PRODUCTION</span>
                <span className="px-2 md:px-4 whitespace-nowrap">EXPORT QUALITY</span>
                <span className="px-2 md:px-4 whitespace-nowrap">WORLDWIDE SHIPPING</span>
              </div>
            </motion.div>
            
            <h1 className="text-[clamp(2.5rem,10vw,5rem)] font-black text-white leading-[0.9] mb-8 md:mb-10 uppercase tracking-tighter max-w-2xl mx-auto lg:mx-0">
              <span className="block italic text-white/90">TEAMWEAR WITHOUT</span>
              <span className="text-primary italic text-glow">COMPROMISE</span>
            </h1>
            
            <p className="text-base md:text-xl text-white/40 mb-10 md:mb-14 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium italic">
              Custom sportswear manufacturing for <span className="text-white">clubs, schools, and brands</span> — built for performance, delivered worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <a 
                  href="#quote" 
                  className="btn-primary group flex items-center justify-center space-x-4 px-8 md:px-12 py-4 md:py-5 w-full sm:w-auto"
                >
                  <span className="tracking-[0.3em] md:tracking-[0.4em]">GET QUOTE NOW</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </a>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-full sm:w-auto"
              >
                <a 
                  href="https://wa.me/923425744310?text=Hi, I want to get a quote for sportswear." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center space-x-4 px-8 md:px-12 py-4 md:py-5 border-white/10 w-full sm:w-auto"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="tracking-[0.2em] md:tracking-[0.3em]">CHAT ON WHATSAPP</span>
                </a>
              </motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 md:mt-8 text-[8px] md:text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic"
            >
               We respond within 24 hours
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: appleEase }}
            className="relative block"
          >
            <div className="relative z-10 rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] p-1.5 md:p-2.5 bg-white/[0.02] group">
               <img src={heroMain} alt="SMI Sportswear Hero" loading="eager" decoding="async" className="w-full h-auto rounded-[1.9rem] md:rounded-[3.8rem] grayscale hover:grayscale-0 transition-all duration-[2s] ease-apple" />
               <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-60"></div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 glass-apple p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] z-20 shadow-2xl border-white/10"
            >
              <p className="text-primary font-black text-2xl md:text-4xl leading-none italic uppercase tracking-tighter">ELITE</p>
              <p className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] mt-1 md:mt-2">Get Sample in Days</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-20 md:py-32 bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16"
          >
            {[
              { icon: <Shield size={32} />, title: "Low Minimum Order Quantity", desc: "Start from 50 units" },
              { icon: <Globe size={32} />, title: "Worldwide Shipping", desc: "Reliable global shipping" },
              { icon: <Paintbrush size={32} />, title: "Custom Design Support", desc: "Sample to door in days" },
              { icon: <Zap size={32} />, title: "Premium Performance Fabric", desc: "Beat middleman costs" }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 md:space-y-6 group">
                <div className="text-primary group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tight text-lg md:text-xl mb-1">{item.title}</h4>
                  <p className="text-white/20 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="mb-16 md:mb-24 text-center"
          >
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">Master Collections</h2>
            <h3 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase italic leading-[0.9] md:leading-none">Sportswear Built for <br /><span className="text-white/10">Every Team</span></h3>
            <p className="text-base md:text-xl text-white/40 mt-8 md:mt-10 max-w-3xl mx-auto leading-relaxed font-medium italic px-4">
              From local clubs to international brands — we manufacture high-performance apparel tailored to your needs.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
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
                className="group relative aspect-[4/5] sm:h-auto lg:h-[600px] rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-white/5 block hover-card-elite"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <img src={cat.img} alt={cat.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-apple opacity-30 group-hover:opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/30 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-[2rem] md:rounded-[3.5rem] transition-all duration-700" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 translate-y-4 md:translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-apple">
                  <p className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase mb-3 md:mb-4 opacity-70 transition-all duration-700">{cat.count}</p>
                  <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase italic mb-6 md:mb-8 tracking-tighter">{cat.title}</h4>
                  <div className="flex items-center text-white text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] transform -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                    <span>EXPLORE NOW</span>
                    <ArrowRight size={14} className="ml-2 md:ml-3 text-primary animate-pulse" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capability */}
      <section className="py-20 md:py-32 bg-white/[0.01] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
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
                  className="glass-apple rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 group hover:bg-white/[0.05] transition-all duration-700"
                >
                  <h4 className="text-primary font-black uppercase text-xs md:text-sm mb-3 md:mb-4 tracking-[0.1em] md:tracking-[0.2em]">{item.title}</h4>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase font-black tracking-widest leading-relaxed italic">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              {...fadeInUp}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">Vertical Integration</h2>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 md:mb-12 leading-[0.9] md:leading-[0.9] uppercase">Full-Service Manufacturing <br /><span className="text-white/10 italic">Under One Roof</span></h3>
              <p className="text-base md:text-xl text-white/30 mb-10 md:mb-14 leading-relaxed font-medium italic max-w-xl mx-auto lg:mx-0">
                We control every step — ensuring consistent quality, speed, and precision.
              </p>
              <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
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
                    className="flex items-center space-x-4 md:space-x-5 justify-center lg:justify-start"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-glow flex-shrink-0">
                      <CheckCircle size={18} md:size={22} />
                    </div>
                    <span className="text-xs md:text-sm font-black uppercase tracking-widest text-white/70 italic">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <a 
                  href="/manufacturing" 
                  className="btn-secondary inline-flex items-center space-x-4 md:space-x-5 border-white/5 py-4 md:py-5 px-8 md:px-10"
                >
                  <span className="tracking-[0.2em] md:tracking-[0.3em]">LEARN OUR PROCESS</span>
                  <ChevronRight size={18} md:size={20} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose SMI Sections (Trust Building) */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">THE SMI ADVANTAGE</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">Why Clients Choose <br /><span className="text-white/10 uppercase">SMI Sportswear</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {[
              { title: "Direct Factory Pricing", desc: "(No Middleman). We manufacture everything in-house in Sialkot, passing the savings directly to you.", icon: <Zap size={24} /> },
              { title: "Fast Turnaround Production", desc: "Sample to door in days, with streamlined bulk manufacturing cycles.", icon: <Zap size={24} /> },
              { title: "Strict Quality Control", desc: "Every garment undergoes ISO-certified multi-stage inspection before dispatch.", icon: <Shield size={24} /> },
              { title: "Experience in Export Orders", desc: "Proven track record serving clubs and brands across USA, Europe, and UAE.", icon: <Shield size={24} /> }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ delay: i * 0.1 }}
                className="glass-apple p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border-white/5 hover:bg-white/[0.04] transition-all duration-700"
              >
                <div className="text-primary mb-6 md:mb-8 bg-primary/10 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center border border-primary/20 shadow-glow">
                  {item.icon}
                </div>
                <h4 className="text-white font-black uppercase tracking-tight text-xl md:text-2xl mb-4 md:mb-6 italic">{item.title}</h4>
                <p className="text-white/30 text-xs md:text-sm leading-relaxed font-medium italic mb-4 md:mb-8">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section (Friction Removal) */}
      <section className="py-20 md:py-32 bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-24">
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">SEAMLESS WORKFLOW</h2>
            <h3 className="text-4xl md:text-7xl lg:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">Simple & <span className="text-white/10 uppercase">Transparent Process</span></h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
            <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
            
            {[
              { step: "01", title: "Send Requirements", desc: "Contact with concepts" },
              { step: "02", title: "Confirm Sample", desc: "Verify fabric & fit" },
              { step: "03", title: "Production", desc: "Pro-quality manufacturing" },
              { step: "04", title: "Global Delivery", desc: "Shipping with tracking" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                transition={{ delay: i * 0.15 }}
                className="relative z-10 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full glass-apple mb-6 md:mb-8 flex items-center justify-center text-2xl md:text-4xl font-black text-primary border border-primary/20 shadow-premium">
                  {item.step}
                </div>
                <h4 className="text-white font-black uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-sm mb-2 md:mb-4">{item.title}</h4>
                <p className="text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] italic">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-16 md:mt-24 flex flex-col items-center">
             <a href="#quote" className="btn-primary px-10 md:px-16 py-5 md:py-6 group flex items-center space-x-4 md:space-x-6">
                <span className="tracking-[0.3em] md:tracking-[0.4em]">START YOUR ORDER</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
             </a>
             <p className="mt-6 md:mt-8 text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] md:tracking-[0.4em] italic text-center">GET YOUR SAMPLE PROCESS STARTED IN 24 HOURS</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section (Buyer Psychology) */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">BUYER'S GUIDE</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">COMMON <span className="text-white/10 uppercase">QUESTIONS</span></h3>
          </motion.div>

          <FAQAccordian />

          <div className="mt-16 md:mt-20 glass-apple p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-primary/10 text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[100px]" />
             <h4 className="text-white font-black uppercase tracking-tighter text-2xl md:text-3xl mb-6 md:mb-8 italic">STILL HAVE <span className="text-primary italic">DOUBTS?</span></h4>
             <a href="https://wa.me/923425744310" className="inline-flex items-center space-x-4 md:space-x-6 text-white hover:text-primary transition-colors duration-500 font-black tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] uppercase italic">
                <span>TALK TO A PRODUCTION EXPERT</span>
                <MessageCircle size={20} md:size={22} className="text-[#25D366]" />
             </a>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section id="quote" className="py-20 md:py-32 relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <motion.div {...fadeInUp} className="text-center lg:text-left">
              <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">Direct Factory Access</h2>
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 md:mb-12 uppercase italic leading-[0.9] md:leading-[0.85] tracking-tighter">Get Your <br /><span className="text-primary text-glow">Custom Quote</span></h2>
              <p className="text-lg md:text-2xl text-white/30 mb-12 md:mb-20 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium italic">
                Tell us what you need — we’ll handle the rest. <span className="text-white">Quality starts with a conversation.</span>
              </p>
              
              <div className="space-y-10 md:space-y-16">
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
                    className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-10 group"
                  >
                    <div className="text-5xl md:text-6xl font-black text-white/[0.03] transition-colors duration-700 group-hover:text-primary/20 leading-none">{step.num}</div>
                    <div className="md:pt-3">
                      <h4 className="text-white font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-2 md:mb-3">{step.title}</h4>
                      <p className="text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic leading-relaxed">{step.desc}</p>
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
              className="relative p-0.5 md:p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] md:rounded-[4.5rem] shadow-premium"
            >
              <div className="bg-background-dark rounded-[2.4rem] md:rounded-[4.4rem] p-0.5 md:p-1 overflow-hidden">
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
