import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCalendar, FiFileText, FiAlertCircle } from 'react-icons/fi';
import api from '../utils/api';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchNotices();
  }, [category]);

  const fetchNotices = async () => {
    try {
      const url = category
        ? `/notices?category=${category}&isActive=true`
        : '/notices?isActive=true';
      const response = await api.get(url);
      const fetchedNotices = response.data.notices || [];
      setNotices(fetchedNotices);
    } catch (error) {
      console.error('Error fetching notices:', error);
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const getSampleNotices = () => {
    const now = new Date();
    return [
      {
        _id: 'sample-1',
        title: 'Annual Day Celebration 2024',
        description: 'We are pleased to announce our Annual Day Celebration will be held on December 15, 2024. All students, parents, and staff are cordially invited to join us for this special event featuring cultural programs, awards ceremony, and performances.',
        category: 'Event',
        priority: 'High',
        isPinned: true,
        createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-2',
        title: 'Mid-Term Examination Schedule',
        description: 'Mid-term examinations for all classes will commence from November 1, 2024. Please ensure your child is well-prepared. The detailed timetable will be shared with students next week.',
        category: 'Exam',
        priority: 'High',
        isPinned: false,
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-3',
        title: 'Diwali Holidays',
        description: 'School will remain closed from November 10 to November 14, 2024, on account of Diwali holidays. Classes will resume on November 15, 2024. Wishing everyone a happy and safe Diwali!',
        category: 'Holiday',
        priority: 'Normal',
        isPinned: false,
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-4',
        title: 'Admission Open for Academic Year 2025-26',
        description: 'Admissions are now open for Nursery to Class X for the academic year 2025-26. Interested parents can collect the admission forms from the school office or download from our website. Last date for submission: December 31, 2024.',
        category: 'Admission',
        priority: 'High',
        isPinned: true,
        createdAt: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-5',
        title: 'Fee Payment Reminder',
        description: 'This is a reminder that the second installment of school fees for the current academic year is due by November 30, 2024. Please ensure timely payment to avoid any inconvenience.',
        category: 'Fee',
        priority: 'Normal',
        isPinned: false,
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-6',
        title: 'Science Exhibition 2024',
        description: 'Our annual Science Exhibition will be held on November 20, 2024. Students from Classes VI to X will showcase their innovative projects. Parents are welcome to visit between 10:00 AM to 2:00 PM.',
        category: 'Event',
        priority: 'Normal',
        isPinned: false,
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-7',
        title: 'Important: School Bus Route Changes',
        description: 'Due to road construction, there will be temporary changes in bus routes 3 and 5 starting from November 5, 2024. Updated route information has been sent to parents via SMS. Please contact the transport department for any queries.',
        category: 'General',
        priority: 'Urgent',
        isPinned: true,
        createdAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        _id: 'sample-8',
        title: 'Parent-Teacher Meeting',
        description: 'The quarterly Parent-Teacher Meeting is scheduled for November 25, 2024, from 9:00 AM to 12:00 PM. We encourage all parents to attend and discuss their child\'s progress with the teachers.',
        category: 'General',
        priority: 'High',
        isPinned: false,
        createdAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  };

  const categories = ['All', 'General', 'Exam', 'Holiday', 'Event', 'Admission', 'Fee', 'Urgent'];

  return (
    <>
      <Helmet>
        <title>Notice Board - D.M. Public School</title>
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
                Notice Board
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Stay Updated with Latest Announcements
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gradient-to-b from-white to-secondary-50 border-b border-secondary-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-3"
            >
              {categories.map((cat, index) => {
                const isActive = (cat === 'All' && !category) || category === cat;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(cat === 'All' ? '' : cat)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                        : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft border border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    {cat}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-secondary-600">Loading notices...</p>
            </div>
          ) : notices.length > 0 ? (
            <div className="space-y-6">
              {notices.map((notice, index) => (
                <motion.div
                  key={notice._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className={`card border-l-4 ${
                    notice.priority === 'Urgent'
                      ? 'border-red-500'
                      : notice.priority === 'High'
                      ? 'border-orange-500'
                      : 'border-primary-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-secondary-900">{notice.title}</h3>
                        {notice.isPinned && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-semibold">
                            Pinned
                          </span>
                        )}
                      </div>
                      <p className="text-secondary-700 mb-4 whitespace-pre-line leading-relaxed">
                        {notice.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center text-secondary-600">
                          <FiCalendar className="mr-2 text-primary-500" size={16} />
                          {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-lg font-medium ${
                            notice.category === 'Urgent'
                              ? 'bg-red-100 text-red-800'
                              : notice.category === 'Exam'
                              ? 'bg-purple-100 text-purple-800'
                              : notice.category === 'Holiday'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-primary-100 text-primary-800'
                          }`}
                        >
                          {notice.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-lg font-medium ${
                            notice.priority === 'Urgent'
                              ? 'bg-red-100 text-red-800'
                              : notice.priority === 'High'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-secondary-100 text-secondary-800'
                          }`}
                        >
                          {notice.priority}
                        </span>
                      </div>
                    </div>
                    {notice.attachment && (
                      <a
                        href={notice.attachment.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 ml-4 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        <FiFileText size={20} />
                        <span className="text-sm font-medium">View Attachment</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FiAlertCircle className="mx-auto text-secondary-400 mb-4" size={48} />
              <p className="text-secondary-600 text-lg">No notices available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NoticeBoard;
