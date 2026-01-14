import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/contact', formData);
      if (response.data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Address',
      content: (
        <>
          D.M. Public School<br />
          Garahi, Desari, Vaishali<br />
          Bihar – 844504<br />
          500 meters west from Imli Chowk
        </>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: (
        <a href="tel:7352737650" className="hover:text-primary-600 transition-colors">
          7352737650
        </a>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      icon: FiMail,
      title: 'Email',
      content: (
        <a href="mailto:info@dmpschool.com" className="hover:text-primary-600 transition-colors">
          info@dmpschool.com
        </a>
      ),
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - D.M. Public School</title>
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
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light">
                Get in Touch with Us
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="card text-center group"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-soft`}
                  >
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-secondary-900">{info.title}</h3>
                  <p className="text-secondary-600 leading-relaxed">{info.content}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <FiMessageSquare className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-secondary-900">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label">
                    <FiUser className="inline mr-2" size={16} />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="label">
                    <FiMail className="inline mr-2" size={16} />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="label">
                    <FiPhone className="inline mr-2" size={16} />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Map */}
              <div className="card p-0 overflow-hidden">
                <div className="h-64 bg-secondary-200 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.5!2d85.38!3d25.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDQ2JzQ4LjAiTiA4NcKwMjInNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="D.M. Public School Location"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>

              {/* Leadership Info */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-6 text-secondary-900">Leadership</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary-200 flex-shrink-0 shadow-soft">
                      <img
                        src="/director.jpeg"
                        alt="Mr. Saurav Kumar - Director"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center hidden">
                        <span className="text-white font-bold text-lg">SK</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-secondary-900">Director</p>
                      <p className="text-secondary-600">Mr. Saurav Kumar</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-green-200 flex-shrink-0 shadow-soft">
                      <img
                        src="/principle.jpeg"
                        alt="Er. Pooja Kumari - Principal"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center hidden">
                        <span className="text-white font-bold text-lg">PK</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-secondary-900">Principal</p>
                      <p className="text-secondary-600">Er. Pooja Kumari</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="card">
                <h3 className="text-2xl font-bold mb-4 text-secondary-900">Office Hours</h3>
                <div className="space-y-2 text-secondary-700">
                  <p><span className="font-semibold">Monday - Friday:</span> 8:00 AM - 4:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 8:00 AM - 1:00 PM</p>
                  <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
