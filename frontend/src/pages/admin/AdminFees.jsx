import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiDollarSign, FiPlus, FiEye, FiEdit, FiX, FiSearch, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminFees = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    studentId: '',
    academicYear: new Date().getFullYear().toString(),
    feeStructure: {
      tuitionFee: '',
      admissionFee: '',
      libraryFee: '',
      sportsFee: '',
      labFee: '',
      examFee: '',
      otherFee: ''
    },
    dueDate: ''
  });
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMode: 'Cash',
    transactionId: '',
    remarks: ''
  });

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, [statusFilter]);

  const fetchFees = async () => {
    try {
      const url = statusFilter ? `/fees?status=${statusFilter}` : '/fees';
      const response = await api.get(url);
      setFees(response.data.fees || []);
    } catch (error) {
      toast.error('Error fetching fees');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAdd = () => {
    setFormData({
      studentId: '',
      academicYear: new Date().getFullYear().toString(),
      feeStructure: {
        tuitionFee: '',
        admissionFee: '',
        libraryFee: '',
        sportsFee: '',
        labFee: '',
        examFee: '',
        otherFee: ''
      },
      dueDate: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert fee structure values to numbers
      const feeStructure = {};
      Object.keys(formData.feeStructure).forEach(key => {
        feeStructure[key] = parseFloat(formData.feeStructure[key]) || 0;
      });

      await api.post('/fees', {
        ...formData,
        feeStructure
      });
      toast.success('Fee record created successfully');
      setShowModal(false);
      fetchFees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating fee record');
    }
  };

  const handlePayment = (fee) => {
    setSelectedFee(fee);
    setPaymentData({
      amount: fee.pendingAmount || '',
      paymentMode: 'Cash',
      transactionId: '',
      remarks: ''
    });
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/fees/${selectedFee._id}/manual-payment`, {
        amount: parseFloat(paymentData.amount),
        paymentMode: paymentData.paymentMode,
        transactionId: paymentData.transactionId,
        remarks: paymentData.remarks
      });
      toast.success('Payment recorded successfully');
      setShowPaymentModal(false);
      fetchFees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error recording payment');
    }
  };

  const filteredFees = fees.filter((fee) => {
    const student = fee.studentId;
    if (!student) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName?.toLowerCase().includes(searchLower) ||
      student.lastName?.toLowerCase().includes(searchLower) ||
      fee.admissionNumber?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-green-100 text-green-800 border-green-200',
      partial: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      pending: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status] || styles.pending;
  };

  return (
    <>
      <Helmet>
        <title>Fees - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Fee Management</h1>
            <p className="text-gray-600 mt-1">Manage student fees and payments</p>
          </div>
          <button onClick={handleAdd} className="btn-primary flex items-center">
            <FiPlus className="mr-2" /> Add Fee Record
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by student name or admission number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 rounded-lg"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field rounded-lg w-48"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Fees Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filteredFees.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Admission #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredFees.map((fee) => {
                    const student = fee.studentId;
                    return (
                      <tr key={fee._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {student ? `${student.firstName} ${student.lastName}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{fee.admissionNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{fee.class}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">₹{fee.totalAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-green-600">₹{fee.paidAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-600">₹{fee.pendingAmount?.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusBadge(fee.status)}`}>
                            {fee.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          {fee.pendingAmount > 0 && (
                            <button
                              onClick={() => handlePayment(fee)}
                              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              Record Payment
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FiDollarSign className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No fee records found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Fee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Add Fee Record</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
                  <select
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    className="input-field rounded-lg"
                  >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.firstName} {student.lastName} - {student.admissionNumber} (Class {student.class})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="input-field rounded-lg"
                    placeholder="e.g., 2024-2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="input-field rounded-lg"
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold mb-3">Fee Structure</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.tuitionFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, tuitionFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Admission Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.admissionFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, admissionFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Library Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.libraryFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, libraryFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sports Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.sportsFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, sportsFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lab Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.labFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, labFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exam Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.examFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, examFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Other Fee</label>
                    <input
                      type="number"
                      value={formData.feeStructure.otherFee}
                      onChange={(e) => setFormData({
                        ...formData,
                        feeStructure: { ...formData.feeStructure, otherFee: e.target.value }
                      })}
                      className="input-field rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
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
                  Create Fee Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Record Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="p-6 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                <input
                  type="number"
                  required
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                  className="input-field rounded-lg"
                  max={selectedFee.pendingAmount}
                  min="1"
                />
                <p className="text-xs text-gray-500 mt-1">Pending: ₹{selectedFee.pendingAmount?.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode *</label>
                <select
                  required
                  value={paymentData.paymentMode}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentMode: e.target.value })}
                  className="input-field rounded-lg"
                >
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                <input
                  type="text"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                  className="input-field rounded-lg"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={paymentData.remarks}
                  onChange={(e) => setPaymentData({ ...paymentData, remarks: e.target.value })}
                  className="input-field rounded-lg"
                  rows="2"
                  placeholder="Optional"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminFees;
