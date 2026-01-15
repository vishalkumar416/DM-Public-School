import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FiAward,
  FiUsers,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiAlertCircle,
  FiBookmark,
  FiTruck,
  FiCalendar,
  FiMic,
  FiShield,
  FiBook,
} from 'react-icons/fi';
import api from '../utils/api';

const Home = () => {
  const [urgentNotices, setUrgentNotices] = useState([]);

  useEffect(() => {
    fetchUrgentNotices();
  }, []);

  const fetchUrgentNotices = async () => {
    try {
      const response = await api.get('/notices?isActive=true&limit=10');
      const notices = response.data.notices || [];
      // Filter for urgent or pinned notices
      const urgent = notices.filter(
        (notice) => notice.isPinned || notice.priority === 'Urgent' || notice.category === 'Urgent'
      );
      setUrgentNotices(urgent.slice(0, 5)); // Limit to 5 notices
    } catch (error) {
      console.error('Error fetching urgent notices:', error);
      setUrgentNotices([]);
    }
  };

  const features = [
    {
      icon: FiUsers,
      title: 'Development of Students with Quality Education',
      description: 'Committed to nurturing young minds with excellence in education',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiAward,
      title: 'Qualified, Dedicated and Inspiring Faculty',
      description: 'Experienced and passionate teachers committed to student success',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FiTruck,
      title: 'Transport Facility',
      description: 'Safe and reliable transportation services for students',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FiCalendar,
      title: 'Monthly Teacher-Parents Meeting',
      description: 'Regular communication and collaboration between teachers and parents',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FiMic,
      title: 'Focus on English Speaking & Personality Development',
      description: 'Enhancing communication skills and overall personality growth',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: FiShield,
      title: 'Education Based on Well Discipline and Moral Values',
      description: 'Building character through discipline and ethical values',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: FiBook,
      title: 'Clean and Equipped Classrooms',
      description: 'Modern, well-maintained learning spaces for optimal education',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: FiBookOpen,
      title: 'Library Facility',
      description: 'Extensive collection of books and resources for learning',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const stats = [
    { number: '500+', label: 'Students', icon: FiUsers },
    { number: '20+', label: 'Teachers', icon: FiAward },
    { number: '10+', label: 'Years Experience', icon: FiTrendingUp },
    { number: '100%', label: 'NCERT Curriculum', icon: FiCheckCircle },
  ];

  const highlights = [
    'Nursery to Class X Education',
    'Affiliated to Bihar Govt - Run by Nandlala Samajik Shikshan Sansthan',
    'Modern Infrastructure',
    'Experienced Faculty',
    'Sports & Extracurricular Activities',
    'Safe & Nurturing Environment',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Home - D.M. Public School | Excellence in Education</title>
        <meta
          name="description"
          content="D.M. Public School - Affiliated to Bihar Govt, run by Nandlala Samajik Shikshan Sansthan. Quality education from Nursery to Class X following NCERT curriculum in Garahi, Desari, Vaishali, Bihar."
        />
      </Helmet>

      {/* Important Notices Marquee */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 dark:from-primary-800 dark:via-primary-700 dark:to-primary-800 text-white py-2.5 sm:py-3 shadow-md relative overflow-hidden z-50 border-b border-primary-700/20">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Slogan Section */}
            <div className="hidden sm:flex items-center space-x-2 flex-shrink-0 border-r border-white/20 pr-4">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🎓</span>
              </div>
              <div className="text-xs font-medium leading-tight">
                <div>Give education to the uneducated,</div>
                <div>knowledge to the ignorant</div>
              </div>
            </div>
            
            {/* Notices Section */}
            {urgentNotices.length > 0 ? (
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 w-full sm:w-auto">
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <FiAlertCircle className="text-yellow-300 flex-shrink-0" size={18} />
                  <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">Important:</span>
                </div>
                <div className="flex-1 overflow-hidden min-w-0">
                  <div className="overflow-hidden">
                    <div className="flex animate-marquee">
                      {urgentNotices.map((notice, index) => (
                        <div key={notice._id || index} className="flex items-center space-x-3 sm:space-x-4 mx-4 sm:mx-8 flex-shrink-0">
                          {notice.isPinned && <FiBookmark className="text-yellow-300 flex-shrink-0" size={14} />}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                              {notice.title}:
                            </span>
                            <span className="font-medium text-xs sm:text-sm whitespace-nowrap text-white/90">
                              {notice.description}
                            </span>
                          </div>
                          <span className="text-white/60 text-xs">•</span>
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {urgentNotices.map((notice, index) => (
                        <div key={`duplicate-${notice._id || index}`} className="flex items-center space-x-3 sm:space-x-4 mx-4 sm:mx-8 flex-shrink-0">
                          {notice.isPinned && <FiBookmark className="text-yellow-300 flex-shrink-0" size={14} />}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
                              {notice.title}:
                            </span>
                            <span className="font-medium text-xs sm:text-sm whitespace-nowrap text-white/90">
                              {notice.description}
                            </span>
                          </div>
                          <span className="text-white/60 text-xs">•</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 flex-1">
                <FiAlertCircle className="text-yellow-300" size={16} />
                <span className="text-xs sm:text-sm font-medium">No urgent notices at the moment</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-8 sm:pt-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <span className="px-4 py-2 bg-primary-100 text-primary-500 rounded-full text-sm font-semibold">
                    🎓 Premier Educational Institution
                  </span>
                </motion.div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="gradient-text">Excellence in Education</span>
                  <br />
                  <span className="text-secondary-900">Since 2020</span>
                </h1>
                
                <p className="text-lg md:text-xl text-secondary-600 mb-8 leading-relaxed">
                  Nurturing young minds with quality education, modern 
                  facilities, and holistic development at 
                  D.M. Public School
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/admissions"
                    className="btn-primary text-center"
                  >
                    Apply for Admission
                  </Link>
                  <Link
                    to="/about"
                    className="btn-secondary text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>

              {/* Right Side - School Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-large border-4 border-primary-200/50 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 to-purple-100/20 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
                  <img
                    src="/school-gate.jpeg"
                    alt="D.M. Public School Entrance Gate"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center hidden rounded-2xl">
                    <div className="text-center text-white p-8">
                      <p className="text-xl font-semibold mb-2">School Gate Image</p>
                      <p className="text-sm opacity-90">Please add school-gate.jpg to the public folder</p>
                    </div>
                  </div>
                  
                  {/* Decorative Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-medium z-20">
                    <p className="text-sm font-semibold text-primary-600">D.M. Public School</p>
                    <p className="text-xs text-secondary-600">Garahi, Desari, Vaishali</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-medium z-20">
                    <p className="text-sm font-semibold text-primary-600">Affiliated to Bihar Govt</p>
                    <p className="text-xs text-secondary-600">Run by Nandlala Samajik Shikshan Sansthan</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform shadow-soft">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-secondary-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Why Choose <span className="gradient-text">D.M. Public School</span>?
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              We provide a comprehensive educational experience that prepares students for success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card group cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
                Empowering <span className="gradient-text">Future Leaders</span>
              </h2>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Located in Garahi, Desari, Vaishali, Bihar, D.M. Public School is affiliated to Bihar Government
                and run by Nandlala Samajik Shikshan Sansthan, offering quality education from Nursery to Class X following NCERT curriculum. Our
                commitment to excellence, combined with modern infrastructure and experienced
                faculty, creates an ideal learning environment.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-3"
                  >
                    <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                    <span className="text-secondary-700 font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/about" className="btn-primary">
                  Discover More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-primary-400 to-primary-500 rounded-3xl p-8 shadow-large">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary-500 font-bold text-2xl">DM</span>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl">D.M. Public School</h3>
                      <p className="text-white/80">Affiliated to Bihar Govt</p>
                      <p className="text-white/70 text-xs mt-1">Run by Nandlala Samajik Shikshan Sansthan</p>
                      <p className="text-white/70 text-xs mt-1">Run by Nandlala Samajik Shikshan Sansthan</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">Location</span>
                      <span className="text-white/90">Garahi, Desari, Vaishali</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">Classes</span>
                      <span className="text-white/90">Nursery to Class X</span>
                    </div>
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium">Established</span>
                      <span className="text-white/90">2020</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center space-x-1 text-yellow-300">
                      {[...Array(4)].map((_, i) => (
                        <FiStar key={i} size={20} fill="currentColor" />
                      ))}
                      <div className="relative inline-block" style={{ width: '20px', height: '20px' }}>
                        <FiStar size={20} className="absolute text-yellow-300/30" fill="currentColor" />
                        <div className="absolute overflow-hidden" style={{ width: '10px', height: '20px' }}>
                          <FiStar size={20} className="text-yellow-300" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 mt-2">Rated Excellent by Parents</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-600/20"></div>
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Begin Your Educational Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join D.M. Public School and become part of a community dedicated to excellence in
              education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="btn-primary"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
