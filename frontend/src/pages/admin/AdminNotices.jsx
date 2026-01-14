import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    targetAudience: ['All'],
    classes: ['All'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    isPinned: false,
  });
  const [attachmentFile, setAttachmentFile] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await api.get('/notices?isActive=true');
      setNotices(response.data.notices || []);
    } catch (error) {
      toast.error('Error fetching notices');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingNotice(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'Medium',
      targetAudience: ['All'],
      classes: ['All'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      isPinned: false,
    });
    setAttachmentFile(null);
    setShowModal(true);
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title || '',
      description: notice.description || '',
      category: notice.category || '',
      priority: notice.priority || 'Medium',
      targetAudience: Array.isArray(notice.targetAudience) ? notice.targetAudience : [notice.targetAudience || 'All'],
      classes: Array.isArray(notice.classes) ? notice.classes : [notice.classes || 'All'],
      startDate: notice.startDate ? new Date(notice.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      endDate: notice.endDate ? new Date(notice.endDate).toISOString().split('T')[0] : '',
      isPinned: notice.isPinned || false,
    });
    setAttachmentFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('priority', formData.priority);
      submitData.append('targetAudience', JSON.stringify(formData.targetAudience));
      submitData.append('classes', JSON.stringify(formData.classes));
      submitData.append('startDate', formData.startDate);
      if (formData.endDate) {
        submitData.append('endDate', formData.endDate);
      }
      submitData.append('isPinned', formData.isPinned);
      if (attachmentFile) {
        submitData.append('attachment', attachmentFile);
      }

      if (editingNotice) {
        await api.put(`/notices/${editingNotice._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Notice updated successfully');
      } else {
        await api.post('/notices', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Notice created successfully');
      }
      setShowModal(false);
      fetchNotices();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving notice');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api.delete(`/notices/${id}`);
      toast.success('Notice deleted');
      fetchNotices();
    } catch (error) {
      toast.error('Error deleting notice');
    }
  };

  return (
    <>
      <Helmet>
        <title>Notices - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Notices</h1>
          <button onClick={handleAdd} className="btn-primary flex items-center space-x-2">
            <FiPlus className="mr-2" /> Add Notice
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{notice.title}</h3>
                      {notice.isPinned && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          Pinned
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notice.description}</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                        {notice.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        {notice.priority}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(notice)}
                      className="text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(notice._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No notices found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingNotice ? 'Edit Notice' : 'Add Notice'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows="4"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="Academic">Academic</option>
                    <option value="Event">Event</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Examination">Examination</option>
                    <option value="Fee">Fee</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="input-field"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="isPinned"
                  checked={formData.isPinned}
                  onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                  className="mr-2 rounded"
                />
                <label htmlFor="isPinned" className="text-sm font-medium text-gray-700">
                  Pin this notice
                </label>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={(e) => setAttachmentFile(e.target.files[0])}
                  className="input-field rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200 col-span-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingNotice ? 'Update' : 'Create'} Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNotices;
