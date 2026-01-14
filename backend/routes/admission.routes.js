import express from 'express';
import Admission from '../models/Admission.model.js';
import Student from '../models/Student.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';
import { generateApplicationNumber } from '../utils/generateToken.js';
import { sendAdmissionConfirmationEmail, sendAdmissionApprovalEmail } from '../utils/sendEmail.js';
import { generateAdmissionNumber } from '../utils/generateToken.js';
import { createNotification } from '../utils/createNotification.js';

const router = express.Router();

// @route   POST /api/admissions
// @desc    Create admission application
// @access  Public
router.post('/', uploadSingle('photo'), async (req, res) => {
  try {
    let photoUrl = '';
    let cloudinaryId = '';

    // Upload photo if provided
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer, 'dmps/students');
        photoUrl = result.secure_url;
        cloudinaryId = result.public_id;
      } catch (error) {
        console.error('Photo upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading photo'
        });
      }
    }

    // Generate application number
    const applicationNumber = generateApplicationNumber();

    // Parse address if it's a JSON string (from FormData)
    let address = req.body.address;
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch (error) {
        console.error('Error parsing address JSON:', error);
        // If parsing fails, try to get from individual fields
        address = {
          street: req.body['address.street'] || '',
          city: req.body['address.city'] || '',
          state: req.body['address.state'] || '',
          pincode: req.body['address.pincode'] || ''
        };
      }
    }

    // If address is still not an object or is empty, try to construct it from individual fields
    if (!address || typeof address !== 'object' || Object.keys(address).length === 0) {
      const street = req.body['address.street'] || req.body.address?.street || '';
      const city = req.body['address.city'] || req.body.address?.city || '';
      const state = req.body['address.state'] || req.body.address?.state || '';
      const pincode = req.body['address.pincode'] || req.body.address?.pincode || '';
      
      if (street || city || state || pincode) {
        address = { street, city, state, pincode };
      }
    }

    // Validate address fields
    if (!address || !address.street || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({
        success: false,
        message: 'All address fields (street, city, state, pincode) are required'
      });
    }

    const admissionData = {
      ...req.body,
      address,
      applicationNumber,
      photo: photoUrl,
      dateOfBirth: new Date(req.body.dateOfBirth)
    };

    // Clean up - remove any string address or dot-notation fields
    delete admissionData['address.street'];
    delete admissionData['address.city'];
    delete admissionData['address.state'];
    delete admissionData['address.pincode'];

    const admission = await Admission.create(admissionData);

    // Create notification for admin (non-blocking)
    try {
      await createNotification({
        type: 'admission',
        title: 'New Admission Application',
        message: `${admission.firstName} ${admission.lastName} applied for Class ${admission.classApplied}`,
        link: `/admin/admissions`,
        relatedId: admission._id,
        relatedModel: 'Admission',
        priority: 'high'
      });
    } catch (notificationError) {
      console.error('Notification creation error (non-critical):', notificationError);
      // Continue even if notification creation fails
    }

    // Send confirmation email
    try {
      await sendAdmissionConfirmationEmail(admission);
    } catch (error) {
      console.error('Email send error:', error);
    }

    res.status(201).json({
      success: true,
      admission
    });
  } catch (error) {
    console.error('Admission creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating admission application'
    });
  }
});

// @route   GET /api/admissions
// @desc    Get all admissions (with filters)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { status, classApplied, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (classApplied) filter.classApplied = classApplied;

    const skip = (page - 1) * limit;

    let admissions;
    try {
      admissions = await Admission.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('approvedBy', 'name email');
    } catch (populateError) {
      // If populate fails, try without it
      console.warn('Populate error, fetching without populate:', populateError.message);
      admissions = await Admission.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));
    }

    const total = await Admission.countDocuments(filter);

    res.json({
      success: true,
      count: admissions.length,
      total,
      admissions
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   GET /api/admissions/:id
// @desc    Get single admission
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate('approvedBy', 'name email');

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    res.json({
      success: true,
      admission
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/admissions/:id/approve
// @desc    Approve admission
// @access  Private (Admin only)
router.put('/:id/approve', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { section, rollNumber, remarks } = req.body;

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    if (admission.status === 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Admission already approved'
      });
    }

    // Generate admission number
    const admissionNumber = generateAdmissionNumber();

    // Create student record
    const studentData = {
      admissionNumber,
      firstName: admission.firstName,
      lastName: admission.lastName,
      dateOfBirth: admission.dateOfBirth,
      gender: admission.gender,
      class: admission.classApplied,
      section: section || 'A',
      rollNumber: rollNumber || '',
      photo: admission.photo,
      email: admission.fatherEmail || admission.motherEmail,
      phone: admission.fatherPhone,
      address: admission.address,
      fatherName: admission.fatherName,
      fatherPhone: admission.fatherPhone,
      fatherOccupation: admission.fatherOccupation,
      motherName: admission.motherName,
      motherPhone: admission.motherPhone,
      motherOccupation: admission.motherOccupation,
      guardianName: admission.guardianName,
      guardianPhone: admission.guardianPhone,
      guardianRelation: admission.guardianRelation,
      previousSchool: admission.previousSchool,
      isApproved: true,
      isActive: true,
      academicYear: admission.academicYear
    };

    const student = await Student.create(studentData);

    // Update admission
    admission.status = 'approved';
    admission.approvedBy = req.admin._id;
    admission.approvedAt = new Date();
    admission.remarks = remarks || '';
    await admission.save();

    // Send approval email
    try {
      await sendAdmissionApprovalEmail(admission, student);
    } catch (error) {
      console.error('Email send error:', error);
    }

    res.json({
      success: true,
      message: 'Admission approved successfully',
      student,
      admission
    });
  } catch (error) {
    console.error('Approval error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error approving admission'
    });
  }
});

// @route   PUT /api/admissions/:id/reject
// @desc    Reject admission
// @access  Private (Admin only)
router.put('/:id/reject', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { remarks } = req.body;

    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    admission.status = 'rejected';
    admission.approvedBy = req.admin._id;
    admission.remarks = remarks || '';
    await admission.save();

    res.json({
      success: true,
      message: 'Admission rejected',
      admission
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   DELETE /api/admissions/:id
// @desc    Delete admission
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: 'Admission not found'
      });
    }

    await admission.deleteOne();

    res.json({
      success: true,
      message: 'Admission deleted'
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

export default router;






