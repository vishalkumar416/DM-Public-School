import express from 'express';
import Contact from '../models/Contact.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { sendEmail } from '../utils/sendEmail.js';
import { createNotification } from '../utils/createNotification.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    // Create notification for admin
    await createNotification({
      type: 'contact',
      title: 'New Contact Form Submission',
      message: `${name} submitted a contact form: "${subject}"`,
      link: `/admin/contacts`,
      relatedId: contact._id,
      relatedModel: 'Contact',
      priority: 'medium'
    });

    // Send email notification to admin (optional)
    try {
      await sendEmail({
        email: process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (error) {
      console.error('Email notification error:', error);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting contact form'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('repliedBy', 'name email');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      count: contacts.length,
      total,
      contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private (Admin only)
router.get('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    // Mark as read if still new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/contact/:id/reply
// @desc    Reply to contact message
// @access  Private (Admin only)
router.put('/:id/reply', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { replyMessage } = req.body;

    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    contact.status = 'replied';
    contact.replyMessage = replyMessage;
    contact.repliedAt = new Date();
    contact.repliedBy = req.admin._id;
    await contact.save();

    // Send reply email
    try {
      await sendEmail({
        email: contact.email,
        subject: `Re: ${contact.subject}`,
        html: `
          <h2>Reply from D.M. Public School</h2>
          <p>Dear ${contact.name},</p>
          <p>${replyMessage}</p>
          <hr>
          <p><strong>Original Message:</strong></p>
          <p>${contact.message}</p>
        `
      });
    } catch (error) {
      console.error('Reply email error:', error);
      // Continue even if email fails
    }

    res.json({
      success: true,
      message: 'Reply sent successfully',
      contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error sending reply'
    });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await contact.deleteOne();

    res.json({
      success: true,
      message: 'Contact message deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;






