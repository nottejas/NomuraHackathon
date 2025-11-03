import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Quick reply suggestions
  const [quickReplies] = useState([
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
  }, [quickReplies]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !selectedFile) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date().toISOString(),
      file: selectedFile ? { name: selectedFile.name, preview: filePreview } : null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSelectedFile(null);
    setFilePreview(null);
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5001/chat', {
        message: inputMessage
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.data.response || "I'm here to help! Tell me more about what you need.",
        timestamp: new Date().toISOString()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 500);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Thanks for your message! I'm currently processing it. How else can I assist you?",
        timestamp: new Date().toISOString()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const startVoiceRecording = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
    <div className="min-h-screen px-4 py-24 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-8 shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Eco Assistant</h1>
                <p className="text-xl text-gray-600">Your AI-powered environmental helper</p>
              </div>
            </div>
            <button
              onClick={clearChatHistory}
              className="px-4 py-2 bg-red-600 text-black border-2 border-gray-900 rounded-lg hover:bg-red-700 transition-all"
            >
              🗑️ Clear Chat
            </button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-50 border border-gray-200 rounded-2xl shadow overflow-hidden flex flex-col"
          style={{ height: 'calc(100vh - 350px)' }}
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
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
                  <p className={`text-xs mt-1 px-2 ${message.sender === 'user' ? 'text-right text-gray-500' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                  
                  {/* Quick Replies */}
                  {message.sender === 'bot' && message.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-full hover:bg-blue-200 transition-all border border-blue-300"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-4 max-w-[80%]">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* File Preview */}
          {filePreview && (
            <div className="px-6 py-3 bg-gray-100 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img src={filePreview} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-gray-300" />
                <span className="text-sm text-gray-700">{selectedFile?.name}</span>
                <button
                  onClick={() => { setSelectedFile(null); setFilePreview(null); }}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all border border-gray-300"
                title="Attach file"
              >
                <span className="text-xl">📎</span>
              </button>

              <button
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`p-3 rounded-lg transition-all border ${
                  isRecording 
                    ? 'bg-red-500 text-white border-red-600 animate-pulse' 
                    : 'bg-gray-200 border-gray-300 hover:bg-gray-300'
                }`}
                title="Voice input"
              >
                <span className="text-xl">🎤</span>
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />

              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-blue-600 text-black border-2 border-gray-900 rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                Send 📤
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChatPage;
