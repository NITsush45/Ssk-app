'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navigation from '@/components/navigation';
import Footer from '../projects/footer';

const ChatIframe = dynamic(() => import('@/components/ChatIframe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-800 rounded-xl animate-pulse flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

const SskPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen max-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-y-auto">
      {/* Navigation */}
      <Navigation />

      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
      </div>

      {/* Sticky Header */}
      <motion.header 
        className={`sticky top-0 z-10 backdrop-blur-lg transition-all duration-300 ${
          scrolled ? 'bg-gray-900/80 shadow-lg' : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
          <motion.h1 
            className="text-white text-xl md:text-2xl font-bold flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full"></span>
            <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-pink-500 rounded-full"></span>
            SSK DRAKE
          </motion.h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-grow relative z-1">
        {/* Hero Section */}
        <motion.section 
          className="py-8 md:py-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 md:mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Meet SSK DRAKE
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg md:text-xl mb-6 md:mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Connect and engage with our advanced AI chat system designed for seamless communication
            </motion.p>
          </div>
        </motion.section>

        {/* Chat Section */}
        <motion.section 
          className="max-w-4xl mx-auto px-4 pb-12 md:pb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl md:text-2xl font-medium">SSK Chatbot Interface</h3>
              <div className="flex gap-2">
                <span className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></span>
              </div>
            </div>
            <div className="h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
              <ChatIframe />
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 py-10 md:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Real-time Responses", description: "Get instant feedback with minimal latency", color: "from-blue-600 to-blue-400" },
              { title: "Secure Connection", description: "End-to-end encryption for your conversations", color: "from-purple-600 to-purple-400" },
              { title: "Smart AI", description: "Powered by advanced language processing", color: "from-pink-600 to-pink-400" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 + (index * 0.2), duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <span className="text-white text-lg md:text-xl">✦</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Fixed Footer */}
      <div className="w-full bg-gray-900 border-t border-gray-700 bottom-0 left-0 z-10">
        <Footer />
      </div>
    </div>
  );
};

export default SskPage;
