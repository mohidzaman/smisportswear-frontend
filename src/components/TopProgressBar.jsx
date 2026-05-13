import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const TopProgressBar = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start progress sequence
    const sequence = async () => {
      await controls.start({
        width: '35%',
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      });
      await controls.start({
        width: '75%',
        transition: { duration: 8, ease: "linear" } // Slow crawl for perceived loading
      });
    };
    
    sequence();

    // Fallback safety timeout
    const safetyTimeout = setTimeout(() => {
      controls.start({
        width: '100%',
        transition: { duration: 0.6 }
      });
    }, 15000);

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
    <div className="fixed top-0 left-0 right-0 z-[10000] h-[2px] pointer-events-none overflow-hidden">
      <motion.div
        initial={{ width: '0%' }}
        animate={controls}
        style={{ originX: 0 }}
        className="h-full bg-primary shadow-[0_0_12px_rgba(193,18,31,0.6)]"
      />
    </div>
  );
};

export default TopProgressBar;
