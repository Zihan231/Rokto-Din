"use client";
import React, { useContext, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation.js';
import {
  HiOutlineGlobeAlt, HiOutlineHome, HiOutlineSearch,
  HiOutlineDocumentText, HiOutlineInformationCircle, HiOutlineMail
} from "react-icons/hi";
import { RiUserSharedLine, RiLoginCircleLine, RiLogoutBoxLine, RiDashboardLine } from "react-icons/ri";
import AuthContext from '@/hooks/AuthContext/AuthContext';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure';

const Navbar = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const { user,setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // Language Switch Logic
  const handleLanguageSwitch = () => {
    const nextLocale = locale === 'en' ? 'bn' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };


  // Logout Handler
  const handleLogout = async () => {
    try {
      const res = await axiosSecure.post("auth/logout");
      if (res.status === 200) {
        setUser(null);
        router.replace("/login");
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }
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
      <div className="navbar container mx-auto px-4 md:px-8 min-h-21.25">

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
          <button
            onClick={handleLanguageSwitch}
            disabled={isPending}
            className="btn btn-ghost btn-circle text-base-content hover:text-primary transition-colors"
            title="Switch Language"
          >
            <div className="flex flex-col items-center">
              <HiOutlineGlobeAlt className="text-2xl" />
              <span className="text-[10px] font-bold uppercase">
                {locale === 'en' ? 'BN' : 'EN'}
              </span>
            </div>
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex gap-4 items-center">
            {user ? (
              // LOGGED IN STATE
              <>
                {/* Primary Maroon Pill for Dashboard */}
                <Link
                  href="/dashboard"
                  className="btn btn-primary text-primary-content border-none rounded-full px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-black text-base flex items-center gap-2"
                >
                  <RiDashboardLine className="text-xl" /> Dashboard
                </Link>

                {/* Sleek Neutral Flip for Logout */}
                <button
                  onClick={handleLogout}
                  className="btn bg-base-200 text-base-content border-none hover:bg-neutral hover:text-neutral-content rounded-full px-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold text-base flex items-center gap-2"
                >
                  <RiLogoutBoxLine className="text-xl" /> Logout
                </button>
              </>
            ) : (
              // LOGGED OUT STATE
              <>
                <Link
                  href="/login"
                  className="btn btn-ghost text-neutral hover:bg-base-200 rounded-full px-6 font-bold text-base flex items-center gap-2 transition-colors"
                >
                  <RiLoginCircleLine className="text-xl" /> Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary text-primary-content border-none rounded-full px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-black text-base flex items-center gap-2"
                >
                  <RiUserSharedLine className="text-xl" /> Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-base-100 rounded-box w-64 border border-base-200 text-base font-medium gap-1">
              {navLinks}
              <div className="divider my-1"></div>

              {user ? (
                // LOGGED IN STATE (Mobile)
                <>
                  <li>
                    <Link href="/dashboard" className="text-primary bg-primary/10 hover:bg-primary hover:text-white font-black py-3 px-4 rounded-xl flex items-center gap-3 transition-colors">
                      <RiDashboardLine className="text-xl" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-neutral hover:bg-neutral hover:text-white font-bold py-3 px-4 rounded-xl flex items-center gap-3 transition-colors mt-1 w-full">
                      <RiLogoutBoxLine className="text-xl" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                // LOGGED OUT STATE (Mobile)
                <>
                  <li>
                    <Link href="/login" className="text-neutral hover:bg-base-200 font-bold py-3 px-4 rounded-xl flex items-center gap-3 transition-colors">
                      <RiLoginCircleLine className="text-xl" /> Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="text-primary bg-primary/10 hover:bg-primary hover:text-white font-black py-3 px-4 rounded-xl flex items-center gap-3 transition-colors mt-1">
                      <RiUserSharedLine className="text-xl" /> Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;