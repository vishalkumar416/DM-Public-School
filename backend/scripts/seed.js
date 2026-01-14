import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.model.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@dmpschool.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@dmpschool.com',
      password: 'Admin@123', // Change this after first login
      role: 'super_admin',
      isActive: true
    });

    console.log('✅ Default admin created:');
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: Admin@123`);
    console.log('⚠️  Please change the password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();





