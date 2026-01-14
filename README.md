# D.M. PUBLIC SCHOOL - Management System

A complete production-ready school website and management system built with React, Node.js, and MongoDB.

## Tech Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS
- React Router
- Axios
- Zustand
- Framer Motion

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Cloudinary
- Nodemailer
- Razorpay
- Multer
- Zod

## Project Structure

```
├── backend/          # Express.js API server
├── frontend/         # React application
└── Public/           # Static assets
```

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

4. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

## Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`
4. Add environment variables

### Frontend (Vercel)
1. Connect GitHub repository
2. Set root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables

## Default Admin Credentials

Create an admin user through the database or use the seed script:
- Email: admin@dmpschool.com
- Password: (set via seed script)

## Features

### Public Website
- Home, About, Academics, Admissions
- Faculty, Gallery, Notice Board
- Infrastructure, Contact Us

### Admin Panel
- Dashboard with statistics
- Student management
- Teacher management
- Admission approvals
- Fee management
- Gallery management
- Notice management
- Content management









