import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
  const whatsappNumber = "923425744310";
  const message = encodeURIComponent("Hi, I want to get a quote for sportswear.");

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mb-4 pointer-events-auto"
        >
          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex items-center justify-center"
            title="Chat with us on WhatsApp"
          >
            {/* Direct Tooltip inviting action */}
            <div className="absolute right-full mr-4 md:mr-6 py-3 md:py-4 px-6 md:px-8 glass-apple border-white/10 rounded-2xl md:rounded-[2.5rem] shadow-premium opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pointer-events-none min-w-[180px] md:min-w-[240px] hidden sm:block">
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em] md:tracking-[0.4em] italic mb-1">Production Expert</span>
                <span className="text-white font-black text-[10px] md:text-xs uppercase italic tracking-wider">Fast-track My Order</span>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 glass-apple border-r border-t border-white/10 rotate-45" />
            </div>

            {/* Pulsing Aura for active attention */}
            <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30" />
            
            <div className="relative bg-[#25D366] text-white p-4 md:p-5 rounded-full shadow-[0_20px_40px_rgba(37,211,102,0.4)] md:shadow-[0_25px_50px_rgba(37,211,102,0.5)] border-2 md:border-4 border-white/30 group-hover:border-white/50 transition-all">
              <MessageCircle size={24} className="md:w-[32px] md:h-[32px]" />
            </div>
          </motion.a>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FloatingWhatsApp;
