import React from 'react';
import { Palette, Ruler, Layout, PenTool, CheckCircle, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Customization = () => {
  const appleEase = [0.22, 1, 0.36, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: appleEase }
  };

  const steps = [
    {
      icon: <Palette size={32} />,
      title: "Color Selection",
      desc: "Choose from our standard elite palette or provide custom Pantone references. We match your club colors with 99% accuracy.",
      accent: "group-hover:text-primary"
    },
    {
      icon: <Layout size={32} />,
      title: "Design Concepts",
      desc: "Our designers create 2D/3D mockups based on your rough ideas, existing kits, or inspiration from global teams.",
      accent: "group-hover:text-white"
    },
    {
      icon: <PenTool size={32} />,
      title: "Brand Placement",
      desc: "Strategically place sponsor logos, club crests, player names, and numbers using professional athletic fonts.",
      accent: "group-hover:text-primary"
    },
    {
      icon: <Ruler size={32} />,
      title: "Size & Spec",
      desc: "Customize fits from slim-fit professional to standard club cuts. Choose hem styles, collar types, and fabric weights.",
      accent: "group-hover:text-white"
    }
  ];

  return (
    <div className="flex flex-col bg-background-dark pt-24 min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover"
            alt="Design process"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-xs font-black text-primary tracking-[0.6em] uppercase mb-8 italic">Bespoke Design</h2>
            <h1 className="text-6xl md:text-9xl font-black text-white mb-10 uppercase tracking-tighter leading-none italic">
              LIMITLESS <br /><span className="text-primary italic animate-pulse-subtle">CREATIVITY</span>
            </h1>
            <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed italic uppercase tracking-[0.1em]">
              Your team's kit is a blank canvas. <br />We provide the precision brush.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-32 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-40"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-white/5 p-12 rounded-[3.5rem] border border-white/5 group hover:border-primary/40 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`text-white/30 mb-8 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 ${step.accent}`}>{step.icon}</div>
              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">{step.title}</h3>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest leading-relaxed italic">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Showcase / Process Detail */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center bg-white/5 rounded-[4rem] p-16 lg:p-32 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent z-0" />

          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-background-dark/30"
          >
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200" alt="Chromatic print" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />
          </motion.div>

          <div className="relative z-10">
            <h4 className="text-5xl md:text-7xl font-black text-white mb-10 uppercase tracking-tighter leading-none italic">ZERO-FADE <br /><span className="text-white/20">CHROMATIC</span></h4>
            <p className="text-white/40 mb-12 leading-relaxed text-lg font-medium italic">
              Unlike traditional screen printing that sits on the surface, our sublimation process infuses the ink directly into the fabric fibers at high heat.
            </p>

            <div className="space-y-6 mb-16">
              {[
                "UNLIMITED COLORS & COMPLEXITY",
                "BREATHABLE & LIGHTWEIGHT FINISH",
                "PERMANENT GRAPHICS INTEGRATION"
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="flex items-center space-x-6 text-white font-black text-[10px] tracking-[0.3em] italic uppercase"
                >
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <CheckCircle2 size={16} />
                  </div>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.05, x: 10 }}
              whileTap={{ scale: 0.95 }}
              href="/gallery"
              className="btn-primary py-6 px-12 flex items-center justify-between group shadow-xl"
            >
              <span className="tracking-[0.4em]">VIEW RECENT WORK</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Standard Bottom CTA */}
      <section className="section-elite relative overflow-hidden bg-background-dark pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="glass-apple p-16 md:p-32 rounded-[5rem] border border-primary/10 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] -mr-48 -mt-48 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-6xl md:text-8xl font-black text-white mb-16 uppercase italic leading-[0.85] tracking-tighter">CRAFT YOUR <br /><span className="text-primary text-glow">IDENTITY</span></h2>
              <p className="text-2xl text-white/30 mb-20 max-w-2xl mx-auto leading-relaxed font-medium italic">
                Our designers are ready to engineer your aesthetic. From concepts to reality, we build for the elite.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-12">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/#quote" 
                  className="btn-primary px-16 py-6 group flex items-center space-x-6"
                >
                  <span className="tracking-[0.4em]">GET CUSTOM QUOTE</span>
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
                  <span>CHAT WITH DESIGNER</span>
                  <MessageCircle size={24} className="text-[#25D366]" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Customization;
