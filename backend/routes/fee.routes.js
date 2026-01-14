import express from 'express';
import Fee from '../models/Fee.model.js';
import Student from '../models/Student.model.js';
import Razorpay from 'razorpay';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { generateReceiptNumber } from '../utils/generateToken.js';
import { createNotification } from '../utils/createNotification.js';

const router = express.Router();

// Initialize Razorpay
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// @route   GET /api/fees
// @desc    Get all fees
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { studentId, admissionNumber, status, academicYear, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (admissionNumber) filter.admissionNumber = admissionNumber;
    if (status) filter.status = status;
    if (academicYear) filter.academicYear = academicYear;

    const skip = (page - 1) * limit;

    const fees = await Fee.find(filter)
      .populate('studentId', 'firstName lastName class section photo')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Fee.countDocuments(filter);

    res.json({
      success: true,
      count: fees.length,
      total,
      fees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/fees/:id
// @desc    Get single fee record
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id)
      .populate('studentId', 'firstName lastName class section photo admissionNumber');

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    res.json({
      success: true,
      fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/fees
// @desc    Create fee record
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { studentId, feeStructure, dueDate } = req.body;

    // Get student details
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Calculate total amount
    const totalAmount = Object.values(feeStructure).reduce((sum, amount) => sum + (amount || 0), 0);

    const feeData = {
      studentId,
      admissionNumber: student.admissionNumber,
      academicYear: student.academicYear || req.body.academicYear,
      class: student.class,
      feeStructure,
      totalAmount,
      pendingAmount: totalAmount,
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    const fee = await Fee.create(feeData);

    res.status(201).json({
      success: true,
      fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating fee record'
    });
  }
});

// @route   POST /api/fees/:id/payment
// @desc    Create payment order (Razorpay)
// @access  Private
router.post('/:id/payment', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay not configured'
      });
    }

    const { amount } = req.body;

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: generateReceiptNumber(),
      notes: {
        feeId: fee._id.toString(),
        admissionNumber: fee.admissionNumber
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment order'
    });
  }
});

// @route   POST /api/fees/:id/verify-payment
// @desc    Verify and record payment
// @access  Private
router.post('/:id/verify-payment', protect, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, amount, paymentMode, remarks } = req.body;

    // Verify payment signature (optional, recommended for production)
    const crypto = await import('crypto');
    const expectedSignature = crypto.default
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    // Add payment to fee record
    const receiptNumber = generateReceiptNumber();
    
    fee.payments.push({
      amount,
      paymentDate: new Date(),
      paymentMode: paymentMode || 'Online',
      transactionId: razorpayPaymentId,
      razorpayOrderId,
      razorpayPaymentId,
      receiptNumber,
      remarks
    });

    // Update payment amounts
    fee.paidAmount += amount;
    fee.pendingAmount = fee.totalAmount - fee.paidAmount;

    // Update status
    if (fee.pendingAmount <= 0) {
      fee.status = 'paid';
    } else if (fee.paidAmount > 0) {
      fee.status = 'partial';
    }

    await fee.save();

    // Create notification for payment
    await createNotification({
      type: 'payment',
      title: 'Fee Payment Received',
      message: `Payment of ₹${amount} received for ${fee.admissionNumber}`,
      link: `/admin/fees`,
      relatedId: fee._id,
      relatedModel: 'Fee',
      priority: 'medium'
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      fee,
      receiptNumber
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    });
  }
});

// @route   POST /api/fees/:id/manual-payment
// @desc    Record manual payment (cash/cheque)
// @access  Private (Admin only)
router.post('/:id/manual-payment', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { amount, paymentMode, transactionId, remarks } = req.body;

    if (!amount || !paymentMode) {
      return res.status(400).json({
        success: false,
        message: 'Amount and payment mode are required'
      });
    }

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    const receiptNumber = generateReceiptNumber();

    fee.payments.push({
      amount,
      paymentDate: new Date(),
      paymentMode,
      transactionId: transactionId || receiptNumber,
      receiptNumber,
      remarks
    });

    fee.paidAmount += amount;
    fee.pendingAmount = fee.totalAmount - fee.paidAmount;

    if (fee.pendingAmount <= 0) {
      fee.status = 'paid';
    } else if (fee.paidAmount > 0) {
      fee.status = 'partial';
    }

    await fee.save();

    // Create notification for payment
    await createNotification({
      type: 'payment',
      title: 'Fee Payment Recorded',
      message: `Payment of ₹${amount} recorded for ${fee.admissionNumber} (${paymentMode})`,
      link: `/admin/fees`,
      relatedId: fee._id,
      relatedModel: 'Fee',
      priority: 'medium'
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      fee,
      receiptNumber
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error recording payment'
    });
  }
});

export default router;

