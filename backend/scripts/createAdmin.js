import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.model.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@dmpschool.com' });

    if (existingAdmin) {
      console.log('⚠️  Admin already exists');
      console.log('   Email:', existingAdmin.email);
      console.log('   Name:', existingAdmin.name);
      console.log('   Role:', existingAdmin.role);
      console.log('   Is Active:', existingAdmin.isActive);
      
      // Reset password if needed
      console.log('\n🔄 Resetting password...');
      existingAdmin.password = 'Admin@123';
      await existingAdmin.save();
      console.log('✅ Password reset to: Admin@123');
      
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create default admin
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@dmpschool.com',
      password: 'Admin@123',
      role: 'super_admin',
      isActive: true
    });

    console.log('✅ Default admin created:');
    console.log('   Email:', admin.email);
    console.log('   Password: Admin@123');
    console.log('   Role: super_admin');
    console.log('⚠️  Please change the password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    if (error.code === 11000) {
      console.error('   Duplicate email - admin may already exist');
    }
    process.exit(1);
  }
};

createAdmin();




