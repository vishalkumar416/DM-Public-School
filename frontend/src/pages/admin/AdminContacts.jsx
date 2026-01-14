import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiPhone, FiTrash2, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      setContacts(response.data.contacts || []);
    } catch (error) {
      toast.error('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Contact deleted');
      fetchContacts();
    } catch (error) {
      toast.error('Error deleting contact');
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  const closeModal = () => {
    setSelectedContact(null);
  };

  return (
    <>
      <Helmet>
        <title>Contacts - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-600">Total: {contacts.length}</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <div key={contact._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{contact.name}</h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                        {contact.subject}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <FiMail size={16} />
                        <span>{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-2">
                          <FiPhone size={16} />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                      <p className="text-gray-700 mt-3">{contact.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                      {new Date(contact.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleView(contact)}
                      className="text-primary-500 hover:text-primary-600 p-2 hover:bg-primary-50 rounded transition-colors"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No contact messages found</p>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Contact Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Name</label>
                <p className="text-lg">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-lg">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Phone</label>
                  <p className="text-lg">{selectedContact.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600">Subject</label>
                <p className="text-lg">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Message</label>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Date</label>
                <p className="text-gray-700">
                  {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={closeModal} className="btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminContacts;
