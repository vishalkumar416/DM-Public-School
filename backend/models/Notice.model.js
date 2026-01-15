import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['General', 'Exam', 'Holiday', 'Event', 'Admission', 'Fee', 'Urgent'],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  targetAudience: {
    type: [String],
    enum: ['All', 'Students', 'Parents', 'Teachers', 'Staff'],
    default: ['All']
  },
  classes: [{
    type: String,
    enum: ['Nursery', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'All']
  }],
  attachment: {
    url: String,
    cloudinaryId: String,
    fileName: String
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

noticeSchema.index({ category: 1 });
noticeSchema.index({ isActive: 1, isPinned: -1, createdAt: -1 });
noticeSchema.index({ startDate: 1, endDate: 1 });

const Notice = mongoose.model('Notice', noticeSchema);
export default Notice;










