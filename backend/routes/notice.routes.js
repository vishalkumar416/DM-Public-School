import express from 'express';
import Notice from '../models/Notice.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

const router = express.Router();

// @route   GET /api/notices
// @desc    Get all notices
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, priority, isActive = true, classes, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (isActive !== undefined) {
      // Handle both string and boolean values
      filter.isActive = isActive === 'true' || isActive === true;
    } else {
      filter.isActive = true; // Default to active notices for public
    }
    
    // Date filter - show notices within start and end date
    const now = new Date();
    filter.$or = [
      { startDate: { $lte: now }, endDate: { $exists: false } },
      { startDate: { $lte: now }, endDate: { $gte: now } },
      { startDate: { $exists: false }, endDate: { $exists: false } }
    ];

    const skip = (page - 1) * limit;

    const notices = await Notice.find(filter)
      .sort({ isPinned: -1, priority: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email');

    const total = await Notice.countDocuments(filter);

    res.json({
      success: true,
      count: notices.length,
      total,
      notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/notices/:id
// @desc    Get single notice
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    res.json({
      success: true,
      notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/notices
// @desc    Create notice
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super_admin'), uploadSingle('attachment'), async (req, res) => {
  try {
    const { title, description, category, priority, targetAudience, classes, startDate, endDate, isPinned } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    let attachment = null;

    // Upload attachment if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'dmps/notices');
        attachment = {
          url: result.secure_url,
          cloudinaryId: result.public_id,
          fileName: req.file.originalname
        };
      } catch (error) {
        console.error('Attachment upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading attachment'
        });
      }
    }

    // Parse arrays from JSON strings (FormData sends arrays as JSON strings)
    let parsedTargetAudience = ['All'];
    if (targetAudience) {
      try {
        // If it's a string, try to parse it as JSON
        if (typeof targetAudience === 'string') {
          parsedTargetAudience = JSON.parse(targetAudience);
        } else if (Array.isArray(targetAudience)) {
          parsedTargetAudience = targetAudience;
        } else {
          parsedTargetAudience = [targetAudience];
        }
      } catch (e) {
        // If parsing fails, treat as single value
        parsedTargetAudience = [targetAudience];
      }
    }

    let parsedClasses = ['All'];
    if (classes) {
      try {
        // If it's a string, try to parse it as JSON
        if (typeof classes === 'string') {
          parsedClasses = JSON.parse(classes);
        } else if (Array.isArray(classes)) {
          parsedClasses = classes;
        } else {
          parsedClasses = [classes];
        }
      } catch (e) {
        // If parsing fails, treat as single value
        parsedClasses = [classes];
      }
    }

    // Ensure arrays are actually arrays
    if (!Array.isArray(parsedTargetAudience)) {
      parsedTargetAudience = [parsedTargetAudience];
    }
    if (!Array.isArray(parsedClasses)) {
      parsedClasses = [parsedClasses];
    }

    const noticeData = {
      title,
      description,
      category: category || 'General',
      priority: priority || 'Medium',
      targetAudience: parsedTargetAudience,
      classes: parsedClasses,
      attachment,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : undefined,
      isPinned: isPinned === 'true' || isPinned === true,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true, // Ensure isActive is set
      createdBy: req.admin._id
    };

    const notice = await Notice.create(noticeData);

    res.status(201).json({
      success: true,
      notice
    });
  } catch (error) {
    console.error('Notice creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating notice'
    });
  }
});

// @route   PUT /api/notices/:id
// @desc    Update notice
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'super_admin'), uploadSingle('attachment'), async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    let attachment = notice.attachment;

    // Upload new attachment if provided
    if (req.file) {
      // Delete old attachment from Cloudinary
      if (attachment && attachment.cloudinaryId) {
        try {
          await deleteFromCloudinary(attachment.cloudinaryId);
        } catch (error) {
          console.error('Cloudinary delete error:', error);
        }
      }

      try {
        const result = await uploadToCloudinary(req.file.buffer, 'dmps/notices');
        attachment = {
          url: result.secure_url,
          cloudinaryId: result.public_id,
          fileName: req.file.originalname
        };
      } catch (error) {
        console.error('Attachment upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading attachment'
        });
      }
    }

    // Parse arrays from JSON strings (FormData sends arrays as JSON strings)
    const updateData = { ...req.body, attachment };

    // Parse targetAudience if provided
    if (updateData.targetAudience) {
      try {
        if (typeof updateData.targetAudience === 'string') {
          updateData.targetAudience = JSON.parse(updateData.targetAudience);
        }
        if (!Array.isArray(updateData.targetAudience)) {
          updateData.targetAudience = [updateData.targetAudience];
        }
      } catch (e) {
        updateData.targetAudience = Array.isArray(updateData.targetAudience) 
          ? updateData.targetAudience 
          : [updateData.targetAudience];
      }
    }

    // Parse classes if provided
    if (updateData.classes) {
      try {
        if (typeof updateData.classes === 'string') {
          updateData.classes = JSON.parse(updateData.classes);
        }
        if (!Array.isArray(updateData.classes)) {
          updateData.classes = [updateData.classes];
        }
      } catch (e) {
        updateData.classes = Array.isArray(updateData.classes) 
          ? updateData.classes 
          : [updateData.classes];
      }
    }

    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      notice: updatedNotice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating notice'
    });
  }
});

// @route   DELETE /api/notices/:id
// @desc    Delete notice
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: 'Notice not found'
      });
    }

    // Delete attachment from Cloudinary if exists
    if (notice.attachment && notice.attachment.cloudinaryId) {
      try {
        await deleteFromCloudinary(notice.attachment.cloudinaryId);
      } catch (error) {
        console.error('Cloudinary delete error:', error);
      }
    }

    await notice.deleteOne();

    res.json({
      success: true,
      message: 'Notice deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;






