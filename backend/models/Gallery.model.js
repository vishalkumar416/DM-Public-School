import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['Events', 'Sports', 'Cultural', 'Academic', 'Infrastructure', 'Annual Day', 'Other'],
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    cloudinaryId: String,
    caption: String
  }],
  videoUrl: {
    type: String,
    default: ''
  },
  thumbnail: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['photo', 'video'],
    default: 'photo'
  },
  date: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true
});

gallerySchema.index({ category: 1 });
gallerySchema.index({ date: -1 });
gallerySchema.index({ isActive: 1 });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;






