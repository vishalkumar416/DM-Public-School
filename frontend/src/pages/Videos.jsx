import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiX, FiCalendar, FiFlag, FiGift, FiMusic } from 'react-icons/fi';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Video categories with icons
  const categories = [
    { id: 'all', label: 'All Videos', icon: FiPlay },
    { id: 'annual-day', label: 'Annual Day', icon: FiCalendar },
    { id: 'republic-day', label: 'Republic Day', icon: FiFlag },
    { id: 'birthday', label: 'Birthday Celebrations', icon: FiGift },
    { id: 'dance', label: 'Dance Videos', icon: FiMusic },
  ];

  // Sample videos - Replace these with your actual video URLs
  // You can use YouTube embed URLs, Vimeo URLs, or direct video file URLs
  const videos = [
    {
      id: 1,
      title: 'Annual Day Celebration 2024',
      category: 'annual-day',
      thumbnail: '/videos/annual-day-thumb.jpg', // You can add thumbnail images
      videoUrl: 'https://www.youtube.com/watch?v=LUvYvKhjr48',
      description: 'Highlights from our Annual Day celebration featuring performances, awards, and cultural programs.',
      date: '2024',
    },
    {
      id: 2,
      title: 'Republic Day Parade 2024',
      category: 'republic-day',
      thumbnail: '/videos/republic-day-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Students participating in the Republic Day parade and cultural programs.',
      date: 'January 2024',
    },
    {
      id: 3,
      title: 'Birthday Celebration - Principal',
      category: 'birthday',
      thumbnail: '/videos/birthday-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Special birthday celebration for our Principal with students and staff.',
      date: '2024',
    },
    {
      id: 4,
      title: 'Dance Performance - Annual Day',
      category: 'dance',
      thumbnail: '/videos/dance-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Beautiful dance performance by our students during Annual Day celebrations.',
      date: '2024',
    },
    {
      id: 5,
      title: 'Annual Day - Cultural Programs',
      category: 'annual-day',
      thumbnail: '/videos/annual-day-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Various cultural programs and performances from Annual Day.',
      date: '2024',
    },
    {
      id: 6,
      title: 'Republic Day - Flag Hoisting',
      category: 'republic-day',
      thumbnail: '/videos/republic-day-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Flag hoisting ceremony and patriotic performances.',
      date: 'January 2024',
    },
    {
      id: 7,
      title: 'Student Birthday Celebration',
      category: 'birthday',
      thumbnail: '/videos/birthday-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Celebrating student birthdays with joy and enthusiasm.',
      date: '2024',
    },
    {
      id: 8,
      title: 'Folk Dance Performance',
      category: 'dance',
      thumbnail: '/videos/dance-2-thumb.jpg',
      videoUrl: '', // Add your video URL here
      description: 'Traditional folk dance performance by students.',
      date: '2024',
    },
  ];

  // Filter videos by category
  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  // Function to get YouTube embed URL from regular YouTube URL
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

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
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

  return (
    <>
      <Helmet>
        <title>Videos - D.M. Public School</title>
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
                School Videos
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Relive Our Memorable Moments and Celebrations
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-gradient-to-b from-secondary-50 to-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-medium scale-105'
                        : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-soft'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* Videos Grid */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    onClick={() => openVideo(video)}
                    className="card overflow-hidden cursor-pointer group"
                  >
                    {/* Video Thumbnail */}
                    <div className="relative h-64 bg-gradient-to-br from-secondary-200 to-secondary-300 overflow-hidden">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
                          <FiPlay className="text-white" size={64} />
                        </div>
                      )}
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-large">
                          <FiPlay className="text-primary-600 ml-1" size={32} />
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-semibold text-secondary-900">
                          {categories.find(cat => cat.id === video.category)?.label || video.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Video Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-secondary-900 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-secondary-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-secondary-500">
                        <span>{video.date}</span>
                        <span className="text-primary-500 font-medium">Watch Video →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <FiPlay className="mx-auto text-secondary-400 mb-4" size={48} />
                <p className="text-secondary-600 text-lg">No videos available in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

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
                      Please add the video URL in the Videos.jsx file. You can use YouTube, Vimeo, or direct video file URLs.
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

export default Videos;


