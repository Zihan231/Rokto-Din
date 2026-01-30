"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const bannerImages = [
    "/roktoDinBanner.png", 
    "/roktoDinBanner2.png", 
    "/roktoDinBanner300.jpg", 
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full bg-base-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT SECTION: Now renders on Server immediately */}
          <motion.div 
            initial={isClient ? "hidden" : "visible"}
            animate="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
              স্বেচ্ছায় রক্তদান, বাঁচাবে প্রাণ
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-primary">রক্ত দিন,</span> <br />
              <span className="text-black">জীবন বাঁচান।</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              রক্ত দান করা একটি মহৎ কাজ। আপনার সামান্য রক্তদানে বেঁচে যেতে পারে একটি মূল্যবান প্রাণ। 
              <span className="font-bold text-primary"> রক্ত দিন </span> অ্যাপের মাধ্যমে সহজেই ডোনার খুঁজুন।
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20 text-white gap-2 text-lg hover:scale-105 transition-transform">
                রক্তের প্রয়োজন <HiOutlineArrowRight />
              </button>
              <button className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white btn-lg rounded-full px-10 text-lg transition-all hover:scale-105">
                ডোনার হতে চাই
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE SLIDER SECTION */}
          <div className="order-1 lg:order-2 w-full flex justify-center">
            <div className="relative w-full max-w-[700px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl transform scale-150 -z-10"></div>
              
              <div className="relative aspect-[7/6] overflow-hidden" 
                   style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 95%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)' }}>
                
                {/* SSR LOGIC: 
                   If JavaScript isn't loaded yet, show the first image statically.
                   Once loaded, initialize the Swiper.
                */}
                {!isClient ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={bannerImages[0]} 
                      alt="Rokto Din Banner"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    loop={true}
                    autoplay={{ delay: 1500, disableOnInteraction: false }}
                    allowTouchMove={false}
                    className="h-full w-full"
                  >
                    {bannerImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                          <Image 
                            src={img} 
                            alt={`Rokto Din Slider ${index + 1}`}
                            fill
                            priority={index === 0}
                            className="object-cover" 
                            sizes="(max-width: 768px) 100vw, 700px"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;