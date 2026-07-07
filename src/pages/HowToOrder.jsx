"use client";

import React from 'react';
import { MessageSquare, FileCheck, Settings, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HowToOrder = () => {
  const appleEase = [0.22, 1, 0.36, 1];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: appleEase }
  };

  const steps = [
    {
      icon: <MessageSquare size={40} />,
      title: "Send Requirement",
      desc: "Contact us with your project details, quantities, and design preferences via our quote form or WhatsApp. Our production experts respond within 24 hours.",
      action: "SUBMIT QUOTATION"
    },
    {
      icon: <FileCheck size={40} />,
      title: "Approve Sample",
      desc: "We produce a high-fidelity physical or digital tech-sample for your validation. We don't start bulk production until you are 100% satisfied.",
      action: "SAMPING PROTOCOL"
    },
    {
      icon: <Settings size={40} />,
      title: "Start Production",
      desc: "Once samples and payment are confirmed, our factory begins the precision manufacturing process using your approved athletic designs.",
      action: "FACTORY DATA"
    },
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      desc: "Your order is quality checked, packed, and shipped worldwide via our trusted logistics partners (DHL/FedEx) in 5-8 business days.",
      action: "LOGISTICS TRACKING"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-background-dark pt-24 md:pt-32 min-h-screen overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/5 blur-[100px] md:blur-[150px] rounded-full -mr-48 -mt-48 md:-mr-96 md:-mt-96 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
            className="mb-20 md:mb-32 text-center md:text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-flex items-center space-x-3 px-4 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/10 text-primary text-[8px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12"
            >
              <Truck size={12} className="fill-primary" />
              <span>STREAMLINED LOGISTICS</span>
            </motion.div>
            
            <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black text-white leading-[0.9] md:leading-[0.85] mb-8 md:mb-12 uppercase tracking-tighter max-w-4xl italic">
              <span className="block text-white/90">ENGINEERED</span>
              <span className="text-primary text-glow">PROCESS</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-white/40 max-w-2xl leading-relaxed font-medium italic px-4 md:px-0">
              From the initial technical sketch to global bulk delivery—our <span className="text-white">4-step blueprint</span> for elite team success.
            </p>
          </motion.div>

          <div className="space-y-24 md:space-y-40">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 md:gap-24 group ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-1/2 flex justify-center relative">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateZ: i % 2 === 0 ? 2 : -2 }}
                    className="relative z-10"
                  >
                    <div className="w-64 h-64 md:w-96 md:h-96 glass-apple rounded-[3rem] md:rounded-[5rem] flex items-center justify-center border border-white/5 relative overflow-hidden shadow-premium transition-all duration-[1s] ease-apple">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                      <div className="text-primary relative z-10 scale-[1.25] md:scale-[1.75] group-hover:scale-[1.5] md:group-hover:scale-[2] transition-transform duration-[1s] ease-apple drop-shadow-[0_0_20px_rgba(193,18,31,0.3)]">
                        {React.cloneElement(step.icon, { size: 64, className: "md:w-[80px] md:h-[80px]" })}
                      </div>
                    </div>
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.5, stiffness: 100 }}
                      className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-16 h-16 md:w-24 md:h-24 bg-primary rounded-full flex items-center justify-center text-white font-black text-2xl md:text-4xl z-20 shadow-glow italic border-4 md:border-8 border-background-dark"
                    >
                      {i + 1}
                    </motion.div>
                  </motion.div>
                  <div className="absolute inset-0 bg-primary/10 blur-[100px] md:blur-[150px] rounded-full z-0 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                </div>

                <div className="w-full lg:w-1/2 text-center lg:text-left px-4 md:px-0">
                  <h3 className="text-3xl md:text-7xl font-black text-white mb-6 md:mb-10 uppercase tracking-tighter italic leading-none group-hover:text-primary transition-colors duration-700">{step.title}</h3>
                  <p className="text-white/30 text-base md:text-xl font-medium leading-relaxed italic mb-10 md:mb-16 max-w-lg mx-auto lg:mx-0">
                    {step.desc}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start space-x-4 md:space-x-6 text-primary font-black text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase group-hover:translate-x-4 transition-all duration-700 cursor-pointer italic">
                    <span className="border-b-2 border-primary/20 pb-1 md:pb-2 group-hover:border-primary transition-all">{step.action}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Standard Bottom CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-background-dark pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            {...fadeInUp}
            className="glass-apple p-10 md:p-32 rounded-[2.5rem] md:rounded-[5rem] border border-primary/10 text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] -mr-48 -mt-48 z-0" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-8xl font-black text-white mb-10 md:mb-16 uppercase italic leading-[1] md:leading-[0.85] tracking-tighter">READY TO START <br /><span className="text-primary text-glow">PRODUCTION?</span></h2>
              <p className="text-lg md:text-2xl text-white/30 mb-12 md:mb-20 max-w-2xl mx-auto leading-relaxed font-medium italic px-4">
                Our logistics experts ensure your gear arrives at your doorstep, anywhere in the world, in record time.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8 md:space-x-12">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/#quote" 
                  className="btn-primary w-full sm:w-auto px-10 md:px-16 py-4 md:py-6 group flex items-center justify-center space-x-4 md:space-x-6"
                >
                  <span className="tracking-[0.2em] md:tracking-[0.4em]">INITIATE ORDER</span>
                  <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500 ease-apple flex-shrink-0" />
                </motion.a>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/923425744310" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 md:space-x-6 text-white hover:text-primary transition-colors duration-500 font-black tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px] uppercase italic"
                >
                  <span>LIVE LOGISTICS SUPPORT</span>
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

export default HowToOrder;
