import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Manufacturing', path: '/manufacturing' },
    { name: 'Customization', path: '/customization' },
    { name: 'How To Order', path: '/how-to-order' },
    { name: 'Gallery', path: '/gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? 'bg-background-dark/95 backdrop-blur-xl border-b border-white/10 py-1 shadow-2xl'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0 group flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={logoImg}
              alt="SMI Sportswear"
              className="h-32 w-auto object-contain opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        </Link>

        {/* Desktop Nav - Centered */}
        <nav className="hidden lg:flex items-center gap-x-8 px-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`nav-link group flex flex-col items-center whitespace-nowrap transition-colors duration-500 ${isActive(item.path) ? 'text-primary' : 'text-white/40 hover:text-white'
                  }`}
              >
                <motion.span 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {item.name}
                </motion.span>
                <AnimatePresence>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-primary rounded-full shadow-[0_4px_12px_rgba(193,18,31,0.6)]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Action Group - Right */}
        <div className="hidden lg:flex items-center gap-x-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-x-5"
          >
            <Link
              to="/contact"
              className={`p-2.5 rounded-xl border transition-all duration-500 group/icon hover:scale-110 active:scale-95 ${isActive('/contact')
                  ? 'text-primary border-primary/30 bg-primary/5'
                  : 'text-white/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                }`}
            >
              <Phone size={18} className="group-hover/icon:text-primary transition-colors duration-500" />
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex-shrink-0"
            >
              <Link to="/contact" className="btn-primary whitespace-nowrap inline-block">
                GET QUOTE
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-white p-2.5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-background-dark border-l border-white/10 z-50 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <img src={logoImg} alt="SMI Sportswear" className="h-24 w-auto object-contain opacity-90" />
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all ${isActive(item.path)
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-white/5 text-white/70 hover:text-white'
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-lg font-black uppercase tracking-tight">{item.name}</span>
                      <ChevronRight size={18} className={isActive(item.path) ? 'opacity-100' : 'opacity-20'} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto space-y-4">
                <Link
                  to="/contact"
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary group-hover:scale-110 transition-transform">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Support</p>
                      <p className="text-sm font-black uppercase tracking-tight">Contact Us</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  to="/contact"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsOpen(false)}
                >
                  GET QUOTE
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
