'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it has already been shown in this session
    const hasSeenPromo = sessionStorage.getItem('promo_seen');
    
    if (!hasSeenPromo) {
      // Short delay before showing so page loads first
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Lock background scrolling when open
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup to ensure scrolling restores on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-background-dark border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(193,18,31,0.5)] z-10"
          >
            {/* Premium Background Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 blur-[80px] pointer-events-none" />
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10 text-center relative z-10 flex flex-col items-center">
              <span className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">
                LIMITED TIME OFFER
              </span>
              
              <h2 className="text-3xl sm:text-5xl font-black text-white italic uppercase tracking-tighter leading-[0.9] sm:leading-[0.9] mb-2">
                Custom Soccer <br className="hidden sm:block" />
                <span className="text-primary text-glow">Uniforms</span>
              </h2>
              
              <div className="flex flex-col items-center my-8">
                <span className="text-white/40 text-lg line-through font-bold mb-1">$18.99</span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tighter">Only $16.99</span>
                <span className="mt-3 text-[#1AFF00] text-[10px] sm:text-xs font-black uppercase tracking-widest text-glow-primary">
                  Save $2.00 Today
                </span>
              </div>
              
              <Link 
                href="/contact"
                onClick={handleClose}
                className="btn-primary w-full group flex items-center justify-center space-x-3 py-4 sm:py-5"
              >
                <span className="tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px]">GET YOUR KIT NOW</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
