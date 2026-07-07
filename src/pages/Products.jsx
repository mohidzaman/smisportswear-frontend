"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Filter, Zap, Shield, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkeletonHero, SkeletonCard } from '../components/Skeleton';
import heroMain from '../assets/hero_main.webp';
import catSchool from '../assets/cat_school.png';
import catPrivate from '../assets/cat_private.png';
import API from '../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const appleEase = [0.22, 1, 0.36, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: appleEase }
  };

  const categories = [
    { 
      title: "Elite Teamwear", 
      items: ["Football Kits", "Cricket Whites", "Basketball Sets", "Rugby Jerseys"],
      img: heroMain,
      accent: "text-primary",
      glow: "group-hover:shadow-primary/20",
      desc: "Pro-athletic performance gear tailored for elite competition."
    },
    { 
      title: "Technical Training", 
      items: ["Hoodies", "Tracksuits", "Performance Tees", "Gym Shorts"],
      img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1200",
      accent: "text-primary",
      glow: "group-hover:shadow-primary/20",
      desc: "High-durability training apparatus for rigorous athletic prep."
    },
    { 
      title: "School Sports", 
      items: ["PE Uniforms", "House Polos", "Blazers", "Sports Socks"],
      img: catSchool,
      accent: "text-primary",
      glow: "group-hover:shadow-primary/20",
      desc: "Professional institutional gear for next-gen athletes."
    },
    { 
      title: "Private Label", 
      items: ["Bulk Orders", "White Label Production", "Custom Branding", "Fabric Sourcing"],
      img: catPrivate,
      accent: "text-primary",
      glow: "group-hover:shadow-primary/20",
      desc: "Bespoke manufacturing services for global sports brands."
    }
  ];

  if (loading) {
    return (
      <div className="bg-background-dark pt-24 min-h-screen">
        <SkeletonHero />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 py-20 mt-12">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark min-h-screen pt-24 md:pt-32 overflow-x-hidden"
    >
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-primary/5 blur-[100px] md:blur-[150px] rounded-full -mr-48 -mt-48 md:-mr-96 md:-mt-96 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 md:mb-32 gap-10 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: appleEase }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="inline-flex items-center space-x-3 px-4 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/10 text-primary text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12 mx-auto lg:mx-0"
              >
                <Zap size={12} className="fill-primary" />
                <span>MASTER CATALOG 2025</span>
              </motion.div>
              
              <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-black text-white leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 uppercase tracking-tighter max-w-4xl">
                <span className="block italic text-white/90">ELITE</span>
                <span className="text-primary italic text-glow">RANGE</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-white/40 max-w-2xl leading-relaxed font-medium italic mx-auto lg:mx-0">
                From performance textiles to precision tailoring, explore our <span className="text-white">full manufacturing spectrum</span> for pro-grade athletic hardware.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: appleEase }}
              className="flex items-center justify-center lg:justify-end"
            >
              <button className="group flex items-center space-x-4 md:space-x-6 px-8 md:px-10 py-4 md:py-5 bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[2.5rem] text-[8px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-700 shadow-premium">
                <Filter size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                <span>FILTER SPECTRUM</span>
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {categories.map((cat, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="group relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 block hover-card-elite aspect-[4/5] md:h-[600px] lg:h-[700px]"
                whileHover={{ y: -10 }}
              >
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  loading="lazy" 
                  decoding="async" 
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-apple opacity-30 group-hover:opacity-60" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-[2.5rem] md:rounded-[4rem] transition-all duration-700" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-6 md:mb-10">{cat.title}</h3>
                  
                  <div className="max-h-0 group-hover:max-h-[300px] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-apple overflow-hidden">
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed font-bold uppercase tracking-widest italic mb-6 md:mb-10 max-w-sm">{cat.desc}</p>
                    <ul className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4 mb-8 md:mb-12">
                      {cat.items.map((item, idx) => (
                        <li key={idx} className="text-white/30 text-[8px] md:text-[10px] font-black flex items-center space-x-2 md:space-x-4 uppercase tracking-[0.1em] md:tracking-[0.2em] italic hover:text-primary transition-colors">
                          <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform"></span>
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <motion.a
                    whileHover={{ x: 10 }}
                    href="/contact"
                    className="btn-primary group/btn flex items-center justify-between px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-[2rem] relative z-20"
                  >
                    <span className="font-black italic tracking-[0.2em] md:tracking-[0.4em] text-[10px]">SPECIFICATIONS</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-3 transition-transform duration-500 ease-apple" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inventory Feed */}
      {products.length > 0 && (
        <section className="py-20 md:py-32 relative overflow-hidden bg-white/[0.01] border-y border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 md:gap-8 text-center md:text-left">
              <motion.div {...fadeInUp}>
                <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">REAL-TIME INVENTORY</h2>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter italic leading-[0.9] md:leading-none">NEW <span className="text-white/10 uppercase">ARRIVALS</span></h3>
              </motion.div>
              <p className="text-white/20 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] italic mb-4">Showing {products.length} Recent Additions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {products.map((prod, i) => (
                <motion.div 
                  key={prod._id}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                  className="bg-white/[0.02] rounded-[2.5rem] md:rounded-[3rem] border border-white/5 overflow-hidden group hover:border-primary/20 transition-all duration-700 shadow-premium"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2s] ease-apple opacity-50 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute top-6 md:top-8 right-6 md:right-8 px-4 md:px-6 py-2 glass-apple border-white/10 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      <span className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-[0.2em] md:tracking-[0.3em]">MOQ: {prod.MOQ}</span>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <span className="text-[8px] md:text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] md:tracking-[0.4em] italic leading-none">{prod.category}</span>
                    <h4 className="text-xl md:text-2xl font-black text-white uppercase mt-3 md:mt-4 tracking-tighter italic leading-none truncate">{prod.title}</h4>
                    <p className="text-[8px] md:text-[10px] text-white/20 mt-4 md:mt-6 line-clamp-2 uppercase font-black tracking-[0.1em] md:tracking-[0.2em] italic leading-relaxed">{prod.description}</p>
                    <div className="mt-8 md:mt-10 h-[1px] w-8 md:w-12 bg-primary group-hover:w-full transition-all duration-1000 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fabric Innovation Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div {...fadeInUp} className="text-center lg:text-left">
            <h2 className="text-[8px] md:text-[10px] font-black text-primary tracking-[0.3em] md:tracking-[0.5em] uppercase mb-6 md:mb-8">INNOVATION HUB</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 md:mb-16 uppercase leading-[0.9] md:leading-none tracking-tighter">FABRIC <br /><span className="text-white/10 italic">TECHNOLOGY</span></h3>
            <p className="text-lg md:text-xl text-white/30 leading-relaxed mb-12 md:mb-20 font-medium italic max-w-xl mx-auto lg:mx-0">
              We source elite technical textiles engineered for professional competition, featuring <span className="text-white">advanced moisture management</span> and high-stress durability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              {[
                { title: "Dri-Fit HD", icon: <Zap size={24} />, desc: "High-density moisture-wicking capillary system." },
                { title: "Shield Tech", icon: <Shield size={24} />, desc: "Anti-bacterial and UV-resistant treatments." }
              ].map((tech, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  transition={{ delay: i * 0.1 }}
                  className="p-8 md:p-12 glass-apple rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 hover:border-primary/20 transition-all duration-700 shadow-premium group"
                >
                  <div className="text-primary mb-6 md:mb-8 bg-primary/10 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center border border-primary/20 shadow-glow group-hover:scale-110 transition-transform duration-700 mx-auto lg:mx-0">
                    {tech.icon}
                  </div>
                  <h4 className="text-white font-black mb-3 md:mb-4 uppercase tracking-[0.1em] md:tracking-[0.2em] text-base md:text-lg italic leading-none">{tech.title}</h4>
                  <p className="text-white/20 text-[8px] md:text-[10px] uppercase font-black tracking-[0.2em] md:tracking-[0.3em] italic leading-relaxed">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: appleEase }}
            className="rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 relative group shadow-premium"
          >
            <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200" alt="SMI Fabric Technology" loading="lazy" decoding="async" className="w-full h-auto rounded-[2.4rem] md:rounded-[3.9rem] opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-apple" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
            <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 p-6 md:p-10 glass-apple rounded-[2rem] md:rounded-[3rem] border border-white/10 text-center">
              <p className="text-primary font-black text-2xl md:text-4xl leading-none italic uppercase tracking-tighter">HD-FIBER</p>
              <p className="text-[8px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] md:tracking-[0.5em] mt-2 md:mt-3 italic">Technical Standard</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="glass-apple p-10 md:p-16 lg:p-32 rounded-[3rem] md:rounded-[5rem] border border-primary/10 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[100px] md:blur-[150px] -mr-32 -mt-32 md:-mr-48 md:-mt-48 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-10 md:mb-16 uppercase italic leading-[0.9] md:leading-[0.85] tracking-tighter">READY TO DEFINE <br /><span className="text-primary text-glow">YOUR LINE?</span></h2>
              <p className="text-lg md:text-2xl text-white/30 mb-12 md:mb-20 max-w-2xl mx-auto leading-relaxed font-medium italic px-4">
                Our design and engineering teams are ready to transform your concept into production-ready athletic hardware.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/#quote" 
                  className="btn-primary w-full sm:w-auto px-10 md:px-16 py-5 md:py-6 group flex items-center justify-center space-x-4 md:space-x-6"
                >
                  <span className="tracking-[0.3em] md:tracking-[0.4em]">REQUEST QUOTATION</span>
                  <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500 ease-apple" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/923425744310" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 md:space-x-6 text-white hover:text-primary transition-colors duration-500 font-black tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] uppercase italic"
                >
                  <span>TALK ON WHATSAPP</span>
                  <MessageCircle size={22} className="text-[#25D366]" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Products;
