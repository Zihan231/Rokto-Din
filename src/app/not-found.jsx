"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowLeft, HiOutlineSearch } from 'react-icons/hi';
import { BiPulse } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl w-full">
        
        {/* Animated Icon Section */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center mb-8"
        >
          {/* Heartbeat Pulse Animation */}
          <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-20">
             <BiPulse className="text-primary text-9xl" />
          </div>
          <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-3xl md:text-5xl font-bold text-primary">Oops!</span>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
             দুঃখিত, এই পাতাটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            আপনি যে পাতাটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা ইউআরএলটি ভুল। 
            দয়া করে নিচের বাটনটি ব্যবহার করে হোমপেজে ফিরে যান।
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/" 
              className="btn btn-primary btn-lg rounded-full px-10 text-white gap-2 shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
            >
              <HiOutlineArrowNarrowLeft className="text-xl" /> ফিরে যান (Home)
            </Link>
            
            <Link 
              href="/find-donors" 
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white btn-lg rounded-full px-10 gap-2 transition-all hover:scale-105"
            >
              <HiOutlineSearch className="text-xl" /> ডোনার খুঁজুন
            </Link>
          </div>
        </motion.div>

        {/* Decorative Background Element */}
        <div className="mt-16 opacity-50">
          <p className="text-sm text-gray-400 font-medium">
             প্রয়োজনে যোগাযোগ করুন: <span className="text-primary">support@roktodin.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;