import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Added specific medical and UI icons
import { HiOutlineGlobeAlt, HiOutlineHome, HiOutlineSearch, HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineMail } from "react-icons/hi";
import { RiUserSharedLine, RiLoginCircleLine } from "react-icons/ri";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
          <HiOutlineHome className="text-xl" /> Home
        </Link>
      </li>
      <li>
        <Link href="/find-donors" className="hover:text-primary transition-colors flex items-center gap-2">
          <HiOutlineSearch className="text-xl" /> Find Donors
        </Link>
      </li>
      <li>
        <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-2">
          <HiOutlineDocumentText className="text-xl" /> Blog
        </Link>
      </li>
      <li>
        <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
          <HiOutlineInformationCircle className="text-xl" /> About
        </Link>
      </li>
      <li>
        <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
          <HiOutlineMail className="text-xl" /> Contact
        </Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 w-full bg-base-100 shadow-sm border-b border-base-300">
      <div className="navbar container mx-auto px-4 md:px-8 min-h-[85px]">
        
        {/* START: Logo */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center">
            <div className="relative w-14 h-14 md:w-20 md:h-20 transition-transform hover:scale-105">
              <Image 
                src="/roktoDinCircled.jpg" 
                alt="Rokto Din Logo" 
                fill 
                priority
                className="object-contain"
              />
            </div>
          </Link>
        </div>

        {/* CENTER: Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-semibold text-[15px]">
            {navLinks}
          </ul>
        </div>

        {/* END: Actions & Language */}
        <div className="navbar-end gap-2 md:gap-4">
          
          {/* Language Switcher */}
          <button className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors" title="Switch Language">
            <div className="flex flex-col items-center">
              <HiOutlineGlobeAlt className="text-2xl" />
              <span className="text-[10px] font-bold uppercase">EN</span>
            </div>
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex gap-3">
            <Link href="/login" className="btn btn-ghost text-base-content hover:text-primary font-bold text-lg flex items-center gap-2">
              <RiLoginCircleLine className="text-xl" /> Login
            </Link>
            <Link href="/register" className="btn btn-primary px-8 rounded-full shadow-md hover:shadow-lg transition-all font-bold text-lg flex items-center gap-2">
              <RiUserSharedLine className="text-xl" /> Register
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-box w-64 border border-base-300 font-medium text-lg">
              {navLinks}
              <div className="divider my-2"></div>
              <li><Link href="/login" className="py-2 flex items-center gap-3"><RiLoginCircleLine /> Login</Link></li>
              <li><Link href="/register" className="text-primary font-bold py-2 flex items-center gap-3"><RiUserSharedLine /> Register</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;