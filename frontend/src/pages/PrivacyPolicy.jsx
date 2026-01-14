import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiDatabase, FiUser, FiMail, FiAlertCircle, FiCheckCircle, FiKey } from 'react-icons/fi';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: FiShield,
      title: '1. Introduction',
      content: `D.M. Public School ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.

By using our website, you consent to the data practices described in this policy. If you do not agree with the data practices described in this Privacy Policy, you should not use our website.`
    },
    {
      icon: FiDatabase,
      title: '2. Information We Collect',
      content: `We collect information that you provide directly to us and information that is automatically collected when you use our services.

**Information You Provide:**
• Personal identification information (name, email address, phone number)
• Student information (for admission applications)
• Parent/guardian information
• Academic records and documents
• Payment information (processed securely through third-party payment processors)

**Automatically Collected Information:**
• Device information (IP address, browser type, operating system)
• Usage data (pages visited, time spent, links clicked)
• Cookies and similar tracking technologies`
    },
    {
      icon: FiEye,
      title: '3. How We Use Your Information',
      content: `We use the information we collect for various purposes, including:

• **Admission Processing:** To process and evaluate admission applications
• **Communication:** To send you updates, notifications, and respond to your inquiries
• **Service Improvement:** To analyze usage patterns and improve our website and services
• **Legal Compliance:** To comply with applicable laws, regulations, and legal processes
• **Security:** To protect the security and integrity of our services
• **Marketing:** To send you promotional materials (with your consent) about school events and activities`
    },
    {
      icon: FiLock,
      title: '4. Data Security',
      content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

• Encryption of sensitive data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication procedures
• Secure data storage and backup systems

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.`
    },
    {
      icon: FiUser,
      title: '5. Information Sharing and Disclosure',
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

• **With Your Consent:** When you have given us explicit permission to share your information
• **Service Providers:** With trusted third-party service providers who assist us in operating our website and conducting our business (e.g., payment processors, email services)
• **Legal Requirements:** When required by law, court order, or governmental authority
• **School Operations:** With school staff and administrators for legitimate educational purposes
• **Protection of Rights:** To protect the rights, property, or safety of the school, students, or others`
    },
    {
      icon: FiKey,
      title: '6. Cookies and Tracking Technologies',
      content: `We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.

**Types of Cookies We Use:**
• **Essential Cookies:** Required for the website to function properly
• **Analytics Cookies:** Help us understand how visitors interact with our website
• **Preference Cookies:** Remember your preferences and settings

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.`
    },
    {
      icon: FiUser,
      title: '7. Your Rights and Choices',
      content: `You have certain rights regarding your personal information:

• **Access:** You can request access to the personal information we hold about you
• **Correction:** You can request correction of inaccurate or incomplete information
• **Deletion:** You can request deletion of your personal information (subject to legal and operational requirements)
• **Objection:** You can object to certain processing of your personal information
• **Data Portability:** You can request a copy of your data in a structured format
• **Withdraw Consent:** You can withdraw your consent at any time where we rely on consent to process your information

To exercise these rights, please contact us using the information provided in the "Contact Us" section.`
    },
    {
      icon: FiLock,
      title: '8. Children\'s Privacy',
      content: `Our services are designed for use by parents, guardians, and students. We take special care to protect the privacy of children:

• We collect information about children only with parental consent
• We limit the collection of personal information from children to what is necessary for educational purposes
• We do not knowingly collect personal information from children under the age of 13 without parental consent
• Parents have the right to review, delete, or refuse further collection of their child's information

If you believe we have collected information from a child without proper consent, please contact us immediately.`
    },
    {
      icon: FiAlertCircle,
      title: '9. Data Retention',
      content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

• **Admission Records:** Retained for the duration of the student's enrollment and as required by educational regulations
• **Website Usage Data:** Retained for analytical purposes, typically for up to 2 years
• **Communication Records:** Retained for as long as necessary to respond to inquiries and maintain records

When we no longer need your information, we will securely delete or anonymize it.`
    },
    {
      icon: FiCheckCircle,
      title: '10. Third-Party Links',
      content: `Our website may contain links to third-party websites or services that are not owned or controlled by D.M. Public School. We are not responsible for the privacy practices of these third-party sites.

We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected by our website.`
    },
    {
      icon: FiShield,
      title: '11. Changes to This Privacy Policy',
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`
    },
    {
      icon: FiMail,
      title: '12. Contact Us',
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

**D.M. Public School**
Garahi, Desari, Vaishali, Bihar - 844504
Phone: 7352737650
Email: aartikumari05032002@gmail.com

**Data Protection Officer:**
For privacy-related inquiries, you can also contact our Data Protection Officer at the above address or email.`
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - D.M. Public School</title>
        <meta name="description" content="Privacy Policy for D.M. Public School - How we collect, use, and protect your personal information" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                <FiShield size={40} className="text-white" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-3 font-light">Your Privacy Matters to Us</p>
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
              className="mb-12 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-10 border border-indigo-100"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiLock className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 mb-2">Our Commitment to Privacy</h2>
                  <p className="text-secondary-700 leading-relaxed text-lg">
                    At D.M. Public School, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Privacy Sections */}
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
                      <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 p-6">
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
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-xl p-8 md:p-10 border-2 border-indigo-200"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FiShield className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-3">Your Privacy is Protected</h3>
                  <p className="text-indigo-800 font-semibold mb-2 text-lg">
                    Your privacy is important to us, and we are committed to protecting your personal information.
                  </p>
                  <p className="text-indigo-700 text-base">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please do not hesitate to contact us using the information provided in Section 12.
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

export default PrivacyPolicy;
