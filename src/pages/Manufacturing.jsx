import { useState, useEffect } from 'react';
import { Cpu, Scissors, Printer, Layers, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkeletonHero, SkeletonCard } from '../components/Skeleton';
import mfgSublimation from '../assets/mfg_sublimation.webp';
import mfgCutSew from '../assets/mfg_cut_sew.webp';
import mfgEmbroidery from '../assets/mfg_embroidery.webp';

const Manufacturing = () => {
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

  const capabilities = [
    {
      icon: <Layers size={32} />,
      title: "Sublimation",
      desc: "Italian Kian inks and high-speed Epson printers for vibrant, permanent graphics that never fade.",
      img: mfgSublimation,
      accent: "from-primary/20 to-transparent"
    },
    {
      icon: <Scissors size={32} />,
      title: "Cut & Sew",
      desc: "Precision laser cutting and athletic tailoring for the perfect fit across all body types.",
      img: mfgCutSew,
      accent: "from-white/10 to-transparent"
    },
    {
      icon: <Cpu size={32} />,
      title: "Embroidery",
      desc: "Japanese Tajima machines for high-density stitching of crests and luxury branding.",
      img: mfgEmbroidery,
      accent: "from-primary/20 to-transparent"
    },
    {
      icon: <Printer size={32} />,
      title: "Screen Printing",
      desc: "Automatic carousel printing for large volume orders with durable plastisol or water-based inks.",
      img: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&q=80&w=1200",
      accent: "from-white/10 to-transparent"
    }
  ];

  const fleet = [
    "12x High-speed Sublimation Transfer Printers",
    "2x Automatic Gerber Fabric Cutting Systems",
    "40x Tajima Multi-head Embroidery Machines",
    "200+ Specialized Overlock & Flatlock Machines"
  ];

  if (loading) {
    return (
      <div className="bg-background-dark pt-24 min-h-screen">
        <SkeletonHero />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 py-20 mt-12">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark pt-24 min-h-screen overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="section-elite relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full -mr-96 -mt-96 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
            className="mb-32"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-primary text-[10px] font-black tracking-[0.4em] mb-12"
            >
              <Cpu size={14} className="fill-primary" />
              <span>TIER 1 GLOBAL PRODUCTION</span>
            </motion.div>
            
            <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black text-white leading-[0.85] mb-12 uppercase tracking-tighter max-w-4xl">
              <span className="block italic text-white/90">TECHNICAL</span>
              <span className="text-primary italic text-glow">PRECISION</span>
            </h1>
            
            <p className="text-2xl text-white/40 max-w-2xl leading-relaxed font-medium italic">
              Our 50,000 sq. ft. vertical facility is engineered for <span className="text-white">uncompromised performance</span> and elite athletic manufacturing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {capabilities.map((item, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="group relative rounded-[4rem] overflow-hidden border border-white/5 block hover-card-elite h-[600px] lg:h-[700px]"
                whileHover={{ y: -15 }}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-apple opacity-30 group-hover:opacity-60" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-[4rem] transition-all duration-700" />
                
                <div className="absolute top-12 left-12 p-8 glass-apple rounded-[2.5rem] text-primary border border-white/10 shadow-premium z-20 group-hover:scale-110 transition-transform duration-700">
                  {item.icon}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-16 translate-y-6 group-hover:translate-y-0 transition-transform duration-1000 ease-apple">
                  <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic mb-8 tracking-tighter leading-none">{item.title}</h3>
                  <p className="text-white/30 text-base leading-relaxed font-black uppercase tracking-widest italic max-w-sm mb-10 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-100">{item.desc}</p>
                  <div className="w-16 h-1 bg-primary group-hover:w-full transition-all duration-1000 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Mastery Section */}
      <section className="section-elite relative overflow-hidden bg-white/[0.01] border-y border-white/[0.03]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-[10px] font-black text-primary tracking-[0.5em] uppercase mb-8">FLEET MASTERY</h2>
              <h3 className="text-6xl md:text-7xl font-black text-white mb-12 leading-[0.9] uppercase">THE INDUSTRY <br /><span className="text-white/10 italic">STANDARD</span></h3>
              <p className="text-xl text-white/30 mb-16 leading-relaxed font-medium italic">
                We invest heavily in R&D and Japanese & European technology to stay at the cutting edge of garment engineering.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {fleet.map((text, i) => (
                  <motion.div 
                    key={i}
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="whileInView"
                    transition={{ delay: i * 0.1 }}
                    className="glass-apple p-10 rounded-[3rem] group hover:bg-white/[0.05] transition-all duration-700"
                  >
                    <div className="p-3 bg-primary/10 rounded-2xl text-primary w-fit mb-6 shadow-glow border border-primary/20">
                      <CheckCircle2 size={24} />
                    </div>
                    <span className="text-white/60 font-black uppercase tracking-widest text-[11px] leading-relaxed italic">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.5, ease: appleEase }}
              className="relative rounded-[4rem] overflow-hidden shadow-premium group"
            >
               <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200" alt="Factory Floor" className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-apple" />
               <div className="absolute inset-0 bg-gradient-to-tr from-background-dark/80 via-transparent to-transparent opacity-60"></div>
               <div className="absolute bottom-12 left-12 p-8 glass-apple rounded-[2.5rem] border border-white/10">
                  <p className="text-primary font-black text-3xl leading-none italic uppercase tracking-tighter">SIALKOT</p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em] mt-2">GLOBAL HUB</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-elite relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="glass-apple p-16 md:p-32 rounded-[5rem] border border-primary/10 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] -mr-48 -mt-48 z-0" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[150px] -ml-48 -mb-48 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-16 uppercase italic leading-[0.85] tracking-tighter">READY TO START <br /><span className="text-primary text-glow">PRODUCTION?</span></h2>
              <p className="text-2xl text-white/30 mb-20 max-w-2xl mx-auto leading-relaxed font-medium italic">
                From technical samples to global bulk delivery, our experts are ready to engineer your teamwear.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/#quote" 
                  className="btn-primary px-16 py-6 group flex items-center space-x-6"
                >
                  <span className="tracking-[0.4em]">GET FACTORY QUOTE</span>
                  <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-500 ease-apple" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/923425744310" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-6 text-white hover:text-primary transition-colors duration-500 font-black tracking-[0.3em] text-[10px] uppercase italic"
                >
                  <span>TALK TO PRODUCTION MANAGER</span>
                  <MessageCircle size={24} className="text-[#25D366]" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Manufacturing;
