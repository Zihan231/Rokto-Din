"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Users, Code,
    Megaphone, Database, ShieldCheck,
    MapPin, HeartHandshake, Sparkles,
    Droplets,
    Plus,
    Zap,
    ArrowRightCircle,
    HeartPulse,
} from 'lucide-react';
import { FiLinkedin } from "react-icons/fi";
import Link from 'next/link';
import { FaFacebook, FaGithub } from 'react-icons/fa';
const AboutPage = () => {
    const features = [
        {
            icon: <Database className="w-8 h-8" />,
            title: "স্মার্ট ক্যাম্পাস ডাটাবেজ",
            desc: "দেশের শীর্ষস্থানীয় বিশ্ববিদ্যালয় ও কলেজগুলোর কয়েক হাজার ভেরিফাইড ডোনারের বিশাল নেটওয়ার্ক।",
            color: "blue"
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "ডাটা প্রাইভেসি ও সিকিউরিটি",
            desc: "ডোনারদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা আমাদের মূল অগ্রাধিকার। কোনো থার্ড-পার্টি এক্সেস নেই।",
            color: "emerald"
        },
        {
            icon: <MapPin className="w-8 h-8" />,
            title: "লোকেশন ভিত্তিক ইনস্ট্যান্ট সার্চ",
            desc: "বিভাগ ও জেলা অনুযায়ী ফিল্টার করে আপনার পাশের এলাকায় সেকেন্ডের মধ্যে রক্তদাতা খুঁজে পান।",
            color: "primary"
        },
        {
            icon: <HeartHandshake className="w-8 h-8" />,
            title: "২৪/৭ ইমার্জেন্সি সাপোর্ট",
            desc: "জরুরি প্রয়োজনে আমাদের কমিউনিটি ও ভলান্টিয়ার টিম সবসময় প্রস্তুত থাকে আপনার পাশে দাঁড়াতে।",
            color: "orange"
        }
    ];
    return (
        <div className="min-h-screen bg-white">

            {/* 1. HERO SECTION (SEO Focused) */}
            <section className="relative py-28 bg-neutral overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight"
                    >
                        রক্তের বাঁধনে গড়ি <span className="text-primary italic">একতা</span>, <br />
                        আমরাই আগামীর নির্ভরযোগ্য <span className="text-primary italic">মানবতা</span>
                    </motion.h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium">
                        <strong>Rokto Din</strong> বাংলাদেশের একটি আধুনিক এবং স্বচ্ছ অনলাইন রক্তদান প্ল্যাটফর্ম। আমাদের লক্ষ্য হলো প্রযুক্তির মাধ্যমে রক্তদাতা ও গ্রহীতার মধ্যকার দূরত্ব কমিয়ে আনা এবং প্রতিটি মুমূর্ষু রোগীর জন্য দ্রুত রক্তের যোগান নিশ্চিত করা।
                    </p>
                </div>
                {/* Decorative Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full" />
            </section>

            {/* 2. WHY ROKTO DIN? (SEO Description) */}
            <section className="py-32 bg-white overflow-hidden relative">
                {/* SEO Hidden H2 for search engines if needed */}
                <h2 className="sr-only">কেন Rokto Din বাংলাদেশের সেরা রক্তদান প্ল্যাটফর্ম?</h2>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Left: Content Area (5 Columns) */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 border border-primary/10">
                                    <Sparkles size={14} /> কেন আমাদের প্ল্যাটফর্ম?
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-neutral leading-[1.1] mb-8">
                                    প্রযুক্তির সাথে <span className="text-primary italic">মানবতার</span> <br /> এক অনন্য মেলবন্ধন
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                    <strong>Rokto Din</strong>-এর উদ্দেশ্য শুধু একটি ওয়েবসাইট তৈরি করা নয়, বরং এমন একটি ইকোসিস্টেম গড়া যেখানে তথ্যের নির্ভুলতা এবং গতির মাধ্যমে জীবন বাঁচানো সহজ হয়। আমরা গতানুগতিক সোশ্যাল মিডিয়া পোস্টের দীর্ঘ অপেক্ষা কমিয়ে সরাসরি অ্যাকশনে বিশ্বাসী।
                                </p>
                            </motion.div>

                            {/* Interactive Metric (SEO Boost) */}
                            <div className="flex items-center gap-6 p-2 md:p-3 bg-white rounded-[2.5rem] border border-base-200 shadow-xl shadow-gray-100/50 max-w-fit pr-10 hover:border-primary/20 transition-all duration-500 group">

                                {/* Animated Icon Section */}
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                                        <Users className="text-primary w-7 h-7 group-hover:scale-110 transition-transform" />
                                    </div>

                                    {/* Ring Animation */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full border-2 border-primary/30"
                                    />
                                </div>

                                {/* Text Section with Plus Icon */}
                                <div>
                                    <div className="flex items-center gap-0.5">
                                        <motion.h4
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            className="text-3xl font-black text-neutral italic leading-none"
                                        >
                                            ৫,০০০
                                        </motion.h4>
                                        {/* Lucide Plus Icon Added Here */}
                                        <Plus className="text-primary w-6 h-6 stroke-[4px] -translate-y-1" />
                                    </div>

                                    <div className="flex items-center gap-2 mt-1.5">
                                        <div className="flex h-1.5 w-8 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '70%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                            ভেরিফাইড রক্তদাতা
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Feature Bento Grid (7 Columns) */}
                        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                            {/* Decorative background element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full -z-10" />

                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="group p-8 bg-white rounded-[2.5rem] border border-base-200 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 bg-base-50 group-hover:bg-primary group-hover:text-white shadow-sm`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-neutral mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}

                            {/* Centered Floating Blood Drop Icon */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="hidden lg:flex absolute -right-10 top-1/2 w-20 h-20 bg-white rounded-3xl shadow-2xl items-center justify-center text-primary border border-base-100"
                            >
                                <Droplets size={32} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MEET THE CORE TEAM (Developers & Management) */}
            <section className="py-2 bg-base-50 overflow-hidden relative">
                {/* Background Decorative Text or Shape */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-black text-neutral/5 select-none pointer-events-none uppercase">
                    Team
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-neutral tracking-tighter"
                        >
                            আমাদের মূল <span className="text-primary underline decoration-primary/20 underline-offset-8">শক্তি</span>
                        </motion.h2>
                        <p className="text-gray-400 font-bold uppercase tracking-[0.3em] mt-4 text-xs">The Visionaries Behind Rokto Din</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 max-w-6xl mx-auto">

                        {/* 1. Founder & Developer: Zihaul Islam Zihan */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center border border-white transition-all duration-500"
                        >
                            {/* Photo Container */}
                            <div className="relative mb-8">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden bg-neutral border-[6px] border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    {/* Replace with actual image: <Image src="/zihan.jpg" layout="fill" objectFit="cover" /> */}
                                    <div className="w-full h-full bg-linear-to-tr from-neutral to-gray-700 flex items-center justify-center text-white text-4xl font-black">
                                        MZ
                                    </div>
                                </div>
                                {/* Floating Tech Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/40 -rotate-12 group-hover:rotate-0 transition-all duration-500">
                                    <Code size={24} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-neutral">MD. Zihaul Islam Zihan</h3>
                                <p className="text-primary font-bold uppercase tracking-widest text-xs">Full-Stack Developer & Founder</p>
                            </div>

                            <div className="mt-6 h-1 w-12 bg-primary/20 rounded-full group-hover:w-24 transition-all duration-500" />

                            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
                                একজন CSE স্টুডেন্ট হিসেবে তিনি সাইটের সম্পূর্ণ টেকনিক্যাল আর্কিটেকচার এবং ইউজার এক্সপেরিয়েন্সের কারিগর।
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-8">
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300">
                                    <FaGithub size={20} />
                                </Link>
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300">
                                    <FiLinkedin size={20} />
                                </Link>
                            </div>
                        </motion.div>

                        {/* 2. Marketing Head: Partner Name */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white p-8 md:p-12 rounded-[4rem] shadow-2xl shadow-gray-200/50 flex flex-col items-center text-center border border-white transition-all duration-500"
                        >
                            {/* Photo Container */}
                            <div className="relative mb-8">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3rem] overflow-hidden bg-neutral border-[6px] border-white shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                    <div className="w-full h-full bg-linear-to-tr from-neutral to-gray-700 flex items-center justify-center text-white text-4xl font-black">
                                        PN
                                    </div>
                                </div>
                                {/* Floating Marketing Badge */}
                                <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl shadow-emerald-500/40 rotate-12 group-hover:rotate-0 transition-all duration-500">
                                    <Megaphone size={24} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-3xl font-black text-neutral">Fazle Rabbi Emtiaz</h3>
                                <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">Head of Marketing & Outreach</p>
                            </div>

                            <div className="mt-6 h-1 w-12 bg-emerald-500/20 rounded-full group-hover:w-24 transition-all duration-500" />

                            <p className="mt-6 text-gray-500 text-sm leading-relaxed font-medium max-w-xs">
                                তিনি প্ল্যাটফর্মের প্রচার, ডোনার এনগেজমেন্ট এবং কমিউনিটি নেটওয়ার্ক শক্তিশালী করার মাস্টারমাইন্ড।
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-8">
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <FiLinkedin size={20} />
                                </Link>
                                <Link href="#" className="w-12 h-12 rounded-2xl bg-base-50 flex items-center justify-center text-neutral hover:bg-emerald-500 hover:text-white transition-all duration-300">
                                    <FaFacebook size={20} />
                                </Link>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* 4. OUR IMPACT (Extra Info for SEO) */}
            <section className="pt-20 bg-white relative overflow-hidden">
                {/* Background Pattern for SEO & Depth */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E63946' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black text-neutral tracking-tight"
                            >
                                আমাদের <span className="text-primary italic">অঙ্গীকার</span> ও অর্জন
                            </motion.h2>
                            <div className="h-1.5 w-24 bg-primary/10 mx-auto mt-4 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: -100 }}
                                    whileInView={{ x: 0 }}
                                    transition={{ duration: 1 }}
                                    className="h-full bg-primary w-1/2 mx-auto"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                            {[
                                {
                                    val: "১০০%",
                                    label: "বিনামূল্যে সেবা",
                                    icon: <HeartHandshake className="w-6 h-6" />,
                                    desc: "কোনো লুকানো চার্জ ছাড়াই সম্পূর্ণ মানবিক উদ্যোগ।"
                                },
                                {
                                    val: "২৪/৭",
                                    label: "সক্রিয় নেটওয়ার্ক",
                                    icon: <Zap className="w-6 h-6" />,
                                    desc: "দিন-রাত যেকোনো মুহূর্তে দ্রুত সাড়া দেওয়ার প্রস্তুতি।"
                                },
                                {
                                    val: "ভেরিফাইড",
                                    label: "রক্তদাতা তালিকা",
                                    icon: <ShieldCheck className="w-6 h-6" />,
                                    desc: "প্রতিটি তথ্য কঠোরভাবে যাচাইকৃত এবং সুরক্ষিত।"
                                }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="relative group p-10 rounded-[3rem] bg-base-50 border border-base-200 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    {/* Icon Badge */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-base-100">
                                        {item.icon}
                                    </div>

                                    <div className="text-center mt-4">
                                        <motion.h4
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="text-5xl font-black text-neutral mb-4 italic tracking-tighter"
                                        >
                                            {item.val}
                                        </motion.h4>
                                        <p className="font-black text-primary uppercase tracking-[0.2em] text-xs mb-4">
                                            {item.label}
                                        </p>
                                        <div className="w-10 h-1 bg-primary/10 mx-auto mb-4 group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION */}
            <section className="py-20 px-6 relative overflow-hidden">
                {/* Decorative Background Elements for the Section */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-neutral rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
                    >
                        {/* Animated Grid Background */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #E63946 1px, transparent 0)`, backgroundSize: '40px 40px' }}
                        />

                        {/* Floating Glass Circles */}
                        <motion.div
                            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                        />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="flex justify-center mb-8"
                            >
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                                    <HeartPulse className="text-primary w-12 h-12 animate-pulse" />
                                </div>
                            </motion.div>

                            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                                চলুন মানুষের বিপদে <br />
                                <span className="text-primary italic underline underline-offset-12 decoration-white/10">ঢাল হয়ে </span> দাঁড়াই
                            </h2>

                            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                                আপনার এক মিনিটের সিদ্ধান্ত কারো সারা জীবনের হাসি হতে পারে। আজই বাংলাদেশের দ্রুততম রক্তদাতা নেটওয়ার্কে নিজের নাম লেখান।
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link href="/register" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-primary btn-lg w-full sm:w-auto px-12 h-20 rounded-full text-white font-black text-xl shadow-[0_20px_50px_rgba(230,57,70,0.3)] border-none flex items-center gap-3"
                                    >
                                        এখনই যুক্ত হোন
                                        <ArrowRightCircle size={24} />
                                    </motion.button>
                                </Link>

                                <Link href="/find-donors" className="w-full sm:w-auto">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-outline border-white/20 text-white hover:bg-white hover:text-neutral btn-lg w-full sm:w-auto px-12 h-20 rounded-full font-black text-xl backdrop-blur-sm"
                                    >
                                        রক্তদাতা খুঁজুন
                                    </motion.button>
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <ShieldCheck size={16} /> সিকিউর ডাটা
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <Users size={16} /> ৫০০০+ ডোনার
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase">
                                    <Zap size={16} /> ইনস্ট্যান্ট সাপোর্ট
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;