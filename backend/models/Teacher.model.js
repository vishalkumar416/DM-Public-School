import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  employeeId: {
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
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: ''
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  subject: {
    type: String,
    required: true
  },
  classes: [{
    type: String,
    enum: ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
  }],
  designation: {
    type: String,
    enum: ['Principal', 'Vice Principal', 'Senior Teacher', 'Teacher', 'Assistant Teacher'],
    default: 'Teacher'
  },
  joiningDate: {
    type: Date,
    default: Date.now
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries (employeeId already has unique index)
teacherSchema.index({ subject: 1 });

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;





