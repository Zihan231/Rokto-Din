"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, UserPlus, Search, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "ক্যাম্পাস ডাটা কালেকশন",
            desc: "আমরা দেশের বিভিন্ন কলেজ ও বিশ্ববিদ্যালয় থেকে সরাসরি রক্তদাতাদের তথ্য সংগ্রহ করি।",
            icon: <GraduationCap className="w-8 h-8" />,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            id: 2,
            title: "স্বেচ্ছায় নিবন্ধন",
            desc: "যে কেউ চাইলে নিজে একটি অ্যাকাউন্ট তৈরি করে নাম, ঠিকানা ও কন্টাক্ট ইনফো দিয়ে ডোনার হতে পারেন।",
            icon: <UserPlus className="w-6 h-6" />,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            id: 3,
            title: "তথ্য যাচাইকরণ",
            desc: "আমাদের টিম প্রতিটি ডোনারের তথ্য গুরুত্বের সাথে যাচাই করে ওয়েবসাইটে লিস্ট করে।",
            icon: <CheckCircle2 className="w-8 h-8" />,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            id: 4,
            title: "সহজে রক্তদাতা সন্ধান",
            desc: "প্রয়োজনীয় মুহূর্তে কয়েক ক্লিকেই কাঙ্ক্ষিত রক্তদাতার সাথে সরাসরি যোগাযোগ করুন।",
            icon: <Search className="w-8 h-8" />,
            color: "text-orange-600",
            bg: "bg-orange-50"
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-neutral mb-6"
                    >
                        আমরা <span className="text-primary">যেভাবে</span> কাজ করি
                    </motion.h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        স্বচ্ছতা এবং দ্রুত সেবা নিশ্চিত করাই আমাদের মূল লক্ষ্য। জেনে নিন কীভাবে আমরা আপনার প্রয়োজনে রক্তদাতার সন্ধান দেই।
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative ">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-20 right-20 h-0.5 bg-gray-100 -z-10 "/>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center group border border-base-300 rounded-[2.5rem] p-8 hover:border-primary/30 transition-all duration-300 bg-white"
                        >
                            {/* Step Icon */}
                            <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-3xl flex items-center justify-center mb-8 relative shadow-sm group-hover:scale-110 transition-transform duration-300 ring-4 ring-white`}>
                                {step.icon}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-bold text-neutral mb-4 group-hover:text-primary transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium text-sm">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA for University Students */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-neutral text-white text-center md:flex items-center justify-between border border-white/5 shadow-2xl"
                >
                    <div className="md:text-left mb-8 md:mb-0">
                        <h4 className="text-2xl md:text-3xl font-black mb-3">
                            আপনি কি আপনার ক্যাম্পাসের <span className="text-primary">প্রতিনিধি</span> হতে চান?
                        </h4>
                        <p className="text-gray-400 text-base md:text-lg font-medium">
                            আপনার প্রতিষ্ঠানের ডোনার লিস্ট আমাদের ডাটাবেজে যুক্ত করতে আমাদের সাথে যোগাযোগ করুন।
                        </p>
                    </div>
                    <Link href="/contact">
                        <button className="btn btn-primary btn-lg rounded-full px-12 text-white border-none shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            যোগাযোগ করুন
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;