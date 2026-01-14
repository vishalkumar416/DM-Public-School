import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  class: {
    type: String,
    required: true,
    enum: ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  },
  section: {
    type: String,
    default: 'A'
  },
  rollNumber: {
    type: String
  },
  photo: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  // Parent/Guardian details
  fatherName: {
    type: String,
    required: true
  },
  fatherPhone: {
    type: String,
    required: true
  },
  fatherOccupation: String,
  motherName: {
    type: String,
    required: true
  },
  motherPhone: String,
  motherOccupation: String,
  guardianName: String,
  guardianPhone: String,
  guardianRelation: String,
  // Admission details
  admissionDate: {
    type: Date,
    default: Date.now
  },
  previousSchool: String,
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  academicYear: {
    type: String,
    default: () => {
      const year = new Date().getFullYear();
      return `${year}-${year + 1}`;
    }
  }
}, {
  timestamps: true
});

// Index for faster queries (admissionNumber already has unique index)
studentSchema.index({ class: 1, section: 1 });
studentSchema.index({ isActive: 1 });

const Student = mongoose.model('Student', studentSchema);
export default Student;





