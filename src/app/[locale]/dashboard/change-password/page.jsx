"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Lock, Eye, EyeOff, Save, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const ChangePassword = () => {
    // next-intl hook
    const t = useTranslations('ChangePassword');

    // 1. Form States
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // 2. Password Visibility States
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [isLoading, setIsLoading] = useState(false);

    // Handlers
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Add your password update logic/API call here
        setTimeout(() => {
            setIsLoading(false);
            console.log("Password updated!");
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2.5rem] border border-base-200 shadow-sm flex items-center gap-5"
            >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <ShieldCheck size={32} className="text-primary" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-neutral mb-1">
                        {t('title')}
                    </h2>
                    <p className="text-gray-500 font-medium text-sm">
                        {t('subtitle')}
                    </p>
                </div>
            </motion.div>

            {/* Form Section */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-base-200 shadow-sm relative overflow-hidden"
            >
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    
                    {/* Current Password */}
                    <div className="form-control">
                        <label className="label font-bold text-neutral">
                            <span className="flex items-center gap-2">{t('currentPassword')}</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input 
                                type={showPassword.current ? "text" : "password"} 
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                required
                                placeholder={t('currentPasswordPlaceholder')}
                                className="input input-bordered w-full pl-12 pr-12 rounded-2xl focus:outline-primary font-medium"
                            />
                            <button 
                                type="button" 
                                onClick={() => toggleVisibility('current')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {/* Forgot Password Link */}
                        <div className="text-right mt-2">
                            <Link href="/forgot-password" className="text-sm font-bold text-primary hover:underline">
                                {t('forgotPassword')}
                            </Link>
                        </div>
                    </div>

                    <hr className="border-base-200" />

                    {/* New Password */}
                    <div className="form-control">
                        <label className="label font-bold text-neutral">
                            <span className="flex items-center gap-2">{t('newPassword')}</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input 
                                type={showPassword.new ? "text" : "password"} 
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                required
                                placeholder={t('newPasswordPlaceholder')}
                                className="input input-bordered w-full pl-12 pr-12 rounded-2xl focus:outline-primary font-medium"
                            />
                            <button 
                                type="button" 
                                onClick={() => toggleVisibility('new')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 font-medium">
                            {t('passwordHint')}
                        </p>
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-control">
                        <label className="label font-bold text-neutral">
                            <span className="flex items-center gap-2">{t('confirmPassword')}</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock size={18} />
                            </div>
                            <input 
                                type={showPassword.confirm ? "text" : "password"} 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                placeholder={t('confirmPasswordPlaceholder')}
                                className="input input-bordered w-full pl-12 pr-12 rounded-2xl focus:outline-primary font-medium"
                            />
                            <button 
                                type="button" 
                                onClick={() => toggleVisibility('confirm')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="btn btn-primary w-full md:w-auto md:px-10 rounded-2xl text-white font-bold text-lg h-14 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <>
                                    <Save size={20} /> {t('updateButton')}
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default ChangePassword;