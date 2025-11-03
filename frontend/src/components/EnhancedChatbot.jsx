import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quick reply suggestions
  const [quickReplies, setQuickReplies] = useState([
    "📍 Find events near me",
    "♻️ Waste sorting guide",
    "🏆 Check my achievements",
    "📊 Show my impact",
    "🎯 How to participate?"
  ]);

  // Initialize chat with welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcomeMessage = {
        id: 1,
        sender: 'bot',
        text: "Hi there! 👋 I'm your eco-assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
        quickReplies: quickReplies
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update unread count when minimized
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim() && !selectedFile) return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
      file: selectedFile ? {
        name: selectedFile.name,
        preview: filePreview
      } : null
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setSelectedFile(null);
    setFilePreview(null);
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);

    // In production, replace with actual API call:
    // try {
    //   const res = await axios.post('http://localhost:5000/api/chat', {
    //     message: messageText,
    //     file: selectedFile
    //   });
    //   const botMessage = {
    //     id: messages.length + 2,
    //     sender: 'bot',
    //     text: res.data.reply,
    //     timestamp: new Date().toISOString()
    //   };
    //   setMessages(prev => [...prev, botMessage]);
    //   setIsTyping(false);
    // } catch (error) {
    //   console.error('Error:', error);
    //   setIsTyping(false);
    // }
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    let responseText = "";
    let newQuickReplies = [];

    if (lowerMessage.includes('event') || lowerMessage.includes('near')) {
      responseText = "🗺️ I found 3 cleanup events near you:\n\n1. Beach Cleanup (5km away) - Tomorrow 9 AM\n2. Park Cleanup (8km away) - This Saturday\n3. River Cleanup (12km away) - Next Sunday\n\nWould you like to enroll in any of these?";
      newQuickReplies = ["Enroll in Beach Cleanup", "Show more events", "View on map"];
    } else if (lowerMessage.includes('waste') || lowerMessage.includes('sort') || lowerMessage.includes('recycle')) {
      responseText = "♻️ Here's a quick waste sorting guide:\n\n🔵 Plastic: Bottles, bags, containers\n🟡 Paper: Newspapers, cardboard\n⚪ Metal: Cans, foil\n🟢 Glass: Bottles, jars\n🟤 Organic: Food waste, leaves\n\nNeed help identifying a specific item?";
      newQuickReplies = ["Upload image to identify", "Show disposal locations", "Recycling tips"];
    } else if (lowerMessage.includes('achievement') || lowerMessage.includes('badge')) {
      responseText = "🏆 Your Achievements:\n\n✅ First Cleanup - Completed\n✅ 100kg Milestone - Completed\n✅ Waste Warrior - Completed\n⏳ Team Leader - In Progress (2/5 events)\n⏳ Month Streak - In Progress (15/30 days)\n\nKeep up the great work!";
      newQuickReplies = ["View leaderboard", "Check next milestone", "Share achievements"];
    } else if (lowerMessage.includes('impact') || lowerMessage.includes('stat')) {
      responseText = "📊 Your Environmental Impact:\n\n♻️ Waste Collected: 245.5 kg\n🌍 CO₂ Saved: 187.3 kg\n🎉 Events Attended: 12\n⏱️ Hours Volunteered: 48\n🌳 Trees Equivalent: 9\n\nYou're making a real difference!";
      newQuickReplies = ["See detailed report", "Compare with others", "View timeline"];
    } else if (lowerMessage.includes('participate') || lowerMessage.includes('how') || lowerMessage.includes('start')) {
      responseText = "🎯 Getting Started:\n\n1. Browse upcoming events\n2. Choose an event near you\n3. Enroll with one click\n4. Show up and help clean!\n5. Track your impact\n\nIt's that simple! Want to find your first event?";
      newQuickReplies = ["Find events", "Watch tutorial", "Join community"];
    } else {
      responseText = "I'm here to help! I can assist you with:\n\n📍 Finding cleanup events\n♻️ Waste sorting & recycling\n🏆 Tracking achievements\n📊 Viewing your impact\n🎯 Getting started\n\nWhat would you like to know?";
      newQuickReplies = quickReplies;
    }

    return {
      id: messages.length + 2,
      sender: 'bot',
      text: responseText,
      timestamp: new Date().toISOString(),
      quickReplies: newQuickReplies
    };
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const clearChatHistory = () => {
    if (window.confirm('Are you sure you want to clear chat history?')) {
      localStorage.removeItem('chatHistory');
      setMessages([{
        id: 1,
        sender: 'bot',
        text: "Chat history cleared. How can I help you today?",
        timestamp: new Date().toISOString(),
        quickReplies: quickReplies
      }]);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-primary rounded-full shadow-2xl flex items-center justify-center z-50"
          >
            <span className="text-3xl">💬</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '600px'
            }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-96 bg-slate-900 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-700"
          >
            {/* Header */}
            <div className="bg-gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                  title="Go Back"
                >
                  <span className="text-white font-bold">←</span>
                </button>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Eco Assistant</h3>
                  <p className="text-xs text-purple-200">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <span className="text-white">{isMinimized ? '□' : '_'}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <span className="text-white">✕</span>
                </button>
              </div>
            </div>

            {/* Chat Content - Only show when not minimized */}
            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-2xl p-3 ${
                            message.sender === 'user'
                              ? 'bg-gradient-primary text-white'
                              : 'bg-slate-700 text-gray-100'
                          }`}
                        >
                          {message.file && message.file.preview && (
                            <img
                              src={message.file.preview}
                              alt="Uploaded"
                              className="rounded-lg mb-2 max-w-full"
                            />
                          )}
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 px-2">
                          {formatTime(message.timestamp)}
                        </p>
                        
                        {/* Quick Replies */}
                        {message.sender === 'bot' && message.quickReplies && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {message.quickReplies.map((reply, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-1 bg-slate-600 text-gray-200 text-xs rounded-full hover:bg-slate-500 transition-all border border-slate-500"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700 rounded-2xl p-3 flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* File Preview */}
                {selectedFile && (
                  <div className="p-2 bg-slate-750 border-t border-slate-700">
                    <div className="bg-slate-700 rounded-lg p-2 flex items-center gap-2">
                      {filePreview && (
                        <img src={filePreview} alt="Preview" className="w-12 h-12 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <p className="text-white text-sm">{selectedFile.name}</p>
                        <p className="text-gray-400 text-xs">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                      <button
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-slate-900 border-t border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-all"
                      title="Upload image"
                    >
                      <span className="text-xl">📎</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <button
                      onClick={clearChatHistory}
                      className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-all"
                      title="Clear history"
                    >
                      <span className="text-xl">🗑️</span>
                    </button>

                    <div className="flex-1"></div>

                    <button
                      onMouseDown={startVoiceRecording}
                      onMouseUp={stopVoiceRecording}
                      onMouseLeave={stopVoiceRecording}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        isRecording
                          ? 'bg-red-500 animate-pulse'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                      title="Hold to record voice"
                    >
                      <span className="text-xl">🎤</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() && !selectedFile}
                      className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default EnhancedChatbot;
