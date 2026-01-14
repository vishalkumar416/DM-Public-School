import express from 'express';
import Student from '../models/Student.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { class: className, section, isActive, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (className) filter.class = className;
    if (section) filter.section = section;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (page - 1) * limit;

    const students = await Student.find(filter)
      .sort({ class: 1, section: 1, rollNumber: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(filter);

    res.json({
      success: true,
      count: students.length,
      total,
      students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/students/:id
// @desc    Get single student
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/students
// @desc    Create student
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const studentData = {
      ...req.body,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true // Ensure isActive is set
    };
    const student = await Student.create(studentData);

    res.status(201).json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating student'
    });
  }
});

// @route   PUT /api/students/:id
// @desc    Update student
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating student'
    });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete student
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await student.deleteOne();

    res.json({
      success: true,
      message: 'Student deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/students/stats/overview
// @desc    Get student statistics
// @access  Private
router.get('/stats/overview', protect, async (req, res) => {
  try {
    const total = await Student.countDocuments({ isActive: true });
    const byClass = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$class', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const byGender = await Student.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      stats: {
        total,
        byClass,
        byGender
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;






