import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Chatbot from '../Chatbot';

const PublicLayout = () => {
  console.log('PublicLayout: Rendering...');
  
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
