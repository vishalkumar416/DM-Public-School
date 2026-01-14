import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiEdit, FiSave, FiX, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', type: 'text' });

  const contentKeys = [
    { key: 'home_welcome', label: 'Home Welcome Section', type: 'text' },
    { key: 'about_intro', label: 'About Introduction', type: 'text' },
    { key: 'about_mission', label: 'Mission Statement', type: 'text' },
    { key: 'about_vision', label: 'Vision Statement', type: 'text' },
    { key: 'admission_info', label: 'Admission Information', type: 'text' },
    { key: 'contact_info', label: 'Contact Information', type: 'text' },
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const fetchedContents = [];
      for (const item of contentKeys) {
        try {
          const response = await api.get(`/admin/content/${item.key}`);
          if (response.data.content) {
            fetchedContents.push(response.data.content);
          } else {
            fetchedContents.push({
              key: item.key,
              title: item.label,
              content: '',
              type: item.type
            });
          }
        } catch (error) {
          // Content doesn't exist yet, create placeholder
          fetchedContents.push({
            key: item.key,
            title: item.label,
            content: '',
            type: item.type
          });
        }
      }
      setContents(fetchedContents);
    } catch (error) {
      toast.error('Error fetching contents');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content) => {
    setEditingKey(content.key);
    setFormData({
      title: content.title || contentKeys.find(c => c.key === content.key)?.label || '',
      content: content.content || '',
      type: content.type || 'text'
    });
  };

  const handleSave = async () => {
    try {
      const content = contents.find(c => c.key === editingKey);
      await api.put(`/admin/content/${editingKey}`, {
        title: formData.title,
        content: formData.content,
        type: formData.type
      });
      toast.success('Content updated successfully');
      setEditingKey(null);
      fetchContents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating content');
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setFormData({ title: '', content: '', type: 'text' });
  };

  return (
    <>
      <Helmet>
        <title>Content Management - Admin Panel</title>
      </Helmet>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Content Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage website content and information</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : contents.length > 0 ? (
            contents.map((content) => (
              <div key={content.key} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FiFileText className="text-primary-500" size={20} />
                      <h3 className="text-xl font-bold text-gray-900">
                        {content.title || contentKeys.find(c => c.key === content.key)?.label}
                      </h3>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        {content.key}
                      </span>
                    </div>
                    {editingKey === content.key ? (
                      <div className="space-y-3 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input-field rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                          <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="input-field rounded-lg"
                            rows="6"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="btn-primary flex items-center gap-2"
                          >
                            <FiSave size={18} /> Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FiX size={18} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {content.content || <span className="text-gray-400 italic">No content added yet</span>}
                        </p>
                        <button
                          onClick={() => handleEdit(content)}
                          className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
                        >
                          <FiEdit size={18} /> Edit Content
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FiFileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No content found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminContent;
