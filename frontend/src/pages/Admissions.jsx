import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { FiUpload, FiCheckCircle, FiUser, FiMail, FiPhone, FiMapPin, FiBookOpen } from 'react-icons/fi';

const Admissions = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    classApplied: '',
    fatherName: '',
    fatherPhone: '',
    fatherEmail: '',
    fatherOccupation: '',
    motherName: '',
    motherPhone: '',
    motherEmail: '',
    motherOccupation: '',
    address: {
      street: '',
      city: '',
      state: 'Bihar',
      pincode: '',
    },
    previousSchool: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');

  const classes = ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size must be less than 5MB');
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      Object.keys(formData).forEach((key) => {
        if (key === 'address') {
          data.append('address', JSON.stringify(formData.address));
        } else {
          data.append(key, formData[key]);
        }
      });

      if (photo) {
        data.append('photo', photo);
      }

      const response = await api.post('/admissions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setApplicationNumber(response.data.admission.applicationNumber);
        setSubmitted(true);
        toast.success('Admission application submitted successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting application');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>Application Submitted - D.M. Public School</title>
        </Helmet>
        <section className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="card text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-large"
                >
                  <FiCheckCircle className="text-white" size={48} />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 text-secondary-900">Application Submitted Successfully!</h2>
                <p className="text-xl mb-8 text-secondary-600">
                  Thank you for your interest in D.M. Public School
                </p>
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-8 rounded-xl mb-8 border border-primary-200">
                  <p className="text-sm text-secondary-600 mb-2 font-medium">Your Application Number:</p>
                  <p className="text-4xl font-bold text-primary-500">{applicationNumber}</p>
                </div>
                <p className="text-secondary-700 mb-6 leading-relaxed">
                  We have received your admission application. Our team will review it and contact you
                  soon. Please keep your application number for future reference.
                </p>
                <p className="text-sm text-secondary-500">
                  A confirmation email has been sent to your registered email address.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admissions - D.M. Public School</title>
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
                Admissions
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Apply for Academic Year 2024-25
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 via-white to-secondary-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="card shadow-large">
              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-secondary-200">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-500 rounded-2xl flex items-center justify-center shadow-soft">
                  <FiBookOpen className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900">Online Admission Form</h2>
                  <p className="text-secondary-600 mt-1">Fill in all the required information below</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Student Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-secondary-900 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-400 rounded-lg flex items-center justify-center">
                      <FiUser className="text-white" size={20} />
                    </div>
                    <span>Student Details</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="label">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Gender *</label>
                      <select
                        name="gender"
                        required
                        value={formData.gender}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Class Applied For *</label>
                      <select
                        name="classApplied"
                        required
                        value={formData.classApplied}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Student Photo</label>
                      <div className="flex items-center space-x-4">
                        {photoPreview && (
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="w-24 h-24 rounded-xl object-cover border-2 border-primary-200 shadow-soft"
                          />
                        )}
                        <label className="flex items-center space-x-2 cursor-pointer btn-secondary py-3 px-5">
                          <FiUpload size={18} />
                          <span className="text-sm font-medium">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-secondary-500 mt-2">Max size: 5MB</p>
                    </div>
                  </div>
                </motion.div>

                {/* Parent Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-secondary-900 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-400 rounded-lg flex items-center justify-center">
                      <FiUser className="text-white" size={20} />
                    </div>
                    <span>Parent/Guardian Details</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Father's Name *</label>
                      <input
                        type="text"
                        name="fatherName"
                        required
                        value={formData.fatherName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Father's full name"
                      />
                    </div>
                    <div>
                      <label className="label">Father's Phone *</label>
                      <input
                        type="tel"
                        name="fatherPhone"
                        required
                        value={formData.fatherPhone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="10-digit phone number"
                      />
                    </div>
                    <div>
                      <label className="label">Father's Email</label>
                      <input
                        type="email"
                        name="fatherEmail"
                        value={formData.fatherEmail}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="father@example.com"
                      />
                    </div>
                    <div>
                      <label className="label">Father's Occupation</label>
                      <input
                        type="text"
                        name="fatherOccupation"
                        value={formData.fatherOccupation}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Occupation"
                      />
                    </div>
                    <div>
                      <label className="label">Mother's Name *</label>
                      <input
                        type="text"
                        name="motherName"
                        required
                        value={formData.motherName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Mother's full name"
                      />
                    </div>
                    <div>
                      <label className="label">Mother's Phone</label>
                      <input
                        type="tel"
                        name="motherPhone"
                        value={formData.motherPhone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="10-digit phone number"
                      />
                    </div>
                    <div>
                      <label className="label">Mother's Email</label>
                      <input
                        type="email"
                        name="motherEmail"
                        value={formData.motherEmail}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="mother@example.com"
                      />
                    </div>
                    <div>
                      <label className="label">Mother's Occupation</label>
                      <input
                        type="text"
                        name="motherOccupation"
                        value={formData.motherOccupation}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Occupation"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-secondary-900 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-400 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-white" size={20} />
                    </div>
                    <span>Address</span>
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="label">Street Address *</label>
                      <input
                        type="text"
                        name="address.street"
                        required
                        value={formData.address.street}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Street address"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="label">City *</label>
                        <input
                          type="text"
                          name="address.city"
                          required
                          value={formData.address.city}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="label">State *</label>
                        <input
                          type="text"
                          name="address.state"
                          required
                          value={formData.address.state}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="State"
                        />
                      </div>
                      <div>
                        <label className="label">Pincode *</label>
                        <input
                          type="text"
                          name="address.pincode"
                          required
                          value={formData.address.pincode}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Previous School */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-100"
                >
                  <h3 className="text-xl font-bold mb-4 text-secondary-900">Previous School (if any)</h3>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Name of previous school"
                  />
                </motion.div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-semibold px-8 py-4 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-medium hover:shadow-large transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <FiCheckCircle size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Admissions;
