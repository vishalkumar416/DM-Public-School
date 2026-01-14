import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from './routes/auth.routes.js';
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
import admissionRoutes from './routes/admission.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import noticeRoutes from './routes/notice.routes.js';
import feeRoutes from './routes/fee.routes.js';
import contactRoutes from './routes/contact.routes.js';
import adminRoutes from './routes/admin.routes.js';
import notificationRoutes from './routes/notification.routes.js';

// Load environment variables
dotenv.config({ path: './.env' });

// Verify critical environment variables
const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length) {
  console.warn('⚠️ Missing environment variables:', missingVars.join(', '));
}

const app = express();

/* ==============================
   TRUST PROXY (Required for Render/Vercel)
================================ */

// Trust proxy - required when behind a reverse proxy (Render, Vercel, etc.)
app.set('trust proxy', 1);

/* ==============================
   SECURITY MIDDLEWARE
================================ */

// Helmet
app.use(helmet());

// ✅ FIXED CORS CONFIG (IMPORTANT)
// Build allowed origins list
const allowedOrigins = ['http://localhost:5173'];

// Add frontend URL from environment variable if provided
if (process.env.FRONTEND_URL) {
  const frontendUrls = process.env.FRONTEND_URL.split(',').map(url => url.trim());
  allowedOrigins.push(...frontendUrls);
}

// CORS configuration - supports Vercel deployments and custom domains
const vercelPattern = /^https:\/\/.*\.vercel\.app$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman, curl, mobile apps)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } 
      // In production, check if origin matches Vercel pattern
      else if (process.env.NODE_ENV === 'production' && vercelPattern.test(origin)) {
        callback(null, true);
      } 
      // In development, allow all origins for easier testing
      else if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } 
      // Block in production if not allowed
      else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Handle preflight requests
app.options('*', cors());

app.use(cookieParser());

/* ==============================
   RATE LIMITING
================================ */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    const skipAuth =
      req.originalUrl.includes('/auth/login') ||
      req.originalUrl.includes('/auth/me');
    return skipAuth || process.env.NODE_ENV !== 'production';
  }
});

app.use('/api/', limiter);

/* ==============================
   BODY PARSERS
================================ */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

/* ==============================
   DATABASE CONNECTION
================================ */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

/* ==============================
   ROUTES
================================ */

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running 🚀' });
});

/* ==============================
   ERROR HANDLING
================================ */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

/* ==============================
   SERVER START
================================ */

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Graceful server error handling
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});
