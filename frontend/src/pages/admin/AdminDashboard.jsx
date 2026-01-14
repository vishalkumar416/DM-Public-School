import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiFileText,
  FiUserCheck,
  FiBell,
  FiMail,
  FiDollarSign,
  FiArrowRight,
} from 'react-icons/fi';
import api from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingAdmissions: 0,
    totalTeachers: 0,
    newContacts: 0,
  });
  const [recentNotices, setRecentNotices] = useState([]);
  const [recentAdmissions, setRecentAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      if (response.data.success) {
        const data = response.data.stats;
        setStats({
          totalStudents: data.totalStudents || 0,
          pendingAdmissions: data.pendingAdmissions || 0,
          totalTeachers: data.totalTeachers || 0,
          newContacts: data.newContacts || 0,
        });
        setRecentNotices(data.recentNotices || []);
        setRecentAdmissions(data.recentAdmissions || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: FiUsers,
      label: 'Total Students',
      value: stats.totalStudents,
      gradient: 'from-blue-400 to-blue-500',
      link: '/admin/students',
    },
    {
      icon: FiFileText,
      label: 'Pending Admissions',
      value: stats.pendingAdmissions,
      gradient: 'from-orange-400 to-orange-500',
      link: '/admin/admissions',
    },
    {
      icon: FiUserCheck,
      label: 'Total Teachers',
      value: stats.totalTeachers,
      gradient: 'from-green-400 to-green-500',
      link: '/admin/teachers',
    },
    {
      icon: FiMail,
      label: 'New Contacts',
      value: stats.newContacts,
      gradient: 'from-purple-400 to-purple-500',
      link: '/admin/contacts',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Admin Panel</title>
      </Helmet>

      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-secondary-900 mb-2">Dashboard</h1>
          <p className="text-secondary-600">Welcome back! Here's an overview of your school management.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.link}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="card group cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-soft`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                  <div className="text-secondary-600 font-medium">{stat.label}</div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Admissions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-900">Recent Admissions</h2>
              <Link
                to="/admin/admissions"
                className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center transition-colors"
              >
                View All <FiArrowRight className="ml-1" size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentAdmissions.length > 0 ? (
                recentAdmissions.map((admission) => (
                  <div
                    key={admission._id}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-secondary-50 to-white rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-secondary-900">
                        {admission.firstName} {admission.lastName}
                      </p>
                      <p className="text-sm text-secondary-600">Class: {admission.classApplied}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        admission.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : admission.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {admission.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-secondary-500 text-center py-8">No recent admissions</p>
              )}
            </div>
          </motion.div>

          {/* Recent Notices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="card"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-900">Recent Notices</h2>
              <Link
                to="/admin/notices"
                className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center transition-colors"
              >
                View All <FiArrowRight className="ml-1" size={16} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice) => (
                  <div
                    key={notice._id}
                    className="p-4 bg-gradient-to-br from-secondary-50 to-white rounded-lg border border-secondary-200 hover:border-primary-300 transition-colors"
                  >
                    <p className="font-semibold mb-2 text-secondary-900">{notice.title}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg font-medium">
                        {notice.category}
                      </span>
                      <span className="text-secondary-600">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-secondary-500 text-center py-8">No recent notices</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
