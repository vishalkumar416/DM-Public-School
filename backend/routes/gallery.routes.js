import express from 'express';
import Gallery from '../models/Gallery.model.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadMultiple, uploadFields } from '../middleware/upload.middleware.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

const router = express.Router();

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, isActive = true } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) {
      // Handle both string and boolean values
      filter.isActive = isActive === 'true' || isActive === true;
    } else {
      filter.isActive = true; // Default to active galleries for public
    }

    const galleries = await Gallery.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .populate('createdBy', 'name email');

    res.json({
      success: true,
      count: galleries.length,
      galleries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    res.json({
      success: true,
      gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/gallery
// @desc    Create gallery item
// @access  Private (Admin only)
router.post('/', protect, authorize('admin', 'super_admin'), uploadFields([
  { name: 'images', maxCount: 20 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description, category, date, videoUrl, type } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title and category are required'
      });
    }

    const galleryType = type || (videoUrl ? 'video' : 'photo');

    // For videos, require videoUrl
    if (galleryType === 'video') {
      if (!videoUrl) {
        return res.status(400).json({
          success: false,
          message: 'Video URL is required for video galleries'
        });
      }

      // Handle thumbnail: use uploaded thumbnail if provided, otherwise generate from video URL
      let thumbnail = '';
      
      // Check if thumbnail was uploaded
      if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
        try {
          const thumbnailResult = await uploadToCloudinary(req.files.thumbnail[0].buffer, 'dmps/gallery/thumbnails');
          thumbnail = thumbnailResult.secure_url;
        } catch (error) {
          console.error('Thumbnail upload error:', error);
          // Fall back to auto-generated thumbnail if upload fails
        }
      }
      
      // Generate thumbnail from video URL if no custom thumbnail was uploaded
      if (!thumbnail) {
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          const videoId = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
          if (videoId) {
            thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          }
        } else if (videoUrl.includes('vimeo.com')) {
          const videoId = videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
          if (videoId) {
            // Vimeo thumbnail API (requires API key, using placeholder for now)
            thumbnail = `https://vumbnail.com/${videoId}.jpg`;
          }
        }
      }

      const galleryData = {
        title,
        description,
        category,
        videoUrl,
        thumbnail,
        type: 'video',
        images: [],
        date: date ? new Date(date) : new Date(),
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
        createdBy: req.admin._id
      };

      const gallery = await Gallery.create(galleryData);

      return res.status(201).json({
        success: true,
        gallery
      });
    }

    // For photos, require images
    const photoImageFiles = req.files?.images || [];
    if (galleryType === 'photo' && (!photoImageFiles || photoImageFiles.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required for photo galleries'
      });
    }

    // Upload images to Cloudinary
    const images = [];
    let thumbnail = '';

    // Handle images array (req.files.images when using uploadFields)
    const filesArray = Array.isArray(photoImageFiles) ? photoImageFiles : (photoImageFiles.length ? [photoImageFiles] : []);

    for (let i = 0; i < filesArray.length; i++) {
      try {
        const result = await uploadToCloudinary(filesArray[i].buffer, 'dmps/gallery');
        images.push({
          url: result.secure_url,
          cloudinaryId: result.public_id
        });

        // Set first image as thumbnail
        if (i === 0) {
          thumbnail = result.secure_url;
        }
      } catch (error) {
        console.error('Image upload error:', error);
        return res.status(500).json({
          success: false,
          message: 'Error uploading images'
        });
      }
    }

    const galleryData = {
      title,
      description,
      category,
      images,
      thumbnail,
      type: 'photo',
      videoUrl: '',
      date: date ? new Date(date) : new Date(),
      isActive: req.body.isActive !== undefined ? req.body.isActive : true, // Ensure isActive is set
      createdBy: req.admin._id
    };

    const gallery = await Gallery.create(galleryData);

    res.status(201).json({
      success: true,
      gallery
    });
  } catch (error) {
    console.error('Gallery creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating gallery'
    });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private (Admin only)
router.put('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    res.json({
      success: true,
      gallery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating gallery'
    });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: 'Gallery not found'
      });
    }

    // Delete images from Cloudinary
    try {
      for (const image of gallery.images) {
        if (image.cloudinaryId) {
          await deleteFromCloudinary(image.cloudinaryId);
        }
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      // Continue with deletion even if Cloudinary delete fails
    }

    await gallery.deleteOne();

    res.json({
      success: true,
      message: 'Gallery deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;






