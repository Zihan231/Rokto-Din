"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Import usePathname to read the URL
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowLeft, HiOutlineSearch } from 'react-icons/hi';
import { BiPulse } from 'react-icons/bi';
import { useTranslations, NextIntlClientProvider } from 'next-intl'; 
import './globals.css';

import { Noto_Sans_Bengali } from 'next/font/google'; 
const font = Noto_Sans_Bengali({ subsets: ['bengali'] });

// 2. Import BOTH translation files
import bnMessages from '../messages/bn.json'; 
import enMessages from '../messages/en.json';

// 3. Accept 'locale' as a prop so we can fix the button links
const NotFoundContent = ({ locale }) => {
  const t = useTranslations('NotFound');

  return (
    <div className="flex items-center justify-center px-6 py-24 min-h-screen">
      <div className="text-center max-w-2xl w-full">

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center animate-ping opacity-20">
            <BiPulse className="text-primary text-9xl" />
          </div>
          <h1 className="text-9xl font-black text-primary/10 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl md:text-5xl font-bold text-primary">{t('title')}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-4">
            {t('heading')}
          </h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 4. Update Links to use the current locale dynamically */}
            <Link
              href={`/${locale}`}
              className="btn btn-primary btn-lg rounded-full px-10 text-white gap-2 shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
            >
              <HiOutlineArrowNarrowLeft className="text-xl" /> {t('buttons.home')}
            </Link>

            <Link
              href={`/${locale}/find-donors`}
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white btn-lg rounded-full px-10 gap-2 transition-all hover:scale-105"
            >
              <HiOutlineSearch className="text-xl" /> {t('buttons.findDonors')}
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 opacity-50">
          <p className="text-sm text-gray-400 font-medium">
            {t('contact')} <span className="text-primary">support@roktodin.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const NotFound = () => {
  const pathname = usePathname();
  
  // 5. Check the URL. If it starts with "/en", set the locale to English. Otherwise, Bengali.
  const locale = pathname?.startsWith('/en') ? 'en' : 'bn';
  
  // 6. Select the matching JSON file
  const messages = locale === 'en' ? enMessages : bnMessages;

  return (
    // Pass the dynamic locale to the HTML tag
    <html lang={locale} data-theme="rokto-din">
      <body className={`${font.className} bg-base-100 text-base-content min-h-screen`}>
        {/* Pass the dynamically chosen locale and messages to the Provider */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NotFoundContent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default NotFound;