import multer from 'multer';

// Memory storage for Cloudinary
const storage = multer.memoryStorage();

// For temporary file storage (if Cloudinary fails)
const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed'), false);
  }
};

// Upload configuration
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

// Single file upload
export const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Multiple files upload
export const uploadMultiple = (fieldName, maxCount = 10) => {
  return upload.array(fieldName, maxCount);
};

// Multiple fields upload (for handling both images and thumbnail)
export const uploadFields = (fields) => {
  return upload.fields(fields);
};


