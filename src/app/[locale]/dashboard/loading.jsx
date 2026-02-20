"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('Loading');

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        
        {/* 1. Animated Blood Drop Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative mb-8"
        >
          {/* Main Drop Shape */}
          <div className="w-16 h-16 bg-primary rounded-full rounded-tr-none rotate-45 flex items-center justify-center shadow-lg shadow-primary/30">
            {/* White Heart inside the drop */}
            <svg 
              className="w-8 h-8 text-white -rotate-45" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Ripple Effect Circles */}
          <motion.div 
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary rounded-full -z-10"
          />
        </motion.div>

        {/* 2. Brand Name */}
        <h2 className="text-2xl font-black text-neutral tracking-tight mb-2">
          {t.rich('brandName', {
            highlight: (chunks) => <span className="text-primary">{chunks}</span>
          })}
        </h2>
        
        {/* 3. Loading Text */}
        <p className="text-gray-500 font-medium text-sm animate-pulse">
          {t('loadingText')}
        </p>

        {/* 4. Sleek Progress Bar */}
        <div className="mt-6 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full bg-linear-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>

      {/* 5. Bottom Tagline */}
      <div className="absolute bottom-10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
          {t('tagline')}
        </p>
      </div>
    </div>
  );
}