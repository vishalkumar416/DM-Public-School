import express from 'express';
import Teacher from '../models/Teacher.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { generateEmployeeId } from '../utils/generateToken.js';

const router = express.Router();

// @route   GET /api/teachers
// @desc    Get all teachers
// @access  Public (for public website)
router.get('/', async (req, res) => {
  try {
    const { subject, isActive } = req.query;

    const filter = {};
    if (subject) filter.subject = subject;
    if (isActive !== undefined) {
      // Handle both string and boolean values
      filter.isActive = isActive === 'true' || isActive === true;
    } else {
      filter.isActive = true; // Default to active teachers for public
    }

    const teachers = await Teacher.find(filter)
      .sort({ designation: 1, firstName: 1 });

    res.json({
      success: true,
      count: teachers.length,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/teachers/:id
// @desc    Get single teacher
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/teachers
// @desc    Create teacher
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super_admin'), uploadSingle('photo'), async (req, res) => {
  try {
    let photoUrl = '';

    // Upload photo if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'dmps/teachers');
        photoUrl = result.secure_url;
      } catch (error) {
        console.error('Photo upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading photo'
        });
      }
    }

    // Generate employee ID if not provided
    const employeeId = req.body.employeeId || generateEmployeeId();

    const teacherData = {
      ...req.body,
      employeeId,
      photo: photoUrl,
      dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : undefined,
      joiningDate: req.body.joiningDate ? new Date(req.body.joiningDate) : new Date(),
      isActive: req.body.isActive !== undefined ? req.body.isActive : true // Ensure isActive is set
    };

    const teacher = await Teacher.create(teacherData);

    res.status(201).json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating teacher'
    });
  }
});

// @route   PUT /api/teachers/:id
// @desc    Update teacher
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'super_admin'), uploadSingle('photo'), async (req, res) => {
  try {
    let photoUrl = req.body.photo;

    // Upload new photo if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'dmps/teachers');
        photoUrl = result.secure_url;
      } catch (error) {
        console.error('Photo upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading photo'
        });
      }
    }

    const updateData = {
      ...req.body,
      photo: photoUrl
    };

    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth);
    }

    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating teacher'
    });
  }
});

// @route   DELETE /api/teachers/:id
// @desc    Delete teacher
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    await teacher.deleteOne();

    res.json({
      success: true,
      message: 'Teacher deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;






