import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // If it's a POP navigation (browser back/forward), let the browser restore scroll position.
    // Otherwise (PUSH or REPLACE), scroll the window to the top.
    if (navigationType !== 'POP') {
      // Use requestAnimationFrame to ensure the scroll command runs after the DOM updates
      // and any layout adjustments or page wrappers have mounted.
      const handleScroll = () => {
        // Temporarily disable CSS smooth scrolling for Safari/iOS compatibility
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = '';
        }, 50);
      };

      // Run immediately and queue another frame just in case of lazy component rendering delay
      handleScroll();
      const frameId = requestAnimationFrame(handleScroll);
      return () => cancelAnimationFrame(frameId);
    }
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
