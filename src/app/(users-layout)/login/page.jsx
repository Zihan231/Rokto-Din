"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Droplets, UserPlus, ArrowRightCircle, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                        <h3 className="text-3xl font-black text-neutral mb-2 tracking-tight">লগইন করুন</h3>
                        <p className="text-gray-500 font-medium">আপনার অ্যাকাউন্টের তথ্য দিন</p>
                    </div>

                    <form className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label"><span className="label-text font-bold text-neutral">ইমেইল এড্রেস</span></label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Mail size={20} /></div>
                                <input type="email" placeholder="example@mail.com" className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary bg-base-100 border-base-200" />
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <div className="flex justify-between items-center mb-1">
                                <label className="label py-0"><span className="label-text font-bold text-neutral">পাসওয়ার্ড</span></label>
                                <Link href="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline">পাসওয়ার্ড ভুলে গেছেন?</Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={20} /></div>
                                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="input input-bordered w-full pl-12 pr-12 rounded-2xl focus:outline-primary bg-base-100 border-base-200" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-lg w-full rounded-2xl text-white shadow-lg shadow-primary/20 mt-4 gap-3 border-none">
                            <ArrowRightCircle size={22} /> লগইন করুন
                        </button>
                    </form>

                    <div className="divider my-8 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">অথবা গুগল দিয়ে</div>

                    <button className="btn btn-outline border-base-200 w-full rounded-2xl gap-4 font-bold hover:bg-neutral hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                            <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                        </svg>
                        গুগল লগইন
                    </button>
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
                        <h2 className="text-5xl font-black mb-6 leading-tight tracking-tight">
                            স্বাগতম, <br />
                            <span className="text-primary italic">Rokto Din</span>-এ!
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xs font-medium">
                            আপনার একটি ছোট পদক্ষেপ বাঁচাতে পারে একটি মূল্যবান প্রাণ।
                        </p>
                    </div>

                    {/* Mobile & Desktop Call to Action - Redesigned */}
                    <div className="relative z-10 p-6 md:p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="mb-4 p-3 bg-primary/20 rounded-2xl md:hidden">
                                <UserPlus className=" w-6 h-6" />
                            </div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2">
                                নতুন ডোনার হতে চান?
                            </p>
                            <Link href="/register" className="w-full">
                                <button className="btn btn-primary w-full h-14 rounded-2xl text-white border-none shadow-xl shadow-primary/20 group hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <span className="font-black tracking-wide">নিবন্ধন করুন</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                            </Link>
                            <p className="text-[10px] text-gray-500 mt-4 font-bold uppercase tracking-widest">
                                মাত্র ২ মিনিটে অ্যাকাউন্ট খুলুন
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;