'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Disable CSS smooth-scroll momentarily for instant snap on route change
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
