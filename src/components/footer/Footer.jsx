"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Standard Next.js Link
// Use the custom Link from navigation for locale-aware routing if you have setup navigation.js
// If not, standard Link is fine but won't persist locale automatically without prefix.
// Assuming standard structure for now:
import { useTranslations } from 'next-intl';
import { 
  HiOutlineMail, 
  HiOutlinePhone 
} from "react-icons/hi";
import { 
  FaFacebookF, 
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8 border-t border-base-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Logo & Moto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <Link href="/" className="transition-transform hover:scale-105">
              <div className="relative w-20 h-20 bg-white rounded-full p-1 shadow-xl">
                <Image 
                  src="/roktoDinCircled.jpg" 
                  alt="Rokto Din Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Rokto <span className="text-primary">Din</span>
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                {t('moto')}
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-8 text-white relative">
              {t('quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-4 font-medium text-center md:text-left">
              <li><Link href="/" className="hover:text-primary transition-colors block">{t('links.home')}</Link></li>
              <li><Link href="/find-donors" className="hover:text-primary transition-colors block">{t('links.findDonors')}</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors block">{t('links.blog')}</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors block">{t('links.about')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors block">{t('links.contact')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-8 text-white relative">
              {t('connectWithUs')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <FaFacebookF className="text-lg" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <FaLinkedinIn className="text-lg" />
              </a>
              <a href="#" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                <FaInstagram className="text-lg" />
              </a>
            </div>

            <ul className="space-y-4 text-center md:text-left">
              <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                <HiOutlineMail className="text-xl text-primary" />
                <span>support@roktodin.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-gray-400">
                <HiOutlinePhone className="text-xl text-primary" />
                <span>+880 1XXX XXXXXX</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {t.rich('copyright', {
              year: currentYear,
              bold: (chunks) => <span className="text-white font-semibold">{chunks}</span>
            })}
          </p>
          <p className="text-gray-500 text-sm">
            {t.rich('designedBy', {
              highlight: (chunks) => <span className="text-primary hover:underline cursor-pointer">{chunks}</span>
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;