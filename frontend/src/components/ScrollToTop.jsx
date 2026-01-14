import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Scroll both window and document elements
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      
      // Also scroll document.documentElement and document.body
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
      
      // Additional scroll after a tiny delay to handle any layout shifts
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }, 0);
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;

