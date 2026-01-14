import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiUser, FiBook, FiAward } from 'react-icons/fi';
import api from '../utils/api';

const Faculty = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teachers?isActive=true');
      const fetchedTeachers = response.data.teachers || [];
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Faculty - D.M. Public School</title>
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
                Our Faculty
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Experienced and Dedicated Teachers
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teachers List */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-secondary-600">Loading faculty information...</p>
            </div>
          ) : teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="card group overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 h-64 flex items-center justify-center relative overflow-hidden">
                    {(() => {
                      // Use specific images for Principal and Director
                      let imageSrc = teacher.photo;
                      
                      // Check if teacher is Principal (Pooja Kumari) or Director (Saurav Kumar)
                      const isPrincipal = teacher.designation === 'Principal' || 
                        (teacher.firstName?.toLowerCase().includes('pooja') && teacher.lastName?.toLowerCase().includes('kumari'));
                      const isDirector = teacher.designation === 'Director' || 
                        (teacher.firstName?.toLowerCase().includes('saurav') && teacher.lastName?.toLowerCase().includes('kumar'));
                      
                      if (isPrincipal && !teacher.photo) {
                        imageSrc = '/principle.jpeg';
                      } else if (isDirector && !teacher.photo) {
                        imageSrc = '/director.jpeg';
                      }
                      
                      return imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={`${teacher.firstName} ${teacher.lastName}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null;
                    })()}
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hidden">
                      <FiUser className="text-white" size={64} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-secondary-900">
                      {teacher.designation === 'Principal' && 'Er. '}
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-4 text-lg">{teacher.designation}</p>
                    <div className="space-y-3 text-secondary-700">
                      <div className="flex items-center space-x-2">
                        <FiBook className="text-primary-500 flex-shrink-0" size={18} />
                        <span>{teacher.subject}</span>
                      </div>
                      {teacher.qualification && (
                        <div className="flex items-center space-x-2">
                          <FiAward className="text-primary-500 flex-shrink-0" size={18} />
                          <span>{teacher.qualification}</span>
                        </div>
                      )}
                      {teacher.experience > 0 && (
                        <p className="text-secondary-600 pt-2 border-t border-secondary-200">
                          Experience: <span className="font-semibold">{teacher.experience} years</span>
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FiUser className="mx-auto text-secondary-400 mb-4" size={48} />
              <p className="text-secondary-600 text-lg">No faculty information available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Faculty;
