# Deployment Guide - D.M. Public School Management System

## Prerequisites

1. MongoDB Atlas account
2. Cloudinary account
3. Razorpay account (for fee payments)
4. Gmail account with App Password (for emails)
5. Vercel account (for frontend)
6. Render account (for backend)

## Step 1: Backend Deployment (Render)

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create MongoDB Atlas Database**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Create a database user
   - Whitelist IP (0.0.0.0/0 for all IPs)
   - Get connection string

3. **Create Cloudinary Account**
   - Go to https://cloudinary.com
   - Get Cloud Name, API Key, and API Secret

4. **Create Razorpay Account**
   - Go to https://razorpay.com
   - Get Key ID and Key Secret

5. **Setup Gmail App Password**
   - Go to Google Account Settings
   - Enable 2-Step Verification
   - Generate App Password for "Mail"

6. **Deploy on Render**
   - Go to https://render.com
   - Click "New Web Service"
   - Connect your GitHub repository
   - Select backend folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     ```
     PORT=5000
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<generate-a-random-secret-key>
     JWT_EXPIRE=7d
     CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
     CLOUDINARY_API_KEY=<your-cloudinary-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-secret>
     RAZORPAY_KEY_ID=<your-razorpay-key>
     RAZORPAY_KEY_SECRET=<your-razorpay-secret>
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=<your-email@gmail.com>
     EMAIL_PASS=<your-app-password>
     FRONTEND_URL=<your-frontend-url>
     NODE_ENV=production
     ```
   - Click "Create Web Service"
   - Copy the backend URL (e.g., https://dmps-backend.onrender.com)

7. **Create Admin User**
   - SSH into your Render service or use MongoDB Atlas shell
   - Run the seed script:
     ```bash
     cd backend
     npm run seed
     ```
   - Or manually create admin via MongoDB:
     ```javascript
     // In MongoDB Atlas shell or MongoDB Compass
     use dmpschool
     db.admins.insertOne({
       name: "Admin",
       email: "admin@dmpschool.com",
       password: "<hashed-password>", // Hash using bcrypt
       role: "super_admin",
       isActive: true
     })
     ```

## Step 2: Frontend Deployment (Vercel)

1. **Update Environment Variables**
   - Create `.env` file in frontend folder:
     ```
     VITE_API_URL=https://dmps-backend.onrender.com/api
     ```

2. **Deploy on Vercel**
   - Install Vercel CLI: `npm i -g vercel`
   - Navigate to frontend folder: `cd frontend`
   - Run: `vercel`
   - Follow prompts:
     - Set root directory: `frontend`
     - Build command: `npm run build`
     - Output directory: `dist`
     - Add environment variable:
       - `VITE_API_URL`: `https://dmps-backend.onrender.com/api`
   - Or use Vercel Dashboard:
     - Go to https://vercel.com
     - Click "New Project"
     - Import GitHub repository
     - Set Root Directory to `frontend`
     - Set Build Command: `npm run build`
     - Set Output Directory: `dist`
     - Add Environment Variable:
       - Name: `VITE_API_URL`
       - Value: `https://dmps-backend.onrender.com/api`
     - Click "Deploy"

3. **Update Backend CORS**
   - Update `FRONTEND_URL` in Render environment variables to your Vercel URL
   - Restart the backend service

## Step 3: Domain Setup (Optional)

1. **Backend Domain**
   - In Render, go to Settings > Custom Domain
   - Add your domain (e.g., api.dmpschool.com)
   - Update DNS records as instructed

2. **Frontend Domain**
   - In Vercel, go to Project Settings > Domains
   - Add your domain (e.g., www.dmpschool.com)
   - Update DNS records as instructed

3. **Update Environment Variables**
   - Update `FRONTEND_URL` in backend with new domain
   - Update `VITE_API_URL` in frontend with new backend domain

## Step 4: Post-Deployment Checklist

- [ ] Backend is accessible and healthy
- [ ] Frontend is accessible
- [ ] Admin login works
- [ ] MongoDB connection is active
- [ ] Image uploads work (Cloudinary)
- [ ] Email sending works (Nodemailer)
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] SSL certificates are active (Vercel/Render provide automatically)

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB IP whitelist includes Render IPs
- Check JWT_SECRET is set

### Frontend Issues
- Check Vercel build logs
- Verify `VITE_API_URL` is correct
- Check browser console for CORS errors
- Ensure backend is running and accessible

### Database Issues
- Verify MongoDB connection string
- Check database user permissions
- Ensure IP whitelist includes necessary IPs

## Support

For issues or questions, check:
- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com






