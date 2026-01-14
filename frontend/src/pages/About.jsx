import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiEye, FiCheckCircle, FiUsers, FiBookOpen, FiMapPin, FiCalendar, FiHeart } from 'react-icons/fi';

const About = () => {
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

  const whyChooseUs = [
    { title: 'Bihar Government Affiliated', desc: 'Following NCERT curriculum', icon: FiAward },
    { title: 'Experienced Faculty', desc: 'Qualified and dedicated teachers', icon: FiUsers },
    { title: 'Modern Facilities', desc: 'Well-equipped classrooms and labs', icon: FiBookOpen },
    { title: 'Holistic Education', desc: 'Academic, sports, and arts', icon: FiTarget },
    { title: 'Safe Environment', desc: 'Secure and nurturing campus', icon: FiCheckCircle },
    { title: 'Prime Location', desc: 'Easily accessible location', icon: FiCheckCircle },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - D.M. Public School</title>
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
                About D.M. Public School
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Excellence in Education Since 2020
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-secondary-900">
                Welcome to <span className="gradient-text">D.M. Public School</span>
              </h2>
              <div className="flex items-center justify-center space-x-2 text-lg text-secondary-600">
                <FiCalendar className="text-primary-500" size={20} />
                <span>Established in 2020</span>
              </div>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card bg-gradient-to-br from-white via-primary-50/30 to-white border-2 border-primary-200/50 shadow-large relative overflow-hidden mb-8"
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100/30 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <div className="prose prose-lg max-w-none space-y-6">
                  <p className="text-xl text-secondary-800 leading-relaxed font-medium">
                    D.M. Public School, established in <span className="text-primary-600 font-bold">2020</span>, is a premier educational institution located in{' '}
                    <span className="text-primary-600 font-semibold">Garahi, Desari, Vaishali, Bihar</span>. Our school is affiliated with{' '}
                    <span className="text-primary-600 font-semibold">Bihar Government</span> and follows the{' '}
                    <span className="text-primary-600 font-semibold">NCERT curriculum</span>, ensuring that our students receive a comprehensive and nationally recognized education.
                  </p>
                  
                  <p className="text-xl text-secondary-800 leading-relaxed font-medium">
                    We provide quality education from <span className="text-primary-600 font-semibold">Nursery to Class X</span>, focusing on{' '}
                    <span className="text-primary-600 font-semibold">holistic development</span> that encompasses academic excellence, character building, sports, and extracurricular activities. Our dedicated faculty, modern infrastructure, and student-centric approach make us a preferred choice for parents seeking quality education in the region.
                  </p>
                  
                  <div className="flex items-start space-x-4 p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-200 mt-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                      <FiMapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900 mb-2">Easily Accessible Location</h3>
                      <p className="text-secondary-700 leading-relaxed">
                        Located just <span className="text-primary-600 font-semibold">500 meters west from Imli Chowk</span>, our school is easily accessible and provides a safe, nurturing environment where every child can thrive and reach their full potential.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: FiAward,
                  title: 'Bihar Government Affiliated',
                  description: 'Following NCERT curriculum',
                  gradient: 'from-blue-400 to-blue-500',
                },
                {
                  icon: FiUsers,
                  title: 'Nursery to Class X',
                  description: 'Comprehensive education for all ages',
                  gradient: 'from-green-400 to-green-500',
                },
                {
                  icon: FiHeart,
                  title: 'Holistic Development',
                  description: 'Academic, sports, and character building',
                  gradient: 'from-purple-400 to-purple-500',
                },
              ].map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="card group relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${highlight.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-secondary-900 mb-2">{highlight.title}</h4>
                      <p className="text-secondary-600 leading-relaxed">{highlight.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft">
                <FiEye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-secondary-900">Our Vision</h2>
              <p className="text-secondary-700 leading-relaxed text-lg">
                To be a leading educational institution that nurtures young minds, fosters innovation,
                and prepares students to excel in their chosen fields while contributing positively to
                society.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="card group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-soft">
                <FiTarget className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-secondary-900">Our Mission</h2>
              <p className="text-secondary-700 leading-relaxed text-lg">
                To provide quality education that combines academic rigor with holistic development,
                enabling students to become confident, responsible, and successful individuals who make
                meaningful contributions to their communities and the world.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
              Our <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-secondary-600">Visionary leaders guiding our institution</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="card text-center group"
            >
              <div className="w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-primary-200 shadow-large group-hover:scale-110 transition-transform">
                <img
                  src="/director.jpeg"
                  alt="Mr. Saurav Kumar - Director"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center hidden">
                  <span className="text-white text-5xl font-bold">SK</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-secondary-900">Mr. Saurav Kumar</h3>
              <p className="text-primary-500 font-semibold mb-4 text-lg">Director</p>
              <p className="text-secondary-700 leading-relaxed">
                Under the visionary leadership of Mr. Saurav Kumar, D.M. Public School has grown
                into a center of excellence in education, committed to nurturing future leaders.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="card text-center group"
            >
              <div className="w-40 h-40 rounded-full mx-auto mb-6 overflow-hidden border-4 border-green-200 shadow-large group-hover:scale-110 transition-transform">
                <img
                  src="/principle.jpeg"
                  alt="Er. Pooja Kumari - Principal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center hidden">
                  <span className="text-white text-5xl font-bold">PK</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-secondary-900">Er. Pooja Kumari</h3>
              <p className="text-green-500 font-semibold mb-4 text-lg">Principal</p>
              <p className="text-secondary-700 leading-relaxed">
                Er. Pooja Kumari brings expertise and dedication to academic excellence, ensuring
                that every student receives the best possible education and support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
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
            <p className="text-xl text-secondary-600">Discover what makes us unique</p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="card group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary-900">{item.title}</h3>
                  <p className="text-secondary-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
