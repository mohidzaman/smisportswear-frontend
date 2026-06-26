import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-background-dark border-t border-white/5 pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 mb-16 md:mb-24 relative z-10"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <Link to="/" className="mb-8 block group">
            <img 
              src={logoImg} 
              alt="SMI Sportswear" 
              className="h-20 md:h-28 w-auto object-contain opacity-100 transition-all duration-300" 
            />
          </Link>
          <p className="text-white/40 text-[9px] md:text-[10px] font-black leading-relaxed mb-8 md:mb-10 italic uppercase tracking-[0.3em] md:tracking-[0.4em] max-w-xs">
            Teamwear Without Compromise. Professional manufacturing for clubs, schools, and brands since 2013.
          </p>
          <div className="flex space-x-6 justify-center sm:justify-start">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/smi-sports-wear" },
              { Icon: Instagram, href: "https://www.instagram.com/smi-sports-wear" },
              { Icon: Facebook, href: "https://www.facebook.com/share/18aJmLvaYL/" }
            ].map((social, idx) => (
              <motion.a 
                key={idx}
                whileHover={{ scale: 1.2, rotate: 12, color: "#c1121f" }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 transition-colors"
              >
                <social.Icon size={20} md:size={22} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center sm:text-left">
          <h4 className="text-[9px] md:text-[10px] font-black text-white uppercase mb-8 md:mb-10 tracking-[0.3em] md:tracking-[0.4em] italic opacity-50">Navigation</h4>
          <ul className="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest italic">
            {[
              { label: "Home", to: "/" },
              { label: "Products", to: "/products" },
              { label: "Manufacturing", to: "/manufacturing" },
              { label: "Customization", to: "/customization" },
              { label: "How to Order", to: "/how-to-order" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="text-white/30 hover:text-primary transition-all flex items-center justify-center sm:justify-start group">
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center sm:text-left">
          <h4 className="text-[9px] md:text-[10px] font-black text-white uppercase mb-8 md:mb-10 tracking-[0.3em] md:tracking-[0.4em] italic opacity-50">Industrial Support</h4>
          <ul className="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest italic">
            {[
              { label: "Order Tracking", to: "/how-to-order" },
              { label: "Size Guide", to: "/how-to-order" },
              { label: "Shipping Policy", to: "/how-to-order" },
              { label: "Contact Support", to: "/contact" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link to={link.to} className="text-white/30 hover:text-primary transition-all flex items-center justify-center sm:justify-start group">
                  <span>{link.label}</span>
                  <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center sm:text-left">
          <h4 className="text-[9px] md:text-[10px] font-black text-white uppercase mb-8 md:mb-10 tracking-[0.3em] md:tracking-[0.4em] italic opacity-50">Contact Matrix</h4>
          <ul className="space-y-6 md:space-y-8 text-xs md:text-sm font-bold italic">
            <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
              <MapPin size={20} className="text-primary shrink-0 transition-transform hover:scale-125" />
              <div className="space-y-1">
                <span className="text-white/50 block text-[9px] md:text-[10px] uppercase tracking-widest font-black">Factory Address</span>
                <span className="text-white uppercase tracking-tighter text-xs md:text-sm">Sialkot, Punjab, Pakistan</span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
              <MessageCircle size={20} className="text-[#25D366] shrink-0 transition-transform hover:scale-125" />
              <div className="space-y-1">
                <span className="text-white/50 block text-[9px] md:text-[10px] uppercase tracking-widest font-black">WhatsApp</span>
                <span className="text-white tracking-tighter text-xs md:text-sm">+92 342 5744310</span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
              <Mail size={20} className="text-primary shrink-0 transition-transform hover:scale-125" />
              <div className="space-y-1">
                <span className="text-white/50 block text-[9px] md:text-[10px] uppercase tracking-widest font-black">Email</span>
                <span className="text-white tracking-tighter text-xs md:text-sm">smisportswears@gmail.com</span>
              </div>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/20 italic space-y-4 md:space-y-0 relative z-10 text-center md:text-left">
        <p>
          &copy; {new Date().getFullYear()} SMI Sportswear. Engineering Excellence.{' '}
          <span className="text-white/10">|</span>{' '}
          Built by{' '}
          <a
            href="https://servsa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/60 hover:text-primary transition-colors duration-300"
          >
            SERVSA
          </a>
        </p>
        <div className="flex space-x-6 md:space-x-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
