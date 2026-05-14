import { useState, useEffect } from 'react';
import { Target, Eye, Users, Factory, Award, Globe2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkeletonHero, SkeletonText } from '../components/Skeleton';
import heroMain from '../assets/hero_main.webp';
import mfgCutSew from '../assets/mfg_cut_sew.webp';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Founded", value: "2025", accent: "text-primary" },
    { label: "Garments/Year", value: "500k+", accent: "text-white" },
    { label: "Countries Served", value: "50+", accent: "text-primary" },
    { label: "Quality Control", value: "100%", accent: "text-white" }
  ];

  const values = [
    { icon: <Factory size={32} />, title: "Vertical Integration", desc: "We control every step from knitting and dyeing to stitching and packing." },
    { icon: <Award size={32} />, title: "Quality Guarantee", desc: "Every garment undergoes a multi-point inspection before it leaves our floor." },
    { icon: <Globe2 size={32} />, title: "Ethical Production", desc: "Compliant with international labor standards and environmental regulations." }
  ];

  if (loading) {
    return (
      <div className="bg-background-dark pt-24 min-h-screen">
        <SkeletonHero />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SkeletonText lines={10} />
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark pt-24 md:pt-32 min-h-screen overflow-x-hidden"
    >
      {/* Hero */}
      <section className="relative min-h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden py-20 md:py-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={heroMain} 
            className="w-full h-full object-cover" 
            alt="Factory floor"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] md:tracking-[0.6em] uppercase mb-6 md:mb-8 italic">Heritage & Vision</h2>
            <h1 className="text-[clamp(2.5rem,10vw,7rem)] md:text-9xl font-black text-white mb-8 md:mb-10 uppercase tracking-tighter leading-[0.9] md:leading-none italic">
              ENGINEERING <br /><span className="text-primary italic text-glow animate-pulse-subtle">PERFORMANCE</span>
            </h1>

            <p className="text-base md:text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed italic px-4">
              From a local vision to a global manufacturing powerhouse. <br className="hidden md:block" />Engineering peak performance since 2025.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-8">Our Legacy</h2>
          <h3 className="text-3xl md:text-6xl font-black text-white mb-8 md:mb-10 uppercase leading-[1.1] md:leading-none tracking-tighter">FROM WORKSHOP TO <br /><span className="text-white/20 italic">GLOBAL FORCE</span></h3>
          <p className="text-white/40 leading-relaxed mb-6 md:mb-8 text-base md:text-lg font-medium italic">
            Founded in the heart of Sialkot, SMI Sportswear began with a singular vision: to provide professional-grade athletic apparel directly from the manufacturer to the teams that need it.
          </p>
          <p className="text-white/40 leading-relaxed text-base md:text-lg font-medium italic mb-10 md:mb-12">
            Built for the future of sports, our facility is a state-of-the-art production hub serving clubs, schools, and private labels worldwide. We don't just make clothes; we engineer performance.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors text-center"
              >
                <span className={`text-4xl md:text-5xl font-black mb-2 block tracking-tighter ${stat.accent}`}>{stat.value}</span>
                <span className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 p-1 bg-gradient-to-br from-white/10 to-transparent shadow-2xl"
        >
          <img src={mfgCutSew} alt="SMI Manufacturing Facility" className="w-full h-auto rounded-[2.4rem] md:rounded-[3.9rem] opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-32 bg-background-alt/30 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {[
            { 
              icon: <Target size={32} md:size={40} />, 
              title: "Our Vision", 
              desc: "To become the global benchmark for factory-direct sportswear, where every team accesses elite-level technology.",
              gradient: "from-primary/20 to-transparent"
            },
            { 
              icon: <Eye size={32} md:size={40} />, 
              title: "Our Mission", 
              desc: "Empowering athletic performance through precision manufacturing, innovative design, and unwavering quality commitment.",
              gradient: "from-white/10 to-transparent"
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 md:p-16 rounded-[2.5rem] md:rounded-[3rem] bg-background-dark border border-white/5 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl`} />
              <div className="p-4 md:p-6 bg-primary/10 rounded-2xl md:rounded-3xl inline-block mb-8 md:mb-10 group-hover:rotate-12 transition-transform duration-500">
                <div className="text-primary">{item.icon}</div>
              </div>
              <h4 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 uppercase tracking-tighter italic">{item.title}</h4>
              <p className="text-base md:text-lg text-white/40 leading-relaxed font-medium italic relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-8">Core Values</h2>
          <h3 className="text-3xl md:text-7xl font-black text-white mb-16 md:mb-24 uppercase tracking-tighter leading-none italic">WHY PARTNER <br /><span className="text-white/20">WITH US?</span></h3>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="text-primary mb-8 md:mb-10 flex justify-center transform group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(item.icon, { size: 48, className: "md:w-[64px] md:h-[64px]" })}
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6 uppercase tracking-widest italic">{item.title}</h4>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed font-bold uppercase tracking-tight px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-95" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-8xl font-black text-white mb-8 md:mb-12 tracking-tighter uppercase italic leading-[0.9] md:leading-none">
              READY TO SCALE <br />YOUR PRODUCTION?
            </h2>
            <p className="text-white/80 mb-10 md:mb-16 text-base md:text-xl font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] italic max-w-2xl mx-auto px-4">
              Join hundreds of global brands that trust SMI Sportswear.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              href="/contact" 
              className="bg-white text-black font-black py-4 md:py-6 px-10 md:px-16 rounded-xl md:rounded-2xl flex items-center justify-center space-x-4 md:space-x-6 mx-auto w-full sm:w-fit tracking-[0.2em] md:tracking-[0.4em] uppercase group text-[10px] md:text-sm"
            >
              <span>WORK WITH OUR FACTORY</span>
              <ArrowRight size={18} md:size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
