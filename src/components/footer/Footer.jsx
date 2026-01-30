import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker 
} from "react-icons/hi";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
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
                স্বেচ্ছায় রক্তদান, বাঁচাবে প্রাণ। রক্তদাতা এবং গ্রহীতাদের মধ্যে সেতুবন্ধন তৈরি করাই আমাদের মূল লক্ষ্য। আপনার এক ব্যাগ রক্ত দিতে পারে একটি নতুন জীবন।
              </p>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-8 text-white relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h3>
            <ul className="space-y-4 font-medium text-center md:text-left">
              <li><Link href="/" className="hover:text-primary transition-colors block">Home</Link></li>
              <li><Link href="/find-donors" className="hover:text-primary transition-colors block">Find Donors</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors block">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors block">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors block">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-8 text-white relative">
              Connect With Us
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
            © {new Date().getFullYear()} <span className="text-white font-semibold">Rokto Din</span>. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Designed with ❤️ by <span className="text-primary hover:underline cursor-pointer">Zihaul Islam Zihan</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;