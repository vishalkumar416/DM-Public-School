import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, checkAuth, admin } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if we already have auth data in localStorage
    const token = localStorage.getItem('token');
    const adminStr = localStorage.getItem('admin');
    
    console.log('ProtectedRoute: Checking auth', { token: !!token, adminStr: !!adminStr });
    
    if (token && adminStr) {
      // If we have cached data, set it immediately
      try {
        const cachedAdmin = JSON.parse(adminStr);
        console.log('ProtectedRoute: Setting admin from cache', cachedAdmin);
        useAuthStore.setState({ admin: cachedAdmin, isAuthenticated: true, loading: false });
        setChecking(false);
      } catch (e) {
        // Invalid cache, clear and redirect
        console.error('Invalid cached admin data:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        useAuthStore.setState({ admin: null, isAuthenticated: false, loading: false });
        setChecking(false);
      }
    } else {
      // No cache, not authenticated
      console.log('ProtectedRoute: No cache found');
      useAuthStore.setState({ admin: null, isAuthenticated: false, loading: false });
      setChecking(false);
    }
  }, []);

  // Timeout after 3 seconds to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (checking) {
        console.warn('Auth check timeout, proceeding with cached data');
        setChecking(false);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [checking]);

  console.log('ProtectedRoute render:', { checking, loading, isAuthenticated, admin: !!admin });

  if (checking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !admin) {
    console.warn('ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  console.log('ProtectedRoute: Rendering children');
  return children;
};

export default ProtectedRoute;





