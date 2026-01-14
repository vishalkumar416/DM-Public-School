import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiBook,
  FiActivity,
  FiTruck,
  FiMonitor,
  FiShield,
  FiTrendingUp,
  FiTarget,
  FiHeart,
  FiAward,
  FiZap,
} from 'react-icons/fi';

const Infrastructure = () => {
  const facilities = [
    {
      icon: FiHome,
      title: 'School Building',
      description:
        'Modern, well-ventilated building with spacious classrooms designed for optimal learning environment.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiBook,
      title: 'Library',
      description:
        'Well-stocked library with a vast collection of books, reference materials, and reading space for students.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FiMonitor,
      title: 'Computer Lab',
      description:
        'State-of-the-art computer laboratory with modern computers and internet connectivity for digital learning.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: FiActivity,
      title: 'Science Lab',
      description:
        'Fully equipped science laboratories for Physics, Chemistry, and Biology with modern equipment and safety measures.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: FiActivity,
      title: 'Playground',
      description:
        'Spacious playground for sports and physical activities, promoting physical fitness and team spirit.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: FiTruck,
      title: 'Transport',
      description:
        'Safe and reliable school transport facility available for students with well-maintained buses and trained drivers.',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Infrastructure - D.M. Public School</title>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white relative overflow-hidden">
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
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                Infrastructure
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Modern Facilities for Quality Education
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities */}
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
              Our <span className="gradient-text">Facilities</span>
            </h2>
            <p className="text-xl text-secondary-600">State-of-the-art infrastructure for comprehensive learning</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <motion.div
                  key={facility.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="card group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${facility.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-secondary-900">{facility.title}</h3>
                  <p className="text-secondary-700 leading-relaxed">{facility.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl mb-6 shadow-large">
                <FiHeart className="text-white" size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                Our <span className="gradient-text">Commitment</span>
              </h2>
              <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                Dedicated to excellence in education and student development
              </p>
            </motion.div>

            {/* Main Commitment Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-12"
            >
              <div className="card bg-gradient-to-br from-white via-primary-50/50 to-white border-2 border-primary-200/50 shadow-large relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100/30 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
                        <FiShield className="text-white" size={48} />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
                        Safe, Modern & Conducive Learning Environment
                      </h3>
                      <p className="text-lg text-secondary-700 leading-relaxed mb-6">
                        At D.M. Public School, we are committed to providing a <span className="font-semibold text-primary-600">safe, modern, and conducive learning environment</span>. Our infrastructure is designed to support <span className="font-semibold text-primary-600">holistic development</span> and ensure that students have access to all facilities necessary for their academic and personal growth.
                      </p>
                      <p className="text-lg text-secondary-700 leading-relaxed">
                        We continuously upgrade our facilities to keep pace with <span className="font-semibold text-primary-600">modern educational standards</span> and provide students with the <span className="font-semibold text-primary-600">best possible learning experience</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Commitments Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: FiShield,
                  title: 'Safety First',
                  description: 'Secure campus with modern safety measures and protocols',
                  gradient: 'from-blue-400 to-blue-500',
                },
                {
                  icon: FiTrendingUp,
                  title: 'Continuous Improvement',
                  description: 'Regular upgrades to meet modern educational standards',
                  gradient: 'from-green-400 to-green-500',
                },
                {
                  icon: FiTarget,
                  title: 'Holistic Development',
                  description: 'Infrastructure designed for academic and personal growth',
                  gradient: 'from-purple-400 to-purple-500',
                },
              ].map((commitment, index) => {
                const Icon = commitment.icon;
                return (
                  <motion.div
                    key={commitment.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="card group relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${commitment.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${commitment.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-secondary-900 mb-2">{commitment.title}</h4>
                      <p className="text-secondary-600 leading-relaxed">{commitment.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-400 to-primary-500 rounded-xl shadow-medium">
                <FiAward className="text-white" size={24} />
                <span className="text-white font-semibold text-lg">Excellence in Education Since 2020</span>
                <FiZap className="text-white" size={24} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Infrastructure;
