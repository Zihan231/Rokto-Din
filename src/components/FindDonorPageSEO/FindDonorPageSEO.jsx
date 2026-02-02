"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Droplets, ShieldCheck } from 'lucide-react';

const FindDonorPageSEO = () => {
    const features = [
        {
            icon: <Search className="w-8 h-8" />,
            title: "সহজে রক্তদাতা খুঁজুন",
            desc: "আপনার এলাকা এবং রক্তের গ্রুপ অনুযায়ী কয়েক সেকেন্ডেই নিকটস্থ ডোনার খুঁজে পান।",
            color: "text-blue-600 bg-blue-50"
        },
        {
            icon: <UserPlus className="w-8 h-8" />,
            title: "ডোনার হিসেবে যুক্ত হন",
            desc: "আপনার সামান্য রক্ত দানে বাঁচতে পারে একটি প্রাণ। আজই আমাদের কমিউনিটিতে ডোনার হিসেবে নিবন্ধিত হোন।",
            color: "text-primary bg-primary/10"
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            title: "নিরাপদ ও বিশ্বস্ত",
            desc: "আমরা ডোনারদের তথ্য যাচাই করি এবং গোপনীয়তা বজায় রেখে রক্তদাতা ও গ্রহীতাদের মধ্যে সেতুবন্ধন তৈরি করি।",
            color: "text-green-600 bg-green-50"
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* SEO-Focused Heading */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest uppercase text-sm"
                    >
                        কেন আমাদের বেছে নিবেন?
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-black text-neutral mt-4 mb-6 leading-tight"
                    >
                        জীবন বাঁচাতে <span className="text-primary underline decoration-primary/20 underline-offset-8">Rokto Din</span> আপনার পাশে
                    </motion.h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        আমরা রক্তদাতা এবং গ্রহীতাদের মধ্যে একটি দ্রুত ও নিরাপদ প্ল্যাটফর্ম সরবরাহ করি, যা জরুরি অবস্থায় জীবনের ঝুঁকি কমাতে সাহায্য করে।
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="group p-8 rounded-[2.5rem] bg-base-100 border border-base-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-300 ${feature.color}`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-neutral mb-4 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                {feature.desc}
                            </p>

                            <div className="mt-8 flex items-center text-primary font-bold text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                আরও জানুন
                                <span className="ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                        </motion.article>
                    ))}
                </div>

                

            </div>
        </section>
    );
};

export default FindDonorPageSEO;