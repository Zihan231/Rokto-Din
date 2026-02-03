"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    User, Mail, Lock, Phone, MapPin,
    Droplets, ArrowRight, Calendar,
    Facebook, MessageCircle, ArrowLeft,
    CheckCircle2, HeartPulse, ShieldCheck
} from 'lucide-react';

const RegisterPage = () => {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [contacts, setContacts] = useState([]);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'সিলেট', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'];

    const toggleContact = (method) => {
        setContacts(prev =>
            prev.includes(method) ? prev.filter(i => i !== method) : [...prev, method]
        );
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-0 md:p-6 lg:p-10">
            <div className="max-w-7xl w-full bg-white md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">

                {/* 1. Left Side: Brand Panel (RE-DESIGNED) */}
                <div className="md:w-[35%] lg:w-[32%] bg-neutral p-10 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden order-2 md:order-1">
                    {/* Abstract Shapes for Modern Look */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary opacity-20 rounded-full blur-[100px] -mr-40 -mt-40" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-10 rounded-full blur-[80px] -ml-32 -mb-32" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-12 shadow-2xl shadow-primary/40 rotate-12"
                        >
                            <HeartPulse className="text-white w-12 h-12" />
                        </motion.div>

                        <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-[1.1] tracking-tighter">
                            একজন <span className="text-primary italic">হিরো</span> <br /> হয়ে উঠুন
                        </h2>

                        <div className="space-y-8">
                            {[
                                { title: "নিরাপদ ডাটাবেজ", desc: "আপনার তথ্য আমাদের কাছে এনক্রিপ্টেড থাকে।" },
                                { title: "সহজ যোগাযোগ", desc: "জরুরি প্রয়োজনে সরাসরি যোগাযোগ করার সুবিধা।" },
                                { title: "দ্রুত সেবা", desc: "স্মার্ট সার্চ ফিল্টার দিয়ে দ্রুত রক্তদাতা সন্ধান।" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex gap-4"
                                >
                                    <div className="mt-1"><CheckCircle2 size={20} className="text-primary" /></div>
                                    <div>
                                        <h4 className="font-bold text-lg leading-none mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-16">
                        <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl text-center">
                            <p className="text-sm font-bold text-gray-400 mb-5 uppercase tracking-[0.2em]">ইতিমধ্যেই সদস্য?</p>
                            <Link href="/login" className="w-full">
                                <button className="btn btn-primary w-full rounded-2xl text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all h-14 border-none">লগইন করুন</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. Right Side: Form */}
                <div className="flex-1 p-8 lg:p-16 bg-white order-1 md:order-2">
                    <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h3 className="text-4xl font-black text-neutral mb-2 tracking-tight">নিবন্ধন করুন</h3>
                            <p className="text-gray-500 font-medium">রক্তদাতা হিসেবে নতুন অ্যাকাউন্ট তৈরি করুন</p>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-primary bg-primary/5 px-4 py-2 rounded-full font-bold text-sm border border-primary/10">
                            <ShieldCheck size={16} /> সিকিউর রেজিস্ট্রেশন
                        </div>
                    </div>

                    <form className="space-y-8">
                        {/* Name & Email Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control group">
                                <label className="label font-bold text-neutral">সম্পূর্ণ নাম</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input type="text" className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200" placeholder="উদা: আরিয়ান রহমান" />
                                </div>
                            </div>
                            <div className="form-control group">
                                <label className="label font-bold text-neutral">ইমেইল এড্রেস</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input type="email" className="input input-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200" placeholder="mail@example.com" />
                                </div>
                            </div>
                        </div>

                        {/* Dropdown Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-bold text-neutral text-sm">বিভাগ</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10" size={18} />
                                    <select className="select select-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200 font-medium appearance-none">
                                        <option disabled selected>বিভাগ নির্বাচন করুন</option>
                                        {divisions.map(d => <option key={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold text-neutral text-sm">জেলা</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary z-10" size={18} />
                                    <select className="select select-bordered w-full pl-12 rounded-2xl focus:outline-primary border-base-200 font-medium">
                                        <option disabled selected>জেলা নির্বাচন করুন</option>
                                        <option>ঢাকা</option><option>চট্টগ্রাম</option><option>গাজীপুর</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Optimized Date Picker Section */}
                        <div className="p-6 bg-base-50 rounded-4xl border-2 border-dashed border-base-200 hover:border-primary/30 transition-colors">
                            <label className="label font-bold text-neutral flex items-center gap-2 mb-2 italic">
                                <Calendar size={18} className="text-primary" /> শেষ রক্তদানের তারিখ (ঐচ্ছিক)
                            </label>
                            <div className="relative group">
                                <input
                                    type="date"
                                    className="input input-bordered w-full h-14 pl-12 rounded-xl focus:outline-primary border-base-200 font-bold text-neutral cursor-pointer bg-white"
                                    onClick={(e) => e.target.showPicker?.()}
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary pointer-events-none" size={20} />
                            </div>
                            <p className="text-[10px] text-gray-400 mt-3 font-bold uppercase tracking-widest leading-relaxed">
                                * যদি আপনি নতুন ডোনার হন তবে এটি ফাঁকা রাখুন।
                            </p>
                        </div>

                        {/* Blood Group Selector */}
                        <div className="form-control">
                            <label className="label font-bold text-neutral flex items-center gap-2">
                                <Droplets size={18} className="text-primary" /> রক্তের গ্রুপ
                            </label>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                {bloodGroups.map((group) => (
                                    <button
                                        key={group}
                                        type="button"
                                        onClick={() => setSelectedGroup(group)}
                                        className={`h-12 rounded-xl font-black transition-all border-2 ${selectedGroup === group ? 'bg-primary border-primary text-white shadow-lg' : 'bg-base-100 border-base-200 text-neutral hover:border-primary/50'}`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Contact Buttons & Dynamic Inputs */}
                        <div className="form-control pt-4">
                            <label className="label font-bold text-neutral mb-2">যোগাযোগের মাধ্যম (মাল্টি-সিলেক্ট)</label>
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { id: 'phn', label: 'Phone', icon: <Phone size={18} /> },
                                    { id: 'wp', label: 'WhatsApp', icon: <MessageCircle size={18} /> },
                                    { id: 'fb', label: 'Facebook', icon: <Facebook size={18} /> }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => toggleContact(method.id)}
                                        className={`flex flex-col md:flex-row items-center justify-center gap-2 h-16 rounded-2xl border-2 transition-all font-bold ${contacts.includes(method.id) ? 'border-primary bg-primary/5 text-primary scale-105' : 'border-base-200 text-gray-400'}`}
                                    >
                                        {method.icon} <span className="text-xs md:text-sm">{method.label}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div layout className="space-y-4">
                                    {contacts.includes('phn') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                                            <input type="tel" placeholder="আপনার ফোন নাম্বার দিন" className="input input-bordered w-full pl-12 rounded-2xl border-primary/30 bg-primary/5 font-medium" />
                                        </motion.div>
                                    )}
                                    {contacts.includes('wp') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                                            <input type="tel" placeholder="হোয়াটসঅ্যাপ নাম্বার দিন" className="input input-bordered w-full pl-12 rounded-2xl border-emerald-300 bg-emerald-50 font-medium" />
                                        </motion.div>
                                    )}
                                    {contacts.includes('fb') && (
                                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="relative group">
                                            <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                                            <input type="url" placeholder="ফেসবুক প্রোফাইল লিঙ্ক (URL) দিন" className="input input-bordered w-full pl-12 rounded-2xl border-blue-300 bg-blue-50 font-medium" />
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Submit Actions */}
                        <div className="pt-8 space-y-6">
                            <button className="btn btn-primary btn-lg w-full rounded-4xl text-white shadow-2xl shadow-primary/30 border-none group h-16 font-black text-lg">
                                অ্যাকাউন্ট তৈরি করুন <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>

                            <div className="divider text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] px-10">অথবা গুগল একাউন্ট দিয়ে</div>

                            <button className="btn btn-outline border-base-300 w-full h-14 rounded-2xl gap-4 font-bold hover:bg-neutral hover:text-white transition-all shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                গুগল দিয়ে সরাসরি শুরু করুন
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;