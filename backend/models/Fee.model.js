import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  admissionNumber: {
    type: String,
    required: true
  },
  academicYear: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  feeStructure: {
    tuitionFee: { type: Number, default: 0 },
    developmentFee: { type: Number, default: 0 },
    libraryFee: { type: Number, default: 0 },
    laboratoryFee: { type: Number, default: 0 },
    sportsFee: { type: Number, default: 0 },
    transportFee: { type: Number, default: 0 },
    otherFee: { type: Number, default: 0 }
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  pendingAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'partial', 'paid'],
    default: 'pending'
  },
  payments: [{
    amount: Number,
    paymentDate: Date,
    paymentMode: {
      type: String,
      enum: ['Cash', 'Cheque', 'Online', 'Card']
    },
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    receiptNumber: String,
    remarks: String
  }],
  dueDate: Date,
  lastReminder: Date
}, {
  timestamps: true
});

feeSchema.index({ studentId: 1 });
feeSchema.index({ admissionNumber: 1, academicYear: 1 });
feeSchema.index({ status: 1 });

const Fee = mongoose.model('Fee', feeSchema);
export default Fee;










