import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm here to help you with information about D.M. Public School. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // School information database
  const schoolInfo = {
    address: "D.M. Public School, Garahi, Desari, Vaishali, Bihar - Located 500 meters west from Imli Chowk",
    phone: "7352737650",
    email: "aartikumari05032002@gmail.com",
    established: "2020",
    affiliation: "Bihar Government",
    curriculum: "NCERT",
    classes: "Nursery to Class X",
    admission: "You can apply for admission through our online admission form. Visit the Admissions page for more details.",
    facilities: "Modern classrooms, Science labs, Computer lab, Library, Sports facilities, Playground, and more.",
    principal: "Our Principal leads with dedication and commitment to excellence in education.",
    director: "Our Director provides visionary leadership for the school's growth and development.",
    timings: "School hours: 8:00 AM to 3:00 PM (Monday to Saturday)",
    fees: "For detailed fee structure, please contact the school office or visit during office hours.",
    contact: "You can reach us at: Phone - 7352737650, Email - aartikumari05032002@gmail.com, or visit us at the school campus.",
  };

  // Keywords and responses
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/i)) {
      return "Hello! How can I help you today? 😊";
    }
    
    // Address/Location
    if (message.match(/(address|location|where|place|located)/i)) {
      return `📍 ${schoolInfo.address}`;
    }
    
    // Phone/Contact
    if (message.match(/(phone|contact|number|call|mobile)/i)) {
      return `📞 Contact us at: ${schoolInfo.phone}\n📧 Email: ${schoolInfo.email}`;
    }
    
    // Admission
    if (message.match(/(admission|admit|enroll|apply|registration|join)/i)) {
      return `📝 ${schoolInfo.admission}\n\nYou can fill out the admission form online or visit our school office during working hours.`;
    }
    
    // Fees
    if (message.match(/(fee|fees|cost|price|payment|tuition)/i)) {
      return `💰 ${schoolInfo.fees}\n\nFor detailed information, please contact the school office at ${schoolInfo.phone}.`;
    }
    
    // Classes/Grades
    if (message.match(/(class|grade|standard|level|nursery|kg)/i)) {
      return `📚 We offer education from ${schoolInfo.classes}.\n\nOur curriculum follows ${schoolInfo.curriculum} guidelines under ${schoolInfo.affiliation}.`;
    }
    
    // Curriculum
    if (message.match(/(curriculum|syllabus|subjects|cbse|ncert|course)/i)) {
      return `📖 We follow the ${schoolInfo.curriculum} curriculum under ${schoolInfo.affiliation}.\n\nOur curriculum focuses on holistic development, critical thinking, and academic excellence.`;
    }
    
    // Facilities
    if (message.match(/(facilities|facility|infrastructure|lab|labs|library|sports|playground)/i)) {
      return `🏫 ${schoolInfo.facilities}\n\nWe continuously upgrade our facilities to provide the best learning environment.`;
    }
    
    // Principal
    if (message.match(/(principal|head|headmaster)/i)) {
      return `👨‍🏫 ${schoolInfo.principal}\n\nOur Principal is dedicated to ensuring quality education and student success.`;
    }
    
    // Director
    if (message.match(/(director|management|owner)/i)) {
      return `👔 ${schoolInfo.director}\n\nOur Director provides strategic leadership and vision for the school.`;
    }
    
    // Timings
    if (message.match(/(time|timing|hours|when|open|close)/i)) {
      return `🕐 ${schoolInfo.timings}\n\nOffice hours: 9:00 AM to 5:00 PM (Monday to Saturday)`;
    }
    
    // Established
    if (message.match(/(established|start|founded|since|year)/i)) {
      return `📅 D.M. Public School was established in ${schoolInfo.established}.\n\nWe are committed to providing quality education in the region.`;
    }
    
    // Help
    if (message.match(/(help|assist|support|what can you|what do you)/i)) {
      return `I can help you with:\n\n📍 School address and location\n📞 Contact information\n📝 Admission process\n💰 Fee structure\n📚 Classes and curriculum\n🏫 Facilities\n🕐 School timings\n\nJust ask me anything! 😊`;
    }
    
    // Default responses
    const defaultResponses = [
      "I'm here to help! Could you please rephrase your question? You can ask me about admissions, contact info, facilities, or any other school-related queries.",
      "That's a great question! For more specific information, please contact our school office at " + schoolInfo.phone + " or visit us during office hours.",
      "I'd be happy to help! You can ask me about:\n- School address and contact\n- Admission process\n- Classes and curriculum\n- Facilities\n- School timings",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-110 active:scale-95 overflow-visible group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Robot in Speech Bubble Icon */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                {/* Speech Bubble (Blue - using white since button is blue) */}
                <circle cx="20" cy="18" r="14" fill="white" stroke="white" strokeWidth="1.5" opacity="0.95"/>
                <path d="M 8 28 L 12 24 L 8 24 Z" fill="white" opacity="0.95"/>
                
                {/* Robot Head (Light Grey) */}
                <rect x="13" y="10" width="14" height="12" rx="2" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.5"/>
                
                {/* Robot Face/Screen (Dark Grey) */}
                <rect x="14.5" y="11.5" width="11" height="9" rx="1" fill="#374151"/>
                
                {/* Robot Eyes (Light Blue) */}
                <ellipse cx="17" cy="15" rx="2" ry="1.5" fill="#60A5FA"/>
                <ellipse cx="23" cy="15" rx="2" ry="1.5" fill="#60A5FA"/>
                
                {/* Robot Smile (Light Blue) */}
                <path d="M 17 18 Q 20 19.5 23 18" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                
                {/* Robot Headphones */}
                <circle cx="11" cy="14" r="3" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.5"/>
                <circle cx="29" cy="14" r="3" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.5"/>
                <path d="M 11 14 L 29 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Robot Torso (Light Grey) */}
                <rect x="15" y="22" width="10" height="4" rx="1" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.5"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <>
            {/* Notification Badge */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Subtle Pulsing Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </>
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-md h-[calc(100vh-8rem)] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-secondary-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Speech Bubble */}
                      <circle cx="20" cy="18" r="14" fill="white" opacity="0.9"/>
                      <path d="M 8 28 L 12 24 L 8 24 Z" fill="white" opacity="0.9"/>
                      
                      {/* Robot Head */}
                      <rect x="13" y="10" width="14" height="12" rx="2" fill="#E5E7EB"/>
                      
                      {/* Robot Face/Screen */}
                      <rect x="14.5" y="11.5" width="11" height="9" rx="1" fill="#374151"/>
                      
                      {/* Robot Eyes */}
                      <ellipse cx="17" cy="15" rx="2" ry="1.5" fill="#60A5FA"/>
                      <ellipse cx="23" cy="15" rx="2" ry="1.5" fill="#60A5FA"/>
                      
                      {/* Robot Smile */}
                      <path d="M 17 18 Q 20 19.5 23 18" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                      
                      {/* Robot Headphones */}
                      <circle cx="11" cy="14" r="3" fill="#E5E7EB"/>
                      <circle cx="29" cy="14" r="3" fill="#E5E7EB"/>
                      <path d="M 11 14 L 29 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
                      
                      {/* Robot Torso */}
                      <rect x="15" y="22" width="10" height="4" rx="1" fill="#E5E7EB"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">School Assistant</h3>
                    <p className="text-xs text-white/80">D.M. Public School</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-secondary-50 to-white">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-primary-100 text-primary-600'
                        }`}
                      >
                        {message.sender === 'user' ? (
                          <FiUser size={16} />
                        ) : (
                          <FiMessageSquare size={16} />
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white rounded-tr-sm'
                            : 'bg-white text-secondary-900 border border-secondary-200 rounded-tl-sm shadow-soft'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.text}
                        </p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                        <FiMessageSquare size={16} />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-secondary-200 shadow-soft">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-secondary-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-secondary-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-secondary-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-secondary-200 bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-secondary-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white text-secondary-900 placeholder:text-secondary-400"
                  />
                  <motion.button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiSend size={20} />
                  </motion.button>
                </div>
                <p className="text-xs text-secondary-500 mt-2 text-center">
                  Ask me about admissions, contact info, facilities, and more!
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

