"use client";

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TopProgressBar = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start progress sequence
    const sequence = async () => {
      await controls.start({ opacity: 1, width: '0%', transition: { duration: 0 } });
      await controls.start({
        width: '40%',
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      });
      await controls.start({
        width: '100%',
        transition: { duration: 0.8, ease: "linear" } 
      });
      await controls.start({
        opacity: 0,
        transition: { duration: 0.4 }
      });
    };
    
    sequence();

    // Fallback safety timeout is no longer needed since it completes, but keeping for structure
    const safetyTimeout = setTimeout(() => {}, 15000);

    return () => {
      clearTimeout(safetyTimeout);
      // Finish line animation on unmount
      controls.start({
        width: '100%',
        transition: { duration: 0.3, ease: "easeIn" }
      });
    };
  }, [controls]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[10000] h-[3px] sm:h-1 pointer-events-none overflow-hidden">
      <motion.div
        initial={{ width: '0%' }}
        animate={controls}
        style={{ originX: 0 }}
        className="h-full bg-gradient-to-r from-primary/80 via-primary to-[#ff4d6d] relative shadow-[0_0_15px_rgba(193,18,31,0.8),0_0_5px_rgba(193,18,31,0.4)]"
      >
        {/* Elegant glowing tail */}
        <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-r from-transparent to-[#ff4d6d] opacity-100 blur-[2px] transform -skew-x-12" />
      </motion.div>
    </div>
  );
};

export default TopProgressBar;
