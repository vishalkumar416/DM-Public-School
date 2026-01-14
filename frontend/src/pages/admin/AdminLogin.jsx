import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';
import { Helmet } from 'react-helmet-async';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.email, formData.password);

    if (result.success) {
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } else {
      toast.error(result.message || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - D.M. Public School</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-600/20"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-large p-8 w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-soft">
                <img 
                  src="/logo.jpeg" 
                  alt="D.M. Public School Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-secondary-900"></h1>
                <p className="text-sm text-secondary-600"></p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-secondary-900">Admin Login</h2>
            <p className="text-secondary-600 mt-2">Sign in to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="admin@dmpschool.com"
                />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors">
              ← Back to Website
            </a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AdminLogin;
