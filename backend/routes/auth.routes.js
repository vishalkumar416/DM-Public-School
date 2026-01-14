import express from 'express';
import Admin from '../models/Admin.model.js';
import { generateToken } from '../utils/generateToken.js';
import { protect } from '../middleware/auth.middleware.js';
import { sendEmail } from '../utils/sendEmail.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt received');
    console.log('   Body:', { email: req.body.email, password: req.body.password ? '***' : 'missing' });
    
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();
    console.log('   Normalized email:', normalizedEmail);

    // Check if admin exists
    const admin = await Admin.findOne({ email: normalizedEmail }).select('+password');

    if (!admin) {
      console.log('❌ Login attempt failed - Admin not found:', normalizedEmail);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Admin found:', admin.email);

    // Check if admin is active
    if (!admin.isActive) {
      console.log('❌ Admin account is deactivated');
      return res.status(401).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Check password
    console.log('🔐 Checking password...');
    const isPasswordCorrect = await admin.comparePassword(password);

    if (!isPasswordCorrect) {
      console.log('❌ Login attempt failed - Incorrect password for:', normalizedEmail);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Password correct!');
    console.log('✅ Login successful for:', normalizedEmail);

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Admin logout
// @access  Private
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== admin.email) {
      const emailExists = await Admin.findOne({ email: email.toLowerCase().trim() });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
      admin.email = email.toLowerCase().trim();
    }

    if (name) {
      admin.name = name;
    }

    await admin.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');

    // Check current password
    const isPasswordCorrect = await admin.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;





