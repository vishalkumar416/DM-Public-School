import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const testLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected\n');

    // Find admin
    const admin = await Admin.findOne({ email: 'admin@dmpschool.com' }).select('+password');
    
    if (!admin) {
      console.log('❌ Admin not found!');
      console.log('Creating admin account...\n');
      
      const newAdmin = await Admin.create({
        name: 'Admin',
        email: 'admin@dmpschool.com',
        password: 'Admin@123',
        role: 'super_admin',
        isActive: true
      });
      
      console.log('✅ Admin created successfully!');
      console.log('   Email:', newAdmin.email);
      console.log('   Password: Admin@123\n');
    } else {
      console.log('✅ Admin found:');
      console.log('   Email:', admin.email);
      console.log('   Name:', admin.name);
      console.log('   Role:', admin.role);
      console.log('   Is Active:', admin.isActive);
      console.log('   Has Password:', !!admin.password);
      
      // Test password
      console.log('\n🔐 Testing password...');
      const testPassword = 'Admin@123';
      const isMatch = await admin.comparePassword(testPassword);
      
      if (isMatch) {
        console.log('✅ Password matches!');
      } else {
        console.log('❌ Password does NOT match!');
        console.log('Resetting password...');
        admin.password = 'Admin@123';
        await admin.save();
        console.log('✅ Password reset to: Admin@123');
      }
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

testLogin();





