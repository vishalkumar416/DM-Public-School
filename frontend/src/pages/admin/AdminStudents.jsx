import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    admissionNumber: '',
    class: '',
    section: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    fetchStudents();
  }, [classFilter]);

  const fetchStudents = async () => {
    try {
      const url = classFilter ? `/students?class=${classFilter}` : '/students';
      const response = await api.get(url);
      setStudents(response.data.students || []);
    } catch (error) {
      toast.error('Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      admissionNumber: '',
      class: '',
      section: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      fatherPhone: '',
      motherName: '',
      motherPhone: '',
      address: '',
      email: '',
    });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      admissionNumber: student.admissionNumber || '',
      class: student.class || '',
      section: student.section || '',
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
      gender: student.gender || '',
      fatherName: student.fatherName || '',
      fatherPhone: student.fatherPhone || '',
      motherName: student.motherName || '',
      motherPhone: student.motherPhone || '',
      address: student.address || '',
      email: student.email || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await api.put(`/students/${editingStudent._id}`, formData);
        toast.success('Student updated successfully');
      } else {
        await api.post('/students', formData);
        toast.success('Student added successfully');
      }
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving student');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success('Student deleted');
      fetchStudents();
    } catch (error) {
      toast.error('Error deleting student');
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.admissionNumber}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Students - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Students</h1>
          <button onClick={handleAdd} className="btn-primary flex items-center">
            <FiPlus className="mr-2" /> Add Student
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="input-field"
          >
            <option value="">All Classes</option>
            {['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map(
              (cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              )
            )}
          </select>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admission #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Father</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.firstName} {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.admissionNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student.class} - {student.section}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.fatherName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{student.fatherPhone}</td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="text-primary-500 hover:text-primary-600 transition-colors"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
                {editingStudent ? 'Edit Student' : 'Add Student'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Number</label>
                  <input
                    type="text"
                    value={formData.admissionNumber}
                    onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                  <select
                    required
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Class</option>
                    {['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map(
                      (cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="input-field"
                    placeholder="A, B, C, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.fatherPhone}
                    onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother Name</label>
                  <input
                    type="text"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mother Phone</label>
                  <input
                    type="tel"
                    value={formData.motherPhone}
                    onChange={(e) => setFormData({ ...formData, motherPhone: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field rounded-lg"
                  rows="2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingStudent ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminStudents;
