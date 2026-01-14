import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiX, FiEye, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiFileText, FiX as FiClose } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [approveData, setApproveData] = useState({ id: '', section: 'A', rollNumber: '' });

  useEffect(() => {
    fetchAdmissions();
  }, [statusFilter]);

  const fetchAdmissions = async () => {
    try {
      const url = statusFilter ? `/admissions?status=${statusFilter}` : '/admissions';
      const response = await api.get(url);
      setAdmissions(response.data.admissions || []);
    } catch (error) {
      toast.error('Error fetching admissions');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (admission) => {
    setSelectedAdmission(admission);
    setShowModal(true);
  };

  const handleApproveClick = (id) => {
    setApproveData({ id, section: 'A', rollNumber: '' });
    setApproveModal(true);
  };

  const handleApprove = async () => {
    try {
      await api.put(`/admissions/${approveData.id}/approve`, {
        section: approveData.section,
        rollNumber: approveData.rollNumber
      });
      toast.success('Admission approved successfully');
      setApproveModal(false);
      fetchAdmissions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error approving admission');
    }
  };

  const handleReject = async (id) => {
    const remarks = window.prompt('Enter rejection remarks (optional):');
    if (remarks === null) return; // User cancelled
    
    try {
      await api.put(`/admissions/${id}/reject`, { remarks });
      toast.success('Admission rejected');
      fetchAdmissions();
    } catch (error) {
      toast.error('Error rejecting admission');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return styles[status] || styles.pending;
  };

  return (
    <>
      <Helmet>
        <title>Admissions - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admissions</h1>
            <p className="text-gray-600 mt-1">Manage student admission applications</p>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field rounded-lg w-48"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : admissions.length > 0 ? (
            admissions.map((admission) => (
              <div key={admission._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    {admission.photo && (
                      <img
                        src={admission.photo}
                        alt={admission.firstName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {admission.firstName} {admission.lastName}
                        </h3>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(admission.status)}`}>
                          {admission.status?.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FiFileText className="text-primary-500" size={16} />
                          <span>#{admission.applicationNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUser className="text-primary-500" size={16} />
                          <span>Class {admission.classApplied}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiPhone className="text-primary-500" size={16} />
                          <span>{admission.fatherPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-primary-500" size={16} />
                          <span>{new Date(admission.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleView(admission)}
                      className="px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-2"
                    >
                      <FiEye size={18} /> View
                    </button>
                    {admission.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveClick(admission._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          <FiCheck size={18} /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(admission._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <FiX size={18} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FiFileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No admissions found</p>
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {showModal && selectedAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Admission Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Number</label>
                  <p className="text-gray-900 font-semibold">#{selectedAdmission.applicationNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(selectedAdmission.status)}`}>
                    {selectedAdmission.status?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <p className="text-gray-900">{selectedAdmission.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <p className="text-gray-900">{selectedAdmission.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <p className="text-gray-900">{new Date(selectedAdmission.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <p className="text-gray-900">{selectedAdmission.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Applied</label>
                  <p className="text-gray-900">{selectedAdmission.classApplied}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father Name</label>
                  <p className="text-gray-900">{selectedAdmission.fatherName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father Phone</label>
                  <p className="text-gray-900">{selectedAdmission.fatherPhone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father Email</label>
                  <p className="text-gray-900">{selectedAdmission.fatherEmail || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother Name</label>
                  <p className="text-gray-900">{selectedAdmission.motherName || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother Phone</label>
                  <p className="text-gray-900">{selectedAdmission.motherPhone || 'N/A'}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <p className="text-gray-900">
                    {selectedAdmission.address 
                      ? (() => {
                          if (typeof selectedAdmission.address === 'object') {
                            const addr = selectedAdmission.address;
                            const parts = [
                              addr.street,
                              addr.city,
                              addr.state,
                              addr.pincode ? `- ${addr.pincode}` : ''
                            ].filter(Boolean);
                            return parts.join(', ') || 'N/A';
                          }
                          return selectedAdmission.address;
                        })()
                      : 'N/A'}
                  </p>
                </div>
                {selectedAdmission.photo && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <img src={selectedAdmission.photo} alt="Student" className="w-32 h-32 rounded-lg object-cover" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {approveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Approve Admission</h2>
              <button
                onClick={() => setApproveModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiClose size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                <select
                  value={approveData.section}
                  onChange={(e) => setApproveData({ ...approveData, section: e.target.value })}
                  className="input-field rounded-lg"
                >
                  {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                    <option key={sec} value={sec}>Section {sec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number (Optional)</label>
                <input
                  type="text"
                  value={approveData.rollNumber}
                  onChange={(e) => setApproveData({ ...approveData, rollNumber: e.target.value })}
                  className="input-field rounded-lg"
                  placeholder="Enter roll number"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 px-6 pb-6">
              <button
                onClick={() => setApproveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="btn-primary"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAdmissions;
