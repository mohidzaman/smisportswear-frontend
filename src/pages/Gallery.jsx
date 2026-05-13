import React, { useState, useEffect } from 'react';
import { X, Maximize2, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonCard } from '../components/Skeleton';
import heroMain from '../assets/hero_main.webp';
import catTeamwear from '../assets/cat_teamwear.webp';
import catTraining from '../assets/cat_training.webp';
import mfgSublimation from '../assets/mfg_sublimation.webp';
import mfgEmbroidery from '../assets/mfg_embroidery.webp';

import API from '../api/axios';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data } = await API.get('/gallery');
      setPhotos(data);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      // Small artificial delay for skeleton polish
      setTimeout(() => setLoading(false), 800);
    }
  };

  const filteredPhotos = photos.filter(img => 
    img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (img.category && img.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  return (
    <div className="flex flex-col bg-background-dark pt-24 min-h-screen overflow-x-hidden">
      <section className="section-elite max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-black text-primary tracking-[0.4em] uppercase mb-6">Visual Portfolio</h2>
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic">
              ELITE <span className="text-primary italic text-glow-primary">COLLECTION</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative lg:w-96"
          >
            <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="SEARCH PROJECTS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-premium pl-14 py-4 text-[10px] font-black tracking-widest uppercase italic" 
            />
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((img, i) => (
                <motion.div 
                  layout
                  key={img._id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative rounded-[2.5rem] overflow-hidden group border border-white/5 cursor-pointer bg-white/5"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={img.imageUrls?.[0] || img.url} 
                      alt={img.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover opacity-60 group-hover:opacity-80 transition-all duration-1000 grayscale hover:grayscale-0"
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 p-10 transform translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3 block italic">{img.category || img.cat}</span>
                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter italic leading-none">{img.title}</h4>
                    <div className="flex items-center text-white text-[10px] font-black tracking-[0.2em] space-x-3">
                      <div className="p-2 border border-white/20 rounded-full">
                        <Maximize2 size={12} className="group-hover:rotate-90 transition-transform duration-500" />
                      </div>
                      <span>EXPLORE PROJECT</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <button className="btn-secondary group flex items-center space-x-6 mx-auto border-white/10 group">
            <span className="tracking-[0.5em] font-black italic">VIEW ARCHIVE</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background-dark/98 backdrop-blur-2xl flex items-center justify-center p-6 lg:p-24"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="absolute top-10 right-10 text-white hover:text-primary transition-colors z-[110]"
            >
              <X size={40} strokeWidth={3} />
            </motion.button>
            
            <div className="max-w-[1400px] w-full h-full flex flex-col items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative group/lightbox w-full max-h-[75vh] flex justify-center"
              >
                <img 
                  src={selectedImage.imageUrls?.[0] || selectedImage.url} 
                  alt={selectedImage.title} 
                  className="max-w-full max-h-full rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10 object-contain" 
                />
                
                <div className="absolute -bottom-12 -left-12 -right-12 h-64 bg-gradient-to-t from-background-dark to-transparent z-[-1] blur-3xl opacity-50" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-12"
              >
                <div className="inline-flex items-center space-x-3 text-primary text-[10px] font-black tracking-[0.5em] uppercase mb-4 italic">
                  <div className="w-12 h-[1px] bg-primary/30" />
                  <span>{selectedImage.category || selectedImage.cat}</span>
                  <div className="w-12 h-[1px] bg-primary/30" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">{selectedImage.title}</h3>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
