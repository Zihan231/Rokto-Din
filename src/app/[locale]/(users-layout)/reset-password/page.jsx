"use client";
import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Lock, Eye, EyeOff, CheckCircle2, Droplets, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import useAxios from '@/hooks/axios/useAxios';

const ResetPasswordForm = () => {
    const t = useTranslations('ResetPassword');
    const searchParams = useSearchParams();
    const router = useRouter();
    const axiosPublic = useAxios();

    // Extract token from URL
    const token = searchParams.get('token');

    // State Management
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({ new: false, confirm: false });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation & Error States
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [apiSuccessMsg, setApiSuccessMsg] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear specific field error on typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
        if (apiError) setApiError('');
    };

    const toggleVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    // Strict Validation matching NestJS DTO
    const validateForm = () => {
        const newErrors = {};
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/;

        if (!token) {
            setApiError(t('errors.missingToken'));
            return false;
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
        setApiError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const payload = {
                token: token,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            };

            const response = await axiosPublic.post('/auth/reset-password', payload);

            if (response.data) {
                // Prioritize translated success message over raw API message
                setApiSuccessMsg(t('status.success'));
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            // Fall back to translated error if API fails
            setApiError(t('status.error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {!isSuccess ? (
                /* FORM STATE */
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-neutral mb-2 tracking-tight">
                            {t('title')}
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    {/* API Error Alert Box */}
                    <AnimatePresence>
                        {apiError && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="relative z-10 p-4 rounded-2xl flex items-start gap-3 bg-red-50 text-red-700 border border-red-200"
                            >
                                <AlertCircle className="mt-0.5 shrink-0" size={18} />
                                <p className="text-sm font-semibold">{apiError}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* New Password */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral px-0 pt-0 pb-2">
                                <span className="text-sm">{t('newPassword')}</span>
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
                                    className={`input input-bordered w-full pl-12 pr-12 rounded-xl focus:outline-primary h-14 font-medium text-neutral transition-colors ${errors.newPassword
                                            ? 'border-red-400 focus:outline-red-500 bg-red-50/50'
                                            : 'bg-base-50 focus:bg-white border-gray-200'
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
                            {errors.newPassword && (
                                <span className="text-red-500 text-xs mt-1.5 ml-1 font-medium block">
                                    {errors.newPassword}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral px-0 pt-0 pb-2">
                                <span className="text-sm">{t('confirmPassword')}</span>
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
                                    className={`input input-bordered w-full pl-12 pr-12 rounded-xl focus:outline-primary h-14 font-medium text-neutral transition-colors ${errors.confirmPassword
                                            ? 'border-red-400 focus:outline-red-500 bg-red-50/50'
                                            : 'bg-base-50 focus:bg-white border-gray-200'
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
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-xs mt-1.5 ml-1 font-medium block">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full rounded-xl text-white font-bold text-lg h-14 mt-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                        <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
                            {apiSuccessMsg || t('successMessage')}
                        </p>

                        <Link
                            href="/login"
                            className="btn btn-primary w-full rounded-xl text-white font-bold h-12 sm:h-14 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                        >
                            {t('loginButton')} <ArrowRight size={18} />
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// মেইন পেজ লেআউট
const ResetPasswordPage = () => {
    const t = useTranslations('ResetPassword');

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-base-200 p-4 sm:p-8">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[80vh]">

                {/* Left Column: Branding */}
                <div className="flex w-full md:w-1/2 bg-neutral text-white relative flex-col justify-center p-8 sm:p-12 lg:p-16 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-lg mx-auto w-full">
                        <Link href="/" className="flex items-center gap-3 mb-8 md:mb-16 w-fit hover:scale-105 transition-transform">
                            <div className="p-2.5 sm:p-3 bg-primary rounded-xl sm:rounded-2xl shadow-lg shadow-primary/30">
                                <Droplets className="text-white fill-white" size={28} />
                            </div>
                            <span className="font-black text-3xl sm:text-4xl tracking-tighter italic">Rokto Din</span>
                        </Link>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
                            {t('sideTitle')}
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            {t('sideSubtitle')}
                        </p>
                    </div>
                </div>

                {/* Right Column: Form Area */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative bg-white">
                    {/* Next.js Suspense boundary for useSearchParams */}
                    <Suspense fallback={<div className="loading loading-spinner loading-lg text-primary"></div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;