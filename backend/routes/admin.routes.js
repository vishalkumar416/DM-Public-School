import express from 'express';
import Student from '../models/Student.model.js';
import Admission from '../models/Admission.model.js';
import Teacher from '../models/Teacher.model.js';
import Notice from '../models/Notice.model.js';
import Gallery from '../models/Gallery.model.js';
import Contact from '../models/Contact.model.js';
import Fee from '../models/Fee.model.js';
import Content from '../models/Content.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/dashboard', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    // Total students
    const totalStudents = await Student.countDocuments({ isActive: true });
    
    // Pending admissions
    const pendingAdmissions = await Admission.countDocuments({ status: 'pending' });
    
    // Total teachers
    const totalTeachers = await Teacher.countDocuments({ isActive: true });
    
    // Recent notices
    const recentNotices = await Notice.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category createdAt isPinned');
    
    // Recent contacts
    const newContacts = await Contact.countDocuments({ status: 'new' });
    
    // Fee statistics
    const feeStats = await Fee.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' },
          paidAmount: { $sum: '$paidAmount' },
          pendingAmount: { $sum: '$pendingAmount' }
        }
      }
    ]);

    // Students by class
    const studentsByClass = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$class', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    // Recent admissions
    const recentAdmissions = await Admission.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName classApplied status createdAt');

    res.json({
      success: true,
      stats: {
        totalStudents,
        pendingAdmissions,
        totalTeachers,
        newContacts,
        feeStats,
        studentsByClass,
        recentNotices,
        recentAdmissions
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/admin/content/:key
// @desc    Get content by key
// @access  Public (for website)
router.get('/content/:key', async (req, res) => {
  try {
    const content = await Content.findOne({ key: req.params.key, isActive: true });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/admin/content/:key
// @desc    Update content
// @access  Private (Admin only)
router.put('/content/:key', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { title, content: contentData, type } = req.body;

    let content = await Content.findOne({ key: req.params.key });

    if (content) {
      content.title = title || content.title;
      content.content = contentData || content.content;
      content.type = type || content.type;
      content.updatedBy = req.admin._id;
      await content.save();
    } else {
      content = await Content.create({
        key: req.params.key,
        title: title || req.params.key,
        content: contentData || '',
        type: type || 'text',
        updatedBy: req.admin._id
      });
    }

    res.json({
      success: true,
      content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating content'
    });
  }
});

export default router;






