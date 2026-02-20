"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

import 'swiper/css';
import 'swiper/css/effect-fade';
import Link from 'next/link';

const HeroBanner = () => {
  const t = useTranslations('HeroBanner');
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* TEXT SECTION: 4 columns */}
          <motion.div 
            initial={isClient ? "hidden" : "visible"}
            animate="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:col-span-4 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 uppercase tracking-wider">
              {t('tagline')}
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              <span className="text-primary">{t('title.part1')}</span> <br />
              <span className="text-black">{t('title.part2')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t.rich('description', {
                highlight: (chunks) => <span className="font-bold text-primary"> {chunks} </span>
              })}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/find-donors" className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20 text-white gap-2 text-lg hover:scale-105 transition-transform">
                {t('buttons.needBlood')} <HiOutlineArrowRight />
              </Link>
              <Link href="/register" className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white btn-lg rounded-full px-10 text-lg transition-all hover:scale-105">
                {t('buttons.beDonor')}
              </Link>
            </motion.div>
          </motion.div>

          {/* IMAGE SLIDER SECTION: 8 columns */}
          <div className="order-1 lg:order-2 lg:col-span-8 w-full flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl lg:max-w-full">
              <div className="absolute inset-0 bg-linear-to-r from-primary/5 to-transparent rounded-full blur-3xl transform scale-150 -z-10"></div>
              
              <div className="relative aspect-[16/10] overflow-hidden" 
                   style={{ maskImage: 'radial-gradient(circle, black 60%, transparent 95%)', WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 95%)' }}>
                
                {!isClient ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={bannerImages[0]} 
                      alt="Rokto Din Banner"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1000px" /* Added sizes here for the fallback */
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
                            sizes="(max-width: 1024px) 100vw, 1000px" /* Updated sizes here for the slider */
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