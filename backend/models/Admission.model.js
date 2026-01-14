import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    required: true,
    unique: true
  },
  // Student details
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
  classApplied: {
    type: String,
    required: true,
    enum: ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  },
  photo: {
    type: String,
    default: ''
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
  fatherEmail: String,
  fatherOccupation: String,
  motherName: {
    type: String,
    required: true
  },
  motherPhone: String,
  motherEmail: String,
  motherOccupation: String,
  guardianName: String,
  guardianPhone: String,
  guardianRelation: String,
  // Address
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  // Previous school
  previousSchool: String,
  // Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'on_hold'],
    default: 'pending'
  },
  remarks: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  approvedAt: Date,
  // Payment
  applicationFee: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymentId: String,
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

// Index for faster queries (applicationNumber already has unique index)
admissionSchema.index({ status: 1 });
admissionSchema.index({ createdAt: -1 });

const Admission = mongoose.model('Admission', admissionSchema);
export default Admission;





