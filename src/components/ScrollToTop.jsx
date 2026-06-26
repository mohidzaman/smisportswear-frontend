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
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant', // 'instant' bypasses CSS scroll-behavior: smooth to prevent jumpiness/conflicts
        });
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
