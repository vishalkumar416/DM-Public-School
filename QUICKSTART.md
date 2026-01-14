# Quick Start Guide - D.M. Public School Management System

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB
- Git installed

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dmpschool
   JWT_SECRET=your_super_secret_jwt_key_change_in_production
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
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Create admin user (optional)**
   ```bash
   npm run seed
   ```
   Default credentials:
   - Email: `admin@dmpschool.com`
   - Password: `Admin@123`
   
   **⚠️ Change password after first login!**

### Frontend Setup

1. **Navigate to frontend folder**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Admin Panel: http://localhost:5173/admin/login

## Project Structure

```
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, upload middleware
│   ├── utils/           # Helper functions
│   ├── scripts/         # Seed scripts
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Zustand store
│   │   ├── utils/       # API utilities
│   │   └── App.jsx      # Main app
│   └── package.json
└── Public/              # Static assets
```

## API Endpoints

### Public Endpoints
- `GET /api/notices` - Get notices
- `GET /api/teachers` - Get teachers
- `GET /api/gallery` - Get gallery
- `POST /api/admissions` - Submit admission
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/students` - Get students
- `POST /api/students` - Create student
- `PUT /api/admissions/:id/approve` - Approve admission
- `POST /api/teachers` - Create teacher
- `POST /api/gallery` - Create gallery
- `POST /api/notices` - Create notice
- And more...

## Features

### Public Website
✅ Home page with stats and notices
✅ About Us with vision & mission
✅ Academics information
✅ Online Admission Form
✅ Faculty listing
✅ Photo Gallery
✅ Notice Board
✅ Infrastructure details
✅ Contact form with map

### Admin Panel
✅ Dashboard with statistics
✅ Student Management
✅ Teacher Management
✅ Admission Approvals
✅ Gallery Management
✅ Notice Management
✅ Fee Management
✅ Contact Management
✅ Content Management

## Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check `MONGODB_URI` in `.env`
- **JWT Error**: Ensure `JWT_SECRET` is set
- **Cloudinary Error**: Verify Cloudinary credentials

### Frontend Issues
- **API Connection Error**: Check `VITE_API_URL` in `.env`
- **CORS Error**: Ensure backend `FRONTEND_URL` matches frontend URL
- **Build Error**: Run `npm install` again

### Common Commands
```bash
# Backend
cd backend
npm install
npm run dev
npm run seed

# Frontend
cd frontend
npm install
npm run dev
npm run build
```

## Next Steps

1. Set up MongoDB Atlas database
2. Configure Cloudinary for image uploads
3. Set up Razorpay for fee payments
4. Configure email service (Gmail)
5. Deploy backend to Render
6. Deploy frontend to Vercel
7. Update environment variables for production

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)






