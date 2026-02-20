"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail, ArrowLeft, CheckCircle2, Droplets } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
    const t = useTranslations('ForgotPassword');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API Call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        // ১. পুরো স্ক্রিনে একটি ব্যাকগ্রাউন্ড কালার এবং চারদিকে প্যাডিং (মার্জিন এর জন্য) দেওয়া হয়েছে
        <div className="min-h-screen w-full flex items-center justify-center bg-base-200 p-4 sm:p-8">
            
            {/* ২. মেইন ফ্লোটিং কার্ড (Floating Card) */}
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[80vh]">
                
                {/* --- Left Column: Branding (Top on Mobile, Left on Desktop) --- */}
                {/* ৩. 'hidden' ক্লাসটি সরিয়ে দেওয়া হয়েছে যাতে মোবাইলেও দেখায় */}
                <div className="flex w-full md:w-1/2 bg-neutral text-white relative flex-col justify-center p-8 sm:p-12 lg:p-16 overflow-hidden">
                    
                    {/* Background Decor */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-lg mx-auto w-full">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 mb-8 md:mb-16 w-fit hover:scale-105 transition-transform">
                            <div className="p-2.5 sm:p-3 bg-primary rounded-xl sm:rounded-2xl shadow-lg shadow-primary/30">
                                <Droplets className="text-white fill-white" size={28} />
                            </div>
                            <span className="font-black text-3xl sm:text-4xl tracking-tighter italic">Rokto Din</span>
                        </Link>

                        {/* Branding Text */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
                            {t('sideTitle')}
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            {t('sideSubtitle')}
                        </p>
                    </div>
                </div>

                {/* --- Right Column: Form Area (Bottom on Mobile, Right on Desktop) --- */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative bg-white">
                    <div className="max-w-md w-full mx-auto">
                        
                        {!isSubmitted ? (
                            /* FORM STATE */
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                {/* Back Button */}
                                <Link 
                                    href="/login" 
                                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-2"
                                >
                                    <ArrowLeft size={16} /> {t('backToLogin')}
                                </Link>

                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-neutral mb-2 tracking-tight">
                                        {t('title')}
                                    </h2>
                                    <p className="text-gray-500 font-medium leading-relaxed">
                                        {t('subtitle')}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="form-control">
                                        <label className="label font-bold text-neutral px-0 pt-0 pb-2">
                                            <span className="text-sm">{t('emailLabel')}</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                                <Mail size={18} />
                                            </div>
                                            <input 
                                                type="email" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                placeholder={t('emailPlaceholder')}
                                                className="input input-bordered w-full pl-12 rounded-xl focus:outline-primary bg-base-50 focus:bg-white h-14 font-medium text-neutral border-gray-200 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isLoading}
                                        className="btn btn-primary w-full rounded-xl text-white font-bold text-lg h-14 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                    >
                                        {isLoading ? (
                                            <span className="loading loading-spinner loading-md"></span>
                                        ) : (
                                            t('submitButton')
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            /* SUCCESS STATE */
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 p-6 sm:p-8 bg-base-50 rounded-[2rem] border border-gray-100"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle2 size={36} className="sm:w-10 sm:h-10" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-neutral mb-3">
                                        {t('successTitle')}
                                    </h2>
                                    <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                                        {t('successMessage')} <br/>
                                        <strong className="text-neutral mt-2 inline-block text-base">{email}</strong>
                                    </p>
                                    
                                    <Link 
                                        href="/login" 
                                        className="btn btn-primary w-full rounded-xl text-white font-bold h-12 sm:h-14 mb-4"
                                    >
                                        {t('backToLogin')}
                                    </Link>

                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-sm font-bold text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {t('resendLink')}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;