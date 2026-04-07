"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Lock, Eye, EyeOff, Save, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure'; // Make sure this path is correct for your app

const ChangePassword = () => {
    const axiosSecure = useAxiosSecure();
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

    // 3. Status & Validation States
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [apiStatus, setApiStatus] = useState({ type: '', message: '' });

    // Handlers
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user starts typing again
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const toggleVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    // Client-side validation matching NestJS DTO
    const validateForm = () => {
        const newErrors = {};
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/;

        if (!formData.currentPassword) {
            newErrors.currentPassword = t('errors.emptyCurrent');
        }

        if (!formData.newPassword) {
            newErrors.newPassword = t('errors.emptyNew');
        } else if (formData.newPassword.length < 6 || formData.newPassword.length > 20) {
            newErrors.newPassword = t('errors.length');
        } else if (!passRegex.test(formData.newPassword)) {
            newErrors.newPassword = t('errors.regex');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.emptyConfirm');
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.mismatch');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiStatus({ type: '', message: '' });

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const payload = {
                currentPass: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            };

            const response = await axiosSecure.post('/auth/change-password', payload);

            if (response.data?.statusCode === 200) {
                // Use the translated success message instead of response.data.message
                setApiStatus({ type: 'success', message: t('status.success') });
                setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            console.error("Password update error:", error);
            // Fallback to translated error message
            setApiStatus({
                type: 'error',
                message: t('status.error')
            });
        } finally {
            setIsLoading(false);
        }
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

                {/* API Status Alert */}
                <AnimatePresence>
                    {apiStatus.message && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className={`relative z-10 p-4 rounded-2xl flex items-start gap-3 ${apiStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                                }`}
                        >
                            {apiStatus.type === 'success' ? <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> : <AlertCircle className="mt-0.5 shrink-0" size={18} />}
                            <p className="text-sm font-semibold">{apiStatus.message}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    {/* Current Password */}
                    <div className="form-control">
                        <label className="label font-bold text-neutral">
                            <span className="flex items-center gap-2">{t('currentPassword')}</span>
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.currentPassword ? 'text-red-400' : 'text-gray-400'}`}>
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword.current ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                placeholder={t('currentPasswordPlaceholder')}
                                className={`input input-bordered w-full pl-12 pr-12 rounded-2xl font-medium transition-all ${errors.currentPassword ? 'border-red-400 focus:outline-red-500 bg-red-50/50' : 'focus:outline-primary'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('current')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.currentPassword && <span className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.currentPassword}</span>}

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
                            <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.newPassword ? 'text-red-400' : 'text-gray-400'}`}>
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                placeholder={t('newPasswordPlaceholder')}
                                className={`input input-bordered w-full pl-12 pr-12 rounded-2xl font-medium transition-all ${errors.newPassword ? 'border-red-400 focus:outline-red-500 bg-red-50/50' : 'focus:outline-primary'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('new')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.newPassword ? (
                            <span className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.newPassword}</span>
                        ) : (
                            <p className="text-xs text-gray-400 mt-2 font-medium">
                                {t('passwordHint')}
                            </p>
                        )}
                    </div>

                    {/* Confirm New Password */}
                    <div className="form-control">
                        <label className="label font-bold text-neutral">
                            <span className="flex items-center gap-2">{t('confirmPassword')}</span>
                        </label>
                        <div className="relative">
                            <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400'}`}>
                                <Lock size={18} />
                            </div>
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder={t('confirmPasswordPlaceholder')}
                                className={`input input-bordered w-full pl-12 pr-12 rounded-2xl font-medium transition-all ${errors.confirmPassword ? 'border-red-400 focus:outline-red-500 bg-red-50/50' : 'focus:outline-primary'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility('confirm')}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                            >
                                {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-xs mt-1.5 ml-2 font-medium">{errors.confirmPassword}</span>}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full md:w-auto md:px-10 rounded-2xl text-white font-bold text-lg h-14 shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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