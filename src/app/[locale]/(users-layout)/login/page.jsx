"use client";
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Lock, Eye, EyeOff, Droplets, UserPlus, ArrowRightCircle, ArrowRight } from 'lucide-react';
import useAxios from '@/hooks/axios/useAxios';
import AuthContext from '@/hooks/AuthContext/AuthContext';
import useAxiosSecure from '@/hooks/axiosSecure/useAxiosSecure';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const t = useTranslations('LoginPage');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(null);
    const axiosSecure = useAxiosSecure();
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { user, setUser, fetchUserProfile } = useContext(AuthContext);
    const checkError = (email, password) => {
        if (!email || !password) {
            return "**Email and Password are required**";
        }
        return null;
    }

    // login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        const errorMsg = checkError(email, password);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }
        try {
            const res = await axiosSecure.post("auth/login", { email, password });
            const userData = await fetchUserProfile();
            setUser(userData);
            setError(null);
            router.push("/dashboard");
        } catch (err) {
            if (err.response?.status === 401) {
                setError("**Invalid email or password**")
            } else {
                setError("**An error occurred. Please try again later.**")
            }
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen bg-white md:bg-base-200 flex items-center justify-center md:p-4 mb-10">
            <div className="max-w-5xl w-full bg-white md:rounded-[3rem] md:shadow-2xl overflow-hidden flex flex-col md:flex-row md:border md:border-base-300">

                {/* 1. Main Login Form (Top on Mobile) */}
                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center bg-white">
                    <div className="mb-10 text-center md:text-left">
                        {/* Mobile Only Logo/Icon */}
                        <div className="md:hidden flex justify-center mb-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <Droplets className="text-primary w-8 h-8" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-neutral mb-2 tracking-tight">{t('login.title')}</h3>
                        <p className="text-gray-500 font-medium">{t('login.subtitle')}</p>
                    </div>

                    <form className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-neutral">{t('login.emailLabel')}</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Mail size={20} /></div>
                                <input onChange={e => setEmail(e.target.value)} type="email" placeholder={t('login.emailPlaceholder')} className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary bg-base-100 border-base-200" />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <div className="flex justify-between items-center mb-1">
                                <label className="label py-0"><span className="label-text font-bold text-neutral">{t('login.passwordLabel')}</span></label>
                                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline">{t('login.forgotPassword')}</Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={20} /></div>
                                <input onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder={t('login.passwordPlaceholder')} className="input input-bordered w-full pl-12 pr-12 rounded-2xl focus:outline-primary bg-base-100 border-base-200" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            {error && <p className="text-sm text-primary text-center font-medium mt-2">{error}</p>}
                        </div>

                        {/* Login Btn */}
                        <button onClick={handleLogin} className="btn btn-primary btn-lg w-full rounded-2xl text-white shadow-lg shadow-primary/20 mt-4 gap-3 border-none">
                            <ArrowRightCircle size={22} /> {t('login.submitBtn')}
                        </button>
                    </form>

                    {/* <div className="divider my-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">{t('login.orDivider')}</div>

                    <Link href="/dashboard" className="btn btn-outline border-base-200 w-full rounded-2xl gap-4 font-bold hover:bg-neutral hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        {t('login.googleBtn')}
                    </Link> */}
                </div>

                {/* 2. Welcome/Register Section - Improved for Mobile */}
                <div className="bg-neutral p-8 md:p-12 text-white flex flex-col justify-between relative md:order-first md:w-1/2 min-h-75 md:min-h-full">
                    {/* Decorative Background for Mobile */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary opacity-20 rounded-full -mr-24 -mt-24 blur-[60px] md:hidden" />

                    {/* Desktop Only Content */}
                    <div className="hidden md:block relative z-10">
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/30">
                            <Droplets className="text-primary w-10 h-10" />
                        </div>

                        {/* Title Split into 2 spans using 'block' to create new line */}
                        <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight">
                            <span className="block">{t('welcome.titleLine1')}</span>
                            <span className="text-primary italic">{t('welcome.titleHighlight')}</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-xs font-medium">
                            {t('welcome.desc')}
                        </p>
                    </div>

                    {/* Mobile & Desktop Call to Action - Redesigned */}
                    <div className="relative z-10 p-6 md:p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="mb-4 p-3 bg-primary/20 rounded-2xl md:hidden">
                                <UserPlus className=" w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2">
                                {t('welcome.newDonor')}
                            </p>
                            <Link href="/register" className="w-full">
                                <button className="btn btn-primary w-full h-14 rounded-2xl text-white border-none shadow-xl shadow-primary/20 group hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <span className="font-black tracking-wide">{t('welcome.registerBtn')}</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </Link>
                            <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">
                                {t('welcome.fastAccount')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;