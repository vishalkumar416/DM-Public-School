import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiTrash2, FiImage, FiX, FiVideo } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../../utils/api';

const AdminGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [galleryType, setGalleryType] = useState('photo'); // 'photo' or 'video'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    videoUrl: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await api.get('/gallery?isActive=true');
      setGalleries(response.data.galleries || []);
    } catch (error) {
      toast.error('Error fetching galleries');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      videoUrl: '',
    });
    setGalleryType('photo');
    setImageFiles([]);
    setImagePreviews([]);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 20) {
      toast.error('Maximum 20 images allowed');
      return;
    }
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (galleryType === 'video') {
      if (!formData.videoUrl.trim()) {
        toast.error('Please enter a video URL');
        return;
      }
      // Validate video URL format
      const urlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com|dailymotion\.com|\.mp4|\.webm|\.ogg)/i;
      if (!urlPattern.test(formData.videoUrl)) {
        toast.error('Please enter a valid video URL (YouTube, Vimeo, or direct video link)');
        return;
      }
    } else {
      if (imageFiles.length === 0) {
        toast.error('Please select at least one image');
        return;
      }
    }

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('date', formData.date);
      submitData.append('type', galleryType);
      
      if (galleryType === 'video') {
        submitData.append('videoUrl', formData.videoUrl.trim());
        if (thumbnailFile) {
          submitData.append('thumbnail', thumbnailFile);
        }
      } else {
        imageFiles.forEach((file) => {
          submitData.append('images', file);
        });
      }

      await api.post('/gallery', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success(`${galleryType === 'video' ? 'Video' : 'Gallery'} added successfully`);
      setShowModal(false);
      fetchGalleries();
    } catch (error) {
      toast.error(error.response?.data?.message || `Error creating ${galleryType === 'video' ? 'video' : 'gallery'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success('Gallery deleted');
      fetchGalleries();
    } catch (error) {
      toast.error('Error deleting gallery');
    }
  };

  return (
    <>
      <Helmet>
        <title>Gallery - Admin Panel</title>
      </Helmet>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Gallery</h1>
          <button onClick={handleAdd} className="btn-primary flex items-center text-sm sm:text-base px-4 py-2">
            <FiPlus className="mr-2" /> Add Gallery
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="w-12 h-12 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : galleries.length > 0 ? (
            galleries.map((gallery) => (
              <div key={gallery._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {gallery.thumbnail ? (
                  <img src={gallery.thumbnail} alt={gallery.title} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <FiImage className="text-gray-400" size={48} />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold">{gallery.title}</h3>
                    {gallery.type === 'video' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium flex items-center gap-1">
                        <FiVideo size={12} /> Video
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{gallery.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                      {gallery.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {gallery.type === 'video' ? 'Video' : `${gallery.images?.length || 0} photos`}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(gallery._id)}
                    className="mt-4 text-red-600 hover:text-red-700 flex items-center"
                  >
                    <FiTrash2 className="mr-1" size={16} /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No galleries found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-4 max-h-[95vh] flex flex-col">
            <div className="bg-white border-b border-gray-200 rounded-t-2xl px-4 sm:px-5 py-3 flex justify-between items-center sticky top-0 bg-white z-10 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-bold">Add Gallery</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gallery Type *</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryType('photo');
                      setFormData({ ...formData, videoUrl: '' });
                      setThumbnailFile(null);
                      setThumbnailPreview(null);
                    }}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                      galleryType === 'photo'
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <FiImage className="inline mr-1.5" size={16} /> Photo Gallery
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setGalleryType('video');
                      setImageFiles([]);
                      setImagePreviews([]);
                      setThumbnailFile(null);
                      setThumbnailPreview(null);
                    }}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                      galleryType === 'video'
                        ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <FiVideo className="inline mr-1.5" size={16} /> Video
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field text-sm py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field text-sm py-2"
                  rows="2"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field text-sm py-2"
                  >
                    <option value="">Select Category</option>
                    <option value="Events">Events</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Annual Day">Annual Day</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input-field text-sm py-2"
                  />
                </div>
              </div>
              {galleryType === 'video' ? (
                <>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                      className="input-field text-sm py-2"
                    />
                    <p className="text-xs text-gray-500 mt-0.5">
                      YouTube, Vimeo, or direct video links
                    </p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image (Optional)</label>
                    <div className="flex items-start gap-3">
                      {thumbnailPreview ? (
                        <div className="relative flex-shrink-0">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-32 h-20 object-cover rounded-lg border-2 border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setThumbnailFile(null);
                              setThumbnailPreview(null);
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ) : null}
                      <div className="flex-1">
                        <label className="cursor-pointer">
                          <span className="btn-secondary flex items-center rounded-lg inline-block text-sm px-3 py-1.5">
                            <FiImage className="mr-1.5" size={14} /> {thumbnailPreview ? 'Change' : 'Upload Thumbnail'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setThumbnailFile(file);
                                setThumbnailPreview(URL.createObjectURL(file));
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Auto-generated if not provided
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Images * (Max 20)</label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                        >
                          <FiX size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer">
                    <span className="btn-secondary flex items-center rounded-lg text-sm px-3 py-1.5 inline-block">
                      <FiImage className="mr-1.5" size={14} /> Select Images
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">{imageFiles.length} images selected</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 border-t border-gray-200 col-span-2 sticky bottom-0 bg-white pb-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-sm px-4 py-2.5 w-full sm:w-auto">
                  {galleryType === 'video' ? 'Add Video' : 'Add Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminGallery;
