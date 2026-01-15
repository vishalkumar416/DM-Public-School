import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';

const Academics = () => {
  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  const subjects = {
    'Nursery-UKG': ['English', 'Hindi', 'Mathematics', 'General Knowledge', 'Arts & Crafts', 'Music', 'Physical Education'],
    'I-V': ['English', 'Hindi', 'Mathematics', 'Environmental Studies', 'Science', 'Social Studies', 'Computer Science', 'Arts', 'Music', 'Physical Education'],
    'VI-VIII': ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Sanskrit', 'Arts', 'Music', 'Physical Education'],
    'IX-X': ['English', 'Hindi', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Studies (History, Geography, Civics, Economics)', 'Computer Science', 'Physical Education', 'Arts (Optional)']
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Academics - D.M. Public School</title>
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
                Academics
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                NCERT Curriculum from Nursery to Class X (Affiliated to Bihar Govt - Run by Nandlala Samajik Shikshan Sansthan)
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Classes Offered */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Classes <span className="gradient-text">Offered</span>
            </h2>
            <p className="text-xl text-secondary-600">Comprehensive education from Nursery to Class X</p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6"
          >
            {classes.map((className) => (
              <motion.div
                key={className}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="card text-center group cursor-pointer"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft">
                  <FiBook className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-secondary-900">{className}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl mb-6 shadow-large">
                <FiAward className="text-white" size={40} />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                NCERT <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                D.M. Public School is affiliated to Bihar Government, run by Nandlala Samajik Shikshan Sansthan, and follows the NCERT curriculum guidelines
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card bg-gradient-to-br from-white via-primary-50/30 to-white border-2 border-primary-200/50 shadow-large relative overflow-hidden"
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100/30 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6 text-center">
                  Our Curriculum is Designed to:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {[
                    {
                      text: 'Provide a strong foundation in core subjects',
                      icon: FiBook,
                      color: 'from-blue-400 to-blue-500',
                    },
                    {
                      text: 'Develop critical thinking and problem-solving skills',
                      icon: FiAward,
                      color: 'from-green-400 to-green-500',
                    },
                    {
                      text: 'Foster creativity and innovation',
                      icon: FiCheckCircle,
                      color: 'from-purple-400 to-purple-500',
                    },
                    {
                      text: 'Promote holistic development',
                      icon: FiUsers,
                      color: 'from-orange-400 to-orange-500',
                    },
                    {
                      text: 'Prepare students for competitive examinations',
                      icon: FiAward,
                      color: 'from-red-400 to-red-500',
                    },
                    {
                      text: 'Equip students with life skills',
                      icon: FiCheckCircle,
                      color: 'from-indigo-400 to-indigo-500',
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl border border-secondary-200 hover:border-primary-300 hover:shadow-soft transition-all group"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-soft`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <span className="text-lg text-secondary-800 font-medium pt-2 leading-relaxed">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Subjects <span className="gradient-text">Offered</span>
            </h2>
            <p className="text-xl text-secondary-600">Comprehensive subject coverage across all classes</p>
          </motion.div>
          <div className="space-y-8">
            {Object.entries(subjects).map(([level, levelSubjects], index) => (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card"
              >
                <h3 className="text-2xl font-bold mb-6 text-primary-600">{level}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {levelSubjects.map((subject) => (
                    <div
                      key={subject}
                      className="bg-gradient-to-br from-secondary-50 to-white p-4 rounded-lg border border-secondary-200 hover:border-primary-300 hover:shadow-soft transition-all"
                    >
                      <span className="text-secondary-800 font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
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
              Teaching <span className="gradient-text">Methodology</span>
            </h2>
            <p className="text-xl text-secondary-600">Innovative approaches to learning</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FiBook,
                title: 'Interactive Learning',
                description: 'Student-centered approach with interactive sessions, group discussions, and hands-on activities.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: FiUsers,
                title: 'Personalized Attention',
                description: 'Small class sizes ensure individual attention and support for each student.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: FiAward,
                title: 'Assessment & Evaluation',
                description: 'Regular assessments, quizzes, and projects to track progress and identify areas for improvement.',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="card text-center group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-soft`}
                  >
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-secondary-900">{method.title}</h3>
                  <p className="text-secondary-700 leading-relaxed">{method.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Academics;
