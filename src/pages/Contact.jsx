import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { SkeletonHero, SkeletonText } from '../components/Skeleton';
import QuoteForm from '../components/QuoteForm';

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const contactGroups = [
    {
      title: "Direct Channels",
      items: [
        { icon: <Phone size={24} />, label: "Call Us", val: "+92 342 5744310" },
        { icon: <Mail size={24} />, label: "Email", val: "smisportswears@gmail.com" },
        { icon: <MessageSquare size={24} />, label: "WhatsApp", val: "Instant Response" }
      ]
    },
    {
      title: "Global Presence",
      items: [
        { icon: <MapPin size={24} />, label: "Factory Location", val: "Sialkot, Punjab, Pakistan" },
        { icon: <Clock size={24} />, label: "Business Hours", val: "9:00 AM - 6:00 PM (GMT+5)" },
        { icon: <Send size={24} />, label: "Worldwide", val: "Delivering to 50+ Nations" }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="bg-background-dark pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <SkeletonText lines={15} />
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
      <section className="relative min-h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden py-20 md:py-0">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Global Support Infrastructure"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.4em] md:tracking-[0.5em] uppercase mb-6 md:mb-8 italic">Get In Touch</h2>
            <h1 className="text-[clamp(2.5rem,10vw,7rem)] md:text-9xl font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-none italic">
              GLOBAL <span className="text-primary italic animate-pulse-subtle">SUPPORT</span>
            </h1>
            <p className="text-base md:text-xl text-white/40 max-w-2xl mx-auto mt-8 md:mt-10 font-medium leading-relaxed italic uppercase tracking-normal md:tracking-wider px-4">
              Ready to take your team's performance to the next level? <br className="hidden md:block" />Our experts are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-[10px] md:text-xs font-black text-primary tracking-[0.3em] md:tracking-[0.4em] uppercase mb-6 md:mb-8">Connect</h2>
            <h3 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1.1] md:leading-none mb-12 md:mb-16 italic">SPEAK WITH <br /><span className="text-white/20">SPECIALISTS</span></h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-16 md:mb-20">
              {contactGroups.map((group, idx) => (
                <div key={idx} className="space-y-8 md:space-y-10">
                  <h4 className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 italic">{group.title}</h4>
                  {group.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 md:space-x-6 group cursor-pointer justify-center lg:justify-start"
                    >
                      <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-500 transform group-hover:rotate-12 flex-shrink-0">
                        <div className="text-primary group-hover:text-white transition-colors">
                          {React.cloneElement(item.icon, { size: 20, className: "md:w-[24px] md:h-[24px]" })}
                        </div>
                      </div>
                      <div className="text-left">
                        <h5 className="text-white/40 font-black text-[9px] md:text-[10px] uppercase tracking-widest mb-1 italic group-hover:text-primary transition-colors">{item.label}</h5>
                        <p className="text-white font-bold text-xs md:text-sm tracking-tight truncate max-w-[200px] sm:max-w-none">{item.val}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Industrial Map Location */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative h-64 md:h-80 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group"
            >
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" alt="Global Logistics Hub" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75 duration-2000" />
                  <div className="relative bg-primary p-4 md:p-6 rounded-full shadow-[0_0_50px_rgba(193,18,31,0.5)] border-4 border-white/20">
                    <MapPin size={24} className="text-white md:w-[32px] md:h-[32px]" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-background-dark/90 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10">
                <p className="text-primary font-black text-[10px] md:text-xs tracking-widest italic mb-1 uppercase">SMISPORTSWEAR HQ</p>
                <p className="text-white/40 text-[8px] md:text-[10px] uppercase font-black tracking-tighter">Export Industrial Zone, Sialkot, PK</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:sticky lg:top-32"
          >
            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] md:rounded-[4rem] shadow-2xl">
              <div className="bg-background-dark rounded-[2.4rem] md:rounded-[3.9rem] overflow-hidden">
                <QuoteForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
