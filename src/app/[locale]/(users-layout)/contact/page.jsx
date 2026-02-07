"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl'; // Import the hook
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { RiSendPlaneFill } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';

const ContactUs = () => {
  // Hook to get translations
  const t = useTranslations('ContactPage');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Define contact items dynamically to use translations
  const contactItems = [
    { 
      icon: <HiOutlineMail />, 
      title: t('info.emailTitle'), 
      detail: "support@roktodin.com", 
      color: "bg-red-50 text-primary" 
    },
    { 
      icon: <HiOutlinePhone />, 
      title: t('info.phoneTitle'), 
      detail: "+880 1XXX XXXXXX", 
      color: "bg-red-50 text-primary" 
    },
    { 
      icon: <HiOutlineLocationMarker />, 
      title: t('info.addressTitle'), 
      detail: t('info.addressDetail'), 
      color: "bg-red-50 text-primary" 
    }
  ];

  return (
    <div className="bg-base-100 min-h-screen pb-20">
      {/* 1. Header Section */}
      <section className="bg-base-200 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black text-neutral mb-4"
          >
            {t('header.titleStart')} <span className="text-primary">{t('header.titleEnd')}</span>
          </motion.h1>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 leading-relaxed font-medium">
            {t('header.description')}
          </p>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="container mx-auto px-4 md:px-8 -mt-10 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Right Side (Form) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="order-1 lg:order-2 lg:col-span-2 bg-white rounded-3xl shadow-xl border border-base-200 p-6 md:p-12"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-neutral">{t('form.emailLabel')}</span>
                  </label>
                  <input
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    className="input input-bordered w-full rounded-xl focus:outline-primary bg-base-100 font-medium"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-bold text-neutral">{t('form.subjectLabel')}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={t('form.subjectPlaceholder')}
                    className="input input-bordered w-full rounded-xl focus:outline-primary bg-base-100 font-medium"
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-neutral">{t('form.messageLabel')}</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-44 w-full rounded-xl focus:outline-primary bg-base-100 text-base font-medium resize-none"
                  placeholder={t('form.messagePlaceholder')}
                ></textarea>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-xs text-gray-400 font-medium text-center md:text-left">
                  {t('form.securityNote')}
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg rounded-full px-12 text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-3 w-full md:w-auto"
                >
                  {t('form.submitBtn')} <RiSendPlaneFill className="text-xl" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Left Side (Contact Info) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:col-span-1 space-y-4"
          >
            {contactItems.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-base-200 flex items-center gap-5 hover:shadow-md transition-all">
                <div className={`text-3xl p-4 rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-neutral">{item.title}</h4>
                  <p className="text-gray-500 font-medium">{item.detail}</p>
                </div>
              </div>
            ))}

            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
              <div className='text-3xl text-primary animate-pulse'>
                <BiTimeFive />
              </div>
              <p className="text-sm font-semibold text-gray-700">
                {/* Rich text translation for specific styling */}
                {t.rich('info.responseTime', {
                  highlight: (chunks) => <span className="text-primary font-bold text-lg">{chunks}</span>
                })}
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;