import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiImage, FiX, FiPlay, FiVideo, FiCalendar, FiFlag, FiGift, FiMusic, FiChevronLeft, FiChevronRight, FiMaximize2, FiMinimize2, FiDownload } from 'react-icons/fi';
import api from '../utils/api';

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'photos', 'videos'

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await api.get('/gallery?isActive=true');
      const allGalleries = response.data.galleries || [];
      setGalleries(allGalleries);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (album, imageIndex = 0) => {
    setSelectedAlbum(album);
    setSelectedImageIndex(imageIndex);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    setSelectedImageIndex(0);
    setIsZoomed(false);
  };

  const nextImage = () => {
    if (selectedAlbum && selectedAlbum.images && selectedAlbum.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev < selectedAlbum.images.length - 1 ? prev + 1 : 0
      );
      setIsZoomed(false);
    }
  };

  const prevImage = () => {
    if (selectedAlbum && selectedAlbum.images && selectedAlbum.images.length > 0) {
      setSelectedImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedAlbum.images.length - 1
      );
      setIsZoomed(false);
    }
  };

  const handleKeyPress = (e) => {
    if (!selectedAlbum) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
  };

  useEffect(() => {
    if (selectedAlbum) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedAlbum, selectedImageIndex]);

  // Sample videos - Replace these with your actual video URLs
  const videos = [
    {
      id: 'video-1',
      title: 'Annual Day Celebration 2024',
      category: 'Annual Day',
      thumbnail: '/videos/annual-day-thumb.jpg',
      videoUrl: '', // Add your YouTube/Vimeo URL or video file URL here
      description: 'Highlights from our Annual Day celebration featuring performances, awards, and cultural programs.',
      date: '2024',
      type: 'video',
    },
    {
      id: 'video-2',
      title: 'Republic Day Parade 2024',
      category: 'Republic Day',
      thumbnail: '/videos/republic-day-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Students participating in the Republic Day parade and cultural programs.',
      date: 'January 2024',
      type: 'video',
    },
    {
      id: 'video-3',
      title: 'Birthday Celebration - Principal',
      category: 'Birthday',
      thumbnail: '/videos/birthday-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Special birthday celebration for our Principal with students and staff.',
      date: '2024',
      type: 'video',
    },
    {
      id: 'video-4',
      title: 'Dance Performance - Annual Day',
      category: 'Dance',
      thumbnail: '/videos/dance-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Beautiful dance performance by our students during Annual Day celebrations.',
      date: '2024',
      type: 'video',
    },
    {
      id: 'video-5',
      title: 'Annual Day - Cultural Programs',
      category: 'Annual Day',
      thumbnail: '/videos/annual-day-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Various cultural programs and performances from Annual Day.',
      date: '2024',
      type: 'video',
    },
    {
      id: 'video-6',
      title: 'Republic Day - Flag Hoisting',
      category: 'Republic Day',
      thumbnail: '/videos/republic-day-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Flag hoisting ceremony and patriotic performances.',
      date: 'January 2024',
      type: 'video',
    },
  ];

  // Default gallery categories with placeholder images
  const defaultGalleries = [
    {
      _id: 'default-events',
      title: 'School Events',
      description: 'Annual Day, Sports Day, and other special events',
      category: 'Events',
      thumbnail: '/gallery-events.jpg',
      images: [],
      type: 'photo',
    },
    {
      _id: 'default-sports',
      title: 'Sports Activities',
      description: 'Inter-school competitions and sports activities',
      category: 'Sports',
      thumbnail: '/gallery-sports.jpg',
      images: [],
      type: 'photo',
    },
    {
      _id: 'default-academics',
      title: 'Academic Excellence',
      description: 'Science exhibitions, competitions, and academic achievements',
      category: 'Academics',
      thumbnail: '/gallery-academics.jpg',
      images: [],
      type: 'photo',
    },
    {
      _id: 'default-infrastructure',
      title: 'School Infrastructure',
      description: 'Classrooms, labs, library, and other facilities',
      category: 'Infrastructure',
      thumbnail: '/gallery-infrastructure.jpg',
      images: [],
      type: 'photo',
    },
    {
      _id: 'default-annual',
      title: 'Annual Day Celebration',
      description: 'Annual day performances and celebrations',
      category: 'Events',
      thumbnail: '/gallery-annual.jpg',
      images: [],
      type: 'photo',
    },
    {
      _id: 'default-students',
      title: 'Student Activities',
      description: 'Student achievements and daily activities',
      category: 'Students',
      thumbnail: '/gallery-students.jpg',
      images: [],
      type: 'photo',
    },
  ];

  // Separate photos and videos from API
  const displayGalleries = galleries.filter(g => !g.type || g.type === 'photo');
  const apiVideos = galleries.filter(g => g.type === 'video' && g.videoUrl && g.videoUrl.trim() !== '');

  // Only include hardcoded videos that have actual videoUrls
  const validHardcodedVideos = videos.filter(v => v.videoUrl && v.videoUrl.trim() !== '');
  
  // Combine API videos with valid hardcoded videos
  const allVideos = [...apiVideos, ...validHardcodedVideos];
  const allItems = [...displayGalleries, ...allVideos];

  // Filter items based on active tab
  const filteredItems = activeTab === 'all' 
    ? allItems 
    : activeTab === 'photos' 
    ? displayGalleries 
    : allVideos;

  // Function to get YouTube embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url.includes('embed') ? url : '';
  };

  // Function to get Vimeo embed URL
  const getVimeoEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  };

  const getVideoEmbedUrl = (videoUrl) => {
    if (!videoUrl) return '';
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      return getYouTubeEmbedUrl(videoUrl);
    } else if (videoUrl.includes('vimeo.com')) {
      return getVimeoEmbedUrl(videoUrl);
    }
    return videoUrl; // Direct video file URL
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Helmet>
        <title>Gallery - D.M. Public School</title>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary-300 via-primary-400 to-primary-500 text-white relative overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary-600/20"></div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                Gallery
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Photos and Videos of Our School Events and Activities
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Filter */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Tab Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-8 sm:mb-12"
            >
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft'
                }`}
              >
                <span>All</span>
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'photos'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft'
                }`}
              >
                <FiImage size={18} className="sm:w-5 sm:h-5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center justify-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                    : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft'
                }`}
              >
                <FiVideo size={18} className="sm:w-5 sm:h-5" />
                <span>Videos</span>
              </button>
            </motion.div>

            {/* Category Filter for Videos */}
            {activeTab === 'videos' && allVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                  {[
                    { label: 'All Videos', icon: FiVideo },
                    { label: 'Annual Day', icon: FiCalendar },
                    { label: 'Republic Day', icon: FiFlag },
                    { label: 'Birthday Celebrations', icon: FiGift },
                    { label: 'Dance Videos', icon: FiMusic }
                  ].map((category) => {
                    const Icon = category.icon;
                    const isActive = category.label === 'All Videos';
                    return (
                      <button
                        key={category.label}
                        className={`flex items-center justify-center space-x-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap min-w-fit ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                            : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200 hover:border-primary-300 shadow-soft'
                        }`}
                      >
                        <Icon size={16} className="sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{category.label}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Gallery Grid */}
            {loading ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-secondary-600">Loading gallery...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item._id || item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    onClick={() => item.type === 'video' ? openVideo(item) : openLightbox(item, 0)}
                    className="card overflow-hidden cursor-pointer group relative"
                  >
                    {/* Video or Photo Thumbnail */}
                    {item.thumbnail ? (
                      <div className="h-64 w-full overflow-hidden bg-gradient-to-br from-secondary-200 to-secondary-300 relative">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          style={{ objectPosition: 'center' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center hidden">
                          {item.type === 'video' ? (
                            <FiVideo className="text-secondary-400" size={48} />
                          ) : (
                            <FiImage className="text-secondary-400" size={48} />
                          )}
                        </div>
                        {/* Play Button Overlay for Videos */}
                        {item.type === 'video' && (
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-large">
                              <FiPlay className="text-primary-600 ml-1" size={32} />
                            </div>
                          </div>
                        )}
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 backdrop-blur-sm rounded-lg text-xs font-semibold ${
                            item.type === 'video' 
                              ? 'bg-red-500/90 text-white' 
                              : 'bg-white/90 text-secondary-900'
                          }`}>
                            {item.type === 'video' ? (
                              <span className="flex items-center space-x-1">
                                <FiVideo size={12} />
                                <span>Video</span>
                              </span>
                            ) : (
                              <span className="flex items-center space-x-1">
                                <FiImage size={12} />
                                <span>Photos</span>
                              </span>
                            )}
                          </span>
                        </div>
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-secondary-900">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="h-64 bg-gradient-to-br from-secondary-200 to-secondary-300 flex items-center justify-center relative">
                        {item.type === 'video' ? (
                          <>
                            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                              <FiPlay className="text-white" size={64} />
                            </div>
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center">
                                <FiPlay className="text-primary-600 ml-1" size={32} />
                              </div>
                            </div>
                          </>
                        ) : (
                          <FiImage className="text-secondary-400" size={48} />
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-secondary-900 line-clamp-2">{item.title}</h3>
                      <p className="text-secondary-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-secondary-500 font-medium">
                          {item.type === 'video' ? (
                            <span className="flex items-center space-x-1">
                              <FiVideo size={14} />
                              <span>Watch Video</span>
                            </span>
                          ) : (
                            <span>{item.images?.length || 0} photos</span>
                          )}
                        </span>
                        {item.date && (
                          <span className="text-xs text-secondary-400">{item.date}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card text-center py-16 px-6"
              >
                <div className="max-w-md mx-auto">
                  {activeTab === 'videos' ? (
                    <>
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiVideo className="text-primary-600" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">No Videos Available</h3>
                      <p className="text-secondary-600 mb-6">Check back soon for exciting video content from our school events and celebrations.</p>
                    </>
                  ) : activeTab === 'photos' ? (
                    <>
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiImage className="text-primary-600" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">No Photos Available</h3>
                      <p className="text-secondary-600 mb-6">Check back soon for photos from our school events and activities.</p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiImage className="text-primary-600" size={40} />
                      </div>
                      <h3 className="text-xl font-bold text-secondary-900 mb-2">No Content Available</h3>
                      <p className="text-secondary-600">Check back soon for exciting content from our school.</p>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Lightbox - Professional Image Viewer */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Close"
            >
              <FiX size={24} />
            </button>

            {/* Header Info */}
            <div className="absolute top-4 left-4 z-50 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3 text-white max-w-md">
              <h2 className="text-xl font-bold mb-1">{selectedAlbum.title}</h2>
              {selectedAlbum.description && (
                <p className="text-sm text-white/80 line-clamp-2">{selectedAlbum.description}</p>
              )}
              {selectedAlbum.images && selectedAlbum.images.length > 0 && (
                <p className="text-xs text-white/70 mt-2">
                  Image {selectedImageIndex + 1} of {selectedAlbum.images.length}
                </p>
              )}
            </div>

            {/* Navigation Arrows */}
            {selectedAlbum.images && selectedAlbum.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <FiChevronRight size={28} />
                </button>
              </>
            )}

            {/* Main Image Container */}
            {selectedAlbum.images && selectedAlbum.images.length > 0 ? (
              <>
                <div
                  className="relative w-full h-full flex items-center justify-center p-4 md:p-8"
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={selectedAlbum.images[selectedImageIndex]?.url || selectedAlbum.images[selectedImageIndex]}
                      alt={`${selectedAlbum.title} - Image ${selectedImageIndex + 1}`}
                      className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl ${
                        isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                      } transition-transform duration-300`}
                      style={{
                        transform: isZoomed ? 'scale(2)' : 'scale(1)',
                      }}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                  </motion.div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-6 py-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center transition-all duration-200"
                    aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {isZoomed ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
                  </button>
                  <a
                    href={selectedAlbum.images[selectedImageIndex]?.url || selectedAlbum.images[selectedImageIndex]}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center transition-all duration-200"
                    aria-label="Download image"
                  >
                    <FiDownload size={20} />
                  </a>
                  <a
                    href={selectedAlbum.images[selectedImageIndex]?.url || selectedAlbum.images[selectedImageIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center transition-all duration-200"
                    aria-label="Open in new tab"
                  >
                    <FiMaximize2 size={20} />
                  </a>
                </div>

                {/* Thumbnail Strip */}
                {selectedAlbum.images.length > 1 && (
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-full px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedAlbum.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(index);
                            setIsZoomed(false);
                          }}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === selectedImageIndex
                              ? 'border-white scale-110 shadow-lg'
                              : 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={image.url || image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-white">
                <FiImage className="mx-auto mb-4" size={64} />
                <p className="text-xl font-semibold mb-2">No images available</p>
                <p className="text-white/70">This album doesn't contain any images yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-large"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-6 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                  <p className="text-white/90 text-sm">{selectedVideo.description}</p>
                </div>
                <button
                  onClick={closeVideo}
                  className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors ml-4"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Video Player */}
              <div className="bg-black aspect-video">
                {selectedVideo.videoUrl ? (
                  getVideoEmbedUrl(selectedVideo.videoUrl).includes('embed') || 
                  getVideoEmbedUrl(selectedVideo.videoUrl).includes('player.vimeo') ? (
                    <iframe
                      src={getVideoEmbedUrl(selectedVideo.videoUrl)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.title}
                    />
                  ) : (
                    <video
                      src={selectedVideo.videoUrl}
                      controls
                      className="w-full h-full"
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-8">
                    <FiPlay className="mb-4" size={64} />
                    <p className="text-lg mb-2">Video URL not configured</p>
                    <p className="text-sm text-white/70 text-center max-w-md">
                      Please add the video URL in the Gallery.jsx file. You can use YouTube, Vimeo, or direct video file URLs.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
