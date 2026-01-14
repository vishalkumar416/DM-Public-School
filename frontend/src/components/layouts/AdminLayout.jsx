import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiImage,
  FiBell,
  FiDollarSign,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
  FiChevronDown,
  FiLock,
  FiSave,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import useAuthStore from '../../store/authStore';
import Notifications from '../Notifications';
import Footer from '../Footer';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout, checkAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    name: '',
    email: ''
  });
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Check if we have cached admin data first
    const token = localStorage.getItem('token');
    const adminStr = localStorage.getItem('admin');
    
    console.log('AdminLayout: Checking auth', { token: !!token, adminStr: !!adminStr });
    
    if (token && adminStr) {
      try {
        const cachedAdmin = JSON.parse(adminStr);
        console.log('AdminLayout: Setting admin from cache', cachedAdmin);
        // Set admin immediately from cache
        useAuthStore.setState({ admin: cachedAdmin, isAuthenticated: true, loading: false });
        setLoading(false);
      } catch (e) {
        // Invalid cache, redirect to login
        console.error('Invalid cached admin data:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/admin/login');
        setLoading(false);
      }
    } else {
      // No cache, redirect to login
      console.log('AdminLayout: No cache, redirecting to login');
      navigate('/admin/login');
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    if (admin) {
      setProfileFormData({
        name: admin.name || '',
        email: admin.email || ''
      });
    }
  }, [admin]);

  const handleProfileSettings = () => {
    setProfileDropdownOpen(false);
    setShowProfileSettings(true);
    setActiveTab('profile');
    setProfileFormData({
      name: admin?.name || '',
      email: admin?.email || ''
    });
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/auth/profile', profileFormData);
      if (response.data.success) {
        // Update the admin in store
        useAuthStore.setState({ admin: response.data.admin });
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        toast.success('Profile updated successfully');
        setShowProfileSettings(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordFormData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword
      });
      toast.success('Password changed successfully');
      setPasswordFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowProfileSettings(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error changing password');
    }
  };

  // Timeout after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [loading]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  // Debug logging
  console.log('AdminLayout render:', { loading, admin: !!admin, adminName: admin?.name });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-secondary-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    console.warn('AdminLayout: No admin data, showing fallback');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-secondary-600 mb-4">No admin data found</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/students', icon: FiUsers, label: 'Students' },
    { path: '/admin/teachers', icon: FiUserCheck, label: 'Teachers' },
    { path: '/admin/admissions', icon: FiFileText, label: 'Admissions' },
    { path: '/admin/gallery', icon: FiImage, label: 'Gallery' },
    { path: '/admin/notices', icon: FiBell, label: 'Notices' },
    { path: '/admin/fees', icon: FiDollarSign, label: 'Fees' },
    { path: '/admin/contacts', icon: FiMail, label: 'Contacts' },
    { path: '/admin/content', icon: FiSettings, label: 'Content' },
  ];

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Top Header - Full Width */}
      <header className="w-full bg-white border-b border-secondary-200 px-3 sm:px-4 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-sm z-40 flex-shrink-0">
        {/* Logo and School Name */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-secondary-700 hover:text-primary-500 transition-colors mr-2 sm:mr-3 p-1"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-soft flex-shrink-0">
            <img 
              src="/logo.jpeg" 
              alt="D.M. Public School Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0 hidden sm:block">
            <h1 className="text-base sm:text-lg font-bold text-primary-500 leading-tight">D.M. Public School</h1>
            <p className="text-xs text-secondary-500 mt-0.5">Admin Panel</p>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="mr-2 sm:mr-4">
          <Notifications />
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative profile-dropdown-container">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-secondary-900">{admin?.name || 'Admin'}</p>
              <p className="text-xs text-secondary-500">{admin?.role || 'Administrator'}</p>
            </div>
            <FiChevronDown 
              size={18} 
              className={`text-secondary-500 transition-transform hidden sm:block ${profileDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>
          
          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-large border border-secondary-200 overflow-hidden z-50">
              <div className="p-4 border-b border-secondary-200">
                <p className="font-semibold text-secondary-900">{admin?.name || 'Admin'}</p>
                <p className="text-sm text-secondary-600 mt-1">{admin?.email || ''}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs bg-primary-100 text-primary-600 rounded-lg font-medium">
                  {admin?.role || 'Administrator'}
                </span>
              </div>
              <div className="p-2">
                  <button
                    onClick={handleProfileSettings}
                    className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-secondary-700 hover:bg-secondary-50 transition-colors text-left"
                  >
                    <FiUser size={18} />
                    <span className="font-medium">Profile Settings</span>
                  </button>
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-left mt-1"
                >
                  <FiLogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content Area with Sidebar and Main */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative top-0 left-0 z-30 w-64 bg-white shadow-large lg:shadow-soft transform transition-transform duration-300 ease-in-out border-r border-secondary-200 flex-shrink-0 h-full ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden min-h-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-soft'
                      : 'text-secondary-700 hover:bg-primary-50 hover:text-primary-500'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-secondary-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              <FiLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 h-full w-full lg:w-auto overflow-y-auto overflow-x-hidden flex flex-col">
          <main className="p-4 lg:p-8 flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-4 max-h-[95vh] flex flex-col">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 bg-white z-10 flex-shrink-0">
              <h2 className="text-lg sm:text-2xl font-bold">Profile Settings</h2>
              <button
                onClick={() => setShowProfileSettings(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiUser className="inline mr-2" size={18} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'password'
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiLock className="inline mr-2" size={18} />
                  Change Password
                </button>
              </div>

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.name}
                      onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                      className="input-field rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={profileFormData.email}
                      onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })}
                      className="input-field rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-2">
                    <button
                      type="button"
                      onClick={() => setShowProfileSettings(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-auto">
                      <FiSave size={18} /> Save Changes
                    </button>
                  </div>
                </form>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      value={passwordFormData.currentPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                      className="input-field rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      value={passwordFormData.newPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                      className="input-field rounded-lg"
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={passwordFormData.confirmPassword}
                      onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                      className="input-field rounded-lg"
                      minLength={6}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200 sticky bottom-0 bg-white pb-2">
                    <button
                      type="button"
                      onClick={() => setShowProfileSettings(false)}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary flex items-center justify-center gap-2 px-4 py-2.5 w-full sm:w-auto">
                      <FiSave size={18} /> Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
