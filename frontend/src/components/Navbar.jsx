import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown,
  FiHome,
  FiInfo,
  FiBookOpen,
  FiUsers,
  FiImage,
  FiVideo,
  FiBell,
  FiMail,
  FiLogIn,
  FiSearch,
  FiMoon,
  FiSun
} from 'react-icons/fi';
import useThemeStore from '../store/themeStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Initialize theme on mount
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/about', label: 'About', icon: FiInfo },
    {
      label: 'Academics',
      icon: FiBookOpen,
      dropdown: [
        { path: '/academics', label: 'Academics Overview' },
        { path: '/faculty', label: 'Faculty' },
        { path: '/infrastructure', label: 'Infrastructure' },
      ],
    },
    {
      label: 'Admission',
      icon: FiUsers,
      dropdown: [
        { path: '/admissions', label: 'Admissions' },
        { path: '/notices', label: 'Notices' },
      ],
    },
    {
      label: 'Media',
      icon: FiImage,
      dropdown: [
        { path: '/gallery', label: 'Photo Gallery' },
        { path: '/videos', label: 'Videos' },
      ],
    },
    { path: '/curriculum', label: 'Curriculum', icon: FiBookOpen },
    { path: '/contact', label: 'Contact', icon: FiMail },
  ];

  const isActive = (path) => location.pathname === path;

  // Search functionality
  const searchPages = [
    { path: '/', label: 'Home', keywords: ['home', 'main', 'welcome'] },
    { path: '/about', label: 'About Us', keywords: ['about', 'school', 'history', 'vision', 'mission'] },
    { path: '/academics', label: 'Academics', keywords: ['academics', 'subjects', 'classes'] },
    { path: '/faculty', label: 'Faculty', keywords: ['faculty', 'teachers', 'staff'] },
    { path: '/infrastructure', label: 'Infrastructure', keywords: ['infrastructure', 'facilities', 'building', 'labs'] },
    { path: '/admissions', label: 'Admissions', keywords: ['admission', 'apply', 'enrollment', 'registration'] },
    { path: '/gallery', label: 'Gallery', keywords: ['gallery', 'photos', 'images', 'events'] },
    { path: '/videos', label: 'Videos', keywords: ['videos', 'annual day', 'republic day', 'dance', 'celebrations'] },
    { path: '/notices', label: 'Notices', keywords: ['notices', 'announcements', 'updates', 'news'] },
    { path: '/curriculum', label: 'Curriculum', keywords: ['curriculum', 'cbse', 'ncert', 'syllabus', 'framework'] },
    { path: '/contact', label: 'Contact', keywords: ['contact', 'reach', 'phone', 'email', 'address'] },
  ];

  const filteredSearchResults = searchQuery.trim()
    ? searchPages.filter(page => 
        page.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.some(keyword => keyword.includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredSearchResults.length > 0) {
      navigate(filteredSearchResults[0].path);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <>
      {/* Scrolling Slogan Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-2.5 overflow-hidden shadow-md">
        <div className="animate-marquee whitespace-nowrap">
          <span className="inline-block px-6 text-sm sm:text-base font-medium">
            अशिक्षित को शिक्षा दो अज्ञानी को ज्ञान और शिक्षा से ही बन सकता है मेरा भारत देश महान | Give education to the uneducated, knowledge to the ignorant, and only through education can my India become great.
          </span>
          <span className="inline-block px-6 text-sm sm:text-base font-medium">
            अशिक्षित को शिक्षा दो अज्ञानी को ज्ञान और शिक्षा से ही बन सकता है मेरा भारत देश महान | Give education to the uneducated, knowledge to the ignorant, and only through education can my India become great.
          </span>
        </div>
      </div>
      
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-8 sm:top-10 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-medium py-3'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="w-full">
        <div className="flex items-center justify-between">
          {/* Logo - Extreme Left */}
          <Link to="/" className="flex items-center space-x-3 group pl-4 sm:pl-6 lg:pl-8">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-soft">
                <img 
                  src="/logo.jpeg" 
                  alt="D.M. Public School Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                  D.M. Public School
                </h1>
                <p className="text-xs text-secondary-500">Excellence in Education</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 pr-4 sm:pr-6 lg:pr-8">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center space-x-1 px-4 py-2 rounded-lg text-secondary-700 font-medium hover:text-primary-600 hover:bg-primary-50 transition-all duration-200">
                      <span>{item.label}</span>
                      <FiChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-large border border-secondary-100 overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="block px-4 py-3 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            
            {/* Search Box */}
            <div className="relative ml-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  placeholder="Search..."
                  className="w-48 px-4 py-2 pl-10 pr-4 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-200 bg-white text-secondary-900 placeholder:text-secondary-400"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
              </form>
              
              {/* Search Results Dropdown */}
              <AnimatePresence>
                {showSearchResults && filteredSearchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-large border border-secondary-100 overflow-hidden z-50"
                  >
                    {filteredSearchResults.map((result) => (
                      <button
                        key={result.path}
                        onClick={() => handleSearchResultClick(result.path)}
                        className="w-full text-left px-4 py-3 text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        <div className="font-medium">{result.label}</div>
                        <div className="text-xs text-secondary-500 mt-1">{result.path}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-3 p-2.5 rounded-lg transition-all duration-200 bg-white dark:bg-gray-800 border border-secondary-200 dark:border-gray-700 text-secondary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:border-primary-300 dark:hover:border-gray-600 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-center shadow-sm hover:shadow-md"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="text-yellow-500 dark:text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-secondary-600 dark:text-gray-400" size={18} />
              )}
            </button>
            
            <Link
              to="/admin/login"
              className="ml-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 bg-primary-600 dark:bg-primary-700 text-white hover:bg-primary-700 dark:hover:bg-primary-600 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <FiLogIn size={18} />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-secondary-700 hover:text-primary-600 transition-colors pr-4 sm:pr-6"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              className="lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-white shadow-2xl z-[9999] flex flex-col h-screen w-screen"
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            >
              {/* Mobile Menu Header */}
              <div className="bg-white border-b-2 border-secondary-200 px-4 py-3.5 flex items-center justify-between shadow-lg flex-shrink-0 relative z-10">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-soft border border-secondary-200 flex-shrink-0">
                    <img 
                      src="/logo.jpeg" 
                      alt="D.M. Public School Logo" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-xs hidden">
                      DM
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-secondary-900 truncate">D.M. Public School</h2>
                    <p className="text-xs text-secondary-500 truncate">Excellence in Education</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-lg bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-300 text-secondary-700 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-6 min-h-0 relative z-10 bg-white" style={{ visibility: 'visible' }}>
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSearchResults(true);
                      }}
                      onFocus={() => setShowSearchResults(true)}
                      placeholder="Search..."
                      className="w-full px-4 py-2.5 pl-10 pr-4 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 bg-white text-secondary-900 placeholder:text-secondary-400 text-sm"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={18} />
                  </form>
                  {showSearchResults && filteredSearchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-large border border-secondary-100 overflow-hidden z-50 max-h-60 overflow-y-auto">
                      {filteredSearchResults.map((result) => (
                        <button
                          key={result.path}
                          onClick={() => {
                            handleSearchResultClick(result.path);
                            setMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors border-b border-secondary-100 last:border-b-0"
                        >
                          <div className="font-medium">{result.label}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Navigation Items - Single Column */}
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => {
                    if (item.dropdown) {
                      return (
                        <div key={item.label} className="w-full">
                          <button
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === item.label ? null : item.label
                              )
                            }
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-lg text-secondary-900 font-medium hover:bg-primary-50 active:bg-primary-100 transition-colors border border-secondary-200"
                          >
                            <span>{item.label}</span>
                            <FiChevronDown
                              size={16}
                              className={`transition-transform duration-200 text-primary-500 ${
                                activeDropdown === item.label ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 space-y-2"
                              >
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    onClick={() => {
                                      setMobileMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                    className="block w-full px-4 py-2.5 rounded-lg text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 transition-colors font-medium ml-4"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`w-full block px-4 py-3.5 rounded-lg font-medium transition-colors border ${
                          isActive(item.path)
                            ? 'text-primary-600 bg-primary-50 border-primary-200'
                            : 'text-secondary-900 border-secondary-200 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 active:bg-primary-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  {/* Theme Toggle - Mobile */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3.5 rounded-lg font-medium transition-colors bg-white dark:bg-gray-800 border border-secondary-200 dark:border-gray-700 text-secondary-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 mt-2"
                  >
                    {theme === 'dark' ? (
                      <>
                        <FiSun className="text-yellow-500" size={18} />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <FiMoon className="text-secondary-600" size={18} />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                  
                  {/* Admin Login Button */}
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3.5 rounded-lg font-medium transition-colors bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 mt-2 shadow-md"
                  >
                    <FiLogIn size={18} />
                    <span>Admin Login</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
};

export default Navbar;
