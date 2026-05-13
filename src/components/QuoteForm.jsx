import React, { useState } from 'react';
import { Send, CheckCircle, ArrowRight, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/axios';

const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // STRICT_DEBUG: Construct FormData explicitly
    const formData = new FormData();
    const elements = e.target.elements;
    
    formData.append('name', elements.name.value);
    formData.append('company', elements.company.value);
    formData.append('country', elements.country.value);
    formData.append('whatsapp', elements.whatsapp.value);
    formData.append('email', elements.email.value);
    formData.append('productType', elements.productType.value);
    formData.append('quantity', elements.quantity.value);
    formData.append('message', elements.message.value);
    
    // Key change: Ensure field name matches backend 'upload.single("design")'
    if (elements.uploadedFile.files[0]) {
      formData.append('design', elements.uploadedFile.files[0]);
    }

    // STRICT_DEBUG: Log full payload trace
    console.log('🚀 [SUBMIT_START] Quote Request Payload Trace:');
    for (let [key, value] of formData.entries()) {
      console.log(`   - ${key}:`, value instanceof File ? `File(${value.name}, ${value.type}, ${value.size} bytes)` : value);
    }
    
    try {
      // Step 2: API SEND - Let browser/axios handle Content-Type for FormData
      console.log('📡 [API_SEND] Requesting POST /api/leads...');
      const response = await API.post('/leads', formData);
      console.log('✅ [API_SEND] Success Response:', response.data);
      
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      } else {
        throw new Error(`Non-success status: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ [API_SEND] Error Failed:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      alert('Failed to send request. Check console for [API_ERROR] details.');
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="glass-apple p-12 md:p-16 rounded-[3.5rem] text-center"
      >
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="p-8 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_30px_rgba(193,18,31,0.2)]">
            <CheckCircle size={80} className="text-primary" />
          </div>
        </motion.div>
        <h3 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter italic">REQUEST RECEIVED</h3>
        <p className="text-white/40 mb-12 font-medium italic max-w-sm mx-auto">Our production manager will contact you within 24 hours via <span className="text-white">WhatsApp</span> or Email.</p>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSubmitted(false)} 
          className="btn-secondary px-12 border-white/5 italic"
        >
          SEND ANOTHER REQUEST
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form 
      variants={formVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      onSubmit={handleSubmit} 
      className="glass-apple p-10 md:p-16 rounded-[4rem] space-y-10 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px]" />
      
      <div className="mb-12">
        <h4 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Get Your <br /><span className="text-primary italic">Custom Quote</span></h4>
        <p className="text-sm font-medium text-white/40 italic mb-10">Tell us what you need — we’ll handle the rest.</p>
        
        <div className="space-y-4 pt-6 border-t border-white/5">
          {[
            "Fast response within 24 hours",
            "Free consultation",
            "Custom design support included"
          ].map((point, i) => (
            <div key={i} className="flex items-center space-x-3 text-white/30">
              <CheckCircle size={14} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{point}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Full Name</label>
          <input type="text" name="name" required className="input-premium py-4" placeholder="E.G. ROBERT CHEN" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Company / Club</label>
          <input type="text" name="company" required className="input-premium py-4" placeholder="E.G. NEW YORK ATHLETIC CLUB" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Country</label>
          <input type="text" name="country" required className="input-premium py-4" placeholder="EX: UNITED STATES" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">WhatsApp Number</label>
          <input type="tel" name="whatsapp" required className="input-premium py-4" placeholder="+1 000 000 0000" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Email Address</label>
          <input type="email" name="email" required className="input-premium py-4" placeholder="INFO@ELITE.COM" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Product Type</label>
          <select name="productType" required className="input-premium py-4 appearance-none">
            <option value="">-- PLEASE SELECT --</option>
            <option value="teamwear">TEAMWEAR</option>
            <option value="training">TRAINING WEAR</option>
            <option value="school">SCHOOL SPORTS UNIFORM</option>
            <option value="private">PRIVATE LABEL PRODUCTION</option>
          </select>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div variants={itemVariants}>
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Quantity (MOQ 10+)</label>
          <input type="number" name="quantity" min="10" required className="input-premium py-4" placeholder="50" />
        </motion.div>
        <motion.div variants={itemVariants} className="relative">
          <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Upload Design (Concept)</label>
          <div className="relative group">
            <input type="file" name="uploadedFile" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div className="w-full bg-white/[0.03] border border-dashed border-white/10 rounded-2xl py-6 px-10 flex items-center justify-between group-hover:border-primary/40 group-hover:bg-white/[0.05] transition-all duration-500">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] italic">Browse Design...</span>
              <UploadCloud size={20} className="text-white/20 group-hover:text-primary transition-colors duration-500" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 italic">Project Message</label>
        <textarea name="message" rows="4" className="input-premium py-5 px-6 resize-none" placeholder="TELL US ABOUT YOUR PROJECT REQUIREMENTS..."></textarea>
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-between px-12 py-6 group disabled:opacity-50 shadow-premium"
        >
          <span className="tracking-[0.5em] font-black italic uppercase">Submit Quote</span>
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500 ease-apple" />
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default QuoteForm;
