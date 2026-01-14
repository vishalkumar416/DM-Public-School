import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import './index.css'

console.log('Main.jsx: Starting React app...');
console.log('Root element:', document.getElementById('root'));

try {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('Root created successfully');
  
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Fatal error in main.jsx:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial;">
      <h1>Fatal Error</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}





