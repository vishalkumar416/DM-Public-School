import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Chatbot from '../Chatbot';

const PublicLayout = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Ensure scroll to top on route change
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };
    
    // Scroll immediately
    scrollToTop();
    
    // Also scroll after a small delay to handle any async content loading
    const timeoutId = setTimeout(scrollToTop, 0);
    const timeoutId2 = setTimeout(scrollToTop, 100);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [location.pathname]);
  
  try {
    return (
      <div className="min-h-screen flex flex-col bg-white" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Navbar />
        <main className="flex-1" style={{ flex: 1 }}>
          <Outlet />
        </main>
        <Footer />
        <Chatbot />
      </div>
    );
  } catch (error) {
    console.error('PublicLayout Error:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Layout Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default PublicLayout;
