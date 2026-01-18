import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiArrowUp,
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e) => {
    // Scroll to top immediately when footer link is clicked
    // Scroll multiple elements to ensure it works
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
    
    // Also scroll after navigation completes
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 100);
  };

  const footerLinks = {
    quickLinks: [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About Us' },
      { path: '/academics', label: 'Academics' },
      { path: '/admissions', label: 'Admissions' },
    ],
    resources: [
      { path: '/faculty', label: 'Faculty' },
      { path: '/gallery', label: 'Gallery' },
      { path: '/notices', label: 'Notices' },
      { path: '/infrastructure', label: 'Infrastructure' },
    ],
    support: [
      { path: '/contact', label: 'Contact Us' },
      { path: '/admissions', label: 'Apply Now' },
      { path: '/notices', label: 'Latest Updates' },
    ],
  };

  const socialLinks = [
    { icon: FiFacebook, href: 'https://www.facebook.com/share/1Db2ywVGER/', label: 'Facebook' },
    { icon: FiYouTube, href: 'https://www.youtube.com/@D.M9076', label: 'YouTube' },
    { icon: FiInstagram, href: 'https://www.instagram.com/sauravkumar2518/?igsh=MXBzdGx2dGJkZWtsMQ%3D%3D#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary-50 via-white to-secondary-100 text-secondary-900 relative overflow-hidden border-t border-secondary-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 101, 255, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="w-full relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white flex items-center justify-center p-1.5 shadow-soft">
                <img 
                  src="/logo.jpeg" 
                  alt="D.M. Public School Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">D.M. Public School</h3>
                <p className="text-sm text-secondary-600">Excellence in Education</p>
              </div>
            </div>
            <p className="text-secondary-700 text-sm leading-relaxed">
              A premier educational institution committed to nurturing young minds and fostering
              holistic development through quality education.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-primary-100 hover:bg-primary-500 text-primary-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="text-secondary-700 hover:text-primary-600 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="text-secondary-700 hover:text-primary-600 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 mr-0 group-hover:mr-2 transition-all duration-200"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-600 mt-1 flex-shrink-0" size={18} />
                <p className="text-secondary-700 text-sm">
                  Garahi, Desari, Vaishali<br />
                  Bihar – 844504<br />
                  500 meters west from Imli Chowk
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-600 flex-shrink-0" size={18} />
                <a
                  href="tel:7352737650"
                  className="text-secondary-700 hover:text-primary-600 transition-colors text-sm"
                >
                  7352737650
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-primary-600 flex-shrink-0" size={18} />
                <a
                  href="mailto:info@dmps.co.in"
                  className="text-secondary-700 hover:text-primary-600 transition-colors text-sm"
                >
                  info@dmps.co.in
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-200 py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-secondary-600 text-sm">
            © {new Date().getFullYear()} D.M. Public School. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-secondary-600">
            <Link 
              to="/privacy" 
              onClick={handleLinkClick}
              className="hover:text-primary-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              onClick={handleLinkClick}
              className="hover:text-primary-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-large flex items-center justify-center z-40 transition-all duration-300"
        aria-label="Scroll to top"
      >
        <FiArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
