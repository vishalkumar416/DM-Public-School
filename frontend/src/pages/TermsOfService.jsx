import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiFileText, FiShield, FiUsers, FiBookOpen, FiAlertCircle, FiCheckCircle, FiLock, FiMail } from 'react-icons/fi';

const TermsOfService = () => {
  const sections = [
    {
      icon: FiFileText,
      title: '1. Acceptance of Terms',
      content: `By accessing and using the D.M. Public School website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      icon: FiUsers,
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials on D.M. Public School's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to decompile or reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server`
    },
    {
      icon: FiShield,
      title: '3. User Accounts and Responsibilities',
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.

You agree not to:
• Use the service for any illegal or unauthorized purpose
• Transmit any worms, viruses, or any code of a destructive nature
• Violate any laws in your jurisdiction
• Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity`
    },
    {
      icon: FiBookOpen,
      title: '4. Admission Process',
      content: `The admission process is subject to the school's admission policy and availability of seats. Submission of an admission form does not guarantee admission. The school reserves the right to:
      
• Accept or reject any application without assigning any reason
• Modify admission criteria and procedures
• Cancel or postpone admission processes due to unforeseen circumstances

All information provided during the admission process must be accurate and truthful. Providing false information may result in cancellation of admission.`
    },
    {
      icon: FiAlertCircle,
      title: '5. Fee Payment and Refund Policy',
      content: `All fees are payable as per the schedule provided by the school. Fees once paid are generally non-refundable except in cases specified by the school's fee policy.

• Fee payments must be made through authorized channels only
• The school reserves the right to modify fee structures with prior notice
• Late payment may attract penalties as per school policy
• Refund requests must be submitted in writing and will be processed as per school policy`
    },
    {
      icon: FiLock,
      title: '6. Intellectual Property',
      content: `All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of D.M. Public School and is protected by copyright and other intellectual property laws.

You may not:
• Reproduce, distribute, or create derivative works from the content
• Use the school's name, logo, or trademarks without prior written permission
• Remove or alter any copyright notices`
    },
    {
      icon: FiUsers,
      title: '7. Privacy and Data Protection',
      content: `Your use of this website is also governed by our Privacy Policy. We collect and process personal information in accordance with applicable data protection laws. By using our services, you consent to the collection and use of information as described in our Privacy Policy.`
    },
    {
      icon: FiAlertCircle,
      title: '8. Limitation of Liability',
      content: `D.M. Public School shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website or services.`
    },
    {
      icon: FiFileText,
      title: '9. Modifications to Terms',
      content: `D.M. Public School reserves the right to modify these terms at any time. We will notify users of any changes by posting the new terms on this page. Your continued use of the website after such modifications constitutes acceptance of the updated terms.`
    },
    {
      icon: FiShield,
      title: '10. Governing Law',
      content: `These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Vaishali, Bihar.`
    },
    {
      icon: FiMail,
      title: '11. Contact Information',
      content: `For any questions or concerns regarding these Terms of Service, please contact us at:

D.M. Public School
Garahi, Desari, Vaishali, Bihar - 844504
Phone: 7352737650
Email: aartikumari05032002@gmail.com`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service - D.M. Public School</title>
        <meta name="description" content="Terms of Service for D.M. Public School website and services" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                <FiFileText size={40} className="text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Terms of Service</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-3 font-light">Legal Agreement for Website Usage</p>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <FiCheckCircle size={16} />
              <span>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Introduction Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 bg-gradient-to-br from-primary-50 to-white rounded-3xl shadow-xl p-8 md:p-10 border border-primary-100"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiShield className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">Welcome to D.M. Public School</h2>
                  <p className="text-secondary-700 leading-relaxed text-lg">
                    These Terms of Service ("Terms") govern your access to and use of our website, services, and any related applications. 
                    By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                      {/* Section Header */}
                      <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Icon className="text-white" size={28} />
                          </div>
                          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                        </div>
                      </div>
                      
                      {/* Section Content */}
                      <div className="p-6 md:p-8">
                        <div className="prose prose-lg max-w-none">
                          <p className="text-secondary-700 leading-relaxed text-base whitespace-pre-line">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Final Notice Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-3xl shadow-xl p-8 md:p-10 border-2 border-green-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiCheckCircle className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-900 mb-3">Agreement to Terms</h3>
                  <p className="text-green-800 font-semibold mb-2 text-lg">
                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                  <p className="text-green-700 text-base">
                    If you have any questions about these Terms, please contact us using the information provided in Section 11.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService;
