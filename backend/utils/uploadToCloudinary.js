import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// Lazy configuration - only configure when needed
let isConfigured = false;

const configureCloudinary = () => {
  if (isConfigured) return;
  
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  };

  // Validate Cloudinary configuration
  if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    console.error('❌ Cloudinary configuration missing!');
    console.error('Required environment variables:');
    console.error('  - CLOUDINARY_CLOUD_NAME:', cloudinaryConfig.cloud_name ? '✓' : '✗ Missing');
    console.error('  - CLOUDINARY_API_KEY:', cloudinaryConfig.api_key ? '✓' : '✗ Missing');
    console.error('  - CLOUDINARY_API_SECRET:', cloudinaryConfig.api_secret ? '✓' : '✗ Missing');
    console.error('Please check your .env file in the backend directory.');
    throw new Error('Cloudinary configuration is missing. Please check your .env file.');
  }

  cloudinary.config(cloudinaryConfig);
  isConfigured = true;
  console.log('✅ Cloudinary configured successfully');
};

export const uploadToCloudinary = (buffer, folder = 'dmps') => {
  // Configure Cloudinary on first use
  configureCloudinary();
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf'],
        transformation: [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export const deleteFromCloudinary = async (publicId) => {
  // Configure Cloudinary on first use
  configureCloudinary();
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};






